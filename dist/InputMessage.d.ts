import type { ReactNode } from "react";
export interface InputMessageProps {
    msg: ReactNode;
    align?: "left" | "right";
}
export declare const InputErrorMessage: ({ msg, align }: InputMessageProps) => import("react").JSX.Element;
export declare const InputSuccessMessage: ({ msg, align }: InputMessageProps) => import("react").JSX.Element;
//# sourceMappingURL=InputMessage.d.ts.map