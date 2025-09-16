import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TimerProvider } from "@/contexts/TimerContext";
import { TimerIndicator } from "@/components/TimerIndicator";
import { createStudySession } from "@/lib/actions";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CS Executive Study Tracker - Premium Study Management",
  description:
    "Professional study management platform for CS Executive exam preparation with advanced tracking and analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#2563eb",
          colorBackground: "#000000",
          colorInputBackground: "#ffffff",
          colorInputText: "#000000",
          colorText: "#ffffff",
          colorTextSecondary: "#9ca3af",
          colorNeutral: "#ffffff",
          borderRadius: "0.5rem",
        },
        elements: {
          // Main container
          card: "bg-black/90 backdrop-blur-sm border border-white/20 shadow-2xl",

          // Headers
          headerTitle: "text-white text-2xl font-bold",
          headerSubtitle: "text-gray-300 text-sm",

          // Form fields
          formFieldInput:
            "bg-white text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-3 py-2",
          formFieldLabel: "text-white font-medium text-sm mb-1",
          formFieldErrorText: "text-red-400 text-xs mt-1",

          // Buttons
          formButtonPrimary:
            "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors",
          formButtonSecondary:
            "bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors",

          // Social buttons
          socialButtonsBlockButton:
            "bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors",
          socialButtonsBlockButtonText: "text-gray-800",

          // Links
          footerActionLink: "text-blue-400 hover:text-blue-300 underline",
          identityPreviewText: "text-white",
          identityPreviewEditButton: "text-blue-400 hover:text-blue-300",

          // Dividers
          dividerLine: "bg-gray-600",
          dividerText: "text-gray-400 text-sm",

          // Form messages
          formFieldSuccessText: "text-green-400 text-xs mt-1",
          formFieldWarningText: "text-yellow-400 text-xs mt-1",

          // Alternative methods
          alternativeMethodsBlockButton:
            "text-blue-400 hover:text-blue-300 underline text-sm",
        },
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      afterSignOutUrl="/"
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
          <TimerProvider onSessionComplete={createStudySession}>
            <main className="pt-16 lg:pt-20">{children}</main>
            <TimerIndicator />
          </TimerProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
