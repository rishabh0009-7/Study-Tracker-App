"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Menu,
  X,
  BookOpen,
  Clock,
  BarChart3,
  Home,
  ArrowLeft,
} from "lucide-react";

interface NavbarProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export function Navbar({
  title = "CS Executive Tracker",
  subtitle = "",
  showBackButton = false,
  backHref = "/dashboard",
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/study", label: "Study Timer", icon: Clock },
    { href: "/history", label: "History", icon: BarChart3 },
    { href: "/subjects", label: "Subjects", icon: BookOpen },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Check if nav item is active
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-white/20 shadow-2xl"
            : "bg-black/90 backdrop-blur-sm border-b border-white/10"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left Section - Logo and Back Button */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {showBackButton && (
                <Link
                  href={backHref}
                  className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 transition-all duration-300 backdrop-blur-sm group"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </Link>
              )}

              <Link
                href="/dashboard"
                className="flex items-center space-x-3 group"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
                  <BookOpen className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg lg:text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-xs lg:text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
                      {subtitle}
                    </p>
                  )}
                </div>
              </Link>
            </div>

            {/* Center Section - Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative group px-4 py-2 rounded-xl transition-all duration-300 ${
                      active
                        ? "bg-blue-600/20 text-white shadow-glow"
                        : "text-gray-300 hover:text-white hover:bg-blue-600/10"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {active && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section - Status, User, Mobile Menu */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Status Indicator */}
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-green"></div>
                <span className="text-xs text-gray-300">Online</span>
              </div>

              {/* User Button */}
              <div className="relative">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 lg:w-9 lg:h-9",
                    },
                  }}
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm group"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <Menu className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-white/20 shadow-2xl animate-slide-in-right">
            <div className="h-full flex flex-col">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      CS Executive
                    </h2>
                    <p className="text-xs text-gray-300">Study Tracker</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group border ${
                        active
                          ? "bg-blue-600/20 border-blue-600/30 shadow-glow"
                          : "bg-blue-600/10 border-blue-600/20 hover:bg-blue-600/20 hover:border-blue-600/40"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          active
                            ? "bg-blue-600 shadow-glow"
                            : "bg-blue-600/50 group-hover:bg-blue-600"
                        }`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <span
                          className={`text-white font-medium text-lg ${
                            active ? "text-blue-200" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                        {active && (
                          <div className="text-xs text-blue-300 mt-1">
                            Current page
                          </div>
                        )}
                      </div>
                      {active && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="p-6 border-t border-white/10">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-green"></div>
                    <span className="text-sm text-white/90 font-medium">
                      Online
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    All systems operational
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
