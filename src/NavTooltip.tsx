import { styled } from "@mui/material";
import type { HTMLAttributes, PropsWithChildren } from "react";

const Tooltip = styled("div", {
  shouldForwardProp: (prop) => prop !== "$arrowOffset",
})<{ $arrowOffset: number }>(({ $arrowOffset }) => ({
  position: "absolute",
  top: "50%",
  left: "83px",
  zIndex: 3,
  padding: "5px 8px",
  borderRadius: "3px",
  backgroundColor: "#1E1F23",
  boxShadow: "1px 1px 3px 0px rgba(19, 19, 19, 0.40)",
  color: "#FAFAFA",
  fontSize: "11px",
  fontWeight: 500,
  lineHeight: "16px",
  opacity: 0,
  pointerEvents: "none",
  transform: "translateY(-50%) translateX(-4px) scale(0.96)",
  transformOrigin: "left center",
  transition: "opacity 180ms ease, visibility 180ms ease, transform 220ms cubic-bezier(0.2, 0, 0, 1)",
  visibility: "hidden",
  whiteSpace: "nowrap",
  "&::after": {
    position: "absolute",
    top: "50%",
    left: `${-$arrowOffset}px`,
    marginTop: "-5px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "transparent #1E1F23 transparent transparent",
    content: "''",
  },
  "&.board": {
    right: "63px",
    left: "auto",
    transform: "translateY(-50%) translateX(4px) scale(0.96)",
    transformOrigin: "right center",
    "&::after": {
      right: `${-$arrowOffset}px`,
      left: "auto",
      borderColor: "transparent transparent transparent #1E1F23",
    },
  },
  "&:first-letter": { textTransform: "uppercase" },
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
}));

export interface NavTooltipProps extends HTMLAttributes<HTMLDivElement> {
  arrowOffset?: 9 | 10;
}

export const NavTooltip = ({
  arrowOffset = 9,
  children,
  ...props
}: PropsWithChildren<NavTooltipProps>) => (
  <Tooltip $arrowOffset={arrowOffset} {...props}>
    {children}
  </Tooltip>
);
