import { styled } from "@mui/material";
import type { HTMLAttributes, PropsWithChildren } from "react";

const Root = styled("div")({
  display: "flex",
  height: "calc(100% - 50px)",
});

export const MainLayout = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <Root {...props}>{children}</Root>
);
