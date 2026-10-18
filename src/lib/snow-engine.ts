import type { SnowflakeConfig, SnowConfig } from "../types";

export class SnowEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private snowflakes: SnowflakeConfig[] = [];
  private animationId?: number;
  private lastTime = 0;
  private isRunning = false;
  private config: SnowConfig = {} as SnowConfig;
  // Logical canvas size in CSS pixels (used for physics & collisions)
  private width = 0;
  private height = 0;

  // Stable resize handler to add/remove from window events
  private handleResize = () => {
    this.resizeCanvas();
  };

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
    window.addEventListener("resize", this.handleResize);
    this.createInitialSnowflakes();
  }

  /**
   * Starts the snowfall animation.
   * If the animation is already running, this method does nothing.
   */
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    // Seed the clock on the first real animation frame so the opening frame
    // does not compute a huge delta from a pre-set performance.now() value.
    this.lastTime = 0;
    this.animationId = requestAnimationFrame(this.animate);
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
    window.removeEventListener("resize", this.handleResize);
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
   * Recycles a snowflake after it has interacted with the scene
   * (for example, when it «прилипает» к элементу).
   * Instead of letting the same flake fall through the element,
   * we instantly move it back to the top with a new random X.
   *
   * @param {string} id - The id of the snowflake to recycle.
   */
  recycleSnowflake(id: string) {
    const flake = this.snowflakes.find((f) => f.id === id);
    if (!flake) return;

    flake.y = -10;
    flake.x = Math.random() * this.width;
  }

  /**
   * Adds a new snowflake to the snow engine's array of snowflakes.
   * Any properties not specified in the partial snowflake configuration will be randomly generated.
   * The added snowflake will be given a unique ID.
   * @param {Partial<SnowflakeConfig>} flake - A partial snowflake configuration object.
   */
  addSnowflake(flake: Partial<SnowflakeConfig>) {
    const id = Math.random().toString(36).slice(2, 11);
    this.snowflakes.push({
      id,
      x: flake.x ?? Math.random() * this.width,
      y: flake.y ?? -10,
      size: flake.size ?? this.randomSize(),
      speed: flake.speed ?? Math.random() * 1.5 + 0.5,
      opacity: flake.opacity ?? Math.random() * 0.7 + 0.3,
      wind: flake.wind ?? (Math.random() - 0.5) * this.config.windStrength,
      rotation: flake.rotation ?? 0,
      rotationSpeed: flake.rotationSpeed ?? (Math.random() - 0.5) * 0.02,
      shape: flake.shape ?? this.randomShape(),
      colorIndex:
        flake.colorIndex ??
        Math.floor(Math.random() * Math.max(1, this.config.colors.length)),
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

    // Store logical size in CSS pixels for physics & collisions
    this.width = rect.width;
    this.height = rect.height;

    // Match backing store size to DPR for sharp rendering
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    // Reset transform then apply DPR scaling so all drawing
    // still uses logical CSS pixel coordinates.
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // NOTE: do not touch canvas.style.width/height here. The canvas is laid
    // out by CSS (width/height 100% inside a fixed container); pinning it to
    // fixed pixels would stop it from tracking future viewport resizes.
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

    // Seed on the first frame (lastTime === 0); afterwards clamp the delta so
    // background-tab pauses or startup jitter cannot cause position jumps.
    const deltaTime =
      this.lastTime === 0 ? 0 : Math.min(Math.max(time - this.lastTime, 0), 100);
    this.lastTime = time;

    // update snowflakes
    this.updateSnowflakes(deltaTime);

    // clear and draw
    this.clearCanvas();
    this.drawSnowflakes();

    // grow toward the configured intensity, or trim when it is lowered
    if (this.snowflakes.length < this.config.intensity) {
      if (Math.random() > 0.7) {
        this.addSnowflake({});
      }
    } else if (this.snowflakes.length > this.config.intensity) {
      this.snowflakes.splice(this.config.intensity);
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
      if (flake.y > this.height) {
        flake.y = -10;
        flake.x = Math.random() * this.width;
      }

      // wrap around horizontally
      if (flake.x > this.width) flake.x = 0;
      if (flake.x < 0) flake.x = this.width;
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

      this.ctx.fillStyle = this.getSnowflakeColor(flake);

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
   * Resolves a snowflake's fill colour from the configured colours list.
   * Uses the flake's stable `colorIndex` (taken modulo the palette length) so a
   * flake keeps the same colour across frames instead of flickering, while
   * still reacting immediately when the palette changes on a theme switch.
   * @param {SnowflakeConfig} flake - The snowflake being drawn.
   * @returns {string} A colour string with the flake's opacity applied.
   */
  private getSnowflakeColor(flake: SnowflakeConfig): string {
    const colors = this.config.colors;
    if (colors.length === 0) {
      return `rgba(255, 255, 255, ${flake.opacity})`;
    }

    const index = (flake.colorIndex ?? 0) % colors.length;
    return colors[index].replace("opacity", flake.opacity.toString());
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
