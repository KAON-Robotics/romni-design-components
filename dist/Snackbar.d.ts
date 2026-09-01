import type { HTMLAttributes, ReactNode } from "react";
export interface SnackbarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    open: boolean;
    message: ReactNode;
    onClose?: () => void;
    autoHideDuration?: number | null;
    icon?: ReactNode;
    variant?: "info" | "success";
    horizontal?: "left" | "center" | "right";
    vertical?: "top" | "bottom";
    offset?: number;
}
export declare const Snackbar: ({ open, message, onClose, autoHideDuration, icon, variant, horizontal, vertical, offset, ...props }: SnackbarProps) => import("react").JSX.Element | null;
//# sourceMappingURL=Snackbar.d.ts.map