import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from "@mui/material";
import { useEffect, useState, } from "react";
const Label = styled("label")({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#3F4A5D",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    "&.disabled": {
        color: "#7C8694",
        cursor: "default",
    },
    "&:hover .input-checkbox:not(.disabled):not(.checked)": {
        backgroundColor: "#D4E4FF",
    },
});
const Check = styled("div", {
    shouldForwardProp: (prop) => prop !== "$checked" && prop !== "$disabled",
})(({ $checked, $disabled }) => ({
    position: "relative",
    display: "flex",
    width: "20px",
    height: "20px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    backgroundColor: $disabled ? "#7C8694" : $checked ? "#3A57E8" : "#F0F0F0",
    transition: "background-color 0.15s ease",
    "&::before, &::after": {
        position: "absolute",
        backgroundColor: "white",
        content: "''",
    },
    "&::before": {
        top: "5px",
        left: "11px",
        width: "2px",
        height: "10px",
        transform: "rotate(45deg)",
    },
    "&::after": {
        top: "9px",
        left: "6px",
        width: "2px",
        height: "6px",
        transform: "rotate(-45deg)",
    },
}));
const HiddenInput = styled("input")({
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
});
export const InputCheckbox = ({ label, value, isChecked = false, readOnly = false, onChange, className, onClick, ...props }) => {
    const [checked, setChecked] = useState(isChecked);
    useEffect(() => setChecked(isChecked), [isChecked]);
    return (_jsxs(Label, { className: `${className !== null && className !== void 0 ? className : ""}${readOnly ? " disabled" : ""}`.trim() || undefined, "data-stop-row-click": "true", ...props, onClick: (event) => {
            event.stopPropagation();
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
        }, children: [_jsx(Check, { className: `input-checkbox${readOnly ? " disabled" : ""}${checked ? " checked" : ""}`, "$checked": checked, "$disabled": readOnly, "aria-hidden": "true" }), _jsx(HiddenInput, { type: "checkbox", value: value, checked: checked, disabled: readOnly, "aria-label": typeof label === "string" ? label : value === "all" ? "전체 선택" : "행 선택", onChange: (event) => {
                    setChecked(event.target.checked);
                    onChange(event);
                } }), label] }));
};
//# sourceMappingURL=InputCheckbox.js.map