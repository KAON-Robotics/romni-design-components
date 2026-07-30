import { styled } from "@mui/material";
import type { HTMLAttributes, PropsWithChildren } from "react";

const Table = styled("div")({
  padding: "25px 40px 0",
  border: "1px solid #EBEBEB",
  borderRadius: "12px",
  backgroundColor: "#FFF",
  transition: "height 0.3s",
});

// Kept as a named boundary because both applications use it extensively.
export const InfoTable = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <Table {...props}>{children}</Table>
);

export const InfoTableBody = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div {...props}>{children}</div>
);
