import { type ReactElement } from "react";
export interface SingleSelectFilterOption {
    label: string;
    value: unknown;
    active?: boolean | "Y" | "N";
}
export interface SingleSelectFilterProps {
    label?: string;
    labelImage?: ReactElement;
    openLabelImage?: ReactElement;
    options: SingleSelectFilterOption[];
    selected: string;
    onSelect: (label: string, value: unknown, active?: boolean | "Y" | "N") => void;
    bottomLayer?: boolean;
    showSelectedIcon?: boolean;
    centerOptionText?: boolean;
}
export declare const SingleSelectFilter: ({ label, labelImage, openLabelImage, options, selected, onSelect, bottomLayer, showSelectedIcon, centerOptionText, }: SingleSelectFilterProps) => import("react").JSX.Element;
//# sourceMappingURL=SingleSelectFilter.d.ts.map