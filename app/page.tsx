import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, BarChart3, Target } from "lucide-react";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            CS Executive Study Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Track your CS Executive exam preparation progress with detailed
            subject tracking, study timers, and comprehensive analytics.
          </p>

          <div className="flex justify-center gap-4 mb-16">
            <SignInButton>
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button size="lg">Get Started</Button>
            </SignUpButton>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Subject Tracking</h3>
              <p className="text-gray-600 text-sm">
                Track progress across all 5 CS Executive subjects with
                chapter-wise completion tracking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Study Timer</h3>
              <p className="text-gray-600 text-sm">
                Track your daily study hours with a built-in timer and session
                logging.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Progress Analytics</h3>
              <p className="text-gray-600 text-sm">
                Visualize your progress with charts and detailed analytics.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Target className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mock Tests</h3>
              <p className="text-gray-600 text-sm">
                Track completion of mock tests for each subject to gauge
                readiness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
