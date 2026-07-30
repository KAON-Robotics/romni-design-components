import React, { type Key, type ReactNode } from "react";
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
export declare function ListTable<T>({ data, columns, page, pageSize, total, isLoading, showPageRange, showEdgePageButtons, onRowClick, onCellClick, clickableKey, selectAllEnabled, getSelectedRows, onCurrentPageChange, backgroundHoverStyle, disableRowHover, stickyHeader, clientPagination, rowKey, emptyContent, sortIconSrc, sortActiveIconSrc, }: ListTableProps<T>): React.JSX.Element;
//# sourceMappingURL=ListTable.d.ts.map