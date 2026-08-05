import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "./motion.js";
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const Root = styled("div", {
    shouldForwardProp: (prop) => prop !== "$dashboard",
})(({ $dashboard }) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    button: {
        display: "flex",
        width: $dashboard ? "20px" : "16px",
        height: $dashboard ? "20px" : "16px",
        padding: 0,
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
    },
    "button svg, button img": { display: "block", width: "100%", height: "100%" },
}));
const Box = styled("div", {
    shouldForwardProp: (prop) => prop !== "$dashboard",
})(({ $dashboard }) => ({
    position: "fixed",
    zIndex: 1300,
    display: "flex",
    maxWidth: "340px",
    padding: "10px",
    flexFlow: "column",
    gap: "6px",
    borderRadius: "6px",
    backgroundColor: "#1E1F23",
    color: "#FFF",
    whiteSpace: "normal",
    ...(!$dashboard && { transform: "translateY(-50%)" }),
    strong: {
        display: "block",
        fontSize: "13px",
        fontWeight: 600,
        lineHeight: "16px",
        whiteSpace: "pre",
    },
    p: {
        margin: 0,
        fontSize: "12px",
        lineHeight: "18px",
        whiteSpace: "normal",
        wordBreak: "keep-all",
        "&.example": { fontWeight: 600 },
        "&.list, &.sublist": {
            position: "relative",
            paddingLeft: "11px",
            "&::before": {
                position: "absolute",
                top: "8px",
                left: 0,
                display: "block",
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                backgroundColor: "#FFF",
                content: "''",
            },
        },
        "&.sublist": { paddingLeft: "23px", "&::before": { left: "12px" } },
    },
    "ul.table": {
        padding: 0,
        margin: 0,
        listStyle: "none",
        li: {
            display: "flex",
            padding: "0 10px",
            justifyContent: "space-between",
            textAlign: "center",
            "&:first-of-type": {
                paddingBottom: "8px",
                marginBottom: "8px",
                borderBottom: "1px solid #2A2C33",
            },
            "*": { width: "40px" },
        },
    },
    "&::after": {
        position: "absolute",
        left: "-9px",
        ...(!$dashboard && { top: "50%", transform: "translateY(-50%)" }),
        borderWidth: "5px",
        borderStyle: "solid",
        borderColor: "transparent #1E1F23 transparent transparent",
        content: "''",
    },
    "&.left-placement::after": {
        right: "-9px",
        left: "auto",
        borderColor: "transparent transparent transparent #1E1F23",
    },
    "&.enter": {
        opacity: 1,
        transform: $dashboard ? "translateY(0) scale(1)" : "translateY(-50%) scale(1)",
        transformOrigin: "left center",
        animation: `help-tooltip-enter ${motion.duration.tooltipEnter}ms ${motion.easing.apple}`,
    },
    "&.left-placement.enter": { transformOrigin: "right center" },
    "&.closing": {
        pointerEvents: "none",
        animation: `help-tooltip-exit ${motion.duration.tooltipExit}ms ${motion.easing.exit} forwards`,
    },
    "@keyframes help-tooltip-enter": {
        "0%": {
            opacity: 0,
            transform: $dashboard
                ? "translateY(-3px) scale(0.96)"
                : "translateY(-50%) translateX(-3px) scale(0.96)",
        },
        "100%": {
            opacity: 1,
            transform: $dashboard
                ? "translateY(0) scale(1)"
                : "translateY(-50%) translateX(0) scale(1)",
        },
    },
    "@keyframes help-tooltip-exit": {
        "0%": {
            opacity: 1,
            transform: $dashboard
                ? "translateY(0) scale(1)"
                : "translateY(-50%) translateX(0) scale(1)",
        },
        "100%": {
            opacity: 0,
            transform: $dashboard
                ? "translateY(-2px) scale(0.97)"
                : "translateY(-50%) translateX(-2px) scale(0.97)",
        },
    },
    "@media (prefers-reduced-motion: reduce)": { "&.enter, &.closing": { animation: "none" } },
}));
const InfoIcon = ({ dashboard }) => dashboard ? (_jsxs("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: [_jsx("path", { d: "M10.75 8.374v6h-1.5v-6h1.5ZM9.25 5.624v1.5h1.5v-1.5h-1.5Z", fill: "#B8BFCC" }), _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10 1.248a8.751 8.751 0 1 0 0 17.502 8.751 8.751 0 0 0 0-17.502Zm0 1.5a7.251 7.251 0 1 0 0 14.502 7.251 7.251 0 0 0 0-14.502Z", fill: "#B8BFCC" })] })) : (_jsxs("svg", { viewBox: "0 0 14 14", fill: "none", "aria-hidden": "true", children: [_jsx("path", { d: "M7.525 5.862v4.2h-1.05v-4.2h1.05ZM6.475 3.937v1.05h1.05v-1.05h-1.05Z", fill: "#7C8694" }), _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7 .874A6.126 6.126 0 1 0 7 13.125 6.126 6.126 0 0 0 7 .874Zm0 1.05a5.076 5.076 0 1 0 0 10.151A5.076 5.076 0 0 0 7 1.924Z", fill: "#7C8694" })] }));
export const HelpTooltip = ({ help, dashboard = false, icon }) => {
    const rootRef = useRef(null);
    const buttonRef = useRef(null);
    const tooltipRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [render, setRender] = useState(false);
    const [closing, setClosing] = useState(false);
    const [leftPlacement, setLeftPlacement] = useState(false);
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const updatePosition = () => {
        if (!render || !buttonRef.current || !tooltipRef.current)
            return;
        const trigger = buttonRef.current.getBoundingClientRect();
        const width = tooltipRef.current.offsetWidth;
        let left = trigger.right + 13;
        let placeLeft = false;
        if (left + width + 8 > window.innerWidth) {
            left = trigger.left - 13 - width;
            placeLeft = true;
        }
        setLeftPlacement(placeLeft);
        setPosition({
            left: Math.max(8, left),
            top: dashboard ? trigger.top - 6 : trigger.top + trigger.height / 2,
        });
    };
    useEffect(() => {
        const close = (event) => {
            if (rootRef.current && !rootRef.current.contains(event.target))
                setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);
    useIsomorphicLayoutEffect(() => {
        if (!render)
            return;
        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [render, dashboard]);
    useEffect(() => {
        if (open) {
            setRender(true);
            setClosing(false);
            return;
        }
        if (!render)
            return;
        setClosing(true);
        const timeout = window.setTimeout(() => {
            setRender(false);
            setClosing(false);
        }, motion.duration.tooltipExit);
        return () => window.clearTimeout(timeout);
    }, [open, render]);
    return (_jsxs(Root, { ref: rootRef, "$dashboard": dashboard, children: [_jsx("button", { ref: buttonRef, type: "button", "aria-label": "\uB3C4\uC6C0\uB9D0", "aria-expanded": open, onClick: () => setOpen(!open), children: icon !== null && icon !== void 0 ? icon : _jsx(InfoIcon, { dashboard: dashboard }) }), render && createPortal(_jsxs(Box, { ref: tooltipRef, "$dashboard": dashboard, className: `${leftPlacement ? "left-placement " : ""}${closing ? "closing" : "enter"}`, style: { left: position.left, top: position.top }, children: [_jsx("strong", { children: help.title }), help.contents.map((content, index) => content.type === "table" ? (_jsx("ul", { className: "table", children: content.detail.split("/").map((line, rowIndex) => {
                            const [left, right] = line.split(".");
                            return _jsxs("li", { children: [_jsx("span", { children: left }), _jsx("span", { children: right })] }, rowIndex);
                        }) }, index)) : (_jsx("p", { className: content.type, children: content.detail }, index)))] }), document.body)] }));
};
//# sourceMappingURL=HelpTooltip.js.map