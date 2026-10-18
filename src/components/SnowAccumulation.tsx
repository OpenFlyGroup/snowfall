"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSnowStore } from "../stores/snow-store";
import type { StuckSnowflake } from "../types";

interface SnowAccumulationProps {
  elementId: string;
  className?: string;
  renderSnowflake?: (
    flake: StuckSnowflake,
    currentTime: number
  ) => React.ReactNode;
}

// Stable empty fallback so selecting a missing element does not
// produce a new array reference on every store update.
const EMPTY_FLAKES: StuckSnowflake[] = [];

/**
 * Component for rendering accumulated snowflakes on a specific element.
 *
 * @prop {string} elementId - The ID of the element on which to render the accumulated snowflakes.
 * @prop {string} [className] - CSS classes for the container element.
 * @prop {(flake: StuckSnowflake, currentTime: number) => React.ReactNode} [renderSnowflake] - A function that renders a single snowflake, given its properties and the current time.
 *
 * @returns {React.ReactNode} The rendered snowflakes, or `null` if there are no snowflakes to render.
 */
export function SnowAccumulation({
  elementId,
  className = "",
  renderSnowflake,
}: SnowAccumulationProps) {
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const snowflakes = useSnowStore(
    (state) => state.stuckSnowflakes.get(elementId) ?? EMPTY_FLAKES
  );
  const fadeDuration = useSnowStore((state) => state.config.fadeDuration);

  // Only run the clock while a fade is still in progress. When nothing is
  // fading (including an idle element) there is no time-dependent work.
  useEffect(() => {
    const hasPendingFade = () =>
      snowflakes.some(
        (flake) =>
          flake.fadeStart !== undefined &&
          Date.now() < flake.fadeStart + fadeDuration
      );

    if (!hasPendingFade()) return;

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
      if (!hasPendingFade()) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [snowflakes, fadeDuration]);

  const renderedFlakes = useMemo(() => {
    if (snowflakes.length === 0) return [];

    const bucketWidth = 16;
    const maxLevelsPerBucket = 6;

    const flakesSorted = [...snowflakes].sort(
      (a, b) => a.stuckTime - b.stuckTime
    );
    const bucketLevels = new Map<number, number>();

    const laidOutFlakes = flakesSorted.map((flake) => {
      const bucketIndex = Math.floor(flake.x / bucketWidth);
      const currentLevel = bucketLevels.get(bucketIndex) ?? 0;
      bucketLevels.set(bucketIndex, currentLevel + 1);

      const level = Math.min(currentLevel, maxLevelsPerBucket - 1);

      const baseY = flake.size;
      const piledY = baseY + level * flake.size * 1.4;

      const jitterSeed = flake.id.charCodeAt(0) || 0;
      const jitter = ((jitterSeed % 3) - 1) * (Math.max(1, flake.size) * 0.4);

      return {
        ...flake,
        piledY,
        piledX: flake.x + jitter,
      };
    });

    return laidOutFlakes.map((flake) => {
      if (renderSnowflake) {
        return renderSnowflake(flake, currentTime);
      }

      const opacity = flake.fadeStart
        ? Math.max(0, 1 - (currentTime - flake.fadeStart) / fadeDuration)
        : flake.opacity;

      return (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.piledX}px`,
            top: `${flake.piledY}px`,
            width: `${flake.size * 2}px`,
            height: `${flake.size * 2}px`,
            opacity,
            transform: `translate(-50%, -50%) rotate(${flake.rotation}rad)`,
            transition: "opacity 0.3s ease-out",
          }}
        />
      );
    });
  }, [snowflakes, currentTime, fadeDuration, renderSnowflake]);

  if (snowflakes.length === 0) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {renderedFlakes}
    </div>
  );
}
