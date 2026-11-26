// Entry for make.fun's "Invent a Word We Need" bounty.
// Writes one invented word with its one-line definition to /output/entry.txt.
// Node 22, standard library only, no network, no clock, deterministic.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "cancelief (n.) \u2014 the quiet relief when plans are cancelled and your evening is suddenly yours again.";

// The kit's gate: /output/entry.txt must be UTF-8 text of 1 to 140
// characters. Refuse to write an entry that would fail the gate instead
// of shipping a bad artifact.
if (ENTRY.length < 1 || ENTRY.length > 140) {
  console.error(`entry is ${ENTRY.length} characters, outside the 1-140 gate`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
} catch (err) {
  console.error(`failed to write entry to ${outDir}:`, err);
  process.exit(1);
}
