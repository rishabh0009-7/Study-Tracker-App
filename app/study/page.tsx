import { StudyTimer } from "@/components/StudyTimer";
import { getTodayStudyHours } from "@/lib/actions";
import { formatStudyTime } from "@/lib/utils";
import { Clock, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default async function StudyPage() {
  // No auth check - directly load study data
  const todayHours = await getTodayStudyHours();
  const todayMinutes = todayHours * 60; // Convert to minutes for formatting

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

        {/* Enhanced floating elements with timer theme */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-float blur-xl"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-blue-500 rounded-full opacity-25 animate-float blur-lg"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-cyan-600 rounded-full opacity-15 animate-float blur-lg"
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
      <Navbar title="Study Timer" showBackButton={true} backHref="/dashboard" />

      <main className="relative z-10 container mx-auto pb-8 md:pb-12 pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
              <Clock className="h-4 w-4 text-blue-400 mr-2 animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">
                Focus Mode Active
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Master Your
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent mt-2">
                Study Time
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Transform your productivity with our intelligent study timer.
              Build consistent habits and achieve your academic goals.
            </p>
          </div>

          {/* Study Timer */}
          <div
            className="mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-2xl">
              <StudyTimer todayTotalHours={todayHours} />
            </div>
          </div>

          {/* Stats and Tips Grid */}
          <div
            className="grid sm:grid-cols-2 gap-8 mb-12 animate-fade-in-scale"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Today's Progress Card */}
            <div className="group p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Today's Progress
                  </h3>
                  <p className="text-gray-400">Your daily achievement</p>
                </div>
              </div>
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-4">
                {formatStudyTime(todayMinutes)}
              </div>
              <p className="text-gray-300 text-lg mb-6">
                Total focused study time today
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
            <div className="group p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Study Tips
                  </h3>
                  <p className="text-gray-400">Maximize your efficiency</p>
                </div>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-blue-400/50"></div>
                  <span className="text-gray-300 text-lg leading-relaxed">
                    Take 5-minute breaks every 25 minutes (Pomodoro Technique)
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
                  <span className="text-gray-300 text-lg leading-relaxed">
                    Stay hydrated and maintain proper posture
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-blue-400/50"></div>
                  <span className="text-gray-300 text-lg leading-relaxed">
                    Review and revise previous chapters regularly
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
                  <span className="text-gray-300 text-lg leading-relaxed">
                    Practice mock tests weekly to track progress
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className="text-center animate-fade-in-scale"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/history">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 group">
                  <BarChart3 className="h-5 w-5 mr-3 inline group-hover:translate-x-1 transition-transform" />
                  View Study History
                </button>
              </Link>
              <Link href="/subjects">
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 group">
                  <Clock className="h-5 w-5 mr-3 inline group-hover:rotate-12 transition-transform" />
                  Browse Subjects
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
