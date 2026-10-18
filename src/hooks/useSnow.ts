import { useSnowStore } from "../stores/snow-store";

/**
 * Hook for accessing the snow store.
 */
export function useSnow() {
  const isEnabled = useSnowStore((s) => s.isEnabled);
  const config = useSnowStore((s) => s.config);
  const presets = useSnowStore((s) => s.presets);
  const toggle = useSnowStore((s) => s.toggle);
  const updateConfig = useSnowStore((s) => s.updateConfig);
  const resetConfig = useSnowStore((s) => s.resetConfig);
  const clearAll = useSnowStore((s) => s.clearAll);
  const stuckSnowflakes = useSnowStore((s) => s.stuckSnowflakes);

  return {
    // State
    isEnabled,
    config,
    presets,

    // Actions
    toggle,
    updateConfig,
    resetConfig,
    clearAllSnow: clearAll,

    /**
     * Returns the total number of stuck snowflakes across all elements.
     */
    getSnowflakeCount: () => {
      let count = 0;
      stuckSnowflakes.forEach((flakes) => {
        count += flakes.length;
      });
      return count;
    },

    /**
     * Returns the number of stuck snowflakes for a given element ID.
     */
    getElementSnowCount: (elementId: string) => {
      return stuckSnowflakes.get(elementId)?.length ?? 0;
    },
  };
}
