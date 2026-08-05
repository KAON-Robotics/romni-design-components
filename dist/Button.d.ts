import type { ButtonHTMLAttributes, ReactNode } from "react";
export type ButtonVariant = "primary" | "secondary" | "neutral";
export type ButtonSize = "compact" | "medium" | "large";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    startIcon?: ReactNode;
    iconOnly?: boolean;
}
export declare const Button: ({ variant, size, startIcon, iconOnly, type, children, ...props }: ButtonProps) => import("react").JSX.Element;
export interface InputButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: ReactNode;
}
export declare const InputButton: ({ label, type, ...props }: InputButtonProps) => import("react").JSX.Element;
export interface DeleteRowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
export declare const DeleteRowButton: ({ children, type, ...props }: DeleteRowButtonProps) => import("react").JSX.Element;
//# sourceMappingURL=Button.d.ts.map