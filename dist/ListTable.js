import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { InputCheckbox } from "./InputCheckbox.js";
import { Pagination } from "./Pagination.js";
import { TableLoadingOverlay } from "./TableLoadingOverlay.js";
const Container = styled("div")({
    position: "relative",
    width: "100%",
    padding: "12px 0 0",
    overflow: "hidden",
    border: "1px solid #EBEBEB",
    borderRadius: "12px",
    background: "#FFF",
});
const ScrollContainer = styled("div")({
    width: "100%",
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
    borderCollapse: "collapse",
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
    height: "44px",
    padding: "0 20px",
    color: "#7C8694",
    fontSize: "12px",
    fontWeight: 600,
    textAlign: "left",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
});
const SortButton = styled("button")({
    display: "inline-flex",
    padding: "2px 4px 2px 0",
    alignItems: "center",
    gap: "5px",
    border: 0,
    borderRadius: "4px",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#F0F0F0" },
});
const Row = styled("tr", {
    shouldForwardProp: (prop) => !["$clickable", "$disableHover", "$backgroundHover"].includes(String(prop)),
})(({ $clickable, $disableHover, $backgroundHover }) => ({
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
    ".secondary": { color: "#7C8694" },
    "&.clickable": { cursor: "pointer" },
    "&.multi-clickable": {
        cursor: "pointer",
        textDecoration: "underline",
        "&:hover": { color: "#3A57E8" },
    },
});
const Empty = styled("div")({
    display: "flex",
    minHeight: "300px",
    alignItems: "center",
    justifyContent: "center",
    color: "#B8BFCC",
    fontSize: "18px",
    fontWeight: 500,
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
export function ListTable({ data, columns, page = 1, pageSize = 10, total = data.length, isLoading = false, showPageRange = true, showEdgePageButtons = true, onRowClick, onCellClick, clickableKey, selectAllEnabled = false, getSelectedRows, onCurrentPageChange, backgroundHoverStyle = false, disableRowHover = false, stickyHeader = false, clientPagination = total === data.length, rowKey, emptyContent = "No results", }) {
    const [currentPage, setCurrentPage] = useState(page);
    const [sort, setSort] = useState();
    const [selectedKeys, setSelectedKeys] = useState(new Set());
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
        setCurrentPage(next);
        updateSelection(new Set());
        onCurrentPageChange === null || onCurrentPageChange === void 0 ? void 0 : onCurrentPageChange(next);
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
    return (_jsxs(Container, { children: [_jsx(ScrollContainer, { children: _jsxs(Table, { children: [_jsx(Head, { "$sticky": stickyHeader, children: _jsxs("tr", { children: [selectAllEnabled && (_jsx(HeaderCell, { style: { width: 50 }, children: _jsx(InputCheckbox, { value: "all", isChecked: data.length > 0 && selectedKeys.size === data.length, onChange: (event) => updateSelection(event.target.checked ? new Set(data.map(getKey)) : new Set()) }) })), columns.map(({ key, label, width, sortable = true }) => (_jsx(HeaderCell, { style: { width }, "aria-sort": (sort === null || sort === void 0 ? void 0 : sort.key) === key ? (sort.direction === "asc" ? "ascending" : "descending") : undefined, children: sortable ? (_jsxs(SortButton, { type: "button", onClick: () => setSort((current) => ({ key, direction: (current === null || current === void 0 ? void 0 : current.key) === key && current.direction === "asc" ? "desc" : "asc" })), children: [label, _jsx("span", { "aria-hidden": "true", children: (sort === null || sort === void 0 ? void 0 : sort.key) === key ? (sort.direction === "asc" ? "↑" : "↓") : "↕" })] })) : label }, String(key))))] }) }), _jsx("tbody", { children: visibleData.length > 0 ? visibleData.map((row, index) => {
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
                                                }, children: (text === null || text === void 0 ? void 0 : text.includes("\n")) ? _jsx(_Fragment, { children: text.split("\n").map((line, lineIndex) => _jsx("div", { className: lineIndex ? "secondary" : undefined, children: line }, lineIndex)) }) : (text !== null && text !== void 0 ? text : value) }, String(columnKey)));
                                        })] }, key));
                            }) : (_jsx("tr", { children: _jsx(Cell, { colSpan: columns.length + (selectAllEnabled ? 1 : 0), children: _jsx(Empty, { children: emptyContent }) }) })) })] }) }), _jsx(Pagination, { page: currentPage, pageSize: pageSize, total: total, onPageChange: changePage, showPageRange: showPageRange, showEdgePageButtons: showEdgePageButtons }), isLoading && _jsx(TableLoadingOverlay, {})] }));
}
//# sourceMappingURL=ListTable.js.map