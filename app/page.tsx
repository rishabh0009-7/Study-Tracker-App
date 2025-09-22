import { Button } from "@/components/ui/button";
import { BookOpen, Play } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  // No auth check - redirect directly to dashboard
  return (
    <div className="min-h-screen relative overflow-hidden bg-black m-0 p-0">
      {/* Welcome message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">Welcome to CS Executive Tracker</h1>
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Play className="h-5 w-5 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
