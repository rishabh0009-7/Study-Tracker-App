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
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-6xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in-scale">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">
                Premium Study Management Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 leading-tight animate-slide-in-up">
              Master Your
              <span className="block gradient-text">CS Executive</span>
              <span className="block">Exam Journey</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-scale"
              style={{ animationDelay: "0.2s" }}
            >
              The most advanced study tracking platform designed specifically
              for CS Executive candidates. Track progress, manage time, and
              achieve excellence with our premium features.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6 animate-fade-in-scale">
              Why Choose Our Platform?
            </h2>
            <p
              className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-scale"
              style={{ animationDelay: "0.1s" }}
            >
              Built with cutting-edge technology and designed for maximum
              efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-premium rounded-2xl p-8 card-hover animate-slide-in-up">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Smart Subject Tracking
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Advanced progress tracking across all 5 CS Executive subjects
                with intelligent chapter management and completion analytics.
              </p>
              <div className="flex items-center text-blue-400 font-medium">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="card-premium rounded-2xl p-8 card-hover animate-slide-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center shadow-glow-green mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Premium Study Timer
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Focus-enhancing timer with session tracking, break reminders,
                and detailed time analytics for optimal study habits.
              </p>
              <div className="flex items-center text-green-400 font-medium">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className="card-premium rounded-2xl p-8 card-hover animate-slide-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center shadow-glow mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Advanced Analytics
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Comprehensive progress visualization with detailed insights,
                performance trends, and personalized recommendations.
              </p>
              <div className="flex items-center text-cyan-400 font-medium">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* Feature 4 */}
            <div
              className="card-premium rounded-2xl p-8 card-hover animate-slide-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-16 h-16 bg-gradient-warning rounded-2xl flex items-center justify-center shadow-glow-purple mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Mock Test Mastery
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Track and analyze mock test performance with detailed scoring,
                weak area identification, and improvement suggestions.
              </p>
              <div className="flex items-center text-yellow-400 font-medium">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* Feature 5 */}
            <div
              className="card-premium rounded-2xl p-8 card-hover animate-slide-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                AI-Powered Insights
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Smart recommendations based on your study patterns, performance
                data, and exam requirements for optimal preparation.
              </p>
              <div className="flex items-center text-blue-400 font-medium">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* Feature 6 */}
            <div
              className="card-premium rounded-2xl p-8 card-hover animate-slide-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center shadow-glow-green mb-6">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Achievement System
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Gamified learning experience with badges, milestones, and
                rewards to keep you motivated throughout your journey.
              </p>
              <div className="flex items-center text-green-400 font-medium">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <div className="card-premium rounded-3xl p-16 text-center max-w-4xl mx-auto animate-fade-in-scale">
            <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow mx-auto mb-8">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Ace Your CS Executive Exam?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of successful candidates who have transformed their
              study habits with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <SignUpButton>
                <Button
                  size="lg"
                  className="px-12 py-6 text-lg bg-gradient-success hover:shadow-glow-green btn-premium text-white font-semibold rounded-2xl"
                >
                  Start Your Journey
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Button>
              </SignUpButton>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Free 14-day trial • No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                CS Executive Tracker
              </span>
            </div>
            <p className="text-muted-foreground mb-8">
              Empowering CS Executive candidates with premium study management
              tools
            </p>
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
