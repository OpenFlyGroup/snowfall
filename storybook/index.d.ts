import { SnowConfig } from './types';
export { SnowCanvas } from './components/SnowCanvas';
export { SnowAccumulation } from './components/SnowAccumulation';
export { SnowControls } from './components/SnowControls';
export { useSnow } from './hooks/useSnow';
export { useSnowStore } from './stores/snow-store';
export type { SnowConfig, SnowflakeConfig, StuckSnowflake, SnowPreset, SnowIntensity, SnowTheme, } from './types';
export declare const presets: {
    intensity: {
        light: {
            intensity: number;
            windStrength: number;
        };
        medium: {
            intensity: number;
            windStrength: number;
        };
        heavy: {
            intensity: number;
            windStrength: number;
        };
        blizzard: {
            intensity: number;
            windStrength: number;
        };
    };
    themes: {
        default: {
            colors: string[];
        };
        blue: {
            colors: string[];
        };
        purple: {
            colors: string[];
        };
        gold: {
            colors: string[];
        };
        rainbow: {
            colors: string[];
        };
        pastel: {
            colors: string[];
        };
    };
};
export declare function createSnowConfig(config: Partial<SnowConfig>): SnowConfig;
//# sourceMappingURL=index.d.ts.map