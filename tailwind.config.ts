import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./demo/**/*.{html,ts,tsx,jsx,tsx,mdx}",
    "./docs/**/*.{md,mdx}",
    "./.storybook/**/*.{ts,tsx,mdx}",
  ],
};

export default config;

