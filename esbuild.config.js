const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/wm-cookie-consent.js"],
  bundle: false,
  outfile: "dist/wm-cookie-consent.js",
  minify: false,
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ["src/wm-cookie-consent.js"],
  bundle: false,
  outfile: "dist/wm-cookie-consent.min.js",
  minify: true,
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ["src/main.js"],
  bundle: false,
  outfile: "dist/main.js",
  minify: false,
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ["src/main.js"],
  bundle: false,
  outfile: "dist/main.min.js",
  minify: true,
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ["src/style.css"],
  bundle: false,
  outfile: "dist/style.css",
  minify: false,
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ["src/style.css"],
  bundle: false,
  outfile: "dist/style.min.css",
  minify: true,
}).catch(() => process.exit(1));