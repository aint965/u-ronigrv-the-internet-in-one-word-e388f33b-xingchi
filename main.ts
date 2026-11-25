// SPDX-License-Identifier: MIT
// Enshittification — The Internet in One Word
//
// Writes the entry's single word to <output dir>/entry.txt.
// Usage: node main.ts [output-dir]
//   or: OUTPUT_DIR=<dir> node main.ts
// Defaults to /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "enshittification";

function main(): void {
  const outputDir = process.argv[2] ?? process.env.OUTPUT_DIR ?? "/output";

  // Validate BEFORE writing: a bad word must never leave a bad file behind.
  const length = [...WORD].length;
  if (length < 1 || length > 30) {
    console.error(
      `error: entry must be 1-30 characters, got ${length}`,
    );
    process.exit(1);
  }
  if (WORD.trim() === "") {
    console.error("error: entry must not be only whitespace");
    process.exit(1);
  }

  mkdirSync(outputDir, { recursive: true });

  const filePath = join(outputDir, "entry.txt");
  writeFileSync(filePath, WORD, "utf8");

  console.log(`wrote ${length} characters to ${filePath}`);
}

main();
