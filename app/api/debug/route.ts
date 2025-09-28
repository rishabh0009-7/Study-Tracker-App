import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const debug = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing",
    databaseUrl: process.env.DATABASE_URL ? "✅ Set" : "❌ Missing",
    authTest: "Unknown",
    error: null as any,
  };

  try {
    console.log("Testing Supabase authentication...");
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      debug.authTest = `❌ Auth Error: ${authError.message}`;
      debug.error = authError.message;
    } else if (user) {
      debug.authTest = `✅ User Found: ${user.email}`;
    } else {
      debug.authTest = "❌ No user found";
      debug.error = "No authenticated user";
    }
  } catch (error) {
    debug.authTest = `❌ Exception: ${error}`;
    debug.error = String(error);
  }

  return NextResponse.json(debug);
}