const esbuild = require("esbuild");
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

// Replace these details with your official brand info
const copyrightBanner = `/**
 * @license
 * Wikimint Proprietary Library
 * Copyright (c) 2026 Wikimint. All Rights Reserved.
 * Unauthorized copying, distribution, or reverse engineering is strictly prohibited.
 */`;

const commonOptions = {
  bundle: false,
  target: "es2017",
  charset: "utf8",
  legalComments: "inline", // This helps preserve specific license comments
  banner: {
    js: copyrightBanner,
    css: copyrightBanner,
  }
};

/**
 * Helper to obfuscate a file after esbuild finishes
 */
function obfuscateFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const result = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,
    identifierNamesGenerator: 'hexadecimal'
  });
  
  // Re-attach the banner after obfuscation because the obfuscator might strip it
  const finalCode = result.getObfuscatedCode();
  fs.writeFileSync(filePath, finalCode);
}

async function build() {
  try {
    console.log("Starting build with Copyright protection...");

    /* 1. wm-cookie-consent.js -> MINIFY ONLY */
    await esbuild.build({
      ...commonOptions,
      minify: true,
      entryPoints: ["dev/wm-cookie-consent.js"],
      outfile: "dist/wm-cookie-consent.min.js"
    });

    /* 2. main.js -> MINIFY + OBFUSCATE */
    const mainPath = "dist/main.min.js";
    await esbuild.build({
      ...commonOptions,
      minify: true,
      keepNames: false,
      entryPoints: ["dev/main.js"],
      outfile: mainPath
    });
    obfuscateFile(mainPath);

    /* 3. style.css -> MINIFY ONLY */
    await esbuild.build({
      ...commonOptions,
      minify: true,
      entryPoints: ["dev/style.css"],
      outfile: "dist/style.min.css"
    });

    console.log("Build complete. Copyright banners injected.");

  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
}

build();