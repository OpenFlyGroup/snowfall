"use client";

import { Fragment, useEffect, useState } from "react";
import { useSnowStore } from "../stores/snow-store";

interface SnowAccumulationProps {
  elementId: string;
  className?: string;
  renderSnowflake?: (flake: any) => React.ReactNode;
}

/**
 * Renders a div with absolute positioning that contains all stuck snowflakes for a given element ID.
 * Each snowflake is rendered as a rounded white div with its position, size, rotation, and opacity set accordingly.
 * A renderSnowflake function can be passed to customize the rendering of each snowflake.
 * If there are no stuck snowflakes for the given element ID, the component renders null.
 * @param {string} elementId - The ID of the element for which to render stuck snowflakes.
 * @param {string} [className=""] - An optional className to apply to the rendered div.
 * @param {function} [renderSnowflake] - An optional function to customize the rendering of each snowflake.
 * @returns {React.ReactNode} The rendered div containing all stuck snowflakes, or null if there are none.
 */
export function SnowAccumulation({
  elementId,
  className = "",
  renderSnowflake,
}: SnowAccumulationProps) {
  const [snowflakes, setSnowflakes] = useState<any[]>([]);
  const { stuckSnowflakes } = useSnowStore();

  useEffect(() => {
    const flakes = stuckSnowflakes.get(elementId) || [];
    setSnowflakes(flakes);
  }, [stuckSnowflakes, elementId]);

  if (snowflakes.length === 0) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {renderSnowflake
        ? snowflakes.map((flake) => (
            <Fragment key={flake.id}>{renderSnowflake(flake)}</Fragment>
          ))
        : snowflakes.map((flake) => {
            const opacity = flake.fadeStart
              ? Math.max(0, 1 - (Date.now() - flake.fadeStart) / 2000)
              : flake.opacity;

            return (
              <div
                key={flake.id}
                className="absolute"
                style={{
                  left: `${flake.x}px`,
                  top: `${flake.y}px`,
                  width: `${flake.size * 2}px`,
                  height: `${flake.size * 2}px`,
                  opacity,
                  transform: `translate(-50%, -50%) rotate(${flake.rotation}rad)`,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                <div className="w-full h-full bg-white rounded-full" />
              </div>
            );
          })}
    </div>
  );
}
