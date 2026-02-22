# FinTechCo Payments Demo

A minimal TypeScript repo for a 10-minute **Claude Code enterprise demo**.
It showcases verification-first bug fixing, MCP-grounded policy, and a C-level-friendly UI.

## Quickstart

```bash
npm install
npm test        # ❌ FAILS on demo-start (rounding bug)
npm run web     # starts UI at http://localhost:3000
```

## Demo flow (8 steps)

1. `git checkout demo-start`
2. `npm install`
3. `npm run web` — starts the fee calculator UI.
4. Open <http://localhost:3000> — shows **FAIL** (expected 5¢, actual 4¢).
5. `npm test` — one test fails.
6. Open Claude Code in the repo root and paste the contents of `prompts/bugfix.md`.
7. After Claude applies the fix: `npm test` — all tests pass.
8. `npm run build` and refresh the browser — shows **PASS** (expected 5¢, actual 5¢).

## Where to look

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Quality gates & output format for Claude Code |
| `SKILL.md` | Repeatable verification-first workflow |
| `prompts/bugfix.md` | Ready-to-paste Claude Code prompt |
| `.mcp.json` + `mcp/*` | MCP tool serving fee policy |
| `scripts/verify.sh` | CI-friendly verification script |
| `web/*` | Tiny frontend for executive audiences |

## Branches

| Branch | Tests | UI |
|--------|-------|----|
| `demo-start` | ❌ FAIL | FAIL (4¢ ≠ 5¢) |
| `demo-fixed` | ✅ PASS | PASS (5¢ = 5¢) |
