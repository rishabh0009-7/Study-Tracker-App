import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, Play } from "lucide-react";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Black Background with subtle pattern */}
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
      <nav className="relative z-10 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                CS Executive Tracker
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <SignInButton>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-20 md:pt-32 md:pb-32">
        <div className="container mx-auto">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up">
              CS Executive
              <span className="block text-blue-400 mt-2">Study Tracker</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto animate-fade-in-scale"
              style={{ animationDelay: "0.2s" }}
            >
              Track your progress, manage study time, and ace your CS Executive
              exam with our professional study management platform
            </p>

            {/* Start Button */}
            <div
              className="animate-fade-in-scale"
              style={{ animationDelay: "0.4s" }}
            >
              <SignUpButton>
                <Button
                  size="lg"
                  className="px-8 py-4 md:px-12 md:py-6 text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 btn-premium"
                >
                  <Play className="h-5 w-5 md:h-6 md:w-6 mr-3" />
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
