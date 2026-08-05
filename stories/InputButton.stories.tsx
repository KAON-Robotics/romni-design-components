import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputButton } from "../src/index.js";

const meta = {
  title: "ROMNI/Buttons/InputButton",
  component: InputButton,
  args: { label: "주소검색" },
} satisfies Meta<typeof InputButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
