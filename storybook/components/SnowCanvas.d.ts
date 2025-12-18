import { StuckSnowflake } from '../types';
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
export declare function SnowCanvas({ className, style, accumulationElements, onSnowflakeStuck, }: SnowCanvasProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=SnowCanvas.d.ts.map