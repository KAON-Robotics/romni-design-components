import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from "@mui/material";
import { useState } from "react";
const Wrapper = styled("div")({ position: "relative", width: "500px", maxWidth: "100%" });
const Input = styled("input")({
    width: "100%",
    height: "50px",
    padding: "0 44px 0 16px",
    boxSizing: "border-box",
    border: "1px solid #F0F0F0",
    borderRadius: "8px",
    outline: 0,
    color: "#2A2C33",
    fontSize: "16px",
    fontWeight: 500,
    "&:read-only": { color: "#7C8694", backgroundColor: "#FAFAFA" },
    "&::placeholder": { color: "#B8BFCC" },
    '&[aria-invalid="true"]': { borderColor: "#FF4747" },
});
const Toggle = styled("button")({
    position: "absolute",
    top: "50%",
    right: "12px",
    display: "flex",
    width: "24px",
    height: "24px",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    background: "transparent",
    transform: "translateY(-50%)",
    cursor: "pointer",
});
const EyeIcon = ({ visible }) => visible ? (_jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [_jsx("path", { d: "M14.7 12a2.7 2.7 0 1 1-5.4 0 2.7 2.7 0 0 1 5.4 0Z", fill: "#B8BFCC" }), _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 3.75C6.91 3.75 2.65 7.27 1.5 12 2.65 16.73 6.91 20.25 12 20.25S21.35 16.73 22.5 12C21.35 7.27 17.09 3.75 12 3.75Zm4.5 8.25a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z", fill: "#B8BFCC" })] })) : (_jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [_jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "m21.63 20.36-2.66-2.66A10.8 10.8 0 0 0 22.5 12C21.35 7.27 17.09 3.75 12 3.75c-2 0-3.88.54-5.49 1.49L3.63 2.36 2.36 3.64l18 18 1.27-1.28ZM16.5 12c0 .92-.27 1.77-.75 2.48l-1.32-1.32A2.7 2.7 0 0 0 10.84 9.56L9.52 8.25A4.5 4.5 0 0 1 16.5 12Z", fill: "#B8BFCC" }), _jsx("path", { d: "m15.75 19.58-3.12-3.13A4.5 4.5 0 0 1 7.54 11.37L3.75 7.58A10.8 10.8 0 0 0 1.5 12c1.15 4.73 5.41 8.25 10.5 8.25 1.32 0 2.58-.24 3.75-.67Z", fill: "#B8BFCC" })] }));
export const InputPassword = ({ placeholder, readOnly, value = "", isValid, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (_jsxs(Wrapper, { children: [_jsx(Input, { type: showPassword ? "text" : "password", value: value, readOnly: readOnly, placeholder: placeholder, "aria-invalid": isValid === false, onChange: (event) => onChange === null || onChange === void 0 ? void 0 : onChange(event.target.value) }), _jsx(Toggle, { type: "button", "aria-label": showPassword ? "Hide password" : "Show password", "aria-pressed": showPassword, onClick: () => setShowPassword((current) => !current), children: _jsx(EyeIcon, { visible: showPassword }) })] }));
};
//# sourceMappingURL=InputPassword.js.map