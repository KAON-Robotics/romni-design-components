import { type ChangeEventHandler, type LabelHTMLAttributes, type ReactNode } from "react";
export interface InputCheckboxProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
    label?: ReactNode;
    value?: string | number;
    isChecked?: boolean;
    readOnly?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}
export declare const InputCheckbox: ({ label, value, isChecked, readOnly, onChange, className, onClick, ...props }: InputCheckboxProps) => import("react").JSX.Element;
//# sourceMappingURL=InputCheckbox.d.ts.map