"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatStudyTime } from "@/lib/utils";
import { Play, Pause, Square } from "lucide-react";

interface StudyTimerProps {
  onSessionComplete: (duration: number) => void;
  todayTotalHours: number;
}

export function StudyTimer({
  onSessionComplete,
  todayTotalHours,
}: StudyTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (time > 0) {
      onSessionComplete(time);
      setTime(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-6xl font-mono font-bold text-primary mb-2">
            {formatTime(time)}
          </div>
          <div className="text-sm text-muted-foreground">
            {isRunning ? "Study session in progress..." : "Ready to study"}
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          {!isRunning ? (
            <Button onClick={handleStart} size="lg" className="px-8">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              variant="outline"
              size="lg"
              className="px-8"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          )}
          <Button
            onClick={handleStop}
            variant="destructive"
            size="lg"
            className="px-8"
            disabled={time === 0}
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Today's total: {formatStudyTime(todayTotalHours * 60)}
        </div>
      </CardContent>
    </Card>
  );
}
