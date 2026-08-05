import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputErrorMessage } from "../src/index.js";

const meta = {
  title: "ROMNI/Form Messages/InputErrorMessage",
  component: InputErrorMessage,
  args: { msg: "필수 입력 항목입니다." },
} satisfies Meta<typeof InputErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Right: Story = {};
export const Left: Story = { args: { align: "left" } };
