import { styled } from "@mui/material";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "neutral";
export type ButtonSize = "compact" | "medium" | "large";

const sizes = {
  compact: { height: "34px", radius: "4px", padding: "0 20px", fontSize: "12px" },
  medium: { height: "40px", radius: "6px", padding: "0 30px", fontSize: "14px" },
  large: { height: "50px", radius: "8px", padding: "0 40px", fontSize: "16px" },
} as const;

const colors = {
  primary: { background: "#1E1F23", color: "#FFF", border: "#1E1F23" },
  secondary: { background: "#F8F8F9", color: "#3F4A5D", border: "#EBEBEB" },
  neutral: { background: "#F5F5F5", color: "#3F4A5D", border: "#EBEBEB" },
} as const;

const StyledButton = styled("button", {
  shouldForwardProp: (prop) => !["$variant", "$size", "$iconOnly"].includes(String(prop)),
})<{ $variant: ButtonVariant; $size: ButtonSize; $iconOnly: boolean }>(
  ({ $variant, $size, $iconOnly }) => {
    const size = sizes[$size];
    const color = colors[$variant];
    const hoverBackground = $variant === "primary"
      ? $size === "large" ? "#3A57E8" : "#3F4A5D"
      : $variant === "secondary"
        ? $size === "large" ? "#B8BFCC" : "#F0F0F0"
        : "#EBEBEB";

    return {
      display: "inline-flex",
      width: $iconOnly ? size.height : "auto",
      height: size.height,
      padding: $iconOnly ? 0 : $variant === "primary" && $size === "medium" ? "0 50px" : size.padding,
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      flexShrink: 0,
      border: `1px solid ${color.border}`,
      borderRadius: size.radius,
      backgroundColor: color.background,
      color: color.color,
      cursor: "pointer",
      fontSize: size.fontSize,
      fontWeight: $variant === "secondary" ? 500 : 600,
      lineHeight: $size === "compact" ? "14px" : "22px",
      transition: "background-color 150ms ease, border-color 150ms ease",
      "&:not(:disabled):hover, &[data-state='hover']:not(:disabled)": {
        borderColor: hoverBackground,
        backgroundColor: hoverBackground,
      },
      "&:focus-visible": {
        outline: "2px solid #3A57E8",
        outlineOffset: "2px",
      },
      "&:disabled": {
        borderColor: "#EBEBEB",
        backgroundColor: "#EBEBEB",
        color: $variant === "primary" ? "#FFF" : "#B8BFCC",
        cursor: "default",
      },
      "& > svg, & > img": { flexShrink: 0 },
    };
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  iconOnly?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "medium",
  startIcon,
  iconOnly = false,
  type = "button",
  children,
  ...props
}: ButtonProps) => (
  <StyledButton type={type} $variant={variant} $size={size} $iconOnly={iconOnly} {...props}>
    {startIcon}
    {children}
  </StyledButton>
);

const InputStyledButton = styled(Button)({
  padding: "0 20px",
  fontSize: "14px",
});

const DeleteStyledButton = styled(Button)({
  padding: "0 8px",
  backgroundColor: "#F0F0F0",
  color: "#596270",
  fontSize: "13px",
  fontWeight: 500,
});

export interface InputButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
}

export const InputButton = ({ label, type = "button", ...props }: InputButtonProps) => (
  <InputStyledButton type={type} variant="neutral" size="large" {...props}>
    {label}
  </InputStyledButton>
);

export interface DeleteRowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const DeleteRowButton = ({
  children = "선택 삭제",
  type = "button",
  ...props
}: DeleteRowButtonProps) => (
  <DeleteStyledButton type={type} variant="neutral" size="compact" {...props}>
    {children}
  </DeleteStyledButton>
);
