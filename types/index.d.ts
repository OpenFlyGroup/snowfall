export interface SnowflakeConfig {
    id: string;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    wind: number;
    rotation: number;
    rotationSpeed: number;
    shape: "circle" | "star" | "cross";
}
export interface StuckSnowflake extends SnowflakeConfig {
    stuck: boolean;
    stuckTime: number;
    fadeStart: number;
    elementId?: string;
}
export interface SnowConfig {
    intensity: number;
    windStrength: number;
    snowflakeSize: {
        min: number;
        max: number;
    };
    colors: string[];
    shapes: Array<"circle" | "star" | "cross">;
    accumulation: boolean;
    fadeDelay: number;
    fadeDuration: number;
    maxStuckSnowflakes: number;
    interactive: boolean;
    performance: "low" | "medium" | "high";
}
export interface SnowPreset {
    name: string;
    config: Partial<SnowConfig>;
}
export type SnowIntensity = "light" | "medium" | "heavy" | "blizzard";
export type SnowTheme = "default" | "blue" | "purple" | "gold" | "rainbow";
//# sourceMappingURL=index.d.ts.map