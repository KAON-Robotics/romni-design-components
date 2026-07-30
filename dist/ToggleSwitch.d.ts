import type { ChangeEventHandler, ReactNode } from "react";
export interface ToggleSwitchProps {
    checked: boolean;
    label?: ReactNode;
    onChange: ChangeEventHandler<HTMLInputElement>;
    small?: boolean;
    disabled?: boolean;
}
export declare const ToggleSwitch: ({ checked, label, onChange, small, disabled }: ToggleSwitchProps) => import("react").JSX.Element;
//# sourceMappingURL=ToggleSwitch.d.ts.map