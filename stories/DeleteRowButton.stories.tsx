import type { Meta, StoryObj } from "@storybook/react-vite";
import { DeleteRowButton } from "../src/index.js";

const meta = {
  title: "ROMNI/Buttons/DeleteRowButton",
  component: DeleteRowButton,
} satisfies Meta<typeof DeleteRowButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
