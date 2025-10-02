import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check if required environment variables are present
    const requiredEnvVars = ["DATABASE_URL"];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing environment variables",
          missing: missingVars,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "ok",
      message:
        "Single-user app - all required environment variables are present",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
