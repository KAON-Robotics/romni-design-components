import type { ButtonHTMLAttributes, ReactNode } from "react";
export interface InputButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: ReactNode;
}
export declare const InputButton: ({ label, type, ...props }: InputButtonProps) => import("react").JSX.Element;
export interface DeleteRowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
export declare const DeleteRowButton: ({ children, type, ...props }: DeleteRowButtonProps) => import("react").JSX.Element;
//# sourceMappingURL=Button.d.ts.map