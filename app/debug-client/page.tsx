"use client";

import { useState, useEffect } from "react";

export default function ClientDebugPage() {
  const [debug, setDebug] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runDebug = async () => {
      const debugInfo = {
        timestamp: new Date().toISOString(),
        environment: "production",
        appType: "Single-user app (no authentication needed)",
        serverDebug: "Unknown",
        error: null as any,
      };

      try {
        // Test server-side debug endpoint
        try {
          const response = await fetch("/api/debug");
          const serverData = await response.json();
          debugInfo.serverDebug = serverData;
        } catch (serverError) {
          debugInfo.serverDebug = `❌ Server Debug Error: ${serverError}`;
        }
      } catch (error) {
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
              <h4 className="text-sm font-semibold text-green-400 mb-2">
                App Type
              </h4>
              <div className="bg-black/50 rounded-lg p-3 text-xs font-mono">
                <p>
                  <span className="text-gray-400">Type:</span>{" "}
                  <span className="text-green-400">
                    {debug.appType}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Status:</span>{" "}
                  <span className="text-green-400">
                    ✅ Ready to use - no authentication required
                  </span>
                </p>
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
            href="/subjects"
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
          >
            View Subjects
          </a>
        </div>
      </div>
    </div>
  );
}



