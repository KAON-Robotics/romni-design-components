import type { HTMLAttributes, PropsWithChildren } from "react";
import { type HelpTooltipHelp } from "./HelpTooltip.js";
export interface InfoTableRowProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    required?: boolean;
    help?: HelpTooltipHelp;
    labelRange?: string;
    narrowWidth?: boolean;
}
export declare const InfoTable: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => import("react").JSX.Element;
export declare const InfoTableBody: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => import("react").JSX.Element;
export declare const InfoTableRow: ({ label, required, help, labelRange, narrowWidth, children, ...props }: PropsWithChildren<InfoTableRowProps>) => import("react").JSX.Element;
//# sourceMappingURL=InfoTable.d.ts.map