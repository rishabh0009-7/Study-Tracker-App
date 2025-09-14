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
    <Checkbox
      checked={isChecked}
      onChange={handleChange}
      disabled={isLoading}
      label={label}
    />
  );
}
