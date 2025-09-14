import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  BarChart3,
  Target,
  Star,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  Zap,
  Shield,
  TrendingUp,
  Calendar,
  Brain,
  Trophy,
  Sparkles,
} from "lucide-react";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-accent rounded-full opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-success rounded-full opacity-25 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-warning rounded-full opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
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
                <Button className="bg-gradient-primary hover:shadow-glow btn-premium text-white">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight animate-slide-in-up">
              CS Executive
              <span className="block gradient-text">Study Tracker</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed animate-fade-in-scale"
              style={{ animationDelay: "0.2s" }}
            >
              Track your progress, manage study time, and ace your CS Executive
              exam
            </p>

            {/* Start Button */}
            <div
              className="animate-fade-in-scale"
              style={{ animationDelay: "0.4s" }}
            >
              <SignUpButton>
                <Button
                  size="lg"
                  className="px-12 py-6 text-lg bg-gradient-success hover:shadow-glow-green btn-premium text-white font-semibold rounded-2xl"
                >
                  <Play className="h-6 w-6 mr-3" />
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
