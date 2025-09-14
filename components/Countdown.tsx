"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EXAM_DATE = new Date("2025-12-01");

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const examTime = EXAM_DATE.getTime();
      const difference = examTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card-premium rounded-2xl p-8 card-hover">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-warning rounded-2xl flex items-center justify-center shadow-glow-purple animate-pulse-glow mr-4">
            <div className="text-2xl">⏰</div>
          </div>
          <h2 className="text-2xl font-bold text-white">CS Executive Exam</h2>
        </div>
        <p className="text-muted-foreground">Countdown to your exam date</p>
      </div>

      <div className="text-center">
        {/* Main Countdown Display */}
        <div className="mb-6">
          <div className="text-6xl font-bold gradient-text-warning mb-2 text-shadow animate-pulse">
            {timeLeft.days}
          </div>
          <div className="text-lg text-muted-foreground font-medium">
            Days Remaining
          </div>
        </div>

        {/* Detailed Time */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl font-bold text-white mb-1">
              {timeLeft.hours}
            </div>
            <div className="text-xs text-muted-foreground">Hours</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl font-bold text-white mb-1">
              {timeLeft.minutes}
            </div>
            <div className="text-xs text-muted-foreground">Minutes</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl font-bold text-white mb-1">
              {timeLeft.seconds}
            </div>
            <div className="text-xs text-muted-foreground">Seconds</div>
          </div>
        </div>

        {/* Exam Date */}
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">Exam Date</div>
          <div className="text-lg font-semibold text-white">
            December 1, 2025
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
          <div className="text-sm text-yellow-400 font-medium">
            {timeLeft.days > 30 &&
              "🎯 You have plenty of time! Stay consistent with your studies."}
            {timeLeft.days <= 30 &&
              timeLeft.days > 7 &&
              "⚡ Final month! Time to intensify your preparation."}
            {timeLeft.days <= 7 &&
              timeLeft.days > 0 &&
              "🔥 Last week! Review everything and stay confident."}
            {timeLeft.days === 0 && "🎉 Today's the day! You've got this!"}
          </div>
        </div>
      </div>
    </div>
  );
}
