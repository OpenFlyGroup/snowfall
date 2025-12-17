import { default as React } from '../../node_modules/react';
import { StuckSnowflake } from '../types';
interface SnowAccumulationProps {
    elementId: string;
    className?: string;
    renderSnowflake?: (flake: StuckSnowflake, currentTime: number) => React.ReactNode;
}
export declare function SnowAccumulation({ elementId, className, renderSnowflake, }: SnowAccumulationProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=SnowAccumulation.d.ts.map