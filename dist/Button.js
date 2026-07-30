import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from "@mui/material";
const InputStyledButton = styled("button")({
    height: "50px",
    padding: "0 20px",
    flexShrink: 0,
    border: "1px solid #EBEBEB",
    borderRadius: "8px",
    background: "#F5F5F5",
    fontSize: "14px",
    fontWeight: 600,
});
const DeleteStyledButton = styled("button")({
    height: "34px",
    padding: "0 8px",
    border: "1px solid #EBEBEB",
    borderRadius: "4px",
    backgroundColor: "#F0F0F0",
    color: "#7C8694",
    fontSize: "13px",
    fontWeight: 500,
});
export const InputButton = ({ label, type = "button", ...props }) => (_jsx(InputStyledButton, { type: type, ...props, children: label }));
export const DeleteRowButton = ({ children = "선택 삭제", type = "button", ...props }) => (_jsx(DeleteStyledButton, { type: type, ...props, children: children }));
//# sourceMappingURL=Button.js.map