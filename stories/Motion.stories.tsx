import { styled } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { centerModalMotion, floatingMenuMotion, motion } from "../src/index.js";

const meta = { title: "ROMNI/Foundation/Motion" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Modal = styled("div")({ width: 280, padding: 24, borderRadius: 12, background: "#FFF", ...centerModalMotion });
const Menu = styled("div")({ width: 180, padding: 14, border: "1px solid #D3D7E0", borderRadius: 8, background: "#FFF", ...floatingMenuMotion });
const Indicator = styled("div")({ width: 120, height: 4, borderRadius: 4, background: "#3A57E8", animation: `indicator 1200ms ${motion.easing.indicator} infinite alternate`, "@keyframes indicator": { from: { transform: "translateX(0)" }, to: { transform: "translateX(160px)" } }, "@media (prefers-reduced-motion: reduce)": { animation: "none" } });

export const CenterModal: Story = { render: () => <Modal>Center modal motion</Modal> };
export const FloatingMenu: Story = { render: () => <Menu>Floating menu motion</Menu> };
export const TabIndicator: Story = { render: () => <div style={{ width: 280, padding: 20, background: "white" }}><Indicator /></div> };
