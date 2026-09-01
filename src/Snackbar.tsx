import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { createPortal } from "react-dom";
import { IconCheckFill, IconInfoFill } from "./SnackbarIcons.js";

const Popup = styled("div", {
  shouldForwardProp: (prop) =>
    !["$horizontal", "$vertical", "$offset", "$open"].includes(String(prop)),
})<{
  $horizontal: "left" | "center" | "right";
  $vertical: "top" | "bottom";
  $offset: number;
  $open: boolean;
}>(({ $horizontal, $vertical, $offset, $open }) => ({
  position: "fixed",
  top: $vertical === "top" ? `${$offset}px` : "auto",
  right: $horizontal === "right" ? `${$offset}px` : "auto",
  bottom: $vertical === "bottom" ? `${$offset}px` : "auto",
  left:
    $horizontal === "left"
      ? `${$offset}px`
      : $horizontal === "center"
        ? "50%"
        : "auto",
  zIndex: 1400,
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 16px",
  borderRadius: "8px",
  backgroundColor: "rgba(42, 44, 51, 0.8)",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(2px)",
  color: "#FFFFFF",
  fontFamily: "Pretendard, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "18px",
  textShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
  opacity: $open ? 1 : 0,
  transform: `${$horizontal === "center" ? "translateX(-50%) " : ""}translateY(${
    $open ? "0" : $vertical === "top" ? "-12px" : "12px"
  })`,
  transition: "opacity 200ms ease, transform 200ms ease",
  whiteSpace: "nowrap",
  "& .romni-snackbar-icon": {
    display: "block",
    flexShrink: 0,
    width: "19px",
    height: "19px",
  },
}));

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

export const Snackbar = ({
  open,
  message,
  onClose,
  autoHideDuration = 3000,
  icon,
  variant = "info",
  horizontal = "center",
  vertical = "top",
  offset = vertical === "top" ? 70 : 30,
  ...props
}: SnackbarProps) => {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timeout = window.setTimeout(() => setMounted(false), 200);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open || autoHideDuration == null || !onClose) return;
    const timeout = window.setTimeout(onClose, autoHideDuration);
    return () => window.clearTimeout(timeout);
  }, [autoHideDuration, onClose, open]);

  if (!mounted) return null;

  const popup = (
    <Popup
      role="status"
      $horizontal={horizontal}
      $vertical={vertical}
      $offset={offset}
      $open={visible}
      {...props}
    >
      {icon ??
        (variant === "success" ? <IconCheckFill /> : <IconInfoFill />)}
      <span>{message}</span>
    </Popup>
  );
  return typeof document === "undefined" ? popup : createPortal(popup, document.body);
};
