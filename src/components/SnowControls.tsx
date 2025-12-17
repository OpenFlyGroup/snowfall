"use client";

import { Snowflake, Settings, X, Palette } from "lucide-react";
import { useSnowStore } from "../stores/snow-store";
import type { SnowTheme, SnowIntensity } from "../types";
import { useState } from "react";

const intensityPresets: Record<SnowIntensity, Partial<any>> = {
  light: { intensity: 50, windStrength: 0.5 },
  medium: { intensity: 100, windStrength: 1 },
  heavy: { intensity: 200, windStrength: 1.5 },
  blizzard: { intensity: 300, windStrength: 2 },
};

const themePresets: Record<SnowTheme, any> = {
  default: {
    colors: ["rgba(255, 255, 255, opacity)"],
  },
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
};

/**
 * Component for rendering snowfall effect controls.
 * Includes buttons for toggling snowfall, changing intensity, theme and presets.
 * Also includes input fields for customizing wind strength and accumulation.
 */
export function SnowControls() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isEnabled,
    toggle,
    config,
    updateConfig,
    resetConfig,
    presets,
    applyPreset,
  } = useSnowStore();

  return (
    <>
      {/* open/close button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Snow controls"
      >
        {isOpen ? <X size={24} /> : <Snowflake size={24} />}
      </button>

      {/* snowfall controls */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-200">
          <div className="space-y-6">
            {/* header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Snowflake size={20} />
                Snowfall Controls
              </h3>
              <button
                onClick={toggle}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isEnabled
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {isEnabled ? "Disable" : "Enable"}
              </button>
            </div>

            {/* Intensity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intensity
              </label>
              <div className="flex gap-2 mb-2">
                {Object.entries(intensityPresets).map(([name, preset]) => (
                  <button
                    key={name}
                    onClick={() => updateConfig(preset)}
                    className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg capitalize"
                  >
                    {name}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="10"
                max="500"
                value={config.intensity}
                onChange={(e) =>
                  updateConfig({ intensity: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            {/* Themes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Palette size={16} className="inline mr-2" />
                Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(themePresets).map(([name, theme]) => (
                  <button
                    key={name}
                    onClick={() => updateConfig(theme)}
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg capitalize"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets */}
            {presets.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Settings size={16} className="inline mr-2" />
                  Presets
                </label>
                <div className="space-y-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset.name)}
                      className="w-full px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-left"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Settings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Wind Strength</span>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={config.windStrength}
                  onChange={(e) =>
                    updateConfig({ windStrength: parseFloat(e.target.value) })
                  }
                  className="w-32"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Accumulation</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.accumulation}
                    onChange={(e) =>
                      updateConfig({ accumulation: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" />
                </label>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={resetConfig}
              className="w-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Reset to Default
            </button>
          </div>
        </div>
      )}
    </>
  );
}
