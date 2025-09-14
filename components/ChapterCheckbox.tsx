"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { updateChapterProgress } from "@/lib/actions";

interface ChapterCheckboxProps {
  chapterId: string;
  field: "completed" | "revision1" | "revision2" | "revision3";
  checked: boolean;
  label: string;
}

export function ChapterCheckbox({
  chapterId,
  field,
  checked,
  label,
}: ChapterCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async () => {
    setIsLoading(true);
    try {
      await updateChapterProgress(chapterId, field, !isChecked);
      setIsChecked(!isChecked);
    } catch (error) {
      console.error("Error updating progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
      <Checkbox
        checked={isChecked}
        onChange={handleChange}
        disabled={isLoading}
        className="data-[state=checked]:bg-gradient-success data-[state=checked]:border-green-400"
      />
      <span className="text-white font-medium flex-1">{label}</span>
      {isLoading && (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      )}
    </div>
  );
}
