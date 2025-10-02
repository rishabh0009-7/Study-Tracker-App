"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ClientDebugPage() {
  const [debug, setDebug] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runDebug = async () => {
      const debugInfo = {
        timestamp: new Date().toISOString(),
        environment: "production",
        clientAuth: "Unknown",
        serverDebug: "Unknown",
        userInfo: null as any,
        error: null as any,
      };

      try {
        // Test client-side authentication
        console.log("Testing client-side Supabase authentication...");
        const supabase = createClient();

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          debugInfo.clientAuth = `❌ Client Auth Error: ${authError.message}`;
          debugInfo.error = authError.message;
        } else if (user) {
          debugInfo.clientAuth = `✅ Client User Found: ${user.email}`;
          debugInfo.userInfo = {
            id: user.id,
            email: user.email,
            emailConfirmed: user.email_confirmed_at
              ? "✅ Confirmed"
              : "❌ Not confirmed",
            lastSignIn: user.last_sign_in_at,
          };
        } else {
          debugInfo.clientAuth = "❌ No user found on client";
          debugInfo.error = "No authenticated user on client";
        }

        // Test server-side debug endpoint
        try {
          const response = await fetch("/api/debug");
          const serverData = await response.json();
          debugInfo.serverDebug = serverData;
        } catch (serverError) {
          debugInfo.serverDebug = `❌ Server Debug Error: ${serverError}`;
        }
      } catch (error) {
        debugInfo.clientAuth = `❌ Client Exception: ${error}`;
        debugInfo.error = String(error);
      }

      setDebug(debugInfo);
      setLoading(false);
    };

    runDebug();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              🔍 Client Debug
            </h1>
            <p className="text-gray-300">Loading debug information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            🔍 Client-Side Debug
          </h1>
          <p className="text-gray-300">
            Authentication and database status from client
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6 text-left max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-4">Debug Results</h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-2">
                Client Authentication
              </h4>
              <div className="bg-black/50 rounded-lg p-3 text-xs font-mono">
                <p>
                  <span className="text-gray-400">Status:</span>{" "}
                  <span
                    className={
                      debug.clientAuth.includes("✅")
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {debug.clientAuth}
                  </span>
                </p>
                {debug.userInfo && (
                  <>
                    <p>
                      <span className="text-gray-400">ID:</span>{" "}
                      <span className="text-blue-400">{debug.userInfo.id}</span>
                    </p>
                    <p>
                      <span className="text-gray-400">Email:</span>{" "}
                      <span className="text-blue-400">
                        {debug.userInfo.email}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-400">Email Confirmed:</span>{" "}
                      <span
                        className={
                          debug.userInfo.emailConfirmed.includes("✅")
                            ? "text-green-400"
                            : "text-yellow-400"
                        }
                      >
                        {debug.userInfo.emailConfirmed}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-400">Last Sign In:</span>{" "}
                      <span className="text-gray-300">
                        {debug.userInfo.lastSignIn || "Never"}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                Server Debug Response
              </h4>
              <div className="bg-black/50 rounded-lg p-3 text-xs font-mono">
                <pre className="text-gray-300 whitespace-pre-wrap">
                  {JSON.stringify(debug.serverDebug, null, 2)}
                </pre>
              </div>
            </div>

            {debug.error && (
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-2">
                  Error Details
                </h4>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-300 text-xs font-mono">
                    {debug.error}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <a
            href="/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors mr-4"
          >
            Back to Dashboard
          </a>
          <a
            href="/auth/signin"
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}



