import { SignIn, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignedOut>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">
              Sign in to your CS Executive Tracker account
            </p>
          </div>
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-black/50 backdrop-blur-sm border border-white/10 shadow-2xl",
              },
            }}
            fallbackRedirectUrl="/dashboard"
          />
        </SignedOut>
        <SignedIn>
          <RedirectToSignIn fallbackRedirectUrl="/dashboard" />
        </SignedIn>
      </div>
    </div>
  );
}
