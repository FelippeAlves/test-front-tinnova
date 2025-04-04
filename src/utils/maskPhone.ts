export function maskPhone(value: string): string {
  const cleaned = value.replace(/\D/g, "");

  if (!cleaned) return "";

  const limited = cleaned.slice(0, 11);

  const ddd = limited.slice(0, 2);
  const middle = limited.slice(2, limited.length > 10 ? 3 : 6);
  const firstPart = limited.slice(
    limited.length > 10 ? 3 : 2,
    limited.length - 4
  );
  const lastPart = limited.slice(-4);

  if (limited.length <= 2) return `(${ddd}`;
  if (limited.length <= 6) return `(${ddd}) ${middle}`;
  if (limited.length <= 10) return `(${ddd}) ${firstPart}-${lastPart}`;

  return `(${ddd}) ${middle} ${firstPart}-${lastPart}`;
}
