import { Countdown } from "@/components/Countdown";
import { ProgressBar } from "@/components/ProgressBar";
import { SubjectCard } from "@/components/SubjectCard";
import { getSubjects, calculateOverallProgress } from "@/lib/actions";
import { calculateSubjectProgress } from "@/lib/utils";
import { seedDatabase } from "@/lib/seed";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Dashboard() {
  try {
    return <DashboardContent />;
  } catch (error) {
    console.error("Dashboard component error:", error);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Dashboard Error
          </h1>
          <p className="text-gray-300 mb-6">
            There was an error loading your dashboard. This is likely a database
            connection issue.
          </p>
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6 text-left">
            <ul className="text-red-300 text-sm space-y-2">
              <li>• Database server may be paused or unreachable</li>
              <li>• Server configuration problems</li>
              <li>• Network connectivity issues</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 border border-gray-600/30 rounded-xl p-4 mb-6">
            <p className="text-gray-400 text-xs font-mono break-all">
              Error: {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors mr-4"
            >
              Retry Dashboard
            </button>
            <a
              href="/api/debug"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              View Debug Info
            </a>
          </div>
        </div>
      </div>
    );
  }
}

async function DashboardContent() {
  try {
    // Initialize database and seed if needed
    try {
      const existingSubjects = await prisma.subject.findMany();

      if (existingSubjects.length === 0) {
        await seedDatabase();
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
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-black">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-cyan-900/20"></div>

          {/* Dynamic grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          {/* Enhanced floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-float blur-xl"></div>
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-cyan-500 rounded-full opacity-25 animate-float blur-lg"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-12 h-12 bg-blue-600 rounded-full opacity-15 animate-float blur-lg"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-float blur-xl"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-pulse blur-2xl"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* Navigation */}
        <Navbar title="CS Executive Tracker" />

        <main className="relative z-10 container mx-auto pb-8 md:pb-12 pt-20">
          {/* Welcome Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <span className="text-blue-300 text-sm font-medium">
                Welcome Back! 🚀
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Your Study
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Track your progress and stay motivated on your CS Executive
              journey
            </p>
          </div>

          {/* Hero Stats Section */}
          <div
            className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="lg:col-span-1">
              <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <Countdown />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                <ProgressBar
                  progress={overallProgress.progress}
                  total={overallProgress.total}
                  completed={overallProgress.completed}
                />
              </div>
            </div>
          </div>

          {/* Subjects Section */}
          <div
            className="mb-12 animate-fade-in-scale"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Your Study
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Subjects
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Master each subject with our comprehensive tracking system
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl border border-cyan-500/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mr-3">
                  {subjects.length}
                </div>
                <span className="text-gray-300 font-medium">
                  Active Subjects
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {subjects.map((subject, index) => {
                const subjectProgress = calculateSubjectProgress(subject);

                return (
                  <div
                    key={subject.id}
                    className="group animate-fade-in-up hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 h-full">
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
        <div className="text-center max-w-2xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Dashboard Loading Error
          </h1>
          <p className="text-gray-300 mb-6">
            There was an error loading your dashboard content. This is likely a
            database connection issue.
          </p>
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6 text-left">
            <ul className="text-red-300 text-sm space-y-2">
              <li>• Database connection problems</li>
              <li>• Data loading issues</li>
              <li>• Server configuration errors</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 border border-gray-600/30 rounded-xl p-4 mb-6">
            <p className="text-gray-400 text-xs font-mono break-all">
              Error: {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors mr-4"
            >
              Retry Dashboard
            </button>
            <a
              href="/api/debug"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              View Debug Info
            </a>
          </div>
        </div>
      </div>
    );
  }
}
