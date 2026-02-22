#!/usr/bin/env node

/**
 * Minimal MCP stdio server exposing a single tool: fee_policy.
 * Implements the bare-minimum JSON-RPC subset required by the MCP protocol.
 * Zero external dependencies.
 */

import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const policy = JSON.parse(readFileSync(join(__dirname, "fee-policy.json"), "utf-8"));

const TOOL = {
  name: "fee_policy",
  description: "Return internal fee rounding rule and edge cases",
  inputSchema: { type: "object", properties: {}, required: [] },
};

function respond(id, result) {
  const msg = JSON.stringify({ jsonrpc: "2.0", id, result });
  process.stdout.write(`${msg}\n`);
}

function handleRequest(req) {
  switch (req.method) {
    case "initialize":
      respond(req.id, {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "fee_policy_server", version: "1.0.0" },
      });
      break;

    case "notifications/initialized":
      break;

    case "tools/list":
      respond(req.id, { tools: [TOOL] });
      break;

    case "tools/call":
      if (req.params?.name === "fee_policy") {
        respond(req.id, {
          content: [{ type: "text", text: JSON.stringify(policy, null, 2) }],
        });
      } else {
        respond(req.id, {
          isError: true,
          content: [{ type: "text", text: `Unknown tool: ${req.params?.name}` }],
        });
      }
      break;

    default:
      respond(req.id, { error: { code: -32601, message: "Method not found" } });
  }
}

const rl = createInterface({ input: process.stdin });
rl.on("line", (line) => {
  try {
    handleRequest(JSON.parse(line));
  } catch {
    // ignore malformed input
  }
});
