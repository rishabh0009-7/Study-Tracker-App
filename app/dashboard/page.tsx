import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Countdown } from "@/components/Countdown";
import { ProgressBar } from "@/components/ProgressBar";
import { SubjectCard } from "@/components/SubjectCard";
import {
  getSubjects,
  calculateOverallProgress,
  getOrCreateUser,
} from "@/lib/actions";
import { calculateSubjectProgress } from "@/lib/utils";
import { seedDatabase } from "@/lib/seed";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Suspense } from "react";
import { AuthLoading } from "@/components/AuthLoading";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <Suspense fallback={<AuthLoading />}>
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  try {
    // Get or create user
    const user = await getOrCreateUser();

    // Only seed if user has no subjects
    try {
      const existingSubjects = await prisma.subject.findMany({
        where: { userId: user.id },
      });

      if (existingSubjects.length === 0) {
        await seedDatabase(user.id);
      }
    } catch (seedError) {
      console.error("Error checking/seeding database:", seedError);
      // Continue without seeding if there's an error
    }

    const [subjects, overallProgress] = await Promise.all([
      getSubjects(),
      calculateOverallProgress(),
    ]);

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
        <Navbar title="CS Executive Tracker" />

        <main className="relative z-10 container mx-auto pb-8 md:pb-12">
          {/* Hero Stats Section */}
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="lg:col-span-1 animate-fade-in-up">
              <Countdown />
            </div>
            <div
              className="lg:col-span-2 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <ProgressBar
                progress={overallProgress.progress}
                total={overallProgress.total}
                completed={overallProgress.completed}
              />
            </div>
          </div>

          {/* Subjects Section */}
          <div
            className="mb-12 animate-fade-in-scale"
            style={{ animationDelay: "0.2s" }}
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

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {subjects.map((subject, index) => {
                const subjectProgress = calculateSubjectProgress(subject);

                return (
                  <div
                    key={subject.id}
                    className="animate-slide-in-up"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <SubjectCard
                      id={subject.id}
                      name={subject.name}
                      description={subject.description || "Study subject"}
                      progress={subjectProgress.progress}
                      completed={subjectProgress.completed}
                      total={subjectProgress.total}
                      todayHours={0} // TODO: Calculate per-subject study hours
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-300">Please try refreshing the page</p>
        </div>
      </div>
    );
  }
}
