import { styled } from "@mui/material";
import React, { type Key, type ReactNode, useEffect, useRef, useState } from "react";
import { InputCheckbox } from "./InputCheckbox.js";
import { Pagination } from "./Pagination.js";
import { TableLoadingOverlay } from "./TableLoadingOverlay.js";

const Container = styled("div", {
  shouldForwardProp: (prop) => prop !== "$empty",
})<{ $empty: boolean }>(({ $empty }) => ({
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
})<{ $sticky: boolean }>(({ $sticky }) => ({
  borderBottom: "1px solid #E0E0E0",
  background: "#FFF",
  fontWeight: 600,
  ...($sticky && { position: "sticky", top: 0, zIndex: 2 }),
}));

const HeaderCell = styled("th")({
  position: "relative",
  height: "44px",
  paddingLeft: "16px",
  color: "#596270",
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
    cursor: "pointer",
  },
  ".header-content.active": { color: "#2A2C33" },
  ".header-content:hover": { backgroundColor: "#F0F0F0" },
  ".header-content .desc": { transform: "rotate(180deg)" },
});

const SortIcon = ({ direction }: { direction?: "asc" | "desc" }) => direction ? (
  <svg className={direction} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M6 11.25A5.25 5.25 0 1 0 6 .75a5.25 5.25 0 0 0 0 10.5Zm0-.9a4.35 4.35 0 1 0 0-8.7 4.35 4.35 0 0 0 0 8.7Z" fill="#1E1F23" />
    <path d="M5.68 7.3V3.5h.64v3.8l1.73-1.67.45.44L6 8.5 3.5 6.07l.45-.44L5.68 7.3Z" fill="#1E1F23" stroke="#1E1F23" strokeWidth=".3" />
  </svg>
) : (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M7.5 3.75 5 1.25l-2.5 2.5h5Zm0 2.5L5 8.75l-2.5-2.5h5Z" fill="#D3D7E0" />
  </svg>
);

const Row = styled("tr", {
  shouldForwardProp: (prop) => !["$clickable", "$disableHover", "$backgroundHover"].includes(String(prop)),
})<{ $clickable: boolean; $disableHover: boolean; $backgroundHover: boolean }>(
  ({ $clickable, $disableHover, $backgroundHover }) => ({
    position: "relative",
    cursor: $clickable ? "pointer" : "default",
    ...(!$disableHover && {
      "&:hover": $backgroundHover
        ? { backgroundColor: "#EBF1FF" }
        : {
            borderRadius: "4px",
            boxShadow: "0px 4px 10px 0px rgba(58, 87, 232, 0.20), inset 0 0 0 1px #3A57E8",
          },
    }),
  }),
);

const Cell = styled("td")({
  height: "50px",
  padding: "8px 20px",
  borderBottom: "1px solid #F5F5F5",
  color: "#3F4A5D",
  fontSize: "12px",
  fontWeight: 400,
  verticalAlign: "middle",
  cursor: "default",
  ".cell-secondary-line": { color: "#596270" },
  "&.clickable": { cursor: "pointer" },
  "&.row-clickable-cell": { cursor: "pointer" },
  "&.multi-clickable": {
    color: "#3F4A5D",
    cursor: "pointer",
    textDecoration: "underline",
    textDecorationColor: "#3F4A5D",
    "&:hover": { color: "#3A57E8", textDecorationColor: "#3A57E8" },
  },
});

const Empty = styled("div")({
  position: "sticky",
  left: 0,
  width: "calc(100vw - 219px - 60px)",
  height: "500px",
});

export interface ListTableColumn<T> {
  key: keyof T;
  label: string;
  width?: number | string;
  sortable?: boolean;
}

