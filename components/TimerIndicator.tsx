"use client";

import { useTimer } from "@/contexts/TimerContext";
import { Clock, Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatStudyTime } from "@/lib/utils";

export function TimerIndicator() {
  const { isRunning, time, startTimer, pauseTimer, stopTimer } = useTimer();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (time === 0 && !isRunning) {
    return null; // Don't show if timer hasn't been started
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-up">
      <div className="card-premium rounded-2xl p-4 shadow-glow border border-white/20 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          {/* Timer Display */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-mono font-bold gradient-text">
                {formatTime(time)}
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isRunning
                      ? "bg-green-400 animate-pulse shadow-glow-green"
                      : "bg-yellow-400"
                  }`}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {isRunning ? "Running" : "Paused"}
                </span>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-2">
            {!isRunning ? (
              <Button
                onClick={startTimer}
                size="sm"
                className="px-3 py-2 bg-gradient-success hover:shadow-glow-green btn-premium text-white rounded-lg"
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={pauseTimer}
                size="sm"
                variant="outline"
                className="px-3 py-2 border-white/20 hover:bg-white/10 text-white rounded-lg"
              >
                <Pause className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={stopTimer}
              size="sm"
              variant="destructive"
              className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg text-white rounded-lg"
            >
              <Square className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
