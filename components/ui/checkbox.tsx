import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <div className="relative">
          <input type="checkbox" className="sr-only" ref={ref} {...props} />
          <div
            className={cn(
              "h-4 w-4 rounded border-2 border-primary bg-background transition-colors",
              props.checked && "bg-primary border-primary",
              className
            )}
          >
            {props.checked && (
              <Check className="h-3 w-3 text-primary-foreground absolute top-0.5 left-0.5" />
            )}
          </div>
        </div>
        {label && (
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </span>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
