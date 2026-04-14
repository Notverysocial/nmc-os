import { ReactNode } from "react";

export default function NovaAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Check if credentials are configured
  const username = process.env.ADMIN_USERNAME || "";
  const password = process.env.ADMIN_PASSWORD || "";

  // If credentials not configured, show unconfigured message
  if (!username || !password) {
    return (
      <div
        className="flex items-center justify-center min-h-screen p-4"
        style={{ background: "#0A0A0B" }}
      >
        <div
          className="rounded-2xl p-8 max-w-md w-full"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <h1
            className="text-lg font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Admin Not Configured
          </h1>
          <p className="text-slate-400 text-sm">
            Set <code className="text-red-300">ADMIN_USERNAME</code> and{" "}
            <code className="text-red-300">ADMIN_PASSWORD</code> environment
            variables to enable admin access. Basic Auth is enforced via
            middleware at <code className="text-red-300">src/middleware.ts</code>
            .
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
