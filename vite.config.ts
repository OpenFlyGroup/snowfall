import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
      exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Snowfall",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "cjs" ? "cjs" : "js"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "zustand"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          zustand: "zustand",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
