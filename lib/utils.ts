import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateSubjectProgress(subject: any) {
  const chapterTasks = subject.chapters.length * 4; // Each chapter has 4 tasks (completed + 3 revisions)
  const mockTasks = subject.mockTests.length; // Each mock test has 1 task
  const totalTasks = chapterTasks + mockTasks;

  let completedTasks = 0;

  // Count completed chapter tasks
  subject.chapters.forEach((chapter: any) => {
    const progress = chapter.progress?.[0];
    if (progress) {
      if (progress.completed) completedTasks++;
      if (progress.revision1) completedTasks++;
      if (progress.revision2) completedTasks++;
      if (progress.revision3) completedTasks++;
    }
  });

  // Count completed mock tests
  subject.mockTests.forEach((mock: any) => {
    const progress = mock.progress?.[0];
    if (progress?.completed) completedTasks++;
  });

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return {
    progress: Math.round(progress),
    completed: completedTasks,
    total: totalTasks,
  };
}

export function formatStudyTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.round((totalMinutes % 1) * 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}
