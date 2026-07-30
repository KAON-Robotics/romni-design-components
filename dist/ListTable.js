import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { InputCheckbox } from "./InputCheckbox.js";
import { Pagination } from "./Pagination.js";
import { TableLoadingOverlay } from "./TableLoadingOverlay.js";
const Container = styled("div", {
    shouldForwardProp: (prop) => prop !== "$empty",
})(({ $empty }) => ({
    position: "relative",
    width: "100%",
    minHeight: $empty ? "560px" : undefined,
    padding: "12px 0 52px",
    border: "1px solid #EBEBEB",
    borderRadius: "12px",
    background: "#FFF",
}));
const ScrollContainer = styled("div")({
    height: "100%",
    overflowX: "auto",
    borderBottom: "1px solid #E0E0E0",
    "&::-webkit-scrollbar": { height: "8px" },
    "&::-webkit-scrollbar-track": {
        border: "1px solid #EDEEF4",
        borderRadius: "999px",
        backgroundColor: "#F8F8F9",
    },
    "&::-webkit-scrollbar-thumb": {
        border: "2px solid #F8F8F9",
        borderRadius: "999px",
        backgroundColor: "#B8BFCC",
    },
});
const Table = styled("table")({
    width: "max-content",
    minWidth: "100%",
    fontSize: "12px",
});
const Head = styled("thead", {
    shouldForwardProp: (prop) => prop !== "$sticky",
})(({ $sticky }) => ({
    borderBottom: "1px solid #E0E0E0",
    background: "#FFF",
    fontWeight: 600,
    ...($sticky && { position: "sticky", top: 0, zIndex: 2 }),
}));
const HeaderCell = styled("th")({
    position: "relative",
    height: "44px",
    paddingLeft: "16px",
    color: "#7C8694",
    fontSize: "12px",
    fontWeight: 600,
    textAlign: "left",
    verticalAlign: "middle",
    cursor: "default",
    ".header-content": {
        display: "inline-flex",
        padding: "2px 4px",
        marginRight: "12px",
        alignItems: "center",
        borderRadius: "4px",
    },
    ".header-content.active": { color: "#2A2C33" },
    ".header-content:hover": { backgroundColor: "#F0F0F0" },
});
const SortButton = styled("button")({
    position: "relative",
    width: "12px",
    height: "12px",
    padding: 0,
    marginLeft: "5px",
    border: 0,
    background: "transparent",
    cursor: "pointer",
    verticalAlign: "middle",
    svg: { position: "absolute", top: 0, left: 0 },
    ".desc": { transform: "rotate(180deg)" },
});
const SortIcon = ({ direction }) => direction ? (_jsxs("svg", { className: direction, width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: [_jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6 11.25A5.25 5.25 0 1 0 6 .75a5.25 5.25 0 0 0 0 10.5Zm0-.9a4.35 4.35 0 1 0 0-8.7 4.35 4.35 0 0 0 0 8.7Z", fill: "#1E1F23" }), _jsx("path", { d: "M5.68 7.3V3.5h.64v3.8l1.73-1.67.45.44L6 8.5 3.5 6.07l.45-.44L5.68 7.3Z", fill: "#1E1F23", stroke: "#1E1F23", strokeWidth: ".3" })] })) : (_jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: "M7.5 3.75 5 1.25l-2.5 2.5h5Zm0 2.5L5 8.75l-2.5-2.5h5Z", fill: "#D3D7E0" }) }));
const Row = styled("tr", {
    shouldForwardProp: (prop) => !["$clickable", "$disableHover", "$backgroundHover"].includes(String(prop)),
})(({ $clickable, $disableHover, $backgroundHover }) => ({
    position: "relative",
    cursor: $clickable ? "pointer" : "default",
    ...(!$disableHover && {
        "&:hover": $backgroundHover
            ? { backgroundColor: "#EBF1FF" }
            : { boxShadow: "inset 0 0 0 1px #3A57E8, 0 4px 10px rgba(58, 87, 232, 0.2)" },
    }),
}));
const Cell = styled("td")({
    height: "50px",
    padding: "8px 20px",
    borderBottom: "1px solid #F5F5F5",
    color: "#3F4A5D",
    fontSize: "12px",
    fontWeight: 400,
    verticalAlign: "middle",
    cursor: "default",
    ".cell-secondary-line": { color: "#7C8694" },
    "&.clickable": { cursor: "pointer" },
    "&.multi-clickable": {
        cursor: "pointer",
        textDecoration: "underline",
        "&:hover": { color: "#3A57E8" },
    },
});
const Empty = styled("div")({
    position: "sticky",
    left: 0,
    width: "calc(100vw - 219px - 60px)",
    height: "500px",
});
const sortableValue = (value) => {
    if (typeof value === "string" || typeof value === "number")
        return value;
    if (React.isValidElement(value)) {
        const props = value.props;
        if (typeof props.state === "string")
            return props.state;
        if (typeof props.children === "string")
            return props.children;
    }
    return "";
};
export function ListTable({ data, columns, page = 1, pageSize = 10, total = 0, isLoading = false, showPageRange = true, showEdgePageButtons = true, onRowClick, onCellClick, clickableKey, selectAllEnabled = false, getSelectedRows, onCurrentPageChange, backgroundHoverStyle = false, disableRowHover = false, stickyHeader = false, clientPagination = total === data.length, rowKey, emptyContent = "No results", }) {
    const [currentPage, setCurrentPage] = useState(page);
    const [sort, setSort] = useState();
    const [selectedKeys, setSelectedKeys] = useState(new Set());
    const previousLoading = useRef(isLoading);
    const containerRef = useRef(null);
    const clickableKeys = clickableKey == null ? [] : Array.isArray(clickableKey) ? clickableKey : [clickableKey];
    const multipleClickableCells = clickableKeys.length > 1;
    const rowClickable = Boolean(onRowClick || (onCellClick && clickableKeys.length === 1));
    const getKey = (row, index) => {
        var _a;
        if (typeof rowKey === "function")
            return rowKey(row, index);
        if (rowKey)
            return row[rowKey];
        return ((_a = row.idx) !== null && _a !== void 0 ? _a : index);
    };
    useEffect(() => setCurrentPage(page), [page]);
    useEffect(() => {
        setCurrentPage((current) => Math.min(current, Math.max(1, Math.ceil(total / pageSize))));
    }, [pageSize, total]);
    useEffect(() => {
        if (!previousLoading.current && isLoading)
            setSort(undefined);
        previousLoading.current = isLoading;
    }, [isLoading]);
    const sortedData = [...data].sort((a, b) => {
        if (!sort)
            return 0;
        const aValue = sortableValue(a[sort.key]);
        const bValue = sortableValue(b[sort.key]);
        const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return sort.direction === "asc" ? result : -result;
    });
    const visibleData = clientPagination
        ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : sortedData;
    const updateSelection = (next) => {
        setSelectedKeys(next);
        getSelectedRows === null || getSelectedRows === void 0 ? void 0 : getSelectedRows(data.filter((row, index) => next.has(getKey(row, index))));
    };
    const changePage = (next) => {
        var _a;
        setCurrentPage(next);
        updateSelection(new Set());
        onCurrentPageChange === null || onCurrentPageChange === void 0 ? void 0 : onCurrentPageChange(next);
        const scrollWrapper = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.closest(".page-scroll-wrapper");
        if (scrollWrapper instanceof HTMLElement)
            scrollWrapper.scrollTo({ top: 0, behavior: "auto" });
    };
    const handleRowClick = (event, row) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.closest('input, button, select, textarea, a, [role="button"], [contenteditable="true"], [data-stop-row-click="true"]'))
            return;
        if (onRowClick)
            onRowClick(row);
        else if (onCellClick && clickableKeys.length === 1) {
            const key = clickableKeys[0];
            onCellClick(key, row[key], row);
        }
    };
    return (_jsxs(Container, { ref: containerRef, "$empty": visibleData.length === 0, children: [_jsx(ScrollContainer, { children: _jsxs(Table, { children: [_jsx(Head, { "$sticky": stickyHeader, children: _jsxs("tr", { children: [selectAllEnabled && (_jsx(HeaderCell, { style: { width: 50 }, children: _jsx(InputCheckbox, { value: "all", isChecked: data.length > 0 && selectedKeys.size === data.length, onChange: (event) => updateSelection(event.target.checked ? new Set(data.map(getKey)) : new Set()) }) })), columns.map(({ key, label, width, sortable = true }) => (_jsx(HeaderCell, { style: { width }, "aria-sort": (sort === null || sort === void 0 ? void 0 : sort.key) === key ? (sort.direction === "asc" ? "ascending" : "descending") : undefined, children: sortable ? (_jsxs("span", { className: `header-content${(sort === null || sort === void 0 ? void 0 : sort.key) === key ? " active" : ""}`, onClick: () => setSort((current) => ({ key, direction: (current === null || current === void 0 ? void 0 : current.key) === key && current.direction === "asc" ? "desc" : "asc" })), children: [label, _jsx(SortButton, { type: "button", tabIndex: -1, children: _jsx(SortIcon, { direction: (sort === null || sort === void 0 ? void 0 : sort.key) === key ? sort.direction : undefined }) })] })) : label }, String(key))))] }) }), _jsx("tbody", { children: visibleData.length > 0 ? visibleData.map((row, index) => {
                                const key = getKey(row, index);
                                return (_jsxs(Row, { "$clickable": rowClickable, "$disableHover": disableRowHover || multipleClickableCells, "$backgroundHover": backgroundHoverStyle, onClick: (event) => handleRowClick(event, row), children: [selectAllEnabled && (_jsx(Cell, { children: _jsx(InputCheckbox, { value: String(key), isChecked: selectedKeys.has(key), onChange: (event) => {
                                                    const next = new Set(selectedKeys);
                                                    event.target.checked ? next.add(key) : next.delete(key);
                                                    updateSelection(next);
                                                } }) })), columns.map(({ key: columnKey }) => {
                                            const clickable = clickableKeys.includes(columnKey);
                                            const value = row[columnKey];
                                            const text = typeof value === "string" || typeof value === "number" ? String(value) : undefined;
                                            return (_jsx(Cell, { className: clickable ? (multipleClickableCells ? "multi-clickable" : "clickable") : undefined, onClick: (event) => {
                                                    if (!clickable || !onCellClick)
                                                        return;
                                                    event.stopPropagation();
                                                    onCellClick(columnKey, value, row);
                                                }, children: (text === null || text === void 0 ? void 0 : text.includes("\n")) ? _jsx(_Fragment, { children: text.split("\n").map((line, lineIndex) => _jsx("div", { className: lineIndex ? "cell-secondary-line" : undefined, children: line }, lineIndex)) }) : (text !== null && text !== void 0 ? text : value) }, String(columnKey)));
                                        })] }, key));
                            }) : (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + (selectAllEnabled ? 1 : 0), style: { position: "relative" }, children: _jsx(Empty, { children: emptyContent }) }) })) })] }) }), _jsx(Pagination, { page: currentPage, pageSize: pageSize, total: total, onPageChange: changePage, showPageRange: showPageRange, showEdgePageButtons: showEdgePageButtons }), isLoading && _jsx(TableLoadingOverlay, {})] }));
}
//# sourceMappingURL=ListTable.js.map