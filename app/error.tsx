"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/20"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-black/80 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-4">
            Something went wrong
          </h1>

          <p className="text-gray-300 mb-6">
            We encountered an unexpected error. This might be a temporary issue
            with authentication or database connection.
          </p>

          <div className="space-y-3">
            <Button
              onClick={reset}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </Button>

            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="w-full py-3 border-white/20 text-white hover:bg-white/10 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Button>

            <Button
              onClick={() => (window.location.href = "/auth/signin")}
              variant="outline"
              className="w-full py-3 border-blue-500/20 text-blue-300 hover:bg-blue-500/10 rounded-xl font-semibold transition-all duration-300"
            >
              Sign In Again
            </Button>
          </div>

          {error.digest && (
            <p className="text-sm text-gray-500 mt-6">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
