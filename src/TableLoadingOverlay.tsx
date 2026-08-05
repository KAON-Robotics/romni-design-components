import { CircularProgress, styled } from "@mui/material";

const Overlay = styled("div")({
  position: "absolute",
  inset: 0,
  zIndex: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
});

const Spinner = styled("div")({
  display: "flex",
  animation: "table-spinner-rotate 700ms linear infinite",
  "@keyframes table-spinner-rotate": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
  },
});

export const TableLoadingOverlay = () => (
  <Overlay role="status" aria-label="Loading">
    <Spinner>
      <CircularProgress
        aria-label="Loading"
        variant="determinate"
        value={85}
        size={36}
        thickness={4.8}
        sx={{ color: "#3A57E8" }}
      />
    </Spinner>
  </Overlay>
);
