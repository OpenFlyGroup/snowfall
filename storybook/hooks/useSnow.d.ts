/**
 * Hook for accessing the snow store.
 */
export declare function useSnow(): {
    isEnabled: boolean;
    config: import('..').SnowConfig;
    presets: import('..').SnowPreset[];
    toggle: () => void;
    updateConfig: (config: Partial<import('..').SnowConfig>) => void;
    resetConfig: () => void;
    clearAllSnow: () => void;
    /**
     * Returns the total number of stuck snowflakes across all elements.
     */
    getSnowflakeCount: () => number;
    /**
     * Returns the number of stuck snowflakes for a given element ID.
     */
    getElementSnowCount: (elementId: string) => number;
};
//# sourceMappingURL=useSnow.d.ts.map