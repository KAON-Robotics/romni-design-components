import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from "@mui/material";
const Table = styled("div")({
    padding: "25px 40px 0",
    border: "1px solid #EBEBEB",
    borderRadius: "12px",
    backgroundColor: "#FFF",
    transition: "height 0.3s",
});
// Kept as a named boundary because both applications use it extensively.
export const InfoTable = ({ children, ...props }) => (_jsx(Table, { ...props, children: children }));
export const InfoTableBody = ({ children, ...props }) => (_jsx("div", { ...props, children: children }));
//# sourceMappingURL=InfoTable.js.map