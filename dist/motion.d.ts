export declare const motion: {
    readonly duration: {
        readonly backdrop: 160;
        readonly tooltipExit: 160;
        readonly tooltipEnter: 220;
        readonly centerModal: 240;
        readonly floatingMenu: 180;
        readonly tabIndicator: 280;
        readonly sideLayer: 420;
    };
    readonly easing: {
        readonly apple: "cubic-bezier(0.2, 0, 0, 1)";
        readonly exit: "cubic-bezier(0.4, 0, 1, 1)";
        readonly indicator: "cubic-bezier(0.22, 1, 0.36, 1)";
        readonly sideLayer: "cubic-bezier(0.16, 1, 0.3, 1)";
    };
    readonly transform: {
        readonly centerEnter: "translateY(6px) scale(0.96)";
        readonly centerRest: "translateY(0) scale(1)";
        readonly centerExit: "translateY(4px) scale(0.97)";
        readonly sideHidden: "translateX(100%) scale(0.965)";
        readonly sideVisible: "translateX(0) scale(1)";
    };
};
export declare const reducedMotion: {
    "@media (prefers-reduced-motion: reduce)": {
        animation: string;
        transition: string;
    };
};
export declare const centerModalMotion: {
    "@media (prefers-reduced-motion: reduce)": {
        animation: string;
        transition: string;
    };
    transformOrigin: string;
    animation: string;
    WebkitFontSmoothing: string;
    "@keyframes center-modal-in": {
        "0%": {
            opacity: number;
            transform: "translateY(6px) scale(0.96)";
            boxShadow: string;
        };
        "100%": {
            opacity: number;
            transform: "translateY(0) scale(1)";
            boxShadow: string;
        };
    };
};
export declare const centerBackdropMotion: {
    "@media (prefers-reduced-motion: reduce)": {
        animation: string;
        transition: string;
    };
    animation: string;
    "@keyframes center-backdrop-in": {
        "0%": {
            backgroundColor: string;
        };
        "100%": {
            backgroundColor: string;
        };
    };
};
export declare const floatingMenuMotion: {
    animation: string;
    transformOrigin: string;
    "@keyframes floating-menu-in": {
        "0%": {
            opacity: number;
            transform: string;
        };
        "100%": {
            opacity: number;
            transform: string;
        };
    };
    "@media (prefers-reduced-motion: reduce)": {
        animation: string;
    };
};
//# sourceMappingURL=motion.d.ts.map