"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { AuthLoading } from "./AuthLoading";

export function OptimizedUserButton() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-8 h-8",
          userButtonPopoverCard:
            "bg-black/95 backdrop-blur-sm border border-white/10",
          userButtonPopoverActionButton: "text-white hover:bg-white/10",
          userButtonPopoverActionButtonText: "text-white",
          userButtonPopoverFooter: "hidden",
        },
      }}
      afterSignOutUrl="/"
    />
  );
}
