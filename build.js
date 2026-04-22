// build.js — bundles all Evadgency JS modules into a single file using Rollup.
//
// WHY ROLLUP?
// Your source files use ES module syntax (import/export). A browser can run
// these as-is only when served from a server. Rollup walks the import tree
// starting from your entry points, merges everything into one file, and strips
// all the import/export statements — leaving plain JS any browser can run
// directly from the filesystem.
//
// Run with: node build.js

import { rollup } from 'rollup';
import { readFileSync, writeFileSync } from 'fs';

// Rollup needs a single entry point to start walking imports from.
// gameLoop.js is the core — it imports everything else either directly
// or transitively. menuFunctions.js is a second entry point since index.html
// loads both. We bundle them together using an 'array' input.
const inputOptions = {
  input: 'Evadgency_JS/main.js',

  // Rollup warns about certain patterns. We suppress the circular dependency
  // warning because we've already resolved the real circular import manually.
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  }
};

// 'iife' = Immediately Invoked Function Expression.
// This wraps everything in a self-calling function: (function() { ... })()
// That means all your variables stay scoped inside and don't leak onto
// window/global — safe for a static HTML page with no module support needed.
const outputOptions = {
  file: 'evadgency.bundle.js',
  format: 'iife',
  name: 'Evadgency',
};

async function build() {
  console.log('Building Evadgency bundle...');

  let bundle;
  try {
    // rollup() follows every import starting from the entry points,
    // resolves them, and returns a bundle object ready to write.
    bundle = await rollup(inputOptions);

    // generate() produces the output in memory so we can inspect it.
    const { output } = await bundle.generate(outputOptions);

    // write() saves it to disk at the path specified in outputOptions.file
    await bundle.write(outputOptions);

    const bytes = output[0].code.length;
    console.log(`✓ Built evadgency.bundle.js (${(bytes / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error('Build failed:', err.message);
    process.exit(1);
  } finally {
    // Always close the bundle to free file handles
    if (bundle) await bundle.close();
  }
}

build();
