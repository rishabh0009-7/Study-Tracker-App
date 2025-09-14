"use client";

import { useState } from "react";
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

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-slate-900/95 backdrop-blur-xl border-r border-white/10 w-80 h-full">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold gradient-text">
                      CS Executive
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Study Tracker
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
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
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-green"></div>
                    <span className="text-sm text-muted-foreground">
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
