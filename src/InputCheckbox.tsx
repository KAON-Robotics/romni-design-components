import { styled } from "@mui/material";
import {
  useEffect,
  useState,
  type ChangeEventHandler,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";

const Label = styled("label")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "var(--romni-text-muted, #3F4A5D)",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 500,
  "&.disabled": {
    color: "var(--romni-text-subtle, #7C8694)",
    cursor: "default",
  },
  "&:hover .input-checkbox:not(.disabled):not(.checked)": {
    backgroundColor: "var(--romni-blue-bg, #D4E4FF)",
  },
});

const Check = styled("div", {
  shouldForwardProp: (prop) => prop !== "$checked" && prop !== "$disabled",
})<{ $checked: boolean; $disabled: boolean }>(({ $checked, $disabled }) => ({
  position: "relative",
  display: "flex",
  width: "20px",
  height: "20px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  backgroundColor: $checked ? ($disabled ? "var(--romni-surface-raised, #7C8694)" : "var(--romni-blue-solid, #3A57E8)") : "var(--romni-surface-subtle, #F0F0F0)",
  boxShadow: "inset 0 0 0 1px var(--romni-control-border, transparent)",
  transition: "background-color 0.15s ease",
  "&::before, &::after": {
    position: "absolute",
    backgroundColor: $checked ? "var(--romni-control-mark, white)" : "var(--romni-surface-subtle, white)",
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

export interface InputCheckboxProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
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
  className,
  onClick,
  ...props
}: InputCheckboxProps) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => setChecked(isChecked), [isChecked]);

  return (
    <Label
      className={`${className ?? ""}${readOnly ? " disabled" : ""}`.trim() || undefined}
      data-stop-row-click="true"
      {...props}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
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
        aria-label={typeof label === "string" ? label : value === "all" ? "전체 선택" : "행 선택"}
        onChange={(event) => {
          setChecked(event.target.checked);
          onChange(event);
        }}
      />
      {label}
    </Label>
  );
};
