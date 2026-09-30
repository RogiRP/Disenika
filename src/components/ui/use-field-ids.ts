import { useId } from "react";

export function useFieldIds(hasHint: boolean, hasError: boolean) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hasHint && hintId, hasError && errorId].filter(Boolean).join(" ");

  return { id, hintId, errorId, describedBy: describedBy || undefined };
}
