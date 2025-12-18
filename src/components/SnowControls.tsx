"use client";

import React from "react";
import {
  Snowflake,
  Settings,
  X,
  Palette,
  Wind,
  Layers,
  Zap,
} from "lucide-react";
import { useSnowStore } from "../stores/snow-store";
import type { SnowConfig } from "../types";

interface IntensityPreset {
  name: string;
  config: Partial<SnowConfig>;
  icon: React.ReactNode;
}

interface ThemePreset {
  name: string;
  config: Partial<SnowConfig>;
  color: string;
}

/**
 * Snowfall Controls
 *
 * A dropdown menu for controlling snowfall intensity, wind strength and theme.
 *
 * @returns {JSX.Element} The Snowfall Controls component.
 */
export function SnowControls() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIntensity, setActiveIntensity] =
    React.useState<string>("medium");
  const [activeTheme, setActiveTheme] = React.useState<string>("default");

  const {
    isEnabled,
    toggle,
    config,
    updateConfig,
    resetConfig,
    presets,
    applyPreset,
  } = useSnowStore();

  const intensityPresets: IntensityPreset[] = [
    {
      name: "light",
      config: { intensity: 50, windStrength: 0.5 },
      icon: <Snowflake size={12} />,
    },
    {
      name: "medium",
      config: { intensity: 100, windStrength: 1 },
      icon: <Snowflake size={14} />,
    },
    {
      name: "heavy",
      config: { intensity: 200, windStrength: 1.5 },
      icon: <Snowflake size={16} />,
    },
    {
      name: "blizzard",
      config: { intensity: 300, windStrength: 2 },
      icon: <Zap size={14} />,
    },
  ];

  const themePresets: ThemePreset[] = [
    {
      name: "default",
      config: { colors: ["rgba(255, 255, 255, 0.8)"] },
      color: "bg-gradient-to-br from-slate-100 to-slate-300",
    },
    {
      name: "blue",
      config: {
        colors: [
          "rgba(255, 255, 255, 0.9)",
          "rgba(173, 216, 230, 0.8)",
          "rgba(135, 206, 250, 0.7)",
        ],
      },
      color: "bg-gradient-to-br from-sky-100 to-blue-300",
    },
    {
      name: "purple",
      config: {
        colors: [
          "rgba(255, 255, 255, 0.9)",
          "rgba(216, 191, 216, 0.8)",
          "rgba(221, 160, 221, 0.7)",
        ],
      },
      color: "bg-gradient-to-br from-violet-100 to-purple-300",
    },
    {
      name: "gold",
      config: {
        colors: [
          "rgba(255, 255, 255, 0.9)",
          "rgba(255, 215, 0, 0.8)",
          "rgba(255, 248, 220, 0.7)",
        ],
      },
      color: "bg-gradient-to-br from-amber-100 to-yellow-300",
    },
  ];

  const handleIntensityPreset = (preset: IntensityPreset) => {
    setActiveIntensity(preset.name);
    updateConfig(preset.config);
  };

  const handleThemePreset = (theme: ThemePreset) => {
    setActiveTheme(theme.name);
    updateConfig(theme.config);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-linear-to-br from-slate-900/80 to-slate-800/90 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-slate-800/90 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        aria-label="Snow controls"
      >
        {isOpen ? (
          <X size={20} className="transition-transform duration-300" />
        ) : (
          <div className="relative">
            <Snowflake size={20} className="animate-pulse" />
            {isEnabled && (
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-sky-400"></span>
            )}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-6 z-50 rounded-2xl border border-white/10 bg-linear-to-br from-slate-900/95 to-slate-800/95 p-6 shadow-[0_20px_70px_-15px_rgba(2,6,23,0.9)] backdrop-blur-xl text-slate-100 animate-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-sky-500/30 to-blue-600/30 text-sky-300">
                <Snowflake size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-tight tracking-tight">
                  Snowfall Controls
                </h3>
                <p className="text-xs text-slate-400/80">
                  Adjust snowfall intensity, wind and theme
                </p>
              </div>
            </div>
            <button
              onClick={toggle}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                isEnabled
                  ? "bg-linear-to-r from-rose-500/20 to-rose-600/20 text-rose-200 hover:from-rose-500/30 hover:to-rose-600/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                  : "bg-linear-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-200 hover:from-emerald-500/30 hover:to-emerald-600/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              }`}
            >
              {isEnabled ? "Disable" : "Enable"}
            </button>
          </div>

          {/* Intensity Section */}
          <div className="space-y-3.5">
            <label className="flex items-center justify-between text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-sky-400" />
                <span>Intensity</span>
              </div>
              <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                {config.intensity} flakes
              </span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {intensityPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleIntensityPreset(preset)}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs capitalize transition-all duration-200 ${
                    activeIntensity === preset.name
                      ? "border-sky-500/50 bg-linear-to-b from-sky-500/15 to-transparent text-sky-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                      : "border-slate-700/50 bg-slate-800/40 text-slate-200 hover:border-sky-500/30 hover:bg-slate-800/70"
                  }`}
                >
                  <div
                    className={`${
                      activeIntensity === preset.name
                        ? "text-sky-300"
                        : "text-slate-400"
                    }`}
                  >
                    {preset.icon}
                  </div>
                  {preset.name}
                </button>
              ))}
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                min="10"
                max="500"
                value={config.intensity}
                onChange={(e) =>
                  updateConfig({ intensity: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-linear-to-r from-slate-700 to-slate-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-linear-to-r [&::-webkit-slider-thumb]:from-sky-400 [&::-webkit-slider-thumb]:to-blue-500 [&::-webkit-slider-thumb]:shadow-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 px-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="space-y-3.5">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Palette size={14} className="text-purple-400" />
              <span>Snow Theme</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {themePresets.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleThemePreset(theme)}
                  className={`group relative overflow-hidden rounded-xl border p-3 text-xs capitalize transition-all duration-300 ${
                    activeTheme === theme.name
                      ? "border-purple-500/50 bg-linear-to-br from-purple-500/10 to-transparent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                      : "border-slate-700/50 bg-slate-800/40 hover:border-purple-500/30 hover:bg-slate-800/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        activeTheme === theme.name
                          ? "text-purple-100"
                          : "text-slate-200"
                      }`}
                    >
                      {theme.name}
                    </span>
                    <div
                      className={`h-5 w-5 rounded-full ${theme.color} shadow-inner`}
                    ></div>
                  </div>
                  {activeTheme === theme.name && (
                    <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-500/5 to-transparent"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Saved Presets */}
          {presets.length > 0 && (
            <div className="space-y-3.5">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Settings size={14} className="text-amber-400" />
                <span>Saved Presets</span>
              </label>
              <div className="space-y-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset.name)}
                    className="group w-full rounded-xl border border-amber-600/30 bg-linear-to-r from-amber-500/10 to-transparent px-4 py-2.5 text-left text-xs font-medium text-amber-100 transition-all duration-200 hover:border-amber-500/50 hover:from-amber-500/20 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  >
                    <div className="flex items-center justify-between">
                      <span>{preset.name}</span>
                      <span className="text-[10px] text-amber-300/70 group-hover:text-amber-200">
                        Apply →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Controls */}
          <div className="space-y-4 rounded-xl border border-white/5 bg-linear-to-br from-slate-800/60 to-slate-900/60 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind size={14} className="text-cyan-400" />
                  <span className="text-xs font-medium text-slate-300">
                    Wind Strength
                  </span>
                </div>
                <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
                  {config.windStrength.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={config.windStrength}
                onChange={(e) =>
                  updateConfig({ windStrength: parseFloat(e.target.value) })
                }
                className="w-full h-1.5 bg-linear-to-r from-slate-700 to-slate-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-linear-to-r [&::-webkit-slider-thumb]:from-cyan-400 [&::-webkit-slider-thumb]:to-blue-400 [&::-webkit-slider-thumb]:shadow-lg"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-emerald-400" />
                <span className="text-xs font-medium text-slate-300">
                  Snow Accumulation
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.accumulation}
                  onChange={(e) =>
                    updateConfig({ accumulation: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-700 transition-all duration-300 peer-checked:bg-linear-to-r peer-checked:from-emerald-500 peer-checked:to-green-500 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400/50 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:duration-300 after:shadow-lg peer-checked:after:translate-x-full" />
              </label>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              resetConfig();
              setActiveIntensity("medium");
              setActiveTheme("default");
            }}
            className="group w-full rounded-xl border border-slate-700/80 bg-linear-to-br from-slate-800/60 to-slate-900/60 px-4 py-3 text-xs font-medium text-slate-200 transition-all duration-200 hover:border-slate-500/50 hover:bg-slate-800/80 hover:text-white"
          >
            <div className="flex items-center justify-center gap-2">
              <span>Reset to Default</span>
              <span className="opacity-0 transition-all duration-200 group-hover:opacity-100">
                ↺
              </span>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
