"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-black/50 backdrop-blur-sm border border-white/10 shadow-2xl rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Check your email!
            </h1>
            <p className="text-gray-300 mb-4">
              We&apos;ve sent you a confirmation link. Please check your email
              and click the link to verify your account.
            </p>
            <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
          <p className="text-gray-300">
            Create your CS Executive Tracker account
          </p>
        </div>

        <div className="bg-black/50 backdrop-blur-sm border border-white/10 shadow-2xl rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-white font-medium text-sm mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-3 py-2"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white font-medium text-sm mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-3 py-2"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-white font-medium text-sm mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-white text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-3 py-2"
                placeholder="Confirm your password"
              />
            </div>

            {error && <div className="text-red-400 text-xs mt-1">{error}</div>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
