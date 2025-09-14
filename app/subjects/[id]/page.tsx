import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectWithProgress } from "@/lib/actions";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChapterCheckbox } from "@/components/ChapterCheckbox";
import { MockCheckbox } from "@/components/MockCheckbox";

interface SubjectPageProps {
  params: {
    id: string;
  };
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const subject = await getSubjectWithProgress(params.id);

  if (!subject) {
    redirect("/subjects");
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/subjects"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {subject.name}
              </h1>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Progress Overview
              </h2>
              <p className="text-gray-600">{subject.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {progress.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">
                {completedTasks} / {totalTasks} tasks
              </div>
            </div>
          </div>

          <Progress value={progress} className="h-3" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Chapters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subject.chapters.map((chapter, index) => {
                    const chapterProgress = chapter.progress?.[0];
                    return (
                      <div key={chapter.id} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">
                          {index + 1}. {chapter.name}
                        </h4>
                        <div className="space-y-2">
                          <ChapterCheckbox
                            chapterId={chapter.id}
                            field="completed"
                            checked={chapterProgress?.completed || false}
                            label="✅ Completed"
                          />
                          <ChapterCheckbox
                            chapterId={chapter.id}
                            field="revision1"
                            checked={chapterProgress?.revision1 || false}
                            label="🔁 Revision 1"
                          />
                          <ChapterCheckbox
                            chapterId={chapter.id}
                            field="revision2"
                            checked={chapterProgress?.revision2 || false}
                            label="🔁 Revision 2"
                          />
                          <ChapterCheckbox
                            chapterId={chapter.id}
                            field="revision3"
                            checked={chapterProgress?.revision3 || false}
                            label="🔁 Revision 3"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Mock Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subject.mockTests.map((mock, index) => {
                    const mockProgress = mock.progress?.[0];
                    return (
                      <div key={mock.id} className="border rounded-lg p-4">
                        <MockCheckbox
                          mockTestId={mock.id}
                          checked={mockProgress?.completed || false}
                          label={`${index + 1}. ${mock.name}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
