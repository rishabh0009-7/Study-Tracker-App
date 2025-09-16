import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();

    // Test a simple query
    const userCount = await prisma.user.count();

    return NextResponse.json({
      status: "ok",
      message: "Database connection successful",
      userCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database check failed:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
