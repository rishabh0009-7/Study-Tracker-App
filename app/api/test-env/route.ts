import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const databaseUrl = process.env.DATABASE_URL;

  return NextResponse.json({
    supabaseUrl: supabaseUrl ? "✅ Present" : "❌ Missing",
    supabaseAnonKey: supabaseAnonKey ? "✅ Present" : "❌ Missing",
    databaseUrl: databaseUrl ? "✅ Present" : "❌ Missing",
    supabaseUrlValue: supabaseUrl,
    hasAllVars: !!(supabaseUrl && supabaseAnonKey && databaseUrl),
  });
}
