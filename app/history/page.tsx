import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStudyHistory } from "@/lib/actions";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft, BarChart3, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudyHistoryChart } from "@/components/StudyHistoryChart";

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Study History
              </h1>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Your Study Analytics
            </h2>
          </div>
          <p className="text-center text-gray-600">
            Track your study patterns and progress over time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Study Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {totalHours.toFixed(1)}h
              </div>
              <p className="text-xs text-gray-600">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Average Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {averageHours.toFixed(1)}h
              </div>
              <p className="text-xs text-gray-600">Per session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {totalSessions}
              </div>
              <p className="text-xs text-gray-600">Completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Study Hours Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StudyHistoryChart data={dailyData} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Recent Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No study sessions recorded yet.</p>
                    <p className="text-sm">
                      Start your first session to see your history here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sessions.slice(0, 10).map((session) => (
                      <div
                        key={session.id}
                        className="flex justify-between items-center py-2 border-b last:border-b-0"
                      >
                        <div>
                          <div className="font-medium">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(session.date).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-blue-600">
                            {(session.duration / 60).toFixed(1)}h
                          </div>
                          <div className="text-sm text-gray-600">
                            {session.duration} minutes
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
