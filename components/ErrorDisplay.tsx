"use client";

interface ErrorDisplayProps {
  title: string;
  message: string;
  errorDetails: string;
  showDebugLink?: boolean;
}

export function ErrorDisplay({
  title,
  message,
  errorDetails,
  showDebugLink = true,
}: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-400 mb-4">{title}</h1>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6 text-left">
          <ul className="text-red-300 text-sm space-y-2">
            <li>• Database server may be paused or unreachable</li>
            <li>• Check your DATABASE_URL in .env.local</li>
            <li>• Ensure database credentials are correct</li>
            <li>• Connection string configuration issue</li>
            <li>• Network connectivity problems</li>
          </ul>
        </div>
        <div className="bg-gray-900/50 border border-gray-600/30 rounded-xl p-4 mb-6">
          <p className="text-gray-400 text-xs font-mono break-all">
            Error: {errorDetails}
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors mr-4"
          >
            Retry Dashboard
          </button>
          {showDebugLink && (
            <a
              href="/api/debug"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              View Debug Info
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

