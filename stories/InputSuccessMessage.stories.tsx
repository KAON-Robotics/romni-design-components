import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputSuccessMessage } from "../src/index.js";

const meta = {
  title: "ROMNI/Form Messages/InputSuccessMessage",
  component: InputSuccessMessage,
  args: { msg: "사용할 수 있습니다." },
} satisfies Meta<typeof InputSuccessMessage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Right: Story = {};
export const Left: Story = { args: { align: "left" } };
