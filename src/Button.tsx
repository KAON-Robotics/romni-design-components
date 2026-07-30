import { styled } from "@mui/material";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const InputStyledButton = styled("button")({
  height: "50px",
  padding: "0 20px",
  flexShrink: 0,
  border: "1px solid #EBEBEB",
  borderRadius: "8px",
  background: "#F5F5F5",
  fontSize: "14px",
  fontWeight: 600,
});

const DeleteStyledButton = styled("button")({
  height: "34px",
  padding: "0 8px",
  border: "1px solid #EBEBEB",
  borderRadius: "4px",
  backgroundColor: "#F0F0F0",
  color: "#7C8694",
  fontSize: "13px",
  fontWeight: 500,
});

export interface InputButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
}

export const InputButton = ({ label, type = "button", ...props }: InputButtonProps) => (
  <InputStyledButton type={type} {...props}>
    {label}
  </InputStyledButton>
);

export interface DeleteRowButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const DeleteRowButton = ({
  children = "선택 삭제",
  type = "button",
  ...props
}: DeleteRowButtonProps) => (
  <DeleteStyledButton type={type} {...props}>
    {children}
  </DeleteStyledButton>
);
