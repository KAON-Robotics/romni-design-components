export const motion = {
    duration: {
        backdrop: 160,
        tooltipExit: 160,
        tooltipEnter: 220,
        centerModal: 240,
        floatingMenu: 180,
        tabIndicator: 280,
        sideLayer: 420,
    },
    easing: {
        apple: "cubic-bezier(0.2, 0, 0, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
        indicator: "cubic-bezier(0.22, 1, 0.36, 1)",
        sideLayer: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    transform: {
        centerEnter: "translateY(6px) scale(0.96)",
        centerRest: "translateY(0) scale(1)",
        centerExit: "translateY(4px) scale(0.97)",
        sideHidden: "translateX(100%) scale(0.965)",
        sideVisible: "translateX(0) scale(1)",
    },
};
export const reducedMotion = {
    "@media (prefers-reduced-motion: reduce)": {
        animation: "none",
        transition: "none",
    },
};
export const centerModalMotion = {
    transformOrigin: "center center",
    animation: `center-modal-in ${motion.duration.centerModal}ms ${motion.easing.apple}`,
    WebkitFontSmoothing: "antialiased",
    "@keyframes center-modal-in": {
        "0%": {
            opacity: 0,
            transform: motion.transform.centerEnter,
            boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.08)",
        },
        "100%": {
            opacity: 1,
            transform: motion.transform.centerRest,
            boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.12)",
        },
    },
    ...reducedMotion,
};
export const centerBackdropMotion = {
    animation: `center-backdrop-in ${motion.duration.backdrop}ms ease-out`,
    "@keyframes center-backdrop-in": {
        "0%": { backgroundColor: "rgba(30, 31, 35, 0)" },
        "100%": { backgroundColor: "rgba(30, 31, 35, 0.40)" },
    },
    ...reducedMotion,
};
export const floatingMenuMotion = {
    animation: `floating-menu-in ${motion.duration.floatingMenu}ms ${motion.easing.apple}`,
    transformOrigin: "var(--floating-menu-origin, top center)",
    "@keyframes floating-menu-in": {
        "0%": {
            opacity: 0,
            transform: "translateY(var(--floating-menu-offset, 4px)) scale(0.98)",
        },
        "100%": {
            opacity: 1,
            transform: "translateY(var(--floating-menu-rest, 0px)) scale(1)",
        },
    },
    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
};
//# sourceMappingURL=motion.js.map