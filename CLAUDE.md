# FinTechCo Payments Demo — Claude Code Guidelines

Goal: produce changes that are safe, verifiable, and review-ready.

## Non-negotiable quality gates

- Prefer the smallest safe change; do not refactor unrelated code.
- For bug fixes: always add or update a regression test.
- Before declaring DONE: run `npm test` and report results.
- Do not add new dependencies.
- Do not introduce network calls or secrets.

## Policy grounding

- Before changing fee rounding behavior, consult the MCP tool `fee_policy` for the current rule and edge cases.

## Output format (always)

Provide:

1. **Problem** — what is broken and how it manifests.
2. **Fix** — what was changed and why.
3. **Test Plan** — commands run + outcome.
4. **Risk & Rollback** — blast radius and how to revert.
