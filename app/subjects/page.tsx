import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjects } from "@/lib/actions";
import { SubjectCard } from "@/components/SubjectCard";
import { UserButton } from "@clerk/nextjs";
import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function SubjectsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const subjects = await getSubjects();

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
              <h1 className="text-2xl font-bold text-gray-900">All Subjects</h1>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              CS Executive Subjects
            </h2>
          </div>
          <p className="text-gray-600">
            Click on any subject to view and manage chapters, revisions, and
            mock tests.
          </p>
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
                todayHours={0}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
