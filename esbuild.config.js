const esbuild = require("esbuild");

const commonOptions = {
  bundle: false,
  target: "es2017",
  charset: "utf8",
  legalComments: "none"
};

const minifyOptions = {
  ...commonOptions,
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  drop: ["console", "debugger"],
  define: {
    "process.env.NODE_ENV": '"production"'
  }
};

async function build() {
  try {

    /* wm-cookie-consent JS */

    await esbuild.build({
      ...commonOptions,
      entryPoints: ["src/wm-cookie-consent.js"],
      outfile: "dist/wm-cookie-consent.js"
    });

    await esbuild.build({
      ...minifyOptions,
      entryPoints: ["src/wm-cookie-consent.js"],
      outfile: "dist/wm-cookie-consent.min.js"
    });


    /* main JS */

    await esbuild.build({
      ...commonOptions,
      entryPoints: ["src/main.js"],
      outfile: "dist/main.js"
    });

    await esbuild.build({
      ...minifyOptions,
      entryPoints: ["src/main.js"],
      outfile: "dist/main.min.js"
    });


    /* CSS */

    await esbuild.build({
      ...commonOptions,
      entryPoints: ["src/style.css"],
      outfile: "dist/style.css"
    });

    await esbuild.build({
      ...commonOptions,
      minify: true,
      entryPoints: ["src/style.css"],
      outfile: "dist/style.min.css"
    });

    console.log("Build completed successfully");

  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
}

build();