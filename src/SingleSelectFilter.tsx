import { styled } from "@mui/material";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { floatingMenuMotion } from "./motion.js";

const Root = styled("div")({ position: "relative", zIndex: 1, display: "inline-block" });

const Button = styled("button", {
  shouldForwardProp: (prop) => prop !== "$opened" && prop !== "$bottomLayer",
})<{ $opened: boolean; $bottomLayer: boolean }>(({ $opened, $bottomLayer }) => ({
  display: "flex",
  height: "34px",
  padding: "8px 10px",
  alignItems: "center",
  border: `1px solid ${$opened ? "#3A57E8" : "#EBEBEB"}`,
  borderRadius: "4px",
  backgroundColor: $bottomLayer ? "#FFF" : $opened ? "#EBF1FF" : "#F5F5F5",
  fontSize: "13px",
  whiteSpace: "nowrap",
  ".label": { color: $opened ? "#3A57E8" : "#596270", fontWeight: 500, flexShrink: 0 },
  ".selected": {
    marginLeft: "8px",
    color: $opened ? "#173CBA" : "#2A2C33",
    fontWeight: 600,
    flexShrink: 0,
  },
  svg: { marginLeft: "3px" },
}));

const Menu = styled("ul", {
  shouldForwardProp: (prop) => prop !== "$bottomLayer",
})<{ $bottomLayer: boolean }>(({ $bottomLayer }) => ({
  position: "absolute",
  top: $bottomLayer ? "auto" : "calc(100% + 4px)",
  bottom: $bottomLayer ? "38px" : "auto",
  left: 0,
  display: "flex",
  minWidth: "100%",
  padding: "4px",
  flexDirection: "column",
  gap: "4px",
  border: "1px solid #D3D7E0",
  borderRadius: "8px",
  backgroundColor: "#FFF",
  boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.20)",
  "--floating-menu-offset": $bottomLayer ? "4px" : "-2px",
  "--floating-menu-rest": "0px",
  "--floating-menu-origin": $bottomLayer ? "bottom left" : "top left",
  ...floatingMenuMotion,
}));

const Item = styled("li", {
  shouldForwardProp: (prop) => prop !== "$active" && prop !== "$selectedIcon" && prop !== "$centered",
})<{ $active?: boolean; $selectedIcon: boolean; $centered: boolean }>(
  ({ $active, $selectedIcon, $centered }) => ({
    position: "relative",
    display: "flex",
    height: "34px",
    padding: $centered ? "4px 10px" : $selectedIcon ? "4px 34px 4px 15px" : "4px 10px 4px 15px",
    alignItems: "center",
    justifyContent: $centered ? "center" : "initial",
    gap: "10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.24px",
    whiteSpace: "nowrap",
    "&.selected": { backgroundColor: "#EBF1FF" },
    "&:hover": { backgroundColor: "#F5F5F5" },
    ...($active !== undefined && {
      "&::before": {
        display: "block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: $active ? "#15A46E" : "#FF4747",
        content: "''",
      },
    }),
  }),
);

const Arrow = ({ opened }: { opened: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d={opened
        ? "M2.8 8.166 7 4.2l4.2 3.966-.988.933L7 6.066 3.788 9.1 2.8 8.166Z"
        : "M11.2 5.833 7 9.8 2.8 5.833l.988-.933L7 7.933 10.212 4.9l.988.933Z"}
      fill={opened ? "#3A57E8" : "#7C8694"}
    />
  </svg>
);

const Check = () => (
  <svg
    viewBox="0 0 14 14"
    width="14"
    height="14"
    fill="none"
    aria-hidden="true"
    style={{ position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)" }}
  >
    <path d="m2.8 7.2 2.6 2.6 5.8-5.8" stroke="#3A57E8" strokeWidth="1.5" fill="none" />
  </svg>
);

export interface SingleSelectFilterOption {
  label: string;
  value: unknown;
  active?: boolean | "Y" | "N";
}

export interface SingleSelectFilterProps {
  label?: string;
  labelImage?: ReactElement;
  openLabelImage?: ReactElement;
  options: SingleSelectFilterOption[];
  selected: string;
  onSelect: (label: string, value: unknown, active?: boolean | "Y" | "N") => void;
  bottomLayer?: boolean;
  showSelectedIcon?: boolean;
  centerOptionText?: boolean;
}

export const SingleSelectFilter = ({
  label,
  labelImage,
  openLabelImage,
  options,
  selected,
  onSelect,
  bottomLayer = false,
  showSelectedIcon = true,
  centerOptionText = false,
}: SingleSelectFilterProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  const isSelected = (optionLabel: string, value: unknown) => {
    const normalized = selected.trim();
    return optionLabel === normalized || String(value) === normalized || `${value}개` === normalized;
  };

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpened(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <Root ref={rootRef}>
      <Button type="button" $opened={opened} $bottomLayer={bottomLayer} onClick={() => setOpened(!opened)}>
        {label && <span className="label">{label}</span>}
        {opened ? openLabelImage ?? labelImage : labelImage}
        <span className="selected">{selected}</span>
        <Arrow opened={opened} />
      </Button>
      {opened && (
        <Menu $bottomLayer={bottomLayer}>
          {options.map((option) => {
            const active = option.active === undefined ? undefined : option.active === true || option.active === "Y";
            const optionSelected = isSelected(option.label, option.value);
            return (
              <Item
                key={`${option.label}-${String(option.value)}`}
                className={optionSelected ? "selected" : undefined}
                $active={active}
                $selectedIcon={showSelectedIcon}
                $centered={centerOptionText}
                onClick={() => {
                  onSelect(option.label, option.value, option.active);
                  setOpened(false);
                }}
              >
                {option.label}
                {showSelectedIcon && optionSelected && <Check />}
              </Item>
            );
          })}
        </Menu>
      )}
    </Root>
  );
};
