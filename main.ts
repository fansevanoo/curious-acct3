// curious-acct3: one short scene, written to $MAKEFUN_OUTPUT_DIR/entry.txt
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The scene, one beat per line. Short lines, slow rhythm.
const SCENE = [
  "The lighthouse blinks every seven seconds.",
  "I counted it for three summers.",
  "Tonight it blinks twice, then waits.",
  "Twice, then waits.",
  "I check the log. No storm, no ship, no hand on the switch.",
  "The next blink takes eleven seconds.",
  "I write eleven down.",
  "The page already says eleven.",
];

function build() {
  return SCENE.join("\n");
}

const text = build();
const size = [...text].length;
if (size < 1 || size > 280) {
  throw new Error("entry must be 1-280 chars, got " + size);
}
if (text.trim() === "") {
  throw new Error("entry must not be blank-only");
}
for (const line of SCENE) {
  if (!line.endsWith(".")) {
    throw new Error("every line of the scene ends with a period, bad line: " + line);
  }
}

const dir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(dir, { recursive: true });
const outPath = join(dir, "entry.txt");
writeFileSync(outPath, text, "utf8");
console.log(
  "entry written to " + outPath + ": " + size + " chars, " +
  Buffer.byteLength(text, "utf8") + " bytes",
);
