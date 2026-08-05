import type { Meta, StoryObj } from "@storybook/react-vite";
import { RoleBadge } from "../src/index.js";

const meta = {
  title: "ROMNI/Data Display/RoleBadge",
  component: RoleBadge,
  args: { role: "manager" },
} satisfies Meta<typeof RoleBadge>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Manager: Story = {};
export const Administrator: Story = { args: { role: "administrator" } };
export const Staff: Story = { args: { role: "staff" } };
export const Profile: Story = { args: { profile: true } };
