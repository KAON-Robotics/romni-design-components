import type { Meta, StoryObj } from "@storybook/react-vite";
import { DashboardCount } from "../src/index.js";

const meta = {
  title: "ROMNI/Data Display/DashboardCount",
  component: DashboardCount,
  args: { value: "128", unit: "대" },
} satisfies Meta<typeof DashboardCount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutUnit: Story = { args: { unit: undefined } };
