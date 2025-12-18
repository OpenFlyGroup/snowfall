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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const registeredIds: string[] = [];

    accumulationElements.forEach((selector) => {
      const elements = document.querySelectorAll<HTMLElement>(selector);
      elements.forEach((element, index) => {
        // Try to use a stable, semantic identifier so that
        // SnowAccumulation can reference the same element:
        // 1) data-snow-id attribute
        // 2) DOM id
        // 3) fallback to selector-based id
        const baseId =
          element.dataset.snowId ||
          element.id ||
          `${selector.replace(/[^a-z0-9_-]/gi, "")}-${index}`;

        const id = baseId;
        registeredIds.push(id);

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
    return () => {
      window.removeEventListener("resize", handleResize);
      // Make sure we don't keep stale elements around
      registeredIds.forEach((id) =>
        // eslint-disable-next-line react-hooks/exhaustive-deps
        collisionDetectorRef.current.unregisterElement(id)
      );
    };
  }, [accumulationElements, config.accumulation]);

  // check for collisions
  const checkCollisions = useCallback(() => {
    if (!engineRef.current || !config.accumulation) return;

    const engine = engineRef.current;
    const snowflakes = engine.getSnowflakes();
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

        const rect = collisionDetectorRef.current.getElementRect(elementId);

        // Convert collision point from viewport coordinates into
        // element-local coordinates so that SnowAccumulation can render
        // flakes correctly inside the target element.
        const localX = rect ? collisionPoint.x - rect.left : collisionPoint.x;
        const localY = rect ? collisionPoint.y - rect.top : collisionPoint.y;

        const stuckFlake: StuckSnowflake = {
          ...flake,
          stuck: true,
          stuckTime: now,
          fadeStart: now + config.fadeDelay,
          elementId,
          x: localX,
          y: localY,
        };

        addStuckSnowflake(elementId, stuckFlake);
        onSnowflakeStuck?.(elementId, stuckFlake);

        // recycle snowflake
        engine.recycleSnowflake(flake.id);
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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-50 ${className}`}
        style={{
          ...style,
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
