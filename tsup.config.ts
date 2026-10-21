import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/index.css"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: false,
  external: ["react", "react-dom", "zustand", "./index.css"],
  outDir: "dist",
  injectStyle: false,
  banner: {
    js: '"use client";',
  },
});
