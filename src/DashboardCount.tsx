import { styled } from "@mui/material";

const Root = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  color: "#000",
  fontWeight: 700,
  lineHeight: "48px",
});

const Value = styled("strong")({ fontSize: "36px" });
const Unit = styled("span")({ fontSize: "34px" });

export interface DashboardCountProps {
  value: string;
  unit?: string;
}

export const DashboardCount = ({ value, unit }: DashboardCountProps) => (
  <Root>
    <Value>{value}</Value>
    <Unit>{unit}</Unit>
  </Root>
);
