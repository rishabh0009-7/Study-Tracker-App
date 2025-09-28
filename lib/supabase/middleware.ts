import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    console.log(
      "Middleware: Checking authentication for:",
      request.nextUrl.pathname
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    console.log(
      "Middleware: User status:",
      user ? `Authenticated: ${user.email}` : "Not authenticated"
    );
    if (error) console.log("Middleware: Auth error:", error);

    // Authentication is working, re-enable redirects

    // If user is signed in and the current path is / redirect the user to /dashboard
    if (user && request.nextUrl.pathname === "/") {
      console.log("Middleware: Redirecting authenticated user to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If user is not signed in and the current path is not / redirect the user to /
    if (
      !user &&
      request.nextUrl.pathname !== "/" &&
      !request.nextUrl.pathname.startsWith("/auth") &&
      !request.nextUrl.pathname.startsWith("/api")
    ) {
      console.log("Middleware: Redirecting unauthenticated user to sign in");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    return supabaseResponse;
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, allow access without redirect
    return supabaseResponse;
  }
}
