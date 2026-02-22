/**
 * Fees are in basis points (bps). 100 bps = 1%.
 * Return value is cents, intended to be rounded to nearest cent (half-up).
 */
export function calculateFeeCents(amountCents: number, feeBps: number): number {
  if (amountCents < 0) throw new Error("amountCents must be >= 0");
  if (feeBps < 0) throw new Error("feeBps must be >= 0");

  const fee = (amountCents * feeBps) / 10_000;

  // BUG: floors instead of rounding to nearest cent
  return Math.floor(fee);
}
