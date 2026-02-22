# Bug-fix prompt — paste this into Claude Code

The test suite has a failing test. Fix the bug using the verification-first workflow:

1. Run `npm test` to reproduce the failure.
2. Read the failing test and the source file it imports to understand the root cause.
3. Before changing any rounding logic, call the MCP tool `fee_policy` to get the authoritative rounding rule and edge cases.
4. Apply the smallest possible fix to `src/fees.ts` that satisfies the policy.
5. Add a regression test if one doesn't already exist for the failing edge case.
6. Run `npm test` again — all tests must pass.
7. Provide a PR summary in this format:

   **Problem**: …
   **Fix**: …
   **Test Plan**: `npm test` — all N tests pass.
   **Risk & Rollback**: …
