export function maskDate(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  let out = digits.slice(0, 2);
  if (digits.length > 2) out += '/' + digits.slice(2, 4);
  if (digits.length > 4) out += '/' + digits.slice(4, 8);
  return out;
}

export function maskTime(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  let out = digits.slice(0, 2);
  if (digits.length > 2) out += ':' + digits.slice(2, 4);
  return out;
}
