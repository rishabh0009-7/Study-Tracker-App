"use client";

import { useTimer } from "@/contexts/TimerContext";
import { formatStudyTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface StudyTimerProps {
  todayTotalHours: number;
}

export function StudyTimer({ todayTotalHours }: StudyTimerProps) {
  const { isRunning, time, startTimer, pauseTimer, stopTimer } = useTimer();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mr-4">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Study Timer</h2>
        </div>
        <p className="text-muted-foreground">
          Focus on your studies with our premium timer
        </p>
      </div>

      <div className="text-center mb-8">
        <div className="relative inline-block max-w-full overflow-hidden">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold gradient-text mb-4 text-shadow break-all">
            {formatTime(time)}
          </div>
          <div className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold text-white/10 blur-sm break-all">
            {formatTime(time)}
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <div
            className={`w-2 h-2 rounded-full ${
              isRunning
                ? "bg-green-400 animate-pulse shadow-glow-green"
                : "bg-gray-400"
            }`}
          ></div>
          <span className="text-sm font-medium">
            {isRunning ? "Study session in progress..." : "Ready to study"}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        {!isRunning ? (
          <Button
            onClick={startTimer}
            size="lg"
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
          >
            <Clock className="h-5 w-5 mr-3" />
            Start Session
          </Button>
        ) : (
          <Button
            onClick={pauseTimer}
            variant="outline"
            size="lg"
            className="px-8 py-4 border-white/20 hover:bg-white/10 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <Clock className="h-5 w-5 mr-3" />
            Pause
          </Button>
        )}
        <Button
          onClick={stopTimer}
          variant="destructive"
          size="lg"
          className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={time === 0}
        >
          <Clock className="h-5 w-5 mr-3" />
          Stop
        </Button>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <Clock className="h-4 w-4 text-green-400" />
          <span className="text-sm text-muted-foreground">
            Today&apos;s total:
          </span>
          <span className="text-lg font-bold gradient-text-success">
            {formatStudyTime(todayTotalHours * 60)}
          </span>
        </div>
      </div>
    </div>
  );
}
