import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputPassword } from "../src/index.js";

const meta = {
  title: "ROMNI/Form Controls/InputPassword",
  component: InputPassword,
  args: { placeholder: "비밀번호를 입력해 주세요." },
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractivePassword = () => {
  const [value, setValue] = useState("");
  return <InputPassword value={value} placeholder="비밀번호를 입력해 주세요." onChange={setValue} />;
};

export const Default: Story = { render: () => <InteractivePassword /> };
export const Invalid: Story = { args: { value: "password", isValid: false } };
export const ReadOnly: Story = { args: { value: "password", readOnly: true } };
