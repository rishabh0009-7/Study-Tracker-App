import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Countdown } from "@/components/Countdown";
import { ProgressBar } from "@/components/ProgressBar";
import { SubjectCard } from "@/components/SubjectCard";
import {
  getSubjects,
  calculateOverallProgress,
  getTodayStudyHours,
  getOrCreateUser,
} from "@/lib/actions";
import { formatStudyTime } from "@/lib/utils";
import { seedDatabase } from "@/lib/seed";
import { UserButton } from "@clerk/nextjs";
import { BookOpen, Clock, BarChart3, History } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Seed database for new users
  try {
    const user = await getOrCreateUser();
    await seedDatabase(user.id);
  } catch (error) {
    console.error("Error seeding database:", error);
  }

  const [subjects, overallProgress, todayHours] = await Promise.all([
    getSubjects(),
    calculateOverallProgress(),
    getTodayStudyHours(),
  ]);

  const todayMinutes = todayHours * 60; // Convert to minutes for formatting

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              CS Executive Study Tracker
            </h1>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <Link href="/dashboard" className="text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Link
                  href="/study"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Study Timer
                </Link>
                <Link
                  href="/history"
                  className="text-gray-600 hover:text-gray-900"
                >
                  History
                </Link>
              </nav>
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Countdown />
          </div>
          <div className="lg:col-span-2">
            <ProgressBar
              progress={overallProgress.progress}
              total={overallProgress.total}
              completed={overallProgress.completed}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Today's Summary
            </h2>
            <div className="flex items-center text-lg text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-medium">
                {formatStudyTime(todayMinutes)} studied
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Subjects</h2>
            <div className="text-sm text-gray-600">
              {subjects.length} subjects • {overallProgress.completed}/
              {overallProgress.total} tasks completed
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {subjects.map((subject) => {
              const chapterTasks = subject.chapters.length * 4;
              const mockTasks = subject.mockTests.length;
              const totalTasks = chapterTasks + mockTasks;

              let completedTasks = 0;

              // Count completed chapter tasks
              subject.chapters.forEach((chapter) => {
                const progress = chapter.progress?.[0];
                if (progress) {
                  if (progress.completed) completedTasks++;
                  if (progress.revision1) completedTasks++;
                  if (progress.revision2) completedTasks++;
                  if (progress.revision3) completedTasks++;
                }
              });

              // Count completed mock tests
              subject.mockTests.forEach((mock) => {
                const progress = mock.progress?.[0];
                if (progress?.completed) completedTasks++;
              });

              const progress =
                totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

              return (
                <SubjectCard
                  key={subject.id}
                  id={subject.id}
                  name={subject.name}
                  description={subject.description}
                  progress={progress}
                  completed={completedTasks}
                  total={totalTasks}
                  todayHours={0} // TODO: Calculate per-subject study hours
                />
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/study" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">Study Timer</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Start a study session and track your time
              </p>
            </div>
          </Link>

          <Link href="/history" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold">Study History</h3>
              </div>
              <p className="text-gray-600 text-sm">
                View your study patterns and progress
              </p>
            </div>
          </Link>

          <Link href="/subjects" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold">All Subjects</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Manage all your subjects and chapters
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
