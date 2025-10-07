"use client";

interface ErrorActionsProps {
  showSeedButton?: boolean;
}

export function ErrorActions({ showSeedButton = false }: ErrorActionsProps) {
  const handleSeedDatabase = async () => {
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      });
      const result = await response.json();
      if (result.success) {
        window.location.reload();
      } else {
        console.error("Seed failed:", result.error);
      }
    } catch (error) {
      console.error("Seed request failed:", error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-3">
      {showSeedButton && (
        <button
          onClick={handleSeedDatabase}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors mr-3"
        >
          Seed Database
        </button>
      )}
      <button
        onClick={handleRefresh}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        {showSeedButton ? "Refresh Page" : "Retry Dashboard"}
      </button>
      <a
        href="/api/debug"
        className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors ml-4"
      >
        View Debug Info
      </a>
    </div>
  );
}
