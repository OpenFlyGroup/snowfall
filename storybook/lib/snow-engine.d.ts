import { SnowflakeConfig, SnowConfig } from '../types';
export declare class SnowEngine {
    private canvas;
    private ctx;
    private snowflakes;
    private animationId?;
    private lastTime;
    private isRunning;
    private config;
    private width;
    private height;
    private handleResize;
    /**
     * Constructor for the SnowEngine class.
     * @param {HTMLCanvasElement} canvas - The canvas element on which to render the snowfall effect.
     * @param {SnowConfig} config - The snow configuration object.
     */
    constructor(canvas: HTMLCanvasElement, config: SnowConfig);
    /**
     * Initializes the snow engine.
     * Resizes the canvas to fit the window size and
     * adds an event listener for window resizes.
     * Also creates the initial snowflakes.
     */
    init(): void;
    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Starts the snowfall animation.
     * If the animation is already running, this method does nothing.
     */
    /*******  98190bf2-a7d7-49f4-b479-d37bb8f3d379  *******/
    start(): void;
    /**
     * Stops the snowfall animation.
     * If the animation is not running, this method does nothing.
     */
    stop(): void;
    /**
     * Destroys the snow engine.
     *Stops the animation, removes the window resize event listener and clears the snowflake array.
     */
    destroy(): void;
    /**
     * Updates the snow engine's configuration with the given partial configuration.
     * Any properties not specified in the partial configuration will be left unchanged.
     * @param {Partial<SnowConfig>} config - A partial configuration object.
     */
    updateConfig(config: Partial<SnowConfig>): void;
    /**
     * Returns the array of current snowflakes.
     * @returns {SnowflakeConfig[]} The current array of snowflakes.
     */
    getSnowflakes(): SnowflakeConfig[];
    /**
     * Adds a new snowflake to the snow engine's array of snowflakes.
     * Any properties not specified in the partial snowflake configuration will be randomly generated.
     * The added snowflake will be given a unique ID.
     * @param {Partial<SnowflakeConfig>} flake - A partial snowflake configuration object.
     */
    addSnowflake(flake: Partial<SnowflakeConfig>): void;
    /**
     * Resizes the canvas to fit the current viewport, taking into account the device pixel ratio.
     * This is necessary to ensure that the canvas is rendered at the correct resolution.
     * The canvas's width and height are updated to match the viewport's width and height,
     * and the canvas context is scaled to match the device pixel ratio.
     * The canvas's CSS width and height are also updated to match the viewport's width and height.
     */
    private resizeCanvas;
    /**
     * Creates an initial array of snowflakes based on the intensity config.
     * The number of snowflakes created is approximately 30% of the intensity value.
     * This method is called when the snow engine is initialized to create an initial set of snowflakes.
     */
    private createInitialSnowflakes;
    private animate;
    /**
     * Updates the position and rotation of all snowflakes by the given delta time.
     * Snowflakes that move out of bounds are reset to a random position at the top of the canvas.
     * Snowflakes that move out of horizontal bounds are wrapped around to the opposite side.
     * @param {number} deltaTime - The time delta in milliseconds since the last update.
     */
    private updateSnowflakes;
    /**
     * Draws all snowflakes on the canvas.
     * Each snowflake is translated to its position, rotated to its rotation, and filled with a color based on its opacity.
     * The shape of the snowflake is determined by its `shape` property and can be either "star", "cross", or the default "circle".
     */
    private drawSnowflakes;
    /**
     * Draws a filled circle on the canvas at the current position.
     * The circle will have a radius of `size`.
     * @param {number} size - The radius of the circle.
     */
    private drawCircle;
    /**
     * Draws a filled star on the canvas at the current position.
     * The star will have `spikes` number of spikes, with an outer radius of `size` and an inner radius of `size * 0.5`.
     * @param {number} size - The outer radius of the star.
     */
    private drawStar;
    /**
     * Draws a filled cross on the canvas at the current position.
     * The cross will have an outer size of `size` and an inner size of `size * 0.66`.
     * @param {number} size - The outer size of the cross.
     */
    private drawCross;
    /**
     * Returns a random color from the configured colors list, with the opacity replaced by the given value.
     * @param {number} opacity - The opacity value to replace in the color string.
     * @returns {string} A color string with the given opacity value.
     */
    private getSnowflakeColor;
    /**
     * Returns a random size value for a snowflake within the configured range.
     * The size is calculated as a random value between the minimum and maximum configured sizes.
     * @returns {number} A random size value for a snowflake.
     */
    private randomSize;
    /**
     * Returns a random shape string from the configured shapes list.
     * The shape is randomly selected from the configured list of shapes.
     * @returns {"circle" | "star" | "cross"} A random shape string.
     */
    private randomShape;
    /**
     * Clears the entire canvas by drawing a transparent rectangle over it.
     * This is used to clear the canvas before redrawing all snowflakes.
     */
    private clearCanvas;
}
//# sourceMappingURL=snow-engine.d.ts.map