import { SnowConfig, StuckSnowflake, SnowPreset } from '../types';
interface SnowState {
    config: SnowConfig;
    isEnabled: boolean;
    stuckSnowflakes: Map<string, StuckSnowflake[]>;
    presets: SnowPreset[];
    activePreset?: string;
}
interface SnowActions {
    toggle: () => void;
    updateConfig: (config: Partial<SnowConfig>) => void;
    resetConfig: () => void;
    addStuckSnowflake: (elementId: string, flake: StuckSnowflake) => void;
    removeStuckSnowflake: (elementId: string, flakeId: string) => void;
    clearElement: (elementId: string) => void;
    clearAll: () => void;
    addPreset: (preset: SnowPreset) => void;
    removePreset: (name: string) => void;
    applyPreset: (name: string) => void;
}
export declare const defaultConfig: SnowConfig;
export declare const useSnowStore: import('zustand').UseBoundStore<Omit<import('zustand').StoreApi<SnowState & SnowActions>, "setState" | "persist"> & {
    setState(partial: (SnowState & SnowActions) | Partial<SnowState & SnowActions> | ((state: SnowState & SnowActions) => (SnowState & SnowActions) | Partial<SnowState & SnowActions>), replace?: false | undefined): unknown;
    setState(state: (SnowState & SnowActions) | ((state: SnowState & SnowActions) => SnowState & SnowActions), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import('zustand/middleware').PersistOptions<SnowState & SnowActions, {
            config: SnowConfig;
            isEnabled: boolean;
            presets: SnowPreset[];
            activePreset: string | undefined;
        }, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SnowState & SnowActions) => void) => () => void;
        onFinishHydration: (fn: (state: SnowState & SnowActions) => void) => () => void;
        getOptions: () => Partial<import('zustand/middleware').PersistOptions<SnowState & SnowActions, {
            config: SnowConfig;
            isEnabled: boolean;
            presets: SnowPreset[];
            activePreset: string | undefined;
        }, unknown>>;
    };
}>;
export {};
//# sourceMappingURL=snow-store.d.ts.map