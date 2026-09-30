import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type FieldShellProps = {
  id: string;
  label: string;
  hideLabel?: boolean;
  hint?: string;
  hintId: string;
  error?: string;
  errorId: string;
  required?: boolean;
  children: ReactNode;
};

export function FieldShell({
  id,
  label,
  hideLabel = false,
  hint,
  hintId,
  error,
  errorId,
  required = false,
  children,
}: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn("text-sm font-medium text-foreground", hideLabel && "sr-only")}
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-muted font-normal">
            {" "}
            (obligatorio)
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      <div aria-live="polite">
        {error && (
          <p id={errorId} className="text-sm font-medium text-danger">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
