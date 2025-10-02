"use client";

import { Button } from "@/components/ui/button";

export function RetryButton() {
  return (
    <Button
      onClick={() => window.location.reload()}
      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
    >
      Retry Dashboard
    </Button>
  );
}

