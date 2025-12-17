/**
 * Hook for accessing the snow store.
 * Returns an object with the following properties:
 *
 * - `isEnabled`: a boolean indicating whether snow is enabled
 * - `config`: the current snow configuration
 * - `presets`: an array of available snow presets
 * - `toggle`: a function to toggle snow on/off
 * - `updateConfig`: a function to update the snow configuration
 * - `resetConfig`: a function to reset the snow configuration to its default values
 * - `clearAllSnow`: a function to clear all stuck snowflakes from all elements
 * - `getSnowflakeCount`: a function to get the total number of stuck snowflakes across all elements
 * - `getElementSnowCount`: a function to get the number of stuck snowflakes for a given element ID
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
     * @returns {number} The total number of stuck snowflakes.
     */
    getSnowflakeCount: () => number;
    /**
     * Returns the number of stuck snowflakes for a given element ID.
     * @param {string} elementId - The ID of the element for which to get the stuck snowflake count.
     * @returns {number} The number of stuck snowflakes for the given element ID.
     */
    getElementSnowCount: (elementId: string) => number;
};
//# sourceMappingURL=useSnow.d.ts.map