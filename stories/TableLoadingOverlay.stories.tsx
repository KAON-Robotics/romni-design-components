import type { Meta, StoryObj } from "@storybook/react-vite";
import { TableLoadingOverlay } from "../src/index.js";

const meta = {
  title: "ROMNI/Feedback/TableLoadingOverlay",
  component: TableLoadingOverlay,
} satisfies Meta<typeof TableLoadingOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <div style={{ position: "relative", width: 500, height: 220, background: "white" }}><TableLoadingOverlay /></div> };
