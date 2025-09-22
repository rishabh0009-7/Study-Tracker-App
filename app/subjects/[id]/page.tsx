import { getSubjectWithProgress } from "@/lib/actions";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { ChapterCheckbox } from "@/components/ChapterCheckbox";
import { MockCheckbox } from "@/components/MockCheckbox";
import { MobileNav } from "@/components/MobileNav";
import { DynamicHeaderPadding } from "@/components/DynamicHeaderPadding";

interface SubjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { id } = await params;
  // No auth check - directly load subject data

  const subject = await getSubjectWithProgress(id);

  if (!subject) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Subject not found
          </h1>
          <p className="text-gray-300">
            The subject you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

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

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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
                href="/subjects"
                className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 transition-all duration-300 backdrop-blur-sm"
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {subject.name}
                </h1>
                <p className="text-sm text-gray-300">
                  Track your progress and manage tasks
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-green"></div>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      <DynamicHeaderPadding />

      <main
        className="relative z-10 container mx-auto px-6 pb-8 md:pb-12"
        id="main-content"
        style={{ paddingTop: "200px" }}
      >
        {/* Progress Overview */}
        <div className="card-premium rounded-2xl p-8 mb-12 animate-fade-in-scale">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">
                Progress Overview
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {subject.description}
              </p>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-6xl font-bold gradient-text mb-2">
                {Math.round(progress)}%
              </div>
              <div className="text-lg text-muted-foreground">
                {completedTasks} / {totalTasks} tasks completed
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-2000 ease-out ${
                  progress >= 80
                    ? "bg-gradient-success shadow-glow-green"
                    : progress >= 50
                    ? "bg-gradient-accent shadow-glow"
                    : progress >= 25
                    ? "bg-gradient-warning shadow-glow-purple"
                    : "bg-gradient-to-r from-gray-500 to-gray-600"
                }`}
                style={{ width: `${progress}%` }}
              >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in-scale"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold gradient-text-success mb-2">
              {subject.chapters.length}
            </div>
            <div className="text-sm text-muted-foreground">Chapters</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold gradient-text-accent mb-2">
              {subject.mockTests.length}
            </div>
            <div className="text-sm text-muted-foreground">Mock Tests</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold gradient-text mb-2">
              {totalTasks}
            </div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold gradient-text-warning mb-2">
              {completedTasks}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chapters Section */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="card-premium rounded-2xl p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mr-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Chapters</h3>
              </div>
              <div className="space-y-6">
                {subject.chapters.map((chapter, index) => {
                  const chapterProgress = chapter.progress?.[0];
                  const chapterCompleted = chapterProgress?.completed || false;
                  const revision1 = chapterProgress?.revision1 || false;
                  const revision2 = chapterProgress?.revision2 || false;
                  const revision3 = chapterProgress?.revision3 || false;
                  const chapterProgressPercent =
                    (((chapterCompleted ? 1 : 0) +
                      (revision1 ? 1 : 0) +
                      (revision2 ? 1 : 0) +
                      (revision3 ? 1 : 0)) /
                      4) *
                    100;

                  return (
                    <div
                      key={chapter.id}
                      className="card-premium rounded-xl p-6 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">
                          {index + 1}. {chapter.name}
                        </h4>
                        <div className="text-sm font-bold gradient-text">
                          {Math.round(chapterProgressPercent)}%
                        </div>
                      </div>
                      <div className="space-y-3">
                        <ChapterCheckbox
                          chapterId={chapter.id}
                          field="completed"
                          checked={chapterCompleted}
                          label="✅ Completed"
                        />
                        <ChapterCheckbox
                          chapterId={chapter.id}
                          field="revision1"
                          checked={revision1}
                          label="🔁 Revision 1"
                        />
                        <ChapterCheckbox
                          chapterId={chapter.id}
                          field="revision2"
                          checked={revision2}
                          label="🔁 Revision 2"
                        />
                        <ChapterCheckbox
                          chapterId={chapter.id}
                          field="revision3"
                          checked={revision3}
                          label="🔁 Revision 3"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mock Tests Section */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="card-premium rounded-2xl p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-success rounded-2xl flex items-center justify-center shadow-glow-green mr-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Mock Tests</h3>
              </div>
              <div className="space-y-6">
                {subject.mockTests.map((mock, index) => {
                  const mockProgress = mock.progress?.[0];
                  const mockCompleted = mockProgress?.completed || false;

                  return (
                    <div
                      key={mock.id}
                      className="card-premium rounded-xl p-6 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">
                          {index + 1}. {mock.name}
                        </h4>
                        <div
                          className={`text-sm font-bold ${
                            mockCompleted
                              ? "gradient-text-success"
                              : "text-muted-foreground"
                          }`}
                        >
                          {mockCompleted ? "Completed" : "Pending"}
                        </div>
                      </div>
                      <MockCheckbox
                        mockTestId={mock.id}
                        checked={mockCompleted}
                        label=""
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
