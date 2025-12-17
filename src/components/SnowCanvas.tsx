"use client";

import { useEffect, useRef, useCallback } from "react";
import { SnowEngine } from "../lib/snow-engine";
import { CollisionDetector } from "../lib/collision-detector";
import { useSnowStore } from "../stores/snow-store";
import type { SnowflakeConfig, StuckSnowflake } from "../types";

interface SnowCanvasProps {
  className?: string;
  style?: React.CSSProperties;
  accumulationElements?: string[];
  onSnowflakeStuck?: (elementId: string, flake: StuckSnowflake) => void;
}

/**
 * Component for rendering snowfall effect on a canvas with snowflake accumulation on specified elements.
 *
 * @prop {string} [className] - CSS classes for the canvas element.
 * @prop {object} [style] - CSS styles for the canvas element.
 * @prop {string[]} [accumulationElements] - Selectors for elements where snowflakes should accumulate.
 * @prop {function} [onSnowflakeStuck] - Function called when a snowflake collides with an element.
 */
export function SnowCanvas({
  className = "",
  style,
  accumulationElements = [],
  onSnowflakeStuck,
}: SnowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SnowEngine | null>(null);
  const collisionDetectorRef = useRef<CollisionDetector>(
    new CollisionDetector()
  );
  const stuckCheckRef = useRef<number | undefined>(undefined);

  const { isEnabled, config, addStuckSnowflake, removeStuckSnowflake } =
    useSnowStore();

  // initialize snow engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isEnabled) return;

    const engine = new SnowEngine(canvas, config);
    engineRef.current = engine;
    engine.init();
    engine.start();

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [isEnabled]);

  // update config
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateConfig(config);
    }
  }, [config]);

  // register accumulation elements
  useEffect(() => {
    if (!config.accumulation) return;

    accumulationElements.forEach((selector) => {
      const elements = document.querySelectorAll<HTMLElement>(selector);
      elements.forEach((element, index) => {
        const id = `${selector}-${index}`;
        collisionDetectorRef.current.registerElement(id, element, {
          priority: 0,
          accumulationArea: "top",
        });
      });
    });

    // update rects on resize
    const handleResize = () => {
      collisionDetectorRef.current.updateRects();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [accumulationElements, config.accumulation]);

  // check for collisions
  const checkCollisions = useCallback(() => {
    if (!engineRef.current || !config.accumulation) return;

    const snowflakes = engineRef.current.getSnowflakes();
    const now = Date.now();

    snowflakes.forEach((flake: SnowflakeConfig) => {
      const elementId = collisionDetectorRef.current.checkCollision(
        flake.x,
        flake.y
      );

      if (elementId) {
        const collisionPoint = collisionDetectorRef.current.getCollisionPoint(
          elementId,
          flake.x,
          flake.y
        );

        const stuckFlake: StuckSnowflake = {
          ...flake,
          stuck: true,
          stuckTime: now,
          fadeStart: now + config.fadeDelay,
          elementId,
          x: collisionPoint.x,
          y: collisionPoint.y,
        };

        addStuckSnowflake(elementId, stuckFlake);
        onSnowflakeStuck?.(elementId, stuckFlake);
      }
    });
  }, [
    config.accumulation,
    config.fadeDelay,
    addStuckSnowflake,
    onSnowflakeStuck,
  ]);

  // animate stuck snowflakes
  useEffect(() => {
    if (!config.accumulation) return;

    const animateStuck = () => {
      const now = Date.now();
      const { stuckSnowflakes } = useSnowStore.getState();

      stuckSnowflakes.forEach((flakes, elementId) => {
        flakes.forEach((flake) => {
          if (flake.fadeStart && now > flake.fadeStart) {
            const fadeProgress = (now - flake.fadeStart) / config.fadeDuration;

            if (fadeProgress >= 1) {
              removeStuckSnowflake(elementId, flake.id);
            }
          }
        });
      });
    };

    stuckCheckRef.current = window.setInterval(animateStuck, 100);
    return () => {
      if (stuckCheckRef.current) {
        clearInterval(stuckCheckRef.current);
      }
    };
  }, [config.accumulation, config.fadeDuration, removeStuckSnowflake]);

  // main collision check loop
  useEffect(() => {
    if (!isEnabled || !config.accumulation) return;

    const animationLoop = () => {
      checkCollisions();
      requestAnimationFrame(animationLoop);
    };

    const animationId = requestAnimationFrame(animationLoop);
    return () => cancelAnimationFrame(animationId);
  }, [isEnabled, config.accumulation, checkCollisions]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={style}
    />
  );
}
