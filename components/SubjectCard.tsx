"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock } from "lucide-react";

interface SubjectCardProps {
  id: string;
  name: string;
  description?: string;
  progress: number;
  completed: number;
  total: number;
  todayHours?: number;
}

export function SubjectCard({
  id,
  name,
  description,
  progress,
  completed,
  total,
  todayHours = 0,
}: SubjectCardProps) {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-gradient-success";
    if (progress >= 50) return "bg-gradient-accent";
    if (progress >= 25) return "bg-gradient-warning";
    return "bg-gradient-to-r from-gray-500 to-gray-600";
  };

  const getProgressGlow = (progress: number) => {
    if (progress >= 80) return "shadow-glow-green";
    if (progress >= 50) return "shadow-glow";
    if (progress >= 25) return "shadow-glow-purple";
    return "";
  };

  return (
    <Link href={`/subjects/${id}`} className="group">
      <div className="card-premium rounded-2xl p-6 card-hover btn-premium h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                {name}
              </h3>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Progress
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold gradient-text">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(
                    progress
                  )} ${getProgressGlow(progress)}`}
                  style={{ width: `${progress}%` }}
                >
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-muted-foreground">
                  {completed} completed
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                <span className="text-muted-foreground">{total} total</span>
              </div>
            </div>
          </div>

          {/* Today's Study Time */}
          {todayHours > 0 && (
            <div className="flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Clock className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-muted-foreground">
                {todayHours}h studied today
              </span>
            </div>
          )}

          {/* Action Indicator */}
          <div className="flex items-center justify-center text-sm text-muted-foreground group-hover:text-white transition-colors duration-300">
            <span>View Details</span>
            <BookOpen className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
