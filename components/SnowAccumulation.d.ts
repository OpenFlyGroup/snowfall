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
export declare function SnowAccumulation({ elementId, className, renderSnowflake, }: SnowAccumulationProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=SnowAccumulation.d.ts.map