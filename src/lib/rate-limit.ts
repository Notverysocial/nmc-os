import { createHash } from "node:crypto";

// Rate limit configuration (tunable)
const REQUESTS_PER_MINUTE = 20;
const REQUESTS_PER_DAY = 200;
const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

interface RateLimitRecord {
  minute: {
    count: number;
    resetAt: number;
  };
  daily: {
    count: number;
    resetAt: number;
  };
}

// In-memory fallback: Map of hashed IP -> RateLimitRecord
const inMemoryStore = new Map<string, RateLimitRecord>();

// Upstash configuration
const UPSTASH_ENABLED =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

/**
 * Hash an IP address with sha256 and truncate to first 16 chars.
 * This prevents storing raw IPs in memory.
 */
function hashIp(ip: string): string {
  const hash = createHash("sha256").update(ip).digest("hex");
  return hash.substring(0, 16);
}

/**
 * Extract client IP from request headers.
 * Falls back: x-forwarded-for (first) -> x-real-ip -> "unknown"
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // Take the first IP in case of multiple proxies
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

/**
 * Check Upstash Redis for rate limit using REST API.
 * Returns { allowed, remaining, resetAt, reason? }
 */
async function checkUpstash(
  hashedIp: string
): Promise<{
  allowed: boolean;
  remaining: number;
  resetAt: number;
  reason?: "minute_limit" | "daily_limit";
}> {
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!baseUrl || !token) {
    // Should not happen given UPSTASH_ENABLED check, but be safe
    return { allowed: true, remaining: REQUESTS_PER_MINUTE, resetAt: 0 };
  }

  const now = Date.now();
  const minuteKey = `rl:minute:${hashedIp}`;
  const dailyKey = `rl:daily:${hashedIp}`;

  try {
    // Minute limit check
    const minuteRes = await fetch(`${baseUrl}/incr/${minuteKey}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!minuteRes.ok) throw new Error("Upstash minute incr failed");
    const minuteData = (await minuteRes.json()) as { result: number };
    const minuteCount = minuteData.result;

    // Set TTL on minute key if this is the first request
    if (minuteCount === 1) {
      await fetch(`${baseUrl}/expire/${minuteKey}/60`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {}); // Ignore TTL errors
    }

    if (minuteCount > REQUESTS_PER_MINUTE) {
      const resetAt = now + MINUTE_MS;
      return {
        allowed: false,
        remaining: 0,
        resetAt,
        reason: "minute_limit",
      };
    }

    // Daily limit check
    const dailyRes = await fetch(`${baseUrl}/incr/${dailyKey}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!dailyRes.ok) throw new Error("Upstash daily incr failed");
    const dailyData = (await dailyRes.json()) as { result: number };
    const dailyCount = dailyData.result;

    // Set TTL on daily key if this is the first request
    if (dailyCount === 1) {
      await fetch(`${baseUrl}/expire/${dailyKey}/86400`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {}); // Ignore TTL errors
    }

    if (dailyCount > REQUESTS_PER_DAY) {
      const resetAt = now + DAY_MS;
      return {
        allowed: false,
        remaining: 0,
        resetAt,
        reason: "daily_limit",
      };
    }

    return {
      allowed: true,
      remaining: REQUESTS_PER_MINUTE - minuteCount,
      resetAt: now + MINUTE_MS,
    };
  } catch (error) {
    console.error("[RATE_LIMIT_UPSTASH_ERROR]", error);
    // Fall through to in-memory as graceful degradation
    return checkInMemory(hashedIp);
  }
}

/**
 * Check in-memory rate limit (fallback or standalone).
 * Only tracks per-minute; daily tracking requires persistent storage.
 */
function checkInMemory(hashedIp: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  reason?: "minute_limit" | "daily_limit";
} {
  const now = Date.now();
  let record = inMemoryStore.get(hashedIp);

  if (!record) {
    record = {
      minute: { count: 1, resetAt: now + MINUTE_MS },
      daily: { count: 1, resetAt: now + DAY_MS },
    };
    inMemoryStore.set(hashedIp, record);
    return {
      allowed: true,
      remaining: REQUESTS_PER_MINUTE - 1,
      resetAt: record.minute.resetAt,
    };
  }

  // Check if minute window has expired
  if (now >= record.minute.resetAt) {
    record.minute = { count: 1, resetAt: now + MINUTE_MS };
  } else {
    record.minute.count++;
  }

  // Check if daily window has expired
  if (now >= record.daily.resetAt) {
    record.daily = { count: 1, resetAt: now + DAY_MS };
  } else {
    record.daily.count++;
  }

  inMemoryStore.set(hashedIp, record);

  // Check minute limit
  if (record.minute.count > REQUESTS_PER_MINUTE) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.minute.resetAt,
      reason: "minute_limit",
    };
  }

  // Check daily limit (tracked but in-memory only)
  if (record.daily.count > REQUESTS_PER_DAY) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.daily.resetAt,
      reason: "daily_limit",
    };
  }

  return {
    allowed: true,
    remaining: REQUESTS_PER_MINUTE - record.minute.count,
    resetAt: record.minute.resetAt,
  };
}

/**
 * Check rate limit for a given IP.
 * Uses Upstash if configured, falls back to in-memory.
 */
export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetAt: number;
  reason?: "minute_limit" | "daily_limit";
}> {
  const hashedIp = hashIp(ip);

  if (UPSTASH_ENABLED) {
    return checkUpstash(hashedIp);
  } else {
    return checkInMemory(hashedIp);
  }
}
