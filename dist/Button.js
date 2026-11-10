import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { styled } from "@mui/material";
const sizes = {
    compact: { height: "34px", radius: "4px", padding: "0 20px", fontSize: "12px" },
    medium: { height: "40px", radius: "6px", padding: "0 30px", fontSize: "14px" },
    large: { height: "50px", radius: "8px", padding: "0 40px", fontSize: "16px" },
};
const colors = {
    primary: { background: "var(--romni-surface-raised, #1E1F23)", color: "var(--romni-on-solid, #FFF)", border: "var(--romni-border, #1E1F23)" },
    secondary: { background: "var(--romni-surface-subtle, #F8F8F9)", color: "var(--romni-text-muted, #3F4A5D)", border: "var(--romni-border, #EBEBEB)" },
    neutral: { background: "var(--romni-surface-subtle, #F5F5F5)", color: "var(--romni-text-muted, #3F4A5D)", border: "var(--romni-border, #EBEBEB)" },
};
const StyledButton = styled("button", {
    shouldForwardProp: (prop) => !["$variant", "$size", "$iconOnly"].includes(String(prop)),
})(({ $variant, $size, $iconOnly }) => {
    const size = sizes[$size];
    const color = colors[$variant];
    const hoverBackground = $variant === "primary"
        ? $size === "large" ? "var(--romni-blue-solid, #3A57E8)" : "var(--romni-button-hover, #3F4A5D)"
        : $variant === "secondary"
            ? $size === "large" ? "var(--romni-button-hover, #B8BFCC)" : "var(--romni-surface-raised, #F0F0F0)"
            : "var(--romni-surface-raised, #EBEBEB)";
    return {
        display: "inline-flex",
        width: $iconOnly ? size.height : "auto",
        height: size.height,
        padding: $iconOnly ? 0 : $variant === "primary" && $size === "medium" ? "0 50px" : size.padding,
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        flexShrink: 0,
        border: `1px solid ${color.border}`,
        borderRadius: size.radius,
        backgroundColor: color.background,
        color: color.color,
        cursor: "pointer",
        fontSize: size.fontSize,
        fontWeight: $variant === "secondary" ? 500 : 600,
        lineHeight: $size === "compact" ? "14px" : "22px",
        transition: "background-color 150ms ease, border-color 150ms ease",
        "&:not(:disabled):hover, &[data-state='hover']:not(:disabled)": {
            borderColor: hoverBackground,
            backgroundColor: hoverBackground,
        },
        "&:focus-visible": {
            outline: "2px solid var(--romni-blue-text, #3A57E8)",
            outlineOffset: "2px",
        },
        "&:disabled": {
            borderColor: "var(--romni-border, #EBEBEB)",
            backgroundColor: "var(--romni-surface-subtle, #EBEBEB)",
            color: $variant === "primary" ? "var(--romni-text-subtle, #FFF)" : "var(--romni-text-subtle, #B8BFCC)",
            cursor: "default",
        },
        "& > svg, & > img": { flexShrink: 0 },
    };
});
export const Button = ({ variant = "primary", size = "medium", startIcon, iconOnly = false, type = "button", children, ...props }) => (_jsxs(StyledButton, { type: type, "$variant": variant, "$size": size, "$iconOnly": iconOnly, ...props, children: [startIcon, children] }));
const InputStyledButton = styled(Button)({
    padding: "0 20px",
    fontSize: "14px",
});
const DeleteStyledButton = styled(Button)({
    padding: "0 8px",
    backgroundColor: "var(--romni-surface-subtle, #F0F0F0)",
    color: "var(--romni-text-muted, #596270)",
    fontSize: "13px",
    fontWeight: 500,
});
export const InputButton = ({ label, type = "button", ...props }) => (_jsx(InputStyledButton, { type: type, variant: "neutral", size: "large", ...props, children: label }));
export const DeleteRowButton = ({ children = "선택 삭제", type = "button", ...props }) => (_jsx(DeleteStyledButton, { type: type, variant: "neutral", size: "compact", ...props, children: children }));
//# sourceMappingURL=Button.js.map