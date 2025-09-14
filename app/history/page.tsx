import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStudyHistory } from "@/lib/actions";
import { UserButton } from "@clerk/nextjs";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Clock,
  TrendingUp,
  Target,
  Award,
} from "lucide-react";
import Link from "next/link";
import { StudyHistoryChart } from "@/components/StudyHistoryChart";
import { MobileNav } from "@/components/MobileNav";

export default async function HistoryPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const sessions = await getStudyHistory();

  // Group sessions by date
  const sessionsByDate = sessions.reduce((acc, session) => {
    const date = new Date(session.date).toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {} as Record<string, typeof sessions>);

  // Calculate daily totals
  const dailyData = Object.entries(sessionsByDate)
    .map(([date, daySessions]) => {
      const totalMinutes = daySessions.reduce(
        (sum, session) => sum + session.duration,
        0
      );
      return {
        date,
        hours: totalMinutes / 60,
        sessions: daySessions.length,
      };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const totalHours =
    sessions.reduce((sum, session) => sum + session.duration, 0) / 60;
  const averageHours = sessions.length > 0 ? totalHours / sessions.length : 0;
  const totalSessions = sessions.length;

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
                <h1 className="text-3xl font-bold text-white">Study History</h1>
                <p className="text-sm text-gray-300">
                  Track your study patterns and progress
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

      <main className="relative z-10 container mx-auto px-6 pt-24 pb-8 md:pt-28 md:pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-scale">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mr-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Your Study Analytics
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Track your study patterns, progress over time, and gain insights
            into your learning journey.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in-scale"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="card-premium rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center shadow-glow mx-auto mb-6">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold gradient-text-accent mb-2">
              {totalHours.toFixed(1)}h
            </div>
            <div className="text-lg text-muted-foreground mb-2">
              Total Study Time
            </div>
            <div className="text-sm text-muted-foreground">All time</div>
          </div>

          <div className="card-premium rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center shadow-glow-green mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold gradient-text-success mb-2">
              {averageHours.toFixed(1)}h
            </div>
            <div className="text-lg text-muted-foreground mb-2">
              Average Session
            </div>
            <div className="text-sm text-muted-foreground">Per session</div>
          </div>

          <div className="card-premium rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-warning rounded-2xl flex items-center justify-center shadow-glow-purple mx-auto mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold gradient-text-warning mb-2">
              {totalSessions}
            </div>
            <div className="text-lg text-muted-foreground mb-2">
              Total Sessions
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>

        {/* Charts and Data */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Study Hours Chart */}
          <div
            className="lg:col-span-2 animate-slide-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="card-premium rounded-2xl p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mr-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Study Hours Over Time
                </h3>
              </div>
              <StudyHistoryChart data={dailyData} />
            </div>
          </div>

          {/* Recent Sessions */}
          <div
            className="lg:col-span-2 animate-slide-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="card-premium rounded-2xl p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-accent rounded-2xl flex items-center justify-center shadow-glow mr-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Recent Sessions
                </h3>
              </div>
              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-warning rounded-2xl flex items-center justify-center shadow-glow-purple mx-auto mb-6">
                    <Clock className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    No Study Sessions Yet
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Start your first study session to see your history here.
                  </p>
                  <Link
                    href="/study"
                    className="inline-flex items-center px-6 py-3 bg-gradient-primary hover:shadow-glow btn-premium text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    <Clock className="h-5 w-5 mr-2" />
                    Start Studying
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.slice(0, 10).map((session, index) => (
                    <div
                      key={session.id}
                      className="card-premium rounded-xl p-6 border border-white/10 animate-slide-in-up"
                      style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-success rounded-xl flex items-center justify-center shadow-glow-green">
                            <Clock className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              {new Date(session.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(session.date).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold gradient-text-success">
                            {(session.duration / 60).toFixed(1)}h
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {session.duration} minutes
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
