import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Play,
  Clock,
  BarChart3,
  CheckCircle,
  Star,
  ArrowRight,
  Timer,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div
      className="min-h-screen relative overflow-hidden bg-black"
      style={{ margin: 0, padding: 0 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black" style={{ top: 0 }}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-cyan-900/20"></div>

        {/* Dynamic grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Floating elements */}
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">
                  CS Executive Tracker
                </span>
                <span className="text-xs text-blue-400 font-medium">
                  Premium Study Management
                </span>
              </div>
            </div>
            <Link href="/auth/signin">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                <Play className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pb-32 pt-20" style={{ marginTop: "0" }}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-6xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 animate-fade-in-up">
              <Star className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-blue-300 text-sm font-medium">
                Premium Study Management Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Master Your
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent mt-2">
                CS Executive Journey
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Transform your study routine with our intelligent tracking system.
              Monitor progress, manage time effectively, and achieve exam
              success with data-driven insights.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  className="px-12 py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 group"
                >
                  <Play className="h-5 w-5 mr-3 group-hover:translate-x-1 transition-transform" />
                  Start Tracking Now
                </Button>
              </Link>
              <Link href="/study">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-12 py-6 text-lg border-white/20 text-white hover:bg-white/10 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Timer className="h-5 w-5 mr-3" />
                  Study Timer
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  12+
                </div>
                <div className="text-gray-400">Subjects Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  200+
                </div>
                <div className="text-gray-400">Study Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                  24+
                </div>
                <div className="text-gray-400">Mock Tests</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in-up">
              Everything You Need to
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Ace Your Exam
              </span>
            </h2>
            <p
              className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Comprehensive study management tools designed specifically for CS
              Executive students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="group p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/25">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Smart Timer
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Track your study sessions with our intelligent timer. Build
                consistent habits and monitor your daily progress.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="group p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/25">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Progress Tracking
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Visual progress indicators for each chapter and subject. Never
                lose track of your preparation status.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="group p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/25">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Analytics</h3>
              <p className="text-gray-300 leading-relaxed">
                Detailed insights into your study patterns. Identify strengths
                and areas that need more attention.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className="group p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-yellow-500/25">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Complete Syllabus
              </h3>
              <p className="text-gray-300 leading-relaxed">
                All CS Executive subjects organized with chapters, revisions,
                and mock tests for comprehensive preparation.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              className="group p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/25">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Revision System
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Built-in revision tracking with multiple revision cycles to
                ensure long-term retention of concepts.
              </p>
            </div>

            {/* Feature 6 */}
            <div
              className="group p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-500/25">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Study History
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Comprehensive history of all your study sessions with detailed
                charts and performance metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in-up">
                Ready to Transform Your
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  Study Experience?
                </span>
              </h2>
              <p
                className="text-xl text-gray-300 mb-8 animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                Join thousands of successful CS Executive candidates who have
                achieved their goals with our platform.
              </p>
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  className="px-12 py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 group animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Play className="h-5 w-5 mr-3 group-hover:translate-x-1 transition-transform" />
                  Start Your Journey Today
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">CS Executive Tracker</div>
                <div className="text-gray-400 text-sm">
                  Premium Study Management
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 CS Executive Tracker. Built for success.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
