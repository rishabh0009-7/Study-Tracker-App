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

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Dashboard() {
  return <DashboardContent />;
}

async function DashboardContent() {
  let user = null;
  let subjects = [];
  let overallProgress = { progress: 0, completed: 0, total: 0 };
  let isDatabaseConnected = true;

  try {
    console.log("DashboardContent: Starting to load user data...");

    // Try to get user and data from database
    try {
      user = await getOrCreateUser();
      console.log("DashboardContent: User loaded successfully:", user.email);

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
      }

      // Load subjects and progress
      [subjects, overallProgress] = await Promise.all([
        getSubjects(),
        calculateOverallProgress(),
      ]);
    } catch (dbError) {
      console.error("DashboardContent: Database error:", dbError);
      isDatabaseConnected = false;

      // Use demo data when database is unavailable
      subjects = getDemoSubjects();
      overallProgress = { progress: 0, completed: 0, total: 480 };
    }

    // Show database connection error but still render the dashboard
    if (!isDatabaseConnected) {
      return (
        <DashboardWithError
          subjects={subjects}
          overallProgress={overallProgress}
        />
      );
    }

    return (
      <DashboardUI subjects={subjects} overallProgress={overallProgress} />
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    // Return demo dashboard on any error
    return (
      <DashboardWithError
        subjects={getDemoSubjects()}
        overallProgress={{ progress: 0, completed: 0, total: 480 }}
      />
    );
  }
}

function DashboardUI({
  subjects,
  overallProgress,
}: {
  subjects: any[];
  overallProgress: { progress: number; completed: number; total: number };
}) {
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
            Track your progress and stay motivated on your CS Executive journey
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
              <span className="text-gray-300 font-medium">Active Subjects</span>
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
}

function DashboardWithError({
  subjects,
  overallProgress,
}: {
  subjects: any[];
  overallProgress: { progress: number; completed: number; total: number };
}) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Database error banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-red-900/90 backdrop-blur-sm border-b border-red-500/30 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <p className="text-red-100 text-sm font-medium">
              Database connection issue - showing demo data. Your progress will
              be saved once connection is restored.
            </p>
          </div>
          <a
            href="/api/debug"
            className="text-red-200 hover:text-white text-sm underline"
          >
            Debug Info
          </a>
        </div>
      </div>

      {/* Rest of the dashboard with padding for error banner */}
      <div className="pt-12">
        <DashboardUI subjects={subjects} overallProgress={overallProgress} />
      </div>
    </div>
  );
}

// Demo data for when database is unavailable
function getDemoSubjects() {
  return [
    {
      id: "demo-1",
      name: "Jurisprudence, Interpretation and General Laws",
      description: "Legal principles and interpretation",
      chapters: [
        {
          id: "ch1",
          name: "Introduction to Jurisprudence",
          order: 1,
          progress: [],
        },
        { id: "ch2", name: "Sources of Law", order: 2, progress: [] },
      ],
      mockTests: [
        { id: "mt1", name: "Mock Test 1", order: 1, progress: [] },
        { id: "mt2", name: "Mock Test 2", order: 2, progress: [] },
      ],
      _count: { chapters: 2, mockTests: 2 },
    },
    {
      id: "demo-2",
      name: "Company Law",
      description: "Corporate laws and regulations",
      chapters: [
        { id: "ch3", name: "Formation of Company", order: 1, progress: [] },
        { id: "ch4", name: "Share Capital", order: 2, progress: [] },
      ],
      mockTests: [
        { id: "mt3", name: "Mock Test 1", order: 1, progress: [] },
        { id: "mt4", name: "Mock Test 2", order: 2, progress: [] },
      ],
      _count: { chapters: 2, mockTests: 2 },
    },
    {
      id: "demo-3",
      name: "Setting up of Business Entities and Closure",
      description: "Business formation and closure procedures",
      chapters: [
        {
          id: "ch5",
          name: "Types of Business Entities",
          order: 1,
          progress: [],
        },
        { id: "ch6", name: "Closure Procedures", order: 2, progress: [] },
      ],
      mockTests: [
        { id: "mt5", name: "Mock Test 1", order: 1, progress: [] },
        { id: "mt6", name: "Mock Test 2", order: 2, progress: [] },
      ],
      _count: { chapters: 2, mockTests: 2 },
    },
    {
      id: "demo-4",
      name: "Tax Laws",
      description: "Direct and indirect taxation",
      chapters: [
        { id: "ch7", name: "Income Tax Basics", order: 1, progress: [] },
        { id: "ch8", name: "GST Overview", order: 2, progress: [] },
      ],
      mockTests: [
        { id: "mt7", name: "Mock Test 1", order: 1, progress: [] },
        { id: "mt8", name: "Mock Test 2", order: 2, progress: [] },
      ],
      _count: { chapters: 2, mockTests: 2 },
    },
    {
      id: "demo-5",
      name: "Environmental, Social and Governance (ESG)",
      description: "Sustainability and corporate responsibility",
      chapters: [
        {
          id: "ch9",
          name: "Environmental Regulations",
          order: 1,
          progress: [],
        },
        { id: "ch10", name: "Corporate Governance", order: 2, progress: [] },
      ],
      mockTests: [
        { id: "mt9", name: "Mock Test 1", order: 1, progress: [] },
        { id: "mt10", name: "Mock Test 2", order: 2, progress: [] },
      ],
      _count: { chapters: 2, mockTests: 2 },
    },
    {
      id: "demo-6",
      name: "Corporate and Management Accounting",
      description: "Financial and management accounting principles",
      chapters: [
        { id: "ch11", name: "Financial Statements", order: 1, progress: [] },
        { id: "ch12", name: "Cost Accounting", order: 2, progress: [] },
      ],
      mockTests: [
        { id: "mt11", name: "Mock Test 1", order: 1, progress: [] },
        { id: "mt12", name: "Mock Test 2", order: 2, progress: [] },
      ],
      _count: { chapters: 2, mockTests: 2 },
    },
  ];
}
