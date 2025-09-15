import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjects } from "@/lib/actions";
import { calculateSubjectProgress } from "@/lib/utils";
import { SubjectCard } from "@/components/SubjectCard";
import { UserButton } from "@clerk/nextjs";
import { BookOpen, ArrowLeft, BarChart3, Clock, Target } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";
import { DynamicHeaderPadding } from "@/components/DynamicHeaderPadding";

export default async function SubjectsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const subjects = await getSubjects();

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Black background with subtle pattern */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        {/* Subtle floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-15 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-blue-600 rounded-full opacity-10 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-8 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Navigation */}
      <header
        className="relative z-50 bg-black/90 backdrop-blur-sm border-b border-white/10"
        id="dynamic-header"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 transition-all duration-300 backdrop-blur-sm"
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">All Subjects</h1>
                <p className="text-sm text-gray-300">
                  Manage your CS Executive subjects
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-green"></div>
              <UserButton />
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      <DynamicHeaderPadding />

      <main
        className="relative z-10 container mx-auto pb-8 md:pb-12"
        id="main-content"
        style={{ paddingTop: "200px" }}
      >
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in-scale">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4">
              <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              CS Executive Subjects
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Click on any subject to view and manage chapters, revisions, and
            mock tests. Track your progress and achieve excellence in each
            subject.
          </p>
        </div>

        {/* Quick Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 animate-fade-in-scale"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold gradient-text-success mb-2">
              {subjects.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Subjects</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold gradient-text-accent mb-2">
              {subjects.reduce(
                (acc, subject) => acc + subject.chapters.length,
                0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Total Chapters</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold gradient-text mb-2">
              {subjects.reduce(
                (acc, subject) => acc + subject.mockTests.length,
                0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Mock Tests</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold gradient-text-warning mb-2">
              {Math.round(
                subjects.reduce((acc, subject) => {
                  const chapterTasks = subject.chapters.length * 4;
                  const mockTasks = subject.mockTests.length;
                  const totalTasks = chapterTasks + mockTasks;
                  let completedTasks = 0;
                  subject.chapters.forEach((chapter) => {
                    const progress = chapter.progress?.[0];
                    if (progress) {
                      if (progress.completed) completedTasks++;
                      if (progress.revision1) completedTasks++;
                      if (progress.revision2) completedTasks++;
                      if (progress.revision3) completedTasks++;
                    }
                  });
                  subject.mockTests.forEach((mock) => {
                    const progress = mock.progress?.[0];
                    if (progress?.completed) completedTasks++;
                  });
                  return (
                    acc +
                    (totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0)
                  );
                }, 0) / subjects.length
              )}
              %
            </div>
            <div className="text-sm text-muted-foreground">Avg Progress</div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {subjects.map((subject, index) => {
            const subjectProgress = calculateSubjectProgress(subject);

            return (
              <div
                key={subject.id}
                className="animate-slide-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <SubjectCard
                  id={subject.id}
                  name={subject.name}
                  description={subject.description}
                  progress={subjectProgress.progress}
                  completed={subjectProgress.completed}
                  total={subjectProgress.total}
                  todayHours={0}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
