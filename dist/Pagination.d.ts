/// <reference types="react" />
export interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    showPageRange?: boolean;
    showEdgePageButtons?: boolean;
}
export declare const Pagination: ({ page, pageSize, total, onPageChange, showPageRange, showEdgePageButtons, }: PaginationProps) => import("react").JSX.Element;
//# sourceMappingURL=Pagination.d.ts.map