export function normalize(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function lastNDays(days: number) {
  const to = normalize(new Date());
  const from = new Date(to);
  from.setUTCDate(to.getUTCDate() - days);
  return { from, to };
}

export function lastYear() {
  return lastNDays(365);
}
