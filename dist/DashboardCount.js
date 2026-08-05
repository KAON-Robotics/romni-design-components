import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export const DashboardCount = ({ value, unit }) => (_jsxs(Root, { children: [_jsx(Value, { children: value }), _jsx(Unit, { children: unit })] }));
//# sourceMappingURL=DashboardCount.js.map