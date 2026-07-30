import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from "@mui/material";
const Root = styled("div")({
    display: "flex",
    height: "calc(100% - 50px)",
});
export const MainLayout = ({ children, ...props }) => (_jsx(Root, { ...props, children: children }));
//# sourceMappingURL=MainLayout.js.map