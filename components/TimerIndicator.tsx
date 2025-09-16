"use client";

import { useTimer } from "@/contexts/TimerContext";
import { Clock, Play, Pause, Square, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export function TimerIndicator() {
  const { isRunning, time, startTimer, pauseTimer, stopTimer } = useTimer();
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const timerRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem("timerPosition");
    if (savedPosition) {
      const parsedPosition = JSON.parse(savedPosition);
      // Ensure position is within viewport bounds on load
      const maxX = window.innerWidth - 300; // Approximate timer width
      const maxY = window.innerHeight - 100; // Approximate timer height
      setPosition({
        x: Math.max(0, Math.min(parsedPosition.x, maxX)),
        y: Math.max(0, Math.min(parsedPosition.y, maxY)),
      });
    } else {
      // Default position for mobile - avoid top area where header is
      const isMobile = window.innerWidth <= 768;
      setPosition({
        x: isMobile ? 16 : 16,
        y: isMobile ? 100 : 16, // Below mobile header
      });
    }
  }, []);

  // Save position to localStorage
  useEffect(() => {
    localStorage.setItem("timerPosition", JSON.stringify(position));
  }, [position]);

  // Handle viewport resize to keep timer in bounds
  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - (timerRef.current?.offsetWidth || 300);
      const maxY = window.innerHeight - (timerRef.current?.offsetHeight || 100);

      setPosition((prev) => ({
        x: Math.max(0, Math.min(prev.x, maxX)),
        y: Math.max(0, Math.min(prev.y, maxY)),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle mouse down for drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (timerRef.current) {
      const rect = timerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        // Constrain to viewport boundaries
        const maxX = window.innerWidth - (timerRef.current?.offsetWidth || 300);
        const maxY =
          window.innerHeight - (timerRef.current?.offsetHeight || 100);

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (timerRef.current) {
      const rect = timerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        const newX = touch.clientX - dragOffset.x;
        const newY = touch.clientY - dragOffset.y;

        // Constrain to viewport boundaries
        const maxX = window.innerWidth - (timerRef.current?.offsetWidth || 300);
        const maxY =
          window.innerHeight - (timerRef.current?.offsetHeight || 100);

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  if (time === 0 && !isRunning) {
    return null; // Don't show if timer hasn't been started
  }

  return (
    <div
      ref={timerRef}
      className={`fixed z-[100] animate-slide-in-up draggable-timer ${
        isDragging ? "dragging" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="card-premium rounded-2xl p-4 shadow-glow border border-white/20 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          {/* Drag Handle */}
          <div className="drag-handle flex items-center justify-center w-6 h-6 text-white/60 cursor-grab active:cursor-grabbing">
            <GripVertical className="h-4 w-4" />
          </div>
          {/* Timer Display */}
          <div
            className="flex items-center space-x-3"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-mono font-bold gradient-text">
                {formatTime(time)}
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isRunning
                      ? "bg-green-400 animate-pulse shadow-glow-green"
                      : "bg-yellow-400"
                  }`}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {isRunning ? "Running" : "Paused"}
                </span>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div
            className="flex items-center space-x-2"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {!isRunning ? (
              <Button
                onClick={startTimer}
                size="sm"
                className="px-3 py-2 bg-gradient-success hover:shadow-glow-green btn-premium text-white rounded-lg"
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={pauseTimer}
                size="sm"
                variant="outline"
                className="px-3 py-2 border-white/20 hover:bg-white/10 text-white rounded-lg"
              >
                <Pause className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={stopTimer}
              size="sm"
              variant="destructive"
              className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg text-white rounded-lg"
            >
              <Square className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
