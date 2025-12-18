import { default as React } from '../../node_modules/react';
import { StuckSnowflake } from '../types';
interface SnowAccumulationProps {
    elementId: string;
    className?: string;
    renderSnowflake?: (flake: StuckSnowflake, currentTime: number) => React.ReactNode;
}
/**
 * Component for rendering accumulated snowflakes on a specific element.
 *
 * @prop {string} elementId - The ID of the element on which to render the accumulated snowflakes.
 * @prop {string} [className] - CSS classes for the container element.
 * @prop {(flake: StuckSnowflake, currentTime: number) => React.ReactNode} [renderSnowflake] - A function that renders a single snowflake, given its properties and the current time.
 *
 * @returns {React.ReactNode} The rendered snowflakes, or `null` if there are no snowflakes to render.
 */
export declare function SnowAccumulation({ elementId, className, renderSnowflake, }: SnowAccumulationProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=SnowAccumulation.d.ts.map