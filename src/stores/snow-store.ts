import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SnowConfig, StuckSnowflake, SnowPreset } from "../types";

interface SnowState {
  config: SnowConfig;
  isEnabled: boolean;
  stuckSnowflakes: Map<string, StuckSnowflake[]>;
  presets: SnowPreset[];
  activePreset?: string;
}

interface SnowActions {
  toggle: () => void;
  updateConfig: (config: Partial<SnowConfig>) => void;
  resetConfig: () => void;
  addStuckSnowflake: (elementId: string, flake: StuckSnowflake) => void;
  removeStuckSnowflake: (elementId: string, flakeId: string) => void;
  clearElement: (elementId: string) => void;
  clearAll: () => void;
  addPreset: (preset: SnowPreset) => void;
  removePreset: (name: string) => void;
  applyPreset: (name: string) => void;
}

export const defaultConfig: SnowConfig = {
  intensity: 100,
  windStrength: 1,
  snowflakeSize: { min: 2, max: 6 },
  colors: ["rgba(255, 255, 255, opacity)", "rgba(240, 248, 255, opacity)"],
  shapes: ["circle", "star", "cross"],
  accumulation: true,
  fadeDelay: 5000,
  fadeDuration: 2000,
  maxStuckSnowflakes: 50,
  interactive: true,
  performance: "medium",
};

export const useSnowStore = create<SnowState & SnowActions>()(
  persist(
    (set, get) => ({
      config: defaultConfig,
      isEnabled: true,
      stuckSnowflakes: new Map(),
      presets: [
        {
          name: "Light Snow",
          config: { intensity: 50, windStrength: 0.5 },
        },
        {
          name: "Blizzard",
          config: {
            intensity: 300,
            windStrength: 2,
            snowflakeSize: { min: 3, max: 8 },
          },
        },
        {
          name: "Magic",
          config: {
            colors: [
              "rgba(255, 255, 255, opacity)",
              "rgba(200, 220, 255, opacity)",
              "rgba(255, 200, 255, opacity)",
            ],
            shapes: ["star", "cross"],
          },
        },
      ],

      toggle: () => set((state) => ({ isEnabled: !state.isEnabled })),

      updateConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig },
          activePreset: undefined,
        })),

      resetConfig: () =>
        set({ config: defaultConfig, activePreset: undefined }),

      addStuckSnowflake: (elementId, flake) =>
        set((state) => {
          const elementSnowflakes = state.stuckSnowflakes.get(elementId) || [];
          const config = get().config;

          // enforce max stuck snowflakes per element
          if (elementSnowflakes.length >= config.maxStuckSnowflakes) {
            // delete oldest
            elementSnowflakes.shift();
          }

          elementSnowflakes.push(flake);
          const newMap = new Map(state.stuckSnowflakes);
          newMap.set(elementId, elementSnowflakes);

          return { stuckSnowflakes: newMap };
        }),

      removeStuckSnowflake: (elementId, flakeId) =>
        set((state) => {
          const elementSnowflakes = state.stuckSnowflakes.get(elementId);
          if (!elementSnowflakes) return state;

          const newSnowflakes = elementSnowflakes.filter(
            (f) => f.id !== flakeId
          );
          const newMap = new Map(state.stuckSnowflakes);

          if (newSnowflakes.length === 0) {
            newMap.delete(elementId);
          } else {
            newMap.set(elementId, newSnowflakes);
          }

          return { stuckSnowflakes: newMap };
        }),

      clearElement: (elementId) =>
        set((state) => {
          const newMap = new Map(state.stuckSnowflakes);
          newMap.delete(elementId);
          return { stuckSnowflakes: newMap };
        }),

      clearAll: () => set({ stuckSnowflakes: new Map() }),

      addPreset: (preset) =>
        set((state) => ({
          presets: [...state.presets, preset],
        })),

      removePreset: (name) =>
        set((state) => ({
          presets: state.presets.filter((p) => p.name !== name),
        })),

      applyPreset: (name) =>
        set((state) => {
          const preset = state.presets.find((p) => p.name === name);
          if (preset) {
            return {
              config: { ...defaultConfig, ...preset.config },
              activePreset: name,
            };
          }
          return state;
        }),
    }),
    {
      name: "snowfall-config",
      partialize: (state) => ({
        config: state.config,
        isEnabled: state.isEnabled,
        presets: state.presets,
        activePreset: state.activePreset,
      }),
    }
  )
);
