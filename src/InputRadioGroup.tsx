import { styled } from "@mui/material";
import { useEffect, useState } from "react";

const Root = styled("div")({ display: "flex", gap: "40px" });

const Label = styled("label", {
  shouldForwardProp: (prop) => prop !== "$readOnly",
})<{ $readOnly: boolean }>(({ $readOnly }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#3F4A5D",
  cursor: $readOnly ? "default" : "pointer",
  fontSize: "16px",
  fontWeight: 500,
  "&:hover .radio-check:not(.checked):not(.disabled)": {
    borderColor: "#D4E4FF",
    backgroundColor: "#D4E4FF",
  },
}));

const Check = styled("div", {
  shouldForwardProp: (prop) => prop !== "$checked" && prop !== "$disabled",
})<{ $checked: boolean; $disabled: boolean }>(({ $checked, $disabled }) => ({
  position: "relative",
  display: "flex",
  width: "26px",
  height: "26px",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${$checked ? ($disabled ? "#7C8694" : "#3A57E8") : "#F0F0F0"}`,
  borderRadius: "50%",
  backgroundColor: $checked ? ($disabled ? "#7C8694" : "#3A57E8") : "#F0F0F0",
  transition: "background-color 0.2s ease",
  "&::after": {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#FFF",
    content: "''",
    transform: "translate(-50%, -50%)",
  },
}));

const Radio = styled("input")({
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clipPath: "inset(50%)",
});

export interface InputRadioGroupProps<T = unknown> {
  options: { label: string; value: T }[];
  readOnly?: boolean;
  value?: T;
  notifyOnValueChange?: boolean;
  onChange: (value: T) => void;
}

export function InputRadioGroup<T>({
  options,
  readOnly = false,
  value,
  notifyOnValueChange = false,
  onChange,
}: InputRadioGroupProps<T>) {
  const [selected, setSelected] = useState(value);

  useEffect(() => setSelected(value), [value]);
  useEffect(() => {
    if (notifyOnValueChange && !readOnly && selected !== undefined) onChange(selected);
  }, [selected]);

  return (
    <Root>
      {options.map((option) => {
        const checked = selected === option.value;
        return (
          <Label key={String(option.value)} $readOnly={readOnly}>
            <Check
              className={`radio-check${checked ? " checked" : ""}${readOnly ? " disabled" : ""}`}
              $checked={checked}
              $disabled={readOnly}
              aria-hidden="true"
            />
            <Radio
              type="radio"
              value={String(option.value)}
              checked={checked}
              disabled={readOnly}
              onChange={() => {
                setSelected(option.value);
                if (!notifyOnValueChange) onChange(option.value);
              }}
            />
            {option.label}
          </Label>
        );
      })}
    </Root>
  );
}
