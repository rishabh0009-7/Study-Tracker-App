import { getStudyHistory } from "@/lib/actions";
import { BarChart3, Calendar, Clock, Award } from "lucide-react";
import Link from "next/link";
import { StudyHistoryChart } from "@/components/StudyHistoryChart";
import { Navbar } from "@/components/Navbar";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HistoryPage() {
  // No auth check - directly load study history
  const sessions = await getStudyHistory();

  // Enhanced date grouping with today, yesterday, and date-wise sections
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const sessionsByDate = sessions.reduce((acc, session) => {
    const sessionDate = new Date(session.date);
    const sessionDateOnly = new Date(
      sessionDate.getFullYear(),
      sessionDate.getMonth(),
      sessionDate.getDate()
    );

    let dateKey: string;
    if (sessionDateOnly.getTime() === today.getTime()) {
      dateKey = "today";
    } else if (sessionDateOnly.getTime() === yesterday.getTime()) {
      dateKey = "yesterday";
    } else {
      dateKey = sessionDateOnly.toISOString().split("T")[0];
    }

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(session);
    return acc;
  }, {} as Record<string, typeof sessions>);

  // Calculate daily totals for chart
  const dailyData = Object.entries(sessionsByDate)
    .filter(([key]) => key !== "today" && key !== "yesterday")
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

  // Add today and yesterday data to chart if they exist
  if (sessionsByDate.today) {
    const todayMinutes = sessionsByDate.today.reduce(
      (sum, session) => sum + session.duration,
      0
    );
    dailyData.push({
      date: today.toISOString().split("T")[0],
      hours: todayMinutes / 60,
      sessions: sessionsByDate.today.length,
    });
  }

  if (sessionsByDate.yesterday) {
    const yesterdayMinutes = sessionsByDate.yesterday.reduce(
      (sum, session) => sum + session.duration,
      0
    );
    dailyData.push({
      date: yesterday.toISOString().split("T")[0],
      hours: yesterdayMinutes / 60,
      sessions: sessionsByDate.yesterday.length,
    });
  }

  // Sort chart data by date
  dailyData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const totalHours =
    sessions.reduce((sum, session) => sum + session.duration, 0) / 60;
  const averageHours = sessions.length > 0 ? totalHours / sessions.length : 0;
  const totalSessions = sessions.length;

  // Calculate today&apos;s and yesterday&apos;s stats
  const todayHours = sessionsByDate.today
    ? sessionsByDate.today.reduce((sum, session) => sum + session.duration, 0) /
      60
    : 0;
  const yesterdayHours = sessionsByDate.yesterday
    ? sessionsByDate.yesterday.reduce(
        (sum, session) => sum + session.duration,
        0
      ) / 60
    : 0;
  const todaySessions = sessionsByDate.today?.length || 0;
  const yesterdaySessions = sessionsByDate.yesterday?.length || 0;

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Black background with subtle pattern */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width=&apos;60&apos; height=&apos;60&apos; viewBox=&apos;0 0 60 60&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos;%3E%3Cg fill=&apos;none&apos; fill-rule=&apos;evenodd&apos;%3E%3Cg fill=&apos;%23ffffff&apos; fill-opacity=&apos;0.05&apos;%3E%3Ccircle cx=&apos;30&apos; cy=&apos;30&apos; r=&apos;2&apos;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
      <Navbar
        title="Study History"
        showBackButton={true}
        backHref="/dashboard"
      />

      <main className="relative z-10 container mx-auto px-6 pb-8 md:pb-12">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-scale"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Today&apos;s Study Time */}
          <div className="card-premium rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center shadow-glow-green mx-auto mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold gradient-text-success mb-2">
              {todayHours.toFixed(1)}h
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Today&apos;s Study Time
            </div>
            <div className="text-xs text-muted-foreground">
              {todaySessions} session{todaySessions !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Yesterday&apos;s Study Time */}
          <div className="card-premium rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center shadow-glow mx-auto mb-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold gradient-text-accent mb-2">
              {yesterdayHours.toFixed(1)}h
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Yesterday&apos;s Study Time
            </div>
            <div className="text-xs text-muted-foreground">
              {yesterdaySessions} session{yesterdaySessions !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Total Study Time */}
          <div className="card-premium rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold gradient-text mb-2">
              {totalHours.toFixed(1)}h
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Total Study Time
            </div>
            <div className="text-xs text-muted-foreground">All time</div>
          </div>

          {/* Total Sessions */}
          <div className="card-premium rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-warning rounded-xl flex items-center justify-center shadow-glow-purple mx-auto mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold gradient-text-warning mb-2">
              {totalSessions}
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Total Sessions
            </div>
            <div className="text-xs text-muted-foreground">
              {averageHours.toFixed(1)}h avg
            </div>
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

          {/* Date-wise Study Sessions */}
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
                  Study Sessions by Date
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
                <div className="space-y-8">
                  {/* Today&apos;s Sessions */}
                  {sessionsByDate.today && (
                    <div
                      className="animate-slide-in-up"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center shadow-glow-green mr-3">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white">Today</h4>
                        <div className="ml-auto text-sm text-muted-foreground">
                          {sessionsByDate.today.reduce(
                            (sum, session) => sum + session.duration,
                            0
                          ) / 60}{" "}
                          hours
                        </div>
                      </div>
                      <div className="space-y-3">
                        {sessionsByDate.today.map((session, index) => (
                          <div
                            key={session.id}
                            className="card-premium rounded-xl p-4 border border-green-500/20 bg-green-500/5 animate-slide-in-up"
                            style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center shadow-glow-green">
                                  <Clock className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-semibold text-white">
                                    {new Date(session.date).toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Session {index + 1}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold gradient-text-success">
                                  {(session.duration / 60).toFixed(1)}h
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {session.duration} min
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Yesterday&apos;s Sessions */}
                  {sessionsByDate.yesterday && (
                    <div
                      className="animate-slide-in-up"
                      style={{ animationDelay: "0.6s" }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center shadow-glow mr-3">
                          <Calendar className="h-4 w-4 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white">
                          Yesterday
                        </h4>
                        <div className="ml-auto text-sm text-muted-foreground">
                          {sessionsByDate.yesterday.reduce(
                            (sum, session) => sum + session.duration,
                            0
                          ) / 60}{" "}
                          hours
                        </div>
                      </div>
                      <div className="space-y-3">
                        {sessionsByDate.yesterday.map((session, index) => (
                          <div
                            key={session.id}
                            className="card-premium rounded-xl p-4 border border-white/10 animate-slide-in-up"
                            style={{ animationDelay: `${0.7 + index * 0.05}s` }}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center shadow-glow">
                                  <Clock className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-semibold text-white">
                                    {new Date(session.date).toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Session {index + 1}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold gradient-text-accent">
                                  {(session.duration / 60).toFixed(1)}h
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {session.duration} min
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other Dates */}
                  {Object.entries(sessionsByDate)
                    .filter(([key]) => key !== "today" && key !== "yesterday")
                    .sort(
                      ([a], [b]) =>
                        new Date(b).getTime() - new Date(a).getTime()
                    )
                    .map(([date, daySessions], dateIndex) => (
                      <div
                        key={date}
                        className="animate-slide-in-up"
                        style={{ animationDelay: `${0.8 + dateIndex * 0.1}s` }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow mr-3">
                            <Calendar className="h-4 w-4 text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-white">
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </h4>
                          <div className="ml-auto text-sm text-muted-foreground">
                            {daySessions.reduce(
                              (sum, session) => sum + session.duration,
                              0
                            ) / 60}{" "}
                            hours
                          </div>
                        </div>
                        <div className="space-y-3">
                          {daySessions.map((session, sessionIndex) => (
                            <div
                              key={session.id}
                              className="card-premium rounded-xl p-4 border border-white/10 animate-slide-in-up"
                              style={{
                                animationDelay: `${
                                  0.9 + dateIndex * 0.1 + sessionIndex * 0.05
                                }s`,
                              }}
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                                    <Clock className="h-4 w-4 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white">
                                      {new Date(
                                        session.date
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      Session {sessionIndex + 1}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold gradient-text">
                                    {(session.duration / 60).toFixed(1)}h
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {session.duration} min
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
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
