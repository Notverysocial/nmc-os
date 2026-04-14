import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Only apply auth to /admin/nova routes
  if (!req.nextUrl.pathname.startsWith("/admin/nova")) {
    return NextResponse.next();
  }

  const username = process.env.ADMIN_USERNAME || "";
  const password = process.env.ADMIN_PASSWORD || "";

  // If credentials not configured, allow access (layout will show not configured message)
  if (!username || !password) {
    return NextResponse.next();
  }

  // Check Basic Auth header
  const authHeader = req.headers.get("authorization") || "";
  const isAuthorized = validateBasicAuth(authHeader, username, password);

  if (!isAuthorized) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Nova Admin"',
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.next();
}

function validateBasicAuth(
  authHeader: string,
  username: string,
  password: string
): boolean {
  if (!authHeader.startsWith("Basic ")) {
    return false;
  }

  try {
    const encoded = authHeader.slice(6);
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const [user, pass] = decoded.split(":");
    return user === username && pass === password;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/admin/nova/:path*"],
};
