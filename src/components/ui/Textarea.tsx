import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { controlStyles } from "./control-styles";
import { FieldShell } from "./FieldShell";
import { useFieldIds } from "./use-field-ids";

type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "aria-describedby" | "aria-invalid"
> & {
  label: string;
  hideLabel?: boolean;
  hint?: string;
  error?: string;
};

export function Textarea({
  label,
  hideLabel,
  hint,
  error,
  required,
  rows = 4,
  className,
  ...rest
}: TextareaProps) {
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
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(controlStyles, className)}
        {...rest}
      />
    </FieldShell>
  );
}
