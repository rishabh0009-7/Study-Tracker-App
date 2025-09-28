"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { seedDatabase } from "./seed";

export async function getOrCreateUser() {
  try {
    console.log("getOrCreateUser: Creating Supabase client...");
    const supabase = await createClient();

    console.log("getOrCreateUser: Getting user from Supabase...");
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Supabase auth error:", error);
      redirect("/auth/signin");
    }

    if (!user) {
      console.log("No user found, redirecting to sign in");
      redirect("/auth/signin");
    }

    console.log("getOrCreateUser: User authenticated:", user.email);

    try {
      console.log("getOrCreateUser: Looking up user in database...");
      let dbUser = await prisma.user.findUnique({
        where: { supabaseId: user.id },
      });

      if (!dbUser) {
        console.log("getOrCreateUser: Creating new user in database...");
        // Create user in our database if they don't exist
        dbUser = await prisma.user.create({
          data: {
            supabaseId: user.id,
            email: user.email!,
          },
        });
        console.log("getOrCreateUser: User created successfully");

        // Seed database for new user
        try {
          console.log("getOrCreateUser: Seeding database for new user...");
          await seedDatabase(dbUser.id);
          console.log("getOrCreateUser: Database seeded successfully");
        } catch (seedError) {
          console.error("Error seeding database for new user:", seedError);
          // Continue without seeding if there's an error
        }
      } else {
        console.log("getOrCreateUser: Existing user found:", dbUser.email);
      }

      return dbUser;
    } catch (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database connection failed: ${dbError}`);
    }
  } catch (error) {
    console.error("Supabase client error:", error);
    redirect("/auth/signin");
  }
}

export async function getSubjects() {
  try {
    const user = await getOrCreateUser();

    const subjects = await prisma.subject.findMany({
      where: { userId: user.id },
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
  try {
    const user = await getOrCreateUser();

    const sessions = await prisma.studySession.findMany({
      where: { userId: user.id },
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
  } catch (error) {
    console.warn("Database not available during build, using fallback:", error);
    return {
      progress: 0,
      completed: 0,
      total: 0,
    };
  }
}
