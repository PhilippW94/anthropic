import { calculateFeeCents } from "./fees";

test("rounds fee to nearest cent (not floor)", () => {
  // 2.5% of 199 cents = 4.975 cents → should round to 5
  expect(calculateFeeCents(199, 250)).toBe(5);
});

test("handles zero safely", () => {
  expect(calculateFeeCents(0, 250)).toBe(0);
});
