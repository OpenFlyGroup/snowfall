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

export function SnowAccumulation({
  elementId,
  className = "",
  renderSnowflake,
}: SnowAccumulationProps) {
  // eslint-disable-next-line react-hooks/purity
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [snowflakes, setSnowflakes] = useState<StuckSnowflake[]>([]);
  const { stuckSnowflakes } = useSnowStore();

  // Обновляем время для анимации
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100); // Обновляем 10 раз в секунду

    return () => clearInterval(interval);
  }, []);

  // Обновляем снежинки
  useEffect(() => {
    const flakes = stuckSnowflakes.get(elementId) || [];
    setSnowflakes(flakes);
  }, [stuckSnowflakes, elementId]);

  const renderedFlakes = useMemo(() => {
    return snowflakes.map((flake) => {
      if (renderSnowflake) {
        return renderSnowflake(flake, currentTime);
      }

      const opacity = flake.fadeStart
        ? Math.max(0, 1 - (currentTime - flake.fadeStart) / 2000)
        : flake.opacity;

      return (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.x}px`,
            top: `${flake.y}px`,
            width: `${flake.size * 2}px`,
            height: `${flake.size * 2}px`,
            opacity,
            transform: `translate(-50%, -50%) rotate(${flake.rotation}rad)`,
            transition: "opacity 0.3s ease-out",
          }}
        />
      );
    });
  }, [snowflakes, currentTime, renderSnowflake]);

  if (snowflakes.length === 0) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {renderedFlakes}
    </div>
  );
}