export interface ListTableProps<T> {
  data: T[];
  columns: ListTableColumn<T>[];
  page?: number;
  pageSize?: number;
  total?: number;
  isLoading?: boolean;
  showPageRange?: boolean;
  showEdgePageButtons?: boolean;
  onRowClick?: (row: T) => void;
  onCellClick?: (key: keyof T, value: T[keyof T], row: T) => void;
  clickableKey?: keyof T | (keyof T)[];
  selectAllEnabled?: boolean;
  getSelectedRows?: (rows: T[]) => void;
  onCurrentPageChange?: (page: number) => void;
  backgroundHoverStyle?: boolean;
  disableRowHover?: boolean;
  stickyHeader?: boolean;
  clientPagination?: boolean;
  rowKey?: keyof T | ((row: T, index: number) => Key);
  emptyContent?: ReactNode;
  sortIconSrc?: string;
  sortActiveIconSrc?: string;
}

const sortableValue = (value: unknown): string | number => {
  if (typeof value === "string" || typeof value === "number") return value;
  if (React.isValidElement(value)) {
    const props = value.props as { state?: unknown; children?: unknown };
    if (typeof props.state === "string") return props.state;
    if (typeof props.children === "string") return props.children;
  }
  return "";
};

export function ListTable<T>({
  data,
  columns,
  page = 1,
  pageSize = 10,
  total = 0,
  isLoading = false,
  showPageRange = true,
  showEdgePageButtons = true,
  onRowClick,
  onCellClick,
  clickableKey,
  selectAllEnabled = false,
  getSelectedRows,
  onCurrentPageChange,
  backgroundHoverStyle = false,
  disableRowHover = false,
  stickyHeader = false,
  clientPagination = total === data.length,
  rowKey,
  emptyContent = "No results",
  sortIconSrc,
  sortActiveIconSrc,
}: ListTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(page);
  const [sort, setSort] = useState<{ key: keyof T; direction: "asc" | "desc" }>();
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  const previousLoading = useRef(isLoading);
  const containerRef = useRef<HTMLDivElement>(null);
  const clickableKeys = clickableKey == null ? [] : Array.isArray(clickableKey) ? clickableKey : [clickableKey];
  const multipleClickableCells = clickableKeys.length > 1;
  const rowClickable = Boolean(onRowClick || (onCellClick && clickableKeys.length === 1));
  const getKey = (row: T, index: number): Key => {
    if (typeof rowKey === "function") return rowKey(row, index);
    if (rowKey) return row[rowKey] as Key;
    return ((row as { idx?: Key }).idx ?? index);
  };

  useEffect(() => setCurrentPage(page), [page]);
  useEffect(() => {
    setCurrentPage((current) => Math.min(current, Math.max(1, Math.ceil(total / pageSize))));
  }, [pageSize, total]);
  useEffect(() => {
    if (!previousLoading.current && isLoading) setSort(undefined);
    previousLoading.current = isLoading;
  }, [isLoading]);

  const sortedData = [...data].sort((a, b) => {
    if (!sort) return 0;
    const aValue = sortableValue(a[sort.key]);
    const bValue = sortableValue(b[sort.key]);
    const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return sort.direction === "asc" ? result : -result;
  });
  const visibleData = clientPagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const updateSelection = (next: Set<Key>) => {
    setSelectedKeys(next);
    getSelectedRows?.(data.filter((row, index) => next.has(getKey(row, index))));
  };

  const changePage = (next: number) => {
    setCurrentPage(next);
    updateSelection(new Set());
    onCurrentPageChange?.(next);
    const scrollWrapper = containerRef.current?.closest(".page-scroll-wrapper");
    if (scrollWrapper instanceof HTMLElement) scrollWrapper.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleRowClick = (event: React.MouseEvent, row: T) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest('input, button, select, textarea, a, [role="button"], [contenteditable="true"], [data-stop-row-click="true"]')) return;
    if (onRowClick) onRowClick(row);
    else if (onCellClick && clickableKeys.length === 1) {
      const key = clickableKeys[0];
      onCellClick(key, row[key], row);
    }
  };

  return (
    <Container ref={containerRef} $empty={visibleData.length === 0}>
      <ScrollContainer>
        <Table>
          <Head $sticky={stickyHeader}>
            <tr>
              {selectAllEnabled && (
                <HeaderCell style={{ width: 50 }}>
                  <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>
                    선택
                  </span>
                  <InputCheckbox
                    value="all"
                    isChecked={data.length > 0 && selectedKeys.size === data.length}
                    onChange={(event) => updateSelection(event.target.checked ? new Set(data.map(getKey)) : new Set())}
                  />
                </HeaderCell>
              )}
              {columns.map(({ key, label, width, sortable = true }) => (
                <HeaderCell key={String(key)} style={{ width }} aria-sort={sort?.key === key ? (sort.direction === "asc" ? "ascending" : "descending") : undefined}>
                  {sortable ? (
                    <button
                      type="button"
                      aria-label={`${label} 정렬`}
                      className={`header-content${sort?.key === key ? " active" : ""}`}
                      onClick={() => setSort((current) => ({ key, direction: current?.key === key && current.direction === "asc" ? "desc" : "asc" }))}
                    >
                      {label}
                      {sort?.key === key && sortActiveIconSrc ? (
                        <img
                          src={sortActiveIconSrc}
                          className={sort.direction}
                          alt=""
                          style={{ width: 12, height: 12, marginLeft: 5 }}
                        />
                      ) : sortIconSrc ? (
                        <img src={sortIconSrc} alt="" style={{ width: 12, height: 12, marginLeft: 5 }} />
                      ) : (
                        <span style={{ display: "inline-flex", marginLeft: 5 }}>
                          <SortIcon direction={sort?.key === key ? sort.direction : undefined} />
                        </span>
                      )}
                    </button>
                  ) : label}
                </HeaderCell>
              ))}
            </tr>
          </Head>
          <tbody>
            {visibleData.length > 0 ? visibleData.map((row, index) => {
              const key = getKey(row, index);
              return (
                <Row
                  key={key}
                  $clickable={rowClickable}
                  $disableHover={disableRowHover || multipleClickableCells}
                  $backgroundHover={backgroundHoverStyle}
                  onClick={(event) => handleRowClick(event, row)}
                >
                  {selectAllEnabled && (
                    <Cell>
                      <InputCheckbox
                        value={String(key)}
                        isChecked={selectedKeys.has(key)}
                        onChange={(event) => {
                          const next = new Set(selectedKeys);
                          event.target.checked ? next.add(key) : next.delete(key);
                          updateSelection(next);
                        }}
                      />
                    </Cell>
                  )}
                  {columns.map(({ key: columnKey }) => {
                    const clickable = clickableKeys.includes(columnKey);
                    const value = row[columnKey];
                    const text = typeof value === "string" || typeof value === "number" ? String(value) : undefined;
                    return (
                      <Cell
                        key={String(columnKey)}
                        className={`${clickable ? (multipleClickableCells ? "multi-clickable" : "clickable") : ""}${rowClickable ? " row-clickable-cell" : ""}`.trim() || undefined}
                        onClick={(event) => {
                          if (!clickable || !onCellClick) return;
                          event.stopPropagation();
                          onCellClick(columnKey, value, row);
                        }}
                      >
                        {text?.includes("\n") ? <>{text.split("\n").map((line, lineIndex) => <div className={lineIndex ? "cell-secondary-line" : undefined} key={lineIndex}>{line}</div>)}</> : (text ?? value as ReactNode)}
                      </Cell>
                    );
                  })}
                </Row>
              );
            }) : (
              <tr>
                <td colSpan={columns.length + (selectAllEnabled ? 1 : 0)} style={{ position: "relative" }}>
                  <Empty>{emptyContent}</Empty>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollContainer>
      <Pagination
        page={currentPage}
        pageSize={pageSize}
        total={total}
        onPageChange={changePage}
        showPageRange={showPageRange}
        showEdgePageButtons={showEdgePageButtons}
      />
      {isLoading && <TableLoadingOverlay />}
    </Container>
  );
}
