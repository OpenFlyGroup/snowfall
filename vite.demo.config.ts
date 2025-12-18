import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages will serve the site from /snowfall/
  // (https://openflygroup.github.io/snowfall/)
  base: "/snowfall/",
  build: {
    outDir: "dist-demo",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "demo/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
