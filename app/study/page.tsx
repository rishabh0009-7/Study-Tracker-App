import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { StudyTimer } from "@/components/StudyTimer";
import { getTodayStudyHours } from "@/lib/actions";
import { formatStudyTime } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";

export default async function StudyPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const todayHours = await getTodayStudyHours();
  const todayMinutes = todayHours * 60; // Convert to minutes for formatting

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

      <header className="relative z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
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
                <h1 className="text-3xl font-bold text-white">Study Timer</h1>
                <p className="text-sm text-gray-300">
                  Focus and track your study sessions
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

      <main className="relative z-10 container mx-auto pt-24 pb-8 md:pt-28 md:pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 md:mb-12 animate-fade-in-scale">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-2xl flex items-center justify-center animate-pulse mr-4">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Focus on Your Studies
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Start a study session and track your time to build consistent
              study habits with our premium timer.
            </p>
          </div>

          {/* Study Timer */}
          <div
            className="mb-8 md:mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <StudyTimer todayTotalHours={todayHours} />
          </div>

          {/* Stats and Tips Grid */}
          <div
            className="grid sm:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 animate-fade-in-scale"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Today's Progress Card */}
            <div className="card-premium rounded-2xl p-8 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-accent rounded-2xl flex items-center justify-center shadow-glow mr-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Today's Progress
                </h3>
              </div>
              <div className="text-5xl font-bold gradient-text-accent mb-4">
                {formatStudyTime(todayMinutes)}
              </div>
              <p className="text-muted-foreground text-lg">
                Total study time today
              </p>

              {/* Progress Ring */}
              <div className="mt-6 flex justify-center">
                <div className="w-24 h-24 relative">
                  <svg
                    className="w-24 h-24 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(todayHours / 8) * 251.2} 251.2`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#4facfe" />
                        <stop offset="100%" stopColor="#00f2fe" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      8h Goal
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Study Tips Card */}
            <div className="card-premium rounded-2xl p-8 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-success rounded-2xl flex items-center justify-center shadow-glow-green mr-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Study Tips</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    Take 5-minute breaks every 25 minutes
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    Stay hydrated and well-rested
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    Review previous chapters regularly
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    Practice mock tests weekly
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <div
            className="text-center animate-fade-in-scale"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/history"
              className="inline-flex items-center px-8 py-4 bg-gradient-primary hover:shadow-glow btn-premium text-white font-semibold rounded-2xl transition-all duration-300"
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              View Study History
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
