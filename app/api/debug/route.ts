import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const debug = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL ? "✅ Set" : "❌ Missing",
    databaseTest: "Unknown",
    subjectsCount: "Unknown",
    chaptersCount: "Unknown",
    studySessionsCount: "Unknown",
    error: null as any,
  };

  try {
    console.log("Testing database connection...");

    // Test database connection
    try {
      await prisma.$connect();
      const subjectsCount = await prisma.subject.count();
      const chaptersCount = await prisma.chapter.count();
      const studySessionsCount = await prisma.studySession.count();

      debug.databaseTest = `✅ Connected successfully`;
      debug.subjectsCount = `✅ ${subjectsCount} subjects`;
      debug.chaptersCount = `✅ ${chaptersCount} chapters`;
      debug.studySessionsCount = `✅ ${studySessionsCount} study sessions`;

      await prisma.$disconnect();
    } catch (dbError) {
      debug.databaseTest = `❌ DB Error: ${dbError}`;
      debug.error = String(dbError);
      return NextResponse.json(debug);
    }
  } catch (error) {
    debug.databaseTest = `❌ Exception: ${error}`;
    debug.error = String(error);
  }

  return NextResponse.json(debug);
}
