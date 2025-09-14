"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export async function getOrCreateUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    // Get user info from Clerk
    const { currentUser } = await import("@clerk/nextjs/server");
    const clerkUserData = await currentUser();

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUserData?.emailAddresses[0]?.emailAddress || "",
      },
    });
  }

  return user;
}

export async function getSubjects() {
  const user = await getOrCreateUser();

  const subjects = await prisma.subject.findMany({
    where: { userId: user.id },
    include: {
      chapters: {
        orderBy: { order: "asc" },
      },
      mockTests: {
        orderBy: { order: "asc" },
      },
      _count: {
        select: {
          chapters: true,
          mockTests: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return subjects;
}

export async function getSubjectWithProgress(subjectId: string) {
  const user = await getOrCreateUser();

  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId,
      userId: user.id,
    },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          progress: {
            where: { userId: user.id },
          },
        },
      },
      mockTests: {
        orderBy: { order: "asc" },
        include: {
          progress: {
            where: { userId: user.id },
          },
        },
      },
    },
  });

  return subject;
}

export async function updateChapterProgress(
  chapterId: string,
  field: "completed" | "revision1" | "revision2" | "revision3",
  value: boolean
) {
  const user = await getOrCreateUser();

  await prisma.chapterProgress.upsert({
    where: {
      userId_chapterId: {
        userId: user.id,
        chapterId,
      },
    },
    update: {
      [field]: value,
    },
    create: {
      userId: user.id,
      chapterId,
      [field]: value,
    },
  });

  revalidatePath("/subjects");
  revalidatePath("/dashboard");
}

export async function updateMockProgress(
  mockTestId: string,
  completed: boolean
) {
  const user = await getOrCreateUser();

  await prisma.mockProgress.upsert({
    where: {
      userId_mockTestId: {
        userId: user.id,
        mockTestId,
      },
    },
    update: {
      completed,
    },
    create: {
      userId: user.id,
      mockTestId,
      completed,
    },
  });

  revalidatePath("/subjects");
  revalidatePath("/dashboard");
}

export async function createStudySession(duration: number) {
  const user = await getOrCreateUser();

  // Convert seconds to minutes (duration is passed in seconds from timer)
  const durationInMinutes = Math.round(duration / 60);

  await prisma.studySession.create({
    data: {
      userId: user.id,
      duration: durationInMinutes,
    },
  });

  revalidatePath("/study");
  revalidatePath("/history");
}

export async function getTodayStudyHours() {
  const user = await getOrCreateUser();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sessions = await prisma.studySession.findMany({
    where: {
      userId: user.id,
      date: {
        gte: today,
      },
    },
  });

  const totalMinutes = sessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  return totalMinutes / 60; // Convert to hours
}

export async function getStudyHistory() {
  const user = await getOrCreateUser();

  const sessions = await prisma.studySession.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    take: 30, // Last 30 days
  });

  return sessions;
}

export async function calculateOverallProgress() {
  const user = await getOrCreateUser();

  const subjects = await prisma.subject.findMany({
    where: { userId: user.id },
    include: {
      chapters: {
        include: {
          progress: {
            where: { userId: user.id },
          },
        },
      },
      mockTests: {
        include: {
          progress: {
            where: { userId: user.id },
          },
        },
      },
    },
  });

  let totalTasks = 0;
  let completedTasks = 0;

  subjects.forEach((subject) => {
    // Each chapter has 4 tasks (completed + 3 revisions)
    const chapterTasks = subject.chapters.length * 4;
    // Each subject has 2 mock tests
    const mockTasks = subject.mockTests.length * 1;

    totalTasks += chapterTasks + mockTasks;

    // Count completed chapter tasks
    subject.chapters.forEach((chapter) => {
      const progress = chapter.progress[0];
      if (progress) {
        if (progress.completed) completedTasks++;
        if (progress.revision1) completedTasks++;
        if (progress.revision2) completedTasks++;
        if (progress.revision3) completedTasks++;
      }
    });

    // Count completed mock tests
    subject.mockTests.forEach((mock) => {
      const progress = mock.progress[0];
      if (progress?.completed) completedTasks++;
    });
  });

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return {
    progress,
    completed: completedTasks,
    total: totalTasks,
  };
}
