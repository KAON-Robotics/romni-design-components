import { type CSSProperties, type ReactNode } from "react";
export interface SelectBoxOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface SelectBoxProps {
    options: SelectBoxOption[];
    placeholder?: string;
    value?: string;
    isValid?: boolean | null;
    readOnly?: boolean;
    disabled?: boolean;
    contact?: boolean;
    floatingMenu?: boolean;
    startIcon?: ReactNode;
    emptyOptionText?: string;
    onChange?: (value: string) => void;
    onClear?: () => void;
    style?: CSSProperties;
}
export declare const SelectBox: ({ options, placeholder, value, isValid, readOnly, disabled, contact, floatingMenu, startIcon, emptyOptionText, onChange, onClear, ...props }: SelectBoxProps) => import("react").JSX.Element;
//# sourceMappingURL=SelectBox.d.ts.map