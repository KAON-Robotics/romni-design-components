import { GlobalStyles } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavTooltip } from "../src/index.js";

const meta = {
  title: "ROMNI/Feedback/NavTooltip",
  component: NavTooltip,
  parameters: { layout: "centered" },
} satisfies Meta<typeof NavTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const Preview = ({ board = false }: { board?: boolean }) => (
  <div className="tooltip-preview" style={{ position: "relative", width: 180, height: 60 }}>
    <GlobalStyles styles={{ ".tooltip-preview .romni-nav-tooltip": { opacity: 1, visibility: "visible", transform: "translateY(-50%) scale(1)" } }} />
    <NavTooltip className={`romni-nav-tooltip${board ? " board" : ""}`}>
      로봇 관리
    </NavTooltip>
  </div>
);

export const Navigation: Story = { render: () => <Preview /> };
export const Board: Story = { render: () => <Preview board /> };
