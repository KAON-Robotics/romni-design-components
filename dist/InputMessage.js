import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from "@mui/material";
const Message = styled("div", {
    shouldForwardProp: (prop) => prop !== "$align" && prop !== "$color",
})(({ $align, $color }) => ({
    alignSelf: "center",
    marginLeft: $align === "right" ? "10px" : 0,
    marginRight: $align === "left" ? "10px" : 0,
    color: $color,
    fontSize: "13px",
    fontWeight: 500,
    textAlign: $align,
    whiteSpace: "nowrap",
}));
export const InputErrorMessage = ({ msg, align = "right" }) => (_jsx(Message, { "data-input-error-message": "true", "$align": align, "$color": "#FF4747", children: msg }));
export const InputSuccessMessage = ({ msg, align = "right" }) => (_jsx(Message, { "$align": align, "$color": "#3A57E8", children: msg }));
//# sourceMappingURL=InputMessage.js.map