import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from "@mui/material";
const Root = styled("div")({
    display: "flex",
    width: "100%",
    height: "100%",
    minHeight: "300px",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column",
    color: "#B8BFCC",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: 1.4,
    textAlign: "center",
    svg: { width: "40px", height: "40px", marginBottom: "20px" },
});
const EmptyIcon = () => (_jsxs("svg", { viewBox: "0 0 40 40", fill: "none", "aria-hidden": "true", children: [_jsx("path", { d: "M8 3h17l7 7v27H8V3Z", stroke: "#B8BFCC", strokeWidth: "2" }), _jsx("path", { d: "M25 3v7h7", stroke: "#B8BFCC", strokeWidth: "2" }), _jsx("circle", { cx: "18", cy: "20", r: "5", stroke: "#B8BFCC", strokeWidth: "2" }), _jsx("path", { d: "m22 24 4 4", stroke: "#B8BFCC", strokeWidth: "2", strokeLinecap: "round" })] }));
export const ListNoResult = ({ text = "검색 결과가 없습니다.", ...props }) => (_jsxs(Root, { ...props, children: [_jsx(EmptyIcon, {}), _jsx("span", { children: text })] }));
//# sourceMappingURL=ListNoResult.js.map