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
  return (
    <Link href={`/subjects/${id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{name}</CardTitle>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completed} completed</span>
              <span>{total} total</span>
            </div>
          </div>
          {todayHours > 0 && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{todayHours}h studied today</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
