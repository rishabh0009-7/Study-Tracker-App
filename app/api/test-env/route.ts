import { NextResponse } from "next/server";

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;

  return NextResponse.json({
    databaseUrl: databaseUrl ? "✅ Present" : "❌ Missing",
    hasAllVars: !!databaseUrl,
    message: "Single-user app - only DATABASE_URL required",
  });
}
