"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { seedDatabase } from "./seed";

// Single-user app - no user management needed
export async function initializeDatabase() {
  try {
    console.log("initializeDatabase: Checking if database needs seeding...");

    // Check if we have any subjects
    const subjectCount = await prisma.subject.count();

    if (subjectCount === 0) {
      console.log("initializeDatabase: Seeding database...");
      await seedDatabase();
      console.log("initializeDatabase: Database seeded successfully");
    } else {
      console.log("initializeDatabase: Database already has data");
    }
  } catch (error) {
    console.error("Database initialization error:", error);
    throw new Error(`Database initialization failed: ${error}`);
  }
}

export async function getSubjects() {
  try {
    await initializeDatabase();

    const subjects = await prisma.subject.findMany({
      include: {
        chapters: {
          orderBy: { order: "asc" },
          include: {
            progress: true,
          },
        },
        mockTests: {
          orderBy: { order: "asc" },
          include: {
            progress: true,
          },
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
  } catch (error) {
    console.warn("Database not available during build, using fallback:", error);
    return [];
  }
}

export async function getSubjectWithProgress(subjectId: string) {
  try {
    await initializeDatabase();

    const subject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
      },
      include: {
        chapters: {
          orderBy: { order: "asc" },
          include: {
            progress: true,
          },
        },
        mockTests: {
          orderBy: { order: "asc" },
          include: {
            progress: true,
          },
        },
      },
    });

    return subject;
  } catch (error) {
    console.warn("Database not available during build, using fallback:", error);
    return null;
  }
}

export async function updateChapterProgress(
  chapterId: string,
  field: "completed" | "revision1" | "revision2" | "revision3",
  value: boolean
) {
  await prisma.chapterProgress.upsert({
    where: {
      chapterId,
    },
    update: {
      [field]: value,
    },
    create: {
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
  await prisma.mockProgress.upsert({
    where: {
      mockTestId,
    },
    update: {
      completed,
    },
    create: {
      mockTestId,
      completed,
    },
  });

  revalidatePath("/subjects");
  revalidatePath("/dashboard");
}

export async function createStudySession(duration: number) {
  // Convert seconds to minutes (duration is passed in seconds from timer)
  const durationInMinutes = Math.round(duration / 60);

  await prisma.studySession.create({
    data: {
      duration: durationInMinutes,
    },
  });

  revalidatePath("/study");
  revalidatePath("/history");
}

export async function getTodayStudyHours() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sessions = await prisma.studySession.findMany({
    where: {
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
  try {
    const sessions = await prisma.studySession.findMany({
      orderBy: { date: "desc" },
      take: 30, // Last 30 days
    });

    return sessions;
  } catch (error) {
    console.warn("Database not available during build, using fallback:", error);
    return [];
  }
}

export async function calculateOverallProgress() {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        chapters: {
          include: {
            progress: true,
          },
        },
        mockTests: {
          include: {
            progress: true,
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
  } catch (error) {
    console.warn("Database not available during build, using fallback:", error);
    return {
      progress: 0,
      completed: 0,
      total: 0,
    };
  }
}
