"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
  total: number;
  completed: number;
}

export function ProgressBar({ progress, total, completed }: ProgressBarProps) {
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
    <div className="card-premium rounded-2xl p-8 card-hover">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mr-4">
            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Syllabus Progress</h2>
        </div>
        <p className="text-muted-foreground">
          Track your overall completion status
        </p>
      </div>

      <div className="space-y-6">
        {/* Main Progress Display */}
        <div className="text-center">
          <div className="text-6xl font-bold gradient-text mb-2 text-shadow">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-muted-foreground">
            Overall Completion
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-2000 ease-out ${getProgressColor(
                  progress
                )} ${getProgressGlow(progress)}`}
                style={{ width: `${progress}%` }}
              >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold gradient-text-success mb-1">
                {completed}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">{total}</div>
              <div className="text-sm text-muted-foreground">Total Tasks</div>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="text-center">
          {progress >= 80 && (
            <div className="text-green-400 font-medium">
              🎉 Excellent progress! You&apos;re almost there!
            </div>
          )}
          {progress >= 50 && progress < 80 && (
            <div className="text-blue-400 font-medium">
              💪 Great work! Keep up the momentum!
            </div>
          )}
          {progress >= 25 && progress < 50 && (
            <div className="text-yellow-400 font-medium">
              🚀 Good start! You&apos;re making steady progress!
            </div>
          )}
          {progress < 25 && (
            <div className="text-purple-400 font-medium">
              🌟 Ready to begin your journey? Let&apos;s start studying!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
