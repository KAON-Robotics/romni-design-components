import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from "@mui/material";
const Root = styled("nav")({
    position: "absolute",
    bottom: 0,
    left: 0,
    display: "flex",
    width: "100%",
    height: "52px",
    padding: "10px",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "14px",
});
const Count = styled("span")({
    display: "flex",
    gap: "8px",
    fontFamily: "Manrope, sans-serif",
    ".current": { color: "#3A57E8", fontWeight: 600 },
    ".separator": { color: "#1E1F23", fontWeight: 400 },
    ".total": { color: "#1E1F23", fontWeight: 600 },
});
const Range = styled("span")({
    position: "absolute",
    right: "20px",
    color: "#596270",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.26px",
});
const PageButton = styled("button")({
    display: "inline-flex",
    width: "24px",
    height: "24px",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    borderRadius: "8px",
    background: "transparent",
    color: "#7C8694",
    cursor: "pointer",
    "&:hover:not(:disabled)": { color: "#3A57E8" },
    "&:disabled": { color: "#D3D7E0", cursor: "default" },
});
const PaginationIcon = ({ direction, double = false }) => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", style: { transform: direction === "left" ? "rotate(180deg)" : undefined }, children: [double && (_jsx("path", { d: "M2.97 2.7 8.28 8l-5.31 5.3-.61-.61L7.05 8 2.36 3.31l.61-.61Z", fill: "currentColor" })), _jsx("path", { d: double ? "M7.03 2.7 12.33 8l-5.3 5.3-.62-.61L11.11 8 6.41 3.31l.62-.61Z" : "M5.97 2.7 11.28 8l-5.31 5.3-.61-.61L10.05 8 5.36 3.31l.61-.61Z", fill: "currentColor" })] }));
export const Pagination = ({ page, pageSize, total, onPageChange, showPageRange = true, showEdgePageButtons = true, }) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const rangeStart = total > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const rangeEnd = total > 0 ? Math.min(currentPage * pageSize, total) : 0;
    return (_jsxs(Root, { "aria-label": "Pagination", children: [showEdgePageButtons && (_jsx(PageButton, { "aria-label": "First page", disabled: currentPage === 1, onClick: () => onPageChange(1), children: _jsx(PaginationIcon, { direction: "left", double: true }) })), _jsx(PageButton, { "aria-label": "Previous page", disabled: currentPage === 1, onClick: () => onPageChange(currentPage - 1), children: _jsx(PaginationIcon, { direction: "left" }) }), _jsxs(Count, { "aria-live": "polite", children: [_jsx("span", { className: "current", children: currentPage }), _jsx("span", { className: "separator", children: "/" }), _jsx("span", { className: "total", children: totalPages })] }), _jsx(PageButton, { "aria-label": "Next page", disabled: currentPage === totalPages, onClick: () => onPageChange(currentPage + 1), children: _jsx(PaginationIcon, { direction: "right" }) }), showEdgePageButtons && (_jsx(PageButton, { "aria-label": "Last page", disabled: currentPage === totalPages, onClick: () => onPageChange(totalPages), children: _jsx(PaginationIcon, { direction: "right", double: true }) })), showPageRange && _jsx(Range, { children: `${rangeStart} - ${rangeEnd} of ${total}` })] }));
};
//# sourceMappingURL=Pagination.js.map