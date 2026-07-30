import { styled } from "@mui/material";
import { useEffect, useState, type ChangeEventHandler, type ReactNode } from "react";

const Label = styled("label")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#3F4A5D",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 500,
  "&.disabled": {
    color: "#7C8694",
    cursor: "default",
  },
  "&:hover .input-checkbox:not(.disabled):not(.checked)": {
    backgroundColor: "#D4E4FF",
  },
});

const Check = styled("span", {
  shouldForwardProp: (prop) => prop !== "$checked" && prop !== "$disabled",
})<{ $checked: boolean; $disabled: boolean }>(({ $checked, $disabled }) => ({
  position: "relative",
  display: "flex",
  width: "20px",
  height: "20px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  backgroundColor: $disabled ? "#7C8694" : $checked ? "#3A57E8" : "#F0F0F0",
  transition: "background-color 0.15s ease",
  "&::before, &::after": {
    position: "absolute",
    backgroundColor: "white",
    content: "''",
  },
  "&::before": {
    top: "5px",
    left: "11px",
    width: "2px",
    height: "10px",
    transform: "rotate(45deg)",
  },
  "&::after": {
    top: "9px",
    left: "6px",
    width: "2px",
    height: "6px",
    transform: "rotate(-45deg)",
  },
}));

const HiddenInput = styled("input")({
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
});

export interface InputCheckboxProps {
  label?: ReactNode;
  value?: string | number;
  isChecked?: boolean;
  readOnly?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const InputCheckbox = ({
  label,
  value,
  isChecked = false,
  readOnly = false,
  onChange,
}: InputCheckboxProps) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => setChecked(isChecked), [isChecked]);

  return (
    <Label
      className={readOnly ? "disabled" : undefined}
      data-stop-row-click="true"
      onClick={(event) => event.stopPropagation()}
    >
      <Check
        className={`input-checkbox${readOnly ? " disabled" : ""}${checked ? " checked" : ""}`}
        $checked={checked}
        $disabled={readOnly}
        aria-hidden="true"
      />
      <HiddenInput
        type="checkbox"
        value={value}
        checked={checked}
        disabled={readOnly}
        onChange={(event) => {
          setChecked(event.target.checked);
          onChange(event);
        }}
      />
      {label}
    </Label>
  );
};
