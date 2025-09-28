import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const debug = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing",
    databaseUrl: process.env.DATABASE_URL ? "✅ Set" : "❌ Missing",
    authTest: "Unknown",
    databaseTest: "Unknown",
    userLookup: "Unknown",
    getOrCreateUserTest: "Unknown",
    error: null as any,
  };

  try {
    console.log("Testing Supabase authentication...");
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      debug.authTest = `❌ Auth Error: ${authError.message}`;
      debug.error = authError.message;
      return NextResponse.json(debug);
    } 
    
    if (!user) {
      debug.authTest = "❌ No user found";
      debug.error = "No authenticated user";
      return NextResponse.json(debug);
    }

    debug.authTest = `✅ User Found: ${user.email}`;

    // Test database connection
    try {
      await prisma.$connect();
      const userCount = await prisma.user.count();
      debug.databaseTest = `✅ Connected (${userCount} users)`;
      await prisma.$disconnect();
    } catch (dbError) {
      debug.databaseTest = `❌ DB Error: ${dbError}`;
      debug.error = String(dbError);
      return NextResponse.json(debug);
    }

    // Test user lookup
    try {
      let dbUser = await prisma.user.findUnique({
        where: { supabaseId: user.id },
      });

      if (!dbUser) {
        dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        
        if (dbUser) {
          debug.userLookup = `✅ Found by email: ${dbUser.email} (different supabaseId)`;
        } else {
          debug.userLookup = "❌ User not found in database";
        }
      } else {
        debug.userLookup = `✅ Found by supabaseId: ${dbUser.email}`;
      }
    } catch (lookupError) {
      debug.userLookup = `❌ Lookup Error: ${lookupError}`;
      debug.error = String(lookupError);
      return NextResponse.json(debug);
    }

    // Test the actual getOrCreateUser function
    try {
      const { getOrCreateUser } = await import("@/lib/actions");
      const result = await getOrCreateUser();
      debug.getOrCreateUserTest = `✅ Success: ${result.email}`;
    } catch (getOrCreateError) {
      debug.getOrCreateUserTest = `❌ getOrCreateUser Error: ${getOrCreateError}`;
      debug.error = String(getOrCreateError);
    }

  } catch (error) {
    debug.authTest = `❌ Exception: ${error}`;
    debug.error = String(error);
  }

  return NextResponse.json(debug);
}