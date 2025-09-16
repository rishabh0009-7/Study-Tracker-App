"use client";

import { useState, useEffect } from "react";
import { Calendar, AlertCircle } from "lucide-react";

interface ExamSession {
  name: string;
  date: Date;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function ExamCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    dec: { days: number; hours: number; minutes: number; seconds: number };
    june: { days: number; hours: number; minutes: number; seconds: number };
  }>({
    dec: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    june: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  });

  const examSessions: ExamSession[] = [
    {
      name: "December Session 2025",
      date: new Date("2025-12-22T00:00:00"),
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
    {
      name: "June Session 2026",
      date: new Date("2026-06-01T00:00:00"),
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();

      const decTimeLeft = examSessions[0].date.getTime() - now;
      const juneTimeLeft = examSessions[1].date.getTime() - now;

      const decDays = Math.max(
        0,
        Math.floor(decTimeLeft / (1000 * 60 * 60 * 24))
      );
      const decHours = Math.max(
        0,
        Math.floor((decTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      const decMinutes = Math.max(
        0,
        Math.floor((decTimeLeft % (1000 * 60 * 60)) / (1000 * 60))
      );
      const decSeconds = Math.max(
        0,
        Math.floor((decTimeLeft % (1000 * 60)) / 1000)
      );

      const juneDays = Math.max(
        0,
        Math.floor(juneTimeLeft / (1000 * 60 * 60 * 24))
      );
      const juneHours = Math.max(
        0,
        Math.floor((juneTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      const juneMinutes = Math.max(
        0,
        Math.floor((juneTimeLeft % (1000 * 60 * 60)) / (1000 * 60))
      );
      const juneSeconds = Math.max(
        0,
        Math.floor((juneTimeLeft % (1000 * 60)) / 1000)
      );

      setTimeLeft({
        dec: {
          days: decDays,
          hours: decHours,
          minutes: decMinutes,
          seconds: decSeconds,
        },
        june: {
          days: juneDays,
          hours: juneHours,
          minutes: juneMinutes,
          seconds: juneSeconds,
        },
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [examSessions]);

  const formatTime = (time: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    return {
      days: time.days.toString().padStart(2, "0"),
      hours: time.hours.toString().padStart(2, "0"),
      minutes: time.minutes.toString().padStart(2, "0"),
      seconds: time.seconds.toString().padStart(2, "0"),
    };
  };

  const decFormatted = formatTime(timeLeft.dec);
  const juneFormatted = formatTime(timeLeft.june);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* December Session 2025 */}
      <div
        className={`card-premium rounded-2xl p-6 border ${examSessions[0].borderColor} ${examSessions[0].bgColor} animate-fade-in-up`}
      >
        <div className="flex items-center mb-4">
          <div
            className={`w-10 h-10 ${examSessions[0].bgColor} rounded-xl flex items-center justify-center shadow-glow mr-3`}
          >
            <Calendar className={`h-5 w-5 ${examSessions[0].color}`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${examSessions[0].color}`}>
              December Session 2025
            </h3>
            <p className="text-sm text-gray-300">December 22, 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className={`text-2xl font-bold ${examSessions[0].color} mb-1`}>
              {decFormatted.days}
            </div>
            <div className="text-xs text-gray-300">Days</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${examSessions[0].color} mb-1`}>
              {decFormatted.hours}
            </div>
            <div className="text-xs text-gray-300">Hours</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${examSessions[0].color} mb-1`}>
              {decFormatted.minutes}
            </div>
            <div className="text-xs text-gray-300">Minutes</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${examSessions[0].color} mb-1`}>
              {decFormatted.seconds}
            </div>
            <div className="text-xs text-gray-300">Seconds</div>
          </div>
        </div>

        {timeLeft.dec.days === 0 &&
          timeLeft.dec.hours === 0 &&
          timeLeft.dec.minutes === 0 &&
          timeLeft.dec.seconds === 0 && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center">
              <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
              <span className="text-sm text-red-300 font-medium">
                Exam Day!
              </span>
            </div>
          )}
      </div>

      {/* June Session 2026 */}
      <div
        className={`card-premium rounded-2xl p-6 border ${examSessions[1].borderColor} ${examSessions[1].bgColor} animate-fade-in-up`}
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center mb-4">
          <div
            className={`w-10 h-10 ${examSessions[1].bgColor} rounded-xl flex items-center justify-center shadow-glow mr-3`}
          >
            <Calendar className={`h-5 w-5 ${examSessions[1].color}`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${examSessions[1].color}`}>
              June Session 2026
            </h3>
            <p className="text-sm text-gray-300">June 1, 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className={`text-2xl font-bold ${examSessions[1].color} mb-1`}>
              {juneFormatted.days}
            </div>
            <div className="text-xs text-gray-300">Days</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${examSessions[1].color} mb-1`}>
              {juneFormatted.hours}
            </div>
            <div className="text-xs text-gray-300">Hours</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${examSessions[1].color} mb-1`}>
              {juneFormatted.minutes}
            </div>
            <div className="text-xs text-gray-300">Minutes</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${examSessions[1].color} mb-1`}>
              {juneFormatted.seconds}
            </div>
            <div className="text-xs text-gray-300">Seconds</div>
          </div>
        </div>

        {timeLeft.june.days === 0 &&
          timeLeft.june.hours === 0 &&
          timeLeft.june.minutes === 0 &&
          timeLeft.june.seconds === 0 && (
            <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center">
              <AlertCircle className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-300 font-medium">
                Exam Day!
              </span>
            </div>
          )}
      </div>
    </div>
  );
}
