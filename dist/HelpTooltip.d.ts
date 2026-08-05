import { type ReactNode } from "react";
export type HelpTooltipContentType = "description" | "example" | "list" | "sublist" | "table";
export interface HelpTooltipContent {
    type: HelpTooltipContentType;
    detail: string;
}
export interface HelpTooltipHelp {
    title: string;
    contents: HelpTooltipContent[];
}
export interface HelpTooltipProps {
    help: HelpTooltipHelp;
    dashboard?: boolean;
    icon?: ReactNode;
}
export declare const HelpTooltip: ({ help, dashboard, icon }: HelpTooltipProps) => import("react").JSX.Element;
//# sourceMappingURL=HelpTooltip.d.ts.map