import { styled } from "@mui/material";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { HelpTooltip, type HelpTooltipHelp } from "./HelpTooltip.js";

const Table = styled("div")({
  padding: "25px 40px 0",
  border: "1px solid #EBEBEB",
  borderRadius: "12px",
  backgroundColor: "#FFF",
  transition: "height 0.3s",
});

const Row = styled("div", {
  shouldForwardProp: (prop) => prop !== "$narrow",
})<{ $narrow: boolean }>(({ $narrow }) => ({
  display: "flex",
  alignItems: "center",
  padding: "20px 0",
  borderBottom: "1px solid #EBEBEB",
  "&:last-of-type": { borderBottom: 0 },
  ".table-label": {
    display: "flex",
    width: $narrow ? "110px" : "300px",
    minHeight: "50px",
    paddingLeft: "20px",
    flexFlow: "column",
    flexShrink: 0,
    justifyContent: "center",
    gap: "5px",
    h4: {
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
      fontWeight: 600,
      span: { marginLeft: "4px", color: "#FF4747" },
    },
    "& > span": { color: "#596270", fontSize: "13px", fontWeight: 600 },
  },
  ".table-value": {
    ...($narrow && { paddingLeft: "20px", borderLeft: "1px dashed #EBEBEB" }),
    display: "flex",
    minWidth: 0,
    flex: 1,
    flexFlow: "column",
    gap: "10px",
    "& > div": { display: "flex", minWidth: 0, alignItems: "center", gap: "10px" },
  },
}));

export interface InfoTableRowProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  required?: boolean;
  help?: HelpTooltipHelp;
  labelRange?: string;
  narrowWidth?: boolean;
}

// Kept as a named boundary because both applications use it extensively.
export const InfoTable = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <Table {...props}>{children}</Table>
);

export const InfoTableBody = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div {...props}>{children}</div>
);

export const InfoTableRow = ({
  label,
  required,
  help,
  labelRange,
  narrowWidth = false,
  children,
  ...props
}: PropsWithChildren<InfoTableRowProps>) => (
  <Row $narrow={narrowWidth} {...props}>
    <div className="table-label">
      <h4>
        {label}
        {required && <span>*</span>}
        {help && <HelpTooltip help={help} />}
      </h4>
      {labelRange && <span>{labelRange}</span>}
    </div>
    <div className="table-value">{children}</div>
  </Row>
);
