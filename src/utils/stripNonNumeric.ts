export function stripNonNumeric(value: string): string {
  return value.replace(/\D/g, "");
}
