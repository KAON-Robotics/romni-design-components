import { styled } from "@mui/material";
import type { ReactNode } from "react";

const Message = styled("div", {
  shouldForwardProp: (prop) => prop !== "$align" && prop !== "$color",
})<{ $align: "left" | "right"; $color: string }>(({ $align, $color }) => ({
  alignSelf: "center",
  marginLeft: $align === "right" ? "10px" : 0,
  marginRight: $align === "left" ? "10px" : 0,
  color: $color,
  fontSize: "13px",
  fontWeight: 500,
  textAlign: $align,
  whiteSpace: "nowrap",
}));

export interface InputMessageProps {
  msg: ReactNode;
  align?: "left" | "right";
}

export const InputErrorMessage = ({ msg, align = "right" }: InputMessageProps) => (
  <Message data-input-error-message="true" $align={align} $color="#FF4747">
    {msg}
  </Message>
);

export const InputSuccessMessage = ({ msg, align = "right" }: InputMessageProps) => (
  <Message $align={align} $color="#3A57E8">
    {msg}
  </Message>
);
