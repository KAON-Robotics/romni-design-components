import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";
const Root = styled("div")({ display: "flex", gap: "40px" });
const Label = styled("label", {
    shouldForwardProp: (prop) => prop !== "$readOnly",
})(({ $readOnly }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#3F4A5D",
    cursor: $readOnly ? "default" : "pointer",
    fontSize: "16px",
    fontWeight: 500,
    "&:hover .radio-check:not(.checked):not(.disabled)": {
        borderColor: "#D4E4FF",
        backgroundColor: "#D4E4FF",
    },
}));
const Check = styled("div", {
    shouldForwardProp: (prop) => prop !== "$checked" && prop !== "$disabled",
})(({ $checked, $disabled }) => ({
    position: "relative",
    display: "flex",
    width: "26px",
    height: "26px",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${$checked ? ($disabled ? "#7C8694" : "#3A57E8") : "#F0F0F0"}`,
    borderRadius: "50%",
    backgroundColor: $checked ? ($disabled ? "#7C8694" : "#3A57E8") : "#F0F0F0",
    transition: "background-color 0.2s ease",
    "&::after": {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#FFF",
        content: "''",
        transform: "translate(-50%, -50%)",
    },
}));
const Radio = styled("input")({
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
});
export function InputRadioGroup({ options, readOnly = false, value, notifyOnValueChange = false, onChange, }) {
    const [selected, setSelected] = useState(value);
    useEffect(() => setSelected(value), [value]);
    useEffect(() => {
        if (notifyOnValueChange && !readOnly && selected !== undefined)
            onChange(selected);
    }, [selected]);
    return (_jsx(Root, { children: options.map((option) => {
            const checked = selected === option.value;
            return (_jsxs(Label, { "$readOnly": readOnly, children: [_jsx(Check, { className: `radio-check${checked ? " checked" : ""}${readOnly ? " disabled" : ""}`, "$checked": checked, "$disabled": readOnly, "aria-hidden": "true" }), _jsx(Radio, { type: "radio", value: String(option.value), checked: checked, disabled: readOnly, onChange: () => {
                            setSelected(option.value);
                            if (!notifyOnValueChange)
                                onChange(option.value);
                        } }), option.label] }, String(option.value)));
        }) }));
}
//# sourceMappingURL=InputRadioGroup.js.map