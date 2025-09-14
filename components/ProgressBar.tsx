"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
  total: number;
  completed: number;
}

export function ProgressBar({ progress, total, completed }: ProgressBarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Syllabus Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span className="font-medium">{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{completed} completed</span>
            <span>{total} total tasks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
