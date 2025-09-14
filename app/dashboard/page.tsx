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
import { BookOpen, Clock, BarChart3, History, Menu, X } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <header className="relative z-50 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  CS Executive Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  Professional Study Management
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <Link href="/dashboard" className="relative group">
                  <span className="text-white font-medium px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                    Dashboard
                  </span>
                </Link>
                <Link
                  href="/study"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/5"
                >
                  Study Timer
                </Link>
                <Link
                  href="/history"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/5"
                >
                  History
                </Link>
                <Link
                  href="/subjects"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/5"
                >
                  Subjects
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-green"></div>
                <UserButton />
                <MobileNav />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-12 md:py-12 pt-24 md:pt-12">
        {/* Hero Stats Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 animate-slide-in-up">
            <Countdown />
          </div>
          <div
            className="lg:col-span-2 animate-slide-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <ProgressBar
              progress={overallProgress.progress}
              total={overallProgress.total}
              completed={overallProgress.completed}
            />
          </div>
        </div>

        {/* Today's Summary Card */}
        <div
          className="mb-12 animate-fade-in-scale"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="card-premium rounded-2xl p-8 card-hover">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Today's Summary
                </h2>
                <p className="text-muted-foreground">
                  Track your daily progress and achievements
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center shadow-glow-green animate-float">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold gradient-text-success">
                    {formatStudyTime(todayMinutes)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    studied today
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">
                  {subjects.length}
                </div>
                <div className="text-sm text-muted-foreground">Subjects</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold gradient-text-accent mb-1">
                  {overallProgress.completed}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">
                  {overallProgress.total}
                </div>
                <div className="text-sm text-muted-foreground">Total Tasks</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold gradient-text mb-1">
                  {Math.round(overallProgress.progress)}%
                </div>
                <div className="text-sm text-muted-foreground">Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div
          className="mb-12 animate-fade-in-scale"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Study Subjects
              </h2>
              <p className="text-muted-foreground">
                Manage your CS Executive subjects and track progress
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text-accent">
                {subjects.length}
              </div>
              <div className="text-sm text-muted-foreground">subjects</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {subjects.map((subject, index) => {
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
                <div
                  key={subject.id}
                  className="animate-slide-in-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <SubjectCard
                    id={subject.id}
                    name={subject.name}
                    description={subject.description}
                    progress={progress}
                    completed={completedTasks}
                    total={totalTasks}
                    todayHours={0} // TODO: Calculate per-subject study hours
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Cards */}
        <div
          className="grid md:grid-cols-3 gap-8 animate-fade-in-scale"
          style={{ animationDelay: "0.6s" }}
        >
          <Link href="/study" className="group">
            <div className="card-premium rounded-2xl p-8 card-hover btn-premium">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-success rounded-2xl flex items-center justify-center shadow-glow-green mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Study Timer
                  </h3>
                  <p className="text-sm text-muted-foreground">Focus & Track</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Start a focused study session and track your time with our
                premium timer
              </p>
              <div className="mt-6 flex items-center text-sm text-green-400 font-medium">
                <span>Start Session</span>
                <Clock className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          <Link href="/history" className="group">
            <div className="card-premium rounded-2xl p-8 card-hover btn-premium">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mr-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Study History
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Analytics & Insights
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                View detailed analytics and patterns of your study sessions
              </p>
              <div className="mt-6 flex items-center text-sm text-blue-400 font-medium">
                <span>View Analytics</span>
                <BarChart3 className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          <Link href="/subjects" className="group">
            <div className="card-premium rounded-2xl p-8 card-hover btn-premium">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-accent rounded-2xl flex items-center justify-center shadow-glow mr-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    All Subjects
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Manage & Organize
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Manage all your subjects, chapters, and track detailed progress
              </p>
              <div className="mt-6 flex items-center text-sm text-cyan-400 font-medium">
                <span>Manage Subjects</span>
                <BookOpen className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
