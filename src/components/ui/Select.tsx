import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { controlStyles } from "./control-styles";
import { FieldShell } from "./FieldShell";
import { useFieldIds } from "./use-field-ids";

type SelectOption = { value: string; label: string };

type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "aria-describedby" | "aria-invalid" | "children"
> & {
  label: string;
  options: readonly SelectOption[];
  placeholder?: string;
  hideLabel?: boolean;
  hint?: string;
  error?: string;
};

export function Select({
  label,
  options,
  placeholder,
  hideLabel,
  hint,
  error,
  required,
  className,
  ...rest
}: SelectProps) {
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
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(controlStyles, className)}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
