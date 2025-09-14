"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface TimerContextType {
  isRunning: boolean;
  time: number;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}

interface TimerProviderProps {
  children: ReactNode;
  onSessionComplete: (duration: number) => void;
}

export function TimerProvider({
  children,
  onSessionComplete,
}: TimerProviderProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Load timer state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("studyTimer");
    if (savedState) {
      const {
        isRunning: savedIsRunning,
        time: savedTime,
        startTime,
      } = JSON.parse(savedState);
      if (savedIsRunning && startTime) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTime(savedTime + elapsed);
        setIsRunning(true);
        startTimeRef.current = startTime;
      } else {
        setTime(savedTime);
        setIsRunning(false);
      }
    }
  }, []);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    const timerState = {
      isRunning,
      time,
      startTime: startTimeRef.current,
    };
    localStorage.setItem("studyTimer", JSON.stringify(timerState));
  }, [isRunning, time]);

  // Timer interval effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    startTimeRef.current = null;
  };

  const stopTimer = () => {
    setIsRunning(false);
    startTimeRef.current = null;
    if (time > 0) {
      onSessionComplete(time);
      setTime(0);
      localStorage.removeItem("studyTimer");
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    startTimeRef.current = null;
    localStorage.removeItem("studyTimer");
  };

  const value = {
    isRunning,
    time,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}
