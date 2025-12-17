import type { SnowConfig } from "./types";

export { SnowCanvas } from "./components/SnowCanvas";
export { SnowAccumulation } from "./components/SnowAccumulation";
export { SnowControls } from "./components/SnowControls";
export { useSnow } from "./hooks/useSnow";
export { useSnowStore } from "./stores/snow-store";

// Types
export type {
  SnowConfig,
  SnowflakeConfig,
  StuckSnowflake,
  SnowPreset,
  SnowIntensity,
  SnowTheme,
} from "./types";

// Presets
export const presets = {
  intensity: {
    light: { intensity: 50, windStrength: 0.5 },
    medium: { intensity: 100, windStrength: 1 },
    heavy: { intensity: 200, windStrength: 1.5 },
    blizzard: { intensity: 300, windStrength: 2 },
  },
  themes: {
    default: { colors: ["rgba(255, 255, 255, opacity)"] },
    blue: {
      colors: [
        "rgba(255, 255, 255, opacity)",
        "rgba(173, 216, 230, opacity)",
        "rgba(135, 206, 250, opacity)",
      ],
    },
    purple: {
      colors: [
        "rgba(255, 255, 255, opacity)",
        "rgba(216, 191, 216, opacity)",
        "rgba(221, 160, 221, opacity)",
      ],
    },
    gold: {
      colors: [
        "rgba(255, 255, 255, opacity)",
        "rgba(255, 215, 0, opacity)",
        "rgba(255, 248, 220, opacity)",
      ],
    },
    rainbow: {
      colors: [
        "rgba(255, 255, 255, opacity)",
        "rgba(255, 192, 203, opacity)",
        "rgba(173, 216, 230, opacity)",
        "rgba(144, 238, 144, opacity)",
        "rgba(255, 255, 224, opacity)",
      ],
    },
    pastel: {
      colors: [
        "rgba(255, 255, 255, opacity)",
        "rgba(255, 192, 203, opacity)",
        "rgba(173, 216, 230, opacity)",
        "rgba(144, 238, 144, opacity)",
        "rgba(255, 255, 224, opacity)",
      ],
    },
  },
};

// Utils
export function createSnowConfig(config: Partial<SnowConfig>): SnowConfig {
  return {
    intensity: 100,
    windStrength: 1,
    snowflakeSize: { min: 2, max: 6 },
    colors: ["rgba(255, 255, 255, opacity)"],
    shapes: ["circle", "star", "cross"],
    accumulation: true,
    fadeDelay: 5000,
    fadeDuration: 2000,
    maxStuckSnowflakes: 50,
    interactive: true,
    performance: "medium",
    ...config,
  };
}
