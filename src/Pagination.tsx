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

const PaginationIcon = ({ direction, double = false }: { direction: "left" | "right"; double?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
  >
    {double && (
      <path d="M2.97 2.7 8.28 8l-5.31 5.3-.61-.61L7.05 8 2.36 3.31l.61-.61Z" fill="currentColor" />
    )}
    <path d={double ? "M7.03 2.7 12.33 8l-5.3 5.3-.62-.61L11.11 8 6.41 3.31l.62-.61Z" : "M5.97 2.7 11.28 8l-5.31 5.3-.61-.61L10.05 8 5.36 3.31l.61-.61Z"} fill="currentColor" />
  </svg>
);

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  showPageRange?: boolean;
  showEdgePageButtons?: boolean;
}

export const Pagination = ({
  page,
  pageSize,
  total,
  onPageChange,
  showPageRange = true,
  showEdgePageButtons = true,
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const rangeStart = total > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const rangeEnd = total > 0 ? Math.min(currentPage * pageSize, total) : 0;

  return (
    <Root aria-label="Pagination">
      {showEdgePageButtons && (
        <PageButton aria-label="First page" disabled={currentPage === 1} onClick={() => onPageChange(1)}>
          <PaginationIcon direction="left" double />
        </PageButton>
      )}
      <PageButton aria-label="Previous page" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <PaginationIcon direction="left" />
      </PageButton>
      <Count aria-live="polite">
        <span className="current">{currentPage}</span>
        <span className="separator">/</span>
        <span className="total">{totalPages}</span>
      </Count>
      <PageButton aria-label="Next page" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        <PaginationIcon direction="right" />
      </PageButton>
      {showEdgePageButtons && (
        <PageButton aria-label="Last page" disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
          <PaginationIcon direction="right" double />
        </PageButton>
      )}
      {showPageRange && <Range>{`${rangeStart} - ${rangeEnd} of ${total}`}</Range>}
    </Root>
  );
};
