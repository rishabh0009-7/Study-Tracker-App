import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";

export async function POST() {
  try {
    console.log("Seed API: Starting database seed check...");

    // Check if database already has subjects
    const existingSubjects = await prisma.subject.findMany();
    console.log(`Seed API: Found ${existingSubjects.length} existing subjects`);

    if (existingSubjects.length === 0) {
      console.log("Seed API: No subjects found, seeding database...");
      await seedDatabase();
      console.log("Seed API: Database seeded successfully");

      return NextResponse.json({
        success: true,
        message: "Database seeded successfully",
        seeded: true,
      });
    } else {
      console.log("Seed API: Database already has subjects");
      return NextResponse.json({
        success: true,
        message: "Database already contains data",
        seeded: false,
      });
    }
  } catch (error) {
    console.error("Seed API: Error seeding database:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        seeded: false,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check database status
    const subjectCount = await prisma.subject.count();

    return NextResponse.json({
      success: true,
      subjectCount,
      isSeeded: subjectCount > 0,
    });
  } catch (error) {
    console.error("Seed API: Error checking database status:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
