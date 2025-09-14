"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  BookOpen,
  Clock,
  BarChart3,
  History,
  Home,
} from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/study", label: "Study Timer", icon: Clock },
    { href: "/history", label: "History", icon: BarChart3 },
    { href: "/subjects", label: "Subjects", icon: BookOpen },
  ];

  // Close menu when clicking outside or on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent body scroll when menu is open
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm mobile-nav-button"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile menu panel */}
          <div className="mobile-menu-panel border-r border-white/20 shadow-2xl">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      CS Executive
                    </h2>
                    <p className="text-xs text-white/80">Study Tracker</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group border border-white/10"
                    >
                      <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-green transition-all duration-300">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white font-medium text-lg">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-green"></div>
                    <span className="text-sm text-white/90 font-medium">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
