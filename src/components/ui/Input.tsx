import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { controlStyles } from "./control-styles";
import { FieldShell } from "./FieldShell";
import { useFieldIds } from "./use-field-ids";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "aria-describedby" | "aria-invalid"
> & {
  label: string;
  hideLabel?: boolean;
  hint?: string;
  error?: string;
};

export function Input({ label, hideLabel, hint, error, required, className, ...rest }: InputProps) {
  const { id, hintId, errorId, describedBy } = useFieldIds(Boolean(hint), Boolean(error));

  return (
    <FieldShell
      id={id}
      label={label}
      hideLabel={hideLabel}
      hint={hint}
      hintId={hintId}
      error={error}
      errorId={errorId}
      required={required}
    >
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(controlStyles, className)}
        {...rest}
      />
    </FieldShell>
  );
}
