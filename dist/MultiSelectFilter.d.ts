import { type ReactNode } from "react";
export interface MultiSelectFilterProps {
    filter: {
        label: string;
        options: {
            label: ReactNode;
            value: string;
        }[];
    };
    initialSelected: string[];
    board?: boolean;
    onChange: (rows: string[]) => void;
}
export declare const MultiSelectFilter: ({ filter, initialSelected, board, onChange, }: MultiSelectFilterProps) => import("react").JSX.Element;
//# sourceMappingURL=MultiSelectFilter.d.ts.map