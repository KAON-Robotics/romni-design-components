import { styled } from "@mui/material";
import type { ChangeEventHandler, ReactNode } from "react";

const Root = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const Switch = styled("label", {
  shouldForwardProp: (prop) => prop !== "$small",
})<{ $small: boolean }>(({ $small }) => ({
  position: "relative",
  display: "inline-block",
  width: $small ? "32px" : "50px",
  height: $small ? "16px" : "28px",
  flexShrink: 0,
  cursor: "pointer",
  input: {
    position: "absolute",
    width: "1px",
    height: "1px",
    opacity: 0,
  },
  ".slider": {
    position: "absolute",
    inset: 0,
    borderRadius: "34px",
    backgroundColor: "#CCC",
    transition: "background-color 0.2s",
    "&::before": {
      position: "absolute",
      left: $small ? "2px" : "3px",
      bottom: $small ? "2px" : "3px",
      width: $small ? "12px" : "22px",
      height: $small ? "12px" : "22px",
      borderRadius: "50%",
      backgroundColor: "#FFF",
      content: '""',
      transition: "transform 0.2s",
    },
  },
  "input:checked + .slider": { backgroundColor: "#3366FF" },
  "input:checked + .slider::before": {
    transform: $small ? "translateX(16px)" : "translateX(22px)",
  },
  "input:focus-visible + .slider": { outline: "2px solid #173CBA", outlineOffset: "2px" },
  "@media (prefers-reduced-motion: reduce)": {
    ".slider, .slider::before": { transition: "none" },
  },
}));

const Label = styled("span")({
  color: "#596270",
  fontSize: "14px",
  fontWeight: 500,
});

export interface ToggleSwitchProps {
  checked: boolean;
  label?: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
  small?: boolean;
  disabled?: boolean;
}

export const ToggleSwitch = ({ checked, label, onChange, small = false, disabled = false }: ToggleSwitchProps) => (
  <Root>
    <Switch $small={small}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-label={typeof label === "string" ? label : "Toggle"}
        onChange={onChange}
      />
      <span className="slider" />
    </Switch>
    {label != null && <Label>{label}</Label>}
  </Root>
);
