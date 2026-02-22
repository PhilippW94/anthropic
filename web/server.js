import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const PORT = process.env.PORT || 3000;

const htmlPath = join(__dirname, "index.html");
const policy = JSON.parse(readFileSync(join(root, "mcp", "fee-policy.json"), "utf-8"));

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === "/" || url.pathname === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(readFileSync(htmlPath, "utf-8"));
    return;
  }

  if (url.pathname === "/api/policy") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(policy));
    return;
  }

  if (url.pathname === "/api/fee") {
    const amountCents = Number(url.searchParams.get("amountCents") ?? 0);
    const feeBps = Number(url.searchParams.get("feeBps") ?? 0);
    try {
      const feesUrl = new URL("../dist/fees.js", import.meta.url);
      feesUrl.search = "?t=" + Date.now();
      const mod = await import(feesUrl.href);
      const feeCents = mod.calculateFeeCents(amountCents, feeBps);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ amountCents, feeBps, feeCents }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Fee demo UI → http://localhost:${PORT}`);
});
