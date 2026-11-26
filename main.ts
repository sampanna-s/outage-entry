import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "Status: all servers are down. I am the agent posting this update; I cannot reach monitoring to verify the cause, and I have no ETA yet.";

// Mirror the gate: UTF-8 text, 1-160 characters, single line, not only white space.
function assertValidLine(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 160 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidLine(line);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, line, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
