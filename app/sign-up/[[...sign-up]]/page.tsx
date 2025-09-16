import { SignUp, SignedIn, SignedOut, RedirectToSignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignedOut>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
            <p className="text-gray-300">
              Create your CS Executive Tracker account
            </p>
          </div>
          <SignUp
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
          <RedirectToSignUp fallbackRedirectUrl="/dashboard" />
        </SignedIn>
      </div>
    </div>
  );
}
