import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState, } from "react";
import { createPortal } from "react-dom";
import { floatingMenuMotion } from "./motion.js";
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const Root = styled("div")({ position: "relative", width: "100%", maxWidth: "500px" });
const Input = styled("input", {
    shouldForwardProp: (prop) => prop !== "$opened" && prop !== "$hasIcon",
})(({ $opened, $hasIcon }) => ({
    width: "100%",
    height: "50px",
    padding: $hasIcon ? "0 36px 0 52px" : "0 36px 0 16px",
    border: `1px solid ${$opened ? "#3A57E8" : "#F0F0F0"}`,
    borderRadius: "8px",
    outline: 0,
    backgroundColor: "#FFF",
    color: "#2A2C33",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    "&::placeholder": { color: "#B8BFCC" },
    '&[aria-invalid="true"]': { borderColor: "#FF4747" },
    "&:disabled": { backgroundColor: "#FAFAFA", color: "#7C8694" },
}));
const Menu = styled("ul")({
    position: "absolute",
    top: "100%",
    right: 0,
    left: 0,
    zIndex: 10,
    minWidth: "max-content",
    maxHeight: "200px",
    padding: "4px",
    overflowY: "auto",
    border: "1px solid #EBEBEB",
    borderRadius: "8px",
    backgroundColor: "#FFF",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.06)",
    "--floating-menu-offset": "6px",
    "--floating-menu-rest": "6px",
    "--floating-menu-origin": "top center",
    ...floatingMenuMotion,
});
const Option = styled("li", {
    shouldForwardProp: (prop) => prop !== "$selected",
})(({ $selected }) => ({
    position: "relative",
    display: "flex",
    height: "34px",
    padding: "0 36px 0 20px",
    alignItems: "center",
    borderRadius: "4px",
    backgroundColor: $selected ? "#EBF1FF" : "transparent",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 500,
    "&:not(:last-child)": { marginBottom: "4px" },
    "&:hover": { backgroundColor: "#FAFAFA" },
}));
const Icon = styled("span")({
    position: "absolute",
    top: "50%",
    left: "16px",
    display: "flex",
    width: "24px",
    height: "24px",
    alignItems: "center",
    justifyContent: "center",
    transform: "translateY(-50%)",
});
const Arrow = styled("span")({
    position: "absolute",
    top: "50%",
    right: "12px",
    width: "16px",
    height: "16px",
    pointerEvents: "none",
    transform: "translateY(-50%)",
});
const Clear = styled("button")({
    position: "absolute",
    top: "50%",
    right: "12px",
    display: "flex",
    width: "20px",
    height: "20px",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#FFF",
    transform: "translateY(-50%)",
    "&::before, &::after": {
        position: "absolute",
        width: "10px",
        height: "2px",
        backgroundColor: "#B8BFCC",
        content: "''",
    },
    "&::before": { transform: "rotate(45deg)" },
    "&::after": { transform: "rotate(-45deg)" },
});
const Highlight = styled("span")({ color: "#3A57E8" });
const Chevron = ({ opened }) => (_jsx("svg", { viewBox: "0 0 16 16", width: "16", height: "16", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: opened ? "m3.2 9.333 4.8-4 4.8 4" : "m12.8 6.667-4.8 4-4.8-4", stroke: "#7C8694", strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round" }) }));
const SelectedCheck = () => (_jsx("svg", { viewBox: "0 0 16 16", width: "16", height: "16", fill: "none", "aria-hidden": "true", style: { position: "absolute", top: "50%", right: 15, transform: "translateY(-50%)" }, children: _jsx("path", { d: "m3.2 8.1 3 3 6.6-6.2", stroke: "#3A57E8", strokeWidth: "1.6" }) }));
export const SelectBox = ({ options, placeholder, value, isValid, readOnly, disabled, contact, floatingMenu, startIcon, emptyOptionText = "No options", onChange, onClear, ...props }) => {
    var _a, _b;
    const rootRef = useRef(null);
    const menuRef = useRef(null);
    const [opened, setOpened] = useState(false);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const [menuStyle, setMenuStyle] = useState();
    const selectedLabel = (_b = (_a = options.find((option) => option.value === value)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : "";
    const inputValue = opened && searching ? search : selectedLabel;
    const visibleOptions = options.filter((option) => !option.disabled && (readOnly || !searching || !search || option.label.toLowerCase().includes(search.toLowerCase())));
    const updateMenuPosition = () => {
        if (!opened || !floatingMenu || !rootRef.current)
            return;
        const rect = rootRef.current.getBoundingClientRect();
        const below = window.innerHeight - rect.bottom - 8;
        const above = rect.top - 8;
        const placeAbove = below < 180 && above > below;
        setMenuStyle({
            position: "fixed",
            left: rect.left,
            top: placeAbove ? rect.top - 6 : rect.bottom,
            width: rect.width,
            maxHeight: Math.max(120, Math.min(194, placeAbove ? above : below)),
            transform: placeAbove ? "translateY(-100%)" : undefined,
            "--floating-menu-offset": placeAbove ? "calc(-100% - 4px)" : "6px",
            "--floating-menu-rest": placeAbove ? "-100%" : "6px",
            "--floating-menu-origin": placeAbove ? "bottom center" : "top center",
            zIndex: 1400,
        });
    };
    useEffect(() => {
        if (!opened) {
            setSearch("");
            setSearching(false);
        }
    }, [opened, value, options]);
    useEffect(() => {
        const close = (event) => {
            var _a, _b;
            const target = event.target;
            if (!((_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.contains(target)) && !((_b = menuRef.current) === null || _b === void 0 ? void 0 : _b.contains(target)))
                setOpened(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);
    useIsomorphicLayoutEffect(() => {
        if (!opened || !floatingMenu)
            return;
        updateMenuPosition();
        window.addEventListener("resize", updateMenuPosition);
        window.addEventListener("scroll", updateMenuPosition, true);
        return () => {
            window.removeEventListener("resize", updateMenuPosition);
            window.removeEventListener("scroll", updateMenuPosition, true);
        };
    }, [opened, floatingMenu]);
    const menu = opened ? (_jsx(Menu, { ref: menuRef, style: floatingMenu ? menuStyle : undefined, children: visibleOptions.length === 0 ? (_jsx(Option, { "$selected": false, children: emptyOptionText })) : visibleOptions.map((option) => (_jsxs(Option, { "$selected": option.value === value, onMouseDown: (event) => {
                event.preventDefault();
                onChange === null || onChange === void 0 ? void 0 : onChange(option.value);
                setOpened(false);
            }, children: [searching && search ? option.label.split(new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")).map((part, index) => part.toLowerCase() === search.toLowerCase()
                    ? _jsx(Highlight, { children: part }, index)
                    : _jsx("span", { children: part }, index)) : option.label, option.value === value && _jsx(SelectedCheck, {})] }, option.value))) })) : null;
    return (_jsxs(Root, { ref: rootRef, ...props, children: [_jsxs("div", { style: { position: "relative" }, children: [_jsx(Input, { type: "text", value: contact ? inputValue.split("(")[0] : inputValue, placeholder: placeholder, readOnly: readOnly, disabled: disabled, "aria-invalid": isValid === false, "$opened": opened, "$hasIcon": Boolean(startIcon), onChange: (event) => {
                            setSearch(event.target.value);
                            setSearching(true);
                            setOpened(true);
                        }, onClick: () => {
                            setSearching(false);
                            setOpened(true);
                        } }), startIcon && _jsx(Icon, { children: startIcon }), !selectedLabel && !search && _jsx(Arrow, { children: _jsx(Chevron, { opened: opened }) }), (selectedLabel || search) && !readOnly && onClear && (_jsx(Clear, { type: "button", "aria-label": "\uC120\uD0DD \uD574\uC81C", onClick: () => {
                            onClear();
                            setOpened(false);
                        } }))] }), floatingMenu && menu ? createPortal(menu, document.body) : menu] }));
};
//# sourceMappingURL=SelectBox.js.map