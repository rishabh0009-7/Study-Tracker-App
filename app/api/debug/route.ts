import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const debug = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
    },
    tests: {
      supabaseClient: false,
      databaseConnection: false,
      authUser: null,
    },
  };

  try {
    // Test Supabase client creation
    const supabase = await createClient();
    debug.tests.supabaseClient = true;

    // Test auth
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        debug.tests.authUser = `Error: ${error.message}`;
      } else if (user) {
        debug.tests.authUser = `Authenticated: ${user.email}`;
      } else {
        debug.tests.authUser = "No user authenticated";
      }
    } catch (authError) {
      debug.tests.authUser = `Auth error: ${authError}`;
    }
  } catch (supabaseError) {
    debug.tests.supabaseClient = `Error: ${supabaseError}`;
  }

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    debug.tests.databaseConnection = true;
  } catch (dbError) {
    debug.tests.databaseConnection = `Error: ${dbError}`;
  }

  return NextResponse.json(debug, { status: 200 });
}
