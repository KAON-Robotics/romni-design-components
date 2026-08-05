import type { Meta, StoryObj } from "@storybook/react-vite";
import { MainLayout } from "../src/index.js";

const meta = {
  title: "ROMNI/Layout/MainLayout",
  component: MainLayout,
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <div style={{ height: 260 }}><MainLayout><aside style={{ width: 180, padding: 20, background: "#1E1F23", color: "white" }}>Navigation</aside><main style={{ flex: 1, padding: 20, background: "white" }}>Main content</main></MainLayout></div> };
