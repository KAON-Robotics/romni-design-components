import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { InputCheckbox } from "./InputCheckbox.js";
import { floatingMenuMotion } from "./motion.js";
const Root = styled("div")({ position: "relative", zIndex: 2, display: "inline-block" });
const Button = styled("button", {
    shouldForwardProp: (prop) => prop !== "$opened" && prop !== "$board",
})(({ $opened, $board }) => ({
    display: "flex",
    height: $board ? "26px" : "34px",
    padding: $board ? "4px 6px" : "8px 10px",
    alignItems: "center",
    border: `1px solid ${$opened ? "#3A57E8" : "#EBEBEB"}`,
    borderRadius: "4px",
    backgroundColor: $opened ? "#EBF1FF" : "#F5F5F5",
    fontSize: $board ? "11px" : "13px",
    whiteSpace: "nowrap",
    ".label": {
        color: $opened ? "#3A57E8" : "#596270",
        fontWeight: 500,
        flexShrink: 0,
    },
    ".selected": {
        marginLeft: "8px",
        color: $opened ? "#173CBA" : "#2A2C33",
        fontWeight: 600,
        flexShrink: 0,
    },
    svg: { marginLeft: "3px" },
}));
const Menu = styled("ul")({
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    display: "flex",
    minWidth: "100%",
    padding: "10px 14px",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid #D3D7E0",
    borderRadius: "8px",
    backgroundColor: "#FFF",
    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.20)",
    "--floating-menu-offset": "-2px",
    "--floating-menu-rest": "0px",
    "--floating-menu-origin": "top left",
    ...floatingMenuMotion,
});
const Item = styled("li")({ display: "flex", height: "18px" });
const Check = styled(InputCheckbox)({
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    color: "#3F4A5D",
    fontSize: "12px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    div: {
        width: "14px",
        height: "14px",
        "&::before": { top: "3px", left: "7px", height: "7px" },
        "&::after": { top: "6px", left: "4px", height: "4px" },
    },
});
const Arrow = ({ opened }) => (_jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", "aria-hidden": "true", children: _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: opened
            ? "M2.8 8.166 7 4.2l4.2 3.966-.988.933L7 6.066 3.788 9.1 2.8 8.166Z"
            : "M11.2 5.833 7 9.8 2.8 5.833l.988-.933L7 7.933 10.212 4.9l.988.933Z", fill: opened ? "#3A57E8" : "#7C8694" }) }));
export const MultiSelectFilter = ({ filter, initialSelected, board = false, onChange, }) => {
    const rootRef = useRef(null);
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState(new Set(initialSelected));
    const allSelected = filter.options.length > 0 && selected.size === filter.options.length;
    useEffect(() => {
        const next = new Set(initialSelected);
        if (next.size !== selected.size || [...next].some((value) => !selected.has(value))) {
            setSelected(next);
        }
    }, [initialSelected]);
    useEffect(() => onChange([...selected]), [selected]);
    useEffect(() => {
        const close = (event) => {
            if (rootRef.current && !rootRef.current.contains(event.target))
                setOpened(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);
    const setAll = (checked) => {
        setSelected(checked
            ? new Set(filter.options.map((option) => option.value))
            : new Set());
    };
    const setOne = (value, checked) => {
        const next = new Set(selected);
        checked ? next.add(value) : next.delete(value);
        setSelected(next);
    };
    return (_jsxs(Root, { ref: rootRef, children: [_jsxs(Button, { type: "button", "$opened": opened, "$board": board, onClick: () => setOpened(!opened), children: [_jsx("span", { className: "label", children: filter.label }), _jsx("span", { className: "selected", children: allSelected ? "전체" : selected.size }), _jsx(Arrow, { opened: opened })] }), opened && (_jsxs(Menu, { children: [_jsx(Item, { children: _jsx(Check, { label: "\uC804\uCCB4", value: "all", isChecked: allSelected, onChange: (event) => setAll(event.target.checked) }) }), filter.options.map((option, index) => (_jsx(Item, { children: _jsx(Check, { label: option.label, value: option.value, isChecked: selected.has(option.value), onChange: (event) => setOne(option.value, event.target.checked) }) }, index)))] }))] }));
};
//# sourceMappingURL=MultiSelectFilter.js.map