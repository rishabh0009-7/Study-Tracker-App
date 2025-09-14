"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { updateMockProgress } from "@/lib/actions";

interface MockCheckboxProps {
  mockTestId: string;
  checked: boolean;
  label: string;
}

export function MockCheckbox({
  mockTestId,
  checked,
  label,
}: MockCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async () => {
    setIsLoading(true);
    try {
      await updateMockProgress(mockTestId, !isChecked);
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
