"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-cyan-900/20"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-float blur-xl"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-cyan-500 rounded-full opacity-25 animate-float blur-lg"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-blue-600 rounded-full opacity-15 animate-float blur-lg"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-float blur-xl"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-300">
              {isSignUp
                ? "Join CS Executive Tracker"
                : "Sign in to your CS Executive Tracker"}
            </p>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-xl text-sm ${
                message.includes("Check your email")
                  ? "bg-green-500/10 border border-green-500/20 text-green-400"
                  : "bg-red-500/10 border border-red-500/20 text-red-400"
              }`}
            >
              {message}
            </div>
          )}

          {/* Email Sign In Form */}
          <form onSubmit={handleEmailAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>
                {isLoading
                  ? "Loading..."
                  : isSignUp
                  ? "Create Account"
                  : "Sign In"}
              </span>
            </Button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage("");
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Create one"}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
