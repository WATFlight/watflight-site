type ClassValue = string | false | null | undefined;

/** Joins class names, skipping falsy values. Deliberately tiny so no class-name dependency is needed. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
