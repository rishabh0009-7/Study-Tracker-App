import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <TimerProvider onSessionComplete={createStudySession}>
          <main>{children}</main>
          <TimerIndicator />
        </TimerProvider>
      </body>
    </html>
  );
}
