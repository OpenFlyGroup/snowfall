import type { SnowflakeConfig, SnowConfig } from "../types";

export class SnowEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private snowflakes: SnowflakeConfig[] = [];
  private animationId?: number;
  private lastTime = 0;
  private isRunning = false;
  private config: SnowConfig = {} as SnowConfig;

  /**
   * Constructor for the SnowEngine class.
   * @param {HTMLCanvasElement} canvas - The canvas element on which to render the snowfall effect.
   * @param {SnowConfig} config - The snow configuration object.
   */
  constructor(canvas: HTMLCanvasElement, config: SnowConfig) {
    this.canvas = canvas;
    this.config = config;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not found");
    this.ctx = ctx;
  }

  /**
   * Initializes the snow engine.
   * Resizes the canvas to fit the window size and
   * adds an event listener for window resizes.
   * Also creates the initial snowflakes.
   */
  init() {
    this.resizeCanvas();
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    this.createInitialSnowflakes();
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Starts the snowfall animation.
   * If the animation is already running, this method does nothing.
   */
  /*******  98190bf2-a7d7-49f4-b479-d37bb8f3d379  *******/
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animate();
  }

  /**
   * Stops the snowfall animation.
   * If the animation is not running, this method does nothing.
   */
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  /**
   * Destroys the snow engine.
   *Stops the animation, removes the window resize event listener and clears the snowflake array.
   */
  destroy() {
    this.stop();
    window.removeEventListener("resize", this.resizeCanvas.bind(this));
    this.snowflakes = [];
  }

  /**
   * Updates the snow engine's configuration with the given partial configuration.
   * Any properties not specified in the partial configuration will be left unchanged.
   * @param {Partial<SnowConfig>} config - A partial configuration object.
   */
  updateConfig(config: Partial<SnowConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Returns the array of current snowflakes.
   * @returns {SnowflakeConfig[]} The current array of snowflakes.
   */
  getSnowflakes() {
    return this.snowflakes;
  }

  /**
   * Adds a new snowflake to the snow engine's array of snowflakes.
   * Any properties not specified in the partial snowflake configuration will be randomly generated.
   * The added snowflake will be given a unique ID.
   * @param {Partial<SnowflakeConfig>} flake - A partial snowflake configuration object.
   */
  addSnowflake(flake: Partial<SnowflakeConfig>) {
    const id = Math.random().toString(36).substr(2, 9);
    this.snowflakes.push({
      id,
      x: flake.x ?? Math.random() * this.canvas.width,
      y: flake.y ?? -10,
      size: flake.size ?? this.randomSize(),
      speed: flake.speed ?? Math.random() * 1.5 + 0.5,
      opacity: flake.opacity ?? Math.random() * 0.7 + 0.3,
      wind: flake.wind ?? (Math.random() - 0.5) * this.config.windStrength,
      rotation: flake.rotation ?? 0,
      rotationSpeed: flake.rotationSpeed ?? (Math.random() - 0.5) * 0.02,
      shape: flake.shape ?? this.randomShape(),
    });
  }

  /**
   * Resizes the canvas to fit the current viewport, taking into account the device pixel ratio.
   * This is necessary to ensure that the canvas is rendered at the correct resolution.
   * The canvas's width and height are updated to match the viewport's width and height,
   * and the canvas context is scaled to match the device pixel ratio.
   * The canvas's CSS width and height are also updated to match the viewport's width and height.
   */
  private resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  /**
   * Creates an initial array of snowflakes based on the intensity config.
   * The number of snowflakes created is approximately 30% of the intensity value.
   * This method is called when the snow engine is initialized to create an initial set of snowflakes.
   */
  private createInitialSnowflakes() {
    const count = Math.floor(this.config.intensity * 0.3);
    for (let i = 0; i < count; i++) {
      this.addSnowflake({});
    }
  }

  private animate = (time = 0) => {
    if (!this.isRunning) return;

    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    // update snowflakes
    this.updateSnowflakes(deltaTime);

    // clear and draw
    this.clearCanvas();
    this.drawSnowflakes();

    // add new snowflakes
    if (this.snowflakes.length < this.config.intensity) {
      if (Math.random() > 0.7) {
        this.addSnowflake({});
      }
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  /**
   * Updates the position and rotation of all snowflakes by the given delta time.
   * Snowflakes that move out of bounds are reset to a random position at the top of the canvas.
   * Snowflakes that move out of horizontal bounds are wrapped around to the opposite side.
   * @param {number} deltaTime - The time delta in milliseconds since the last update.
   */
  private updateSnowflakes(deltaTime: number) {
    const normalDelta = deltaTime / 16; // normalize to ~60fps

    this.snowflakes.forEach((flake) => {
      flake.y += flake.speed * normalDelta;
      flake.x += flake.wind * normalDelta;
      flake.rotation += flake.rotationSpeed * normalDelta;

      // return to top if out of bounds
      if (flake.y > this.canvas.height) {
        flake.y = -10;
        flake.x = Math.random() * this.canvas.width;
      }

      // wrap around horizontally
      if (flake.x > this.canvas.width) flake.x = 0;
      if (flake.x < 0) flake.x = this.canvas.width;
    });
  }

  /**
   * Draws all snowflakes on the canvas.
   * Each snowflake is translated to its position, rotated to its rotation, and filled with a color based on its opacity.
   * The shape of the snowflake is determined by its `shape` property and can be either "star", "cross", or the default "circle".
   */
  private drawSnowflakes() {
    this.snowflakes.forEach((flake) => {
      this.ctx.save();
      this.ctx.translate(flake.x, flake.y);
      this.ctx.rotate(flake.rotation);

      this.ctx.fillStyle = this.getSnowflakeColor(flake.opacity);

      switch (flake.shape) {
        case "star":
          this.drawStar(flake.size);
          break;
        case "cross":
          this.drawCross(flake.size);
          break;
        default:
          this.drawCircle(flake.size);
      }

      this.ctx.restore();
    });
  }

  /**
   * Draws a filled circle on the canvas at the current position.
   * The circle will have a radius of `size`.
   * @param {number} size - The radius of the circle.
   */
  private drawCircle(size: number) {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /**
   * Draws a filled star on the canvas at the current position.
   * The star will have `spikes` number of spikes, with an outer radius of `size` and an inner radius of `size * 0.5`.
   * @param {number} size - The outer radius of the star.
   */
  private drawStar(size: number) {
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size * 0.5;

    this.ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI * i) / spikes;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  /**
   * Draws a filled cross on the canvas at the current position.
   * The cross will have an outer size of `size` and an inner size of `size * 0.66`.
   * @param {number} size - The outer size of the cross.
   */
  private drawCross(size: number) {
    this.ctx.fillRect(-size, -size / 3, size * 2, size * 0.66);
    this.ctx.fillRect(-size / 3, -size, size * 0.66, size * 2);
  }

  /**
   * Returns a random color from the configured colors list, with the opacity replaced by the given value.
   * @param {number} opacity - The opacity value to replace in the color string.
   * @returns {string} A color string with the given opacity value.
   */
  private getSnowflakeColor(opacity: number): string {
    const color =
      this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
    return color.replace("opacity", opacity.toString());
  }

  /**
   * Returns a random size value for a snowflake within the configured range.
   * The size is calculated as a random value between the minimum and maximum configured sizes.
   * @returns {number} A random size value for a snowflake.
   */
  private randomSize(): number {
    return (
      Math.random() *
        (this.config.snowflakeSize.max - this.config.snowflakeSize.min) +
      this.config.snowflakeSize.min
    );
  }

  /**
   * Returns a random shape string from the configured shapes list.
   * The shape is randomly selected from the configured list of shapes.
   * @returns {"circle" | "star" | "cross"} A random shape string.
   */
  private randomShape(): "circle" | "star" | "cross" {
    return this.config.shapes[
      Math.floor(Math.random() * this.config.shapes.length)
    ];
  }

  /**
   * Clears the entire canvas by drawing a transparent rectangle over it.
   * This is used to clear the canvas before redrawing all snowflakes.
   */
  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
