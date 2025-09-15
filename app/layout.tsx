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
          colorInputBackground: "#111111",
          colorInputText: "#ffffff",
        },
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          card: "bg-black border border-white/10",
          headerTitle: "text-white",
          headerSubtitle: "text-gray-300",
          socialButtonsBlockButton:
            "bg-white/5 hover:bg-white/10 border border-white/10",
          socialButtonsBlockButtonText: "text-white",
          formFieldInput: "bg-white/5 border-white/10 text-white",
          formFieldLabel: "text-white",
          footerActionLink: "text-blue-400 hover:text-blue-300",
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
