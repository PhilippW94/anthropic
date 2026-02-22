# Skill: verification_first_bugfix

A repeatable workflow for fixing bugs with verification at every step.

## Inputs

- Failing test output (e.g. `npm test` log showing the assertion failure).

## Steps

1. **Reproduce** — Run `npm test` and confirm the failure. Copy the exact assertion error.
2. **Diagnose** — Read the failing test and the source under test. Identify the root cause.
3. **Consult policy** — Call the MCP tool `fee_policy` to retrieve the authoritative rounding rule and edge cases. Do not guess business logic.
4. **Fix** — Apply the smallest change that satisfies the policy. Do not refactor unrelated code.
5. **Add regression test** — If the existing test does not already cover the edge case, add one.
6. **Verify** — Run `npm test` (or `npm run verify`). All tests must pass.
7. **PR summary** — Write a summary using the format in CLAUDE.md: Problem / Fix / Test Plan / Risk & Rollback.

## Definition of Done

- [ ] All tests pass (`npm test` exit 0).
- [ ] At least one regression test covers the bug scenario.
- [ ] PR summary includes Risk & Rollback section.
- [ ] No new dependencies added.
- [ ] No secrets or network calls introduced.
