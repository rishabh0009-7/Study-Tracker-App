import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { StudyTimer } from "@/components/StudyTimer";
import { getTodayStudyHours, createStudySession } from "@/lib/actions";
import { formatStudyTime } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";

export default async function StudyPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const todayHours = await getTodayStudyHours();
  const todayMinutes = todayHours * 60; // Convert to minutes for formatting

  async function handleSessionComplete(duration: number) {
    "use server";
    await createStudySession(duration);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Study Timer</h1>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Focus on Your Studies
              </h2>
            </div>
            <p className="text-center text-gray-600">
              Start a study session and track your time to build consistent
              study habits.
            </p>
          </div>

          <StudyTimer
            onSessionComplete={handleSessionComplete}
            todayTotalHours={todayHours}
          />

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">Today's Progress</h3>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatStudyTime(todayMinutes)}
              </div>
              <p className="text-gray-600 text-sm">Total study time today</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold">Study Tips</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Take 5-minute breaks every 25 minutes</li>
                <li>• Stay hydrated and well-rested</li>
                <li>• Review previous chapters regularly</li>
                <li>• Practice mock tests weekly</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/history"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Study History
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
