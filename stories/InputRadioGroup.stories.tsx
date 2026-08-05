import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputRadioGroup } from "../src/index.js";

const options = [
  { label: "사용", value: "enabled" },
  { label: "미사용", value: "disabled" },
];

const meta = {
  title: "ROMNI/Form Controls/InputRadioGroup",
  component: InputRadioGroup,
  args: { options, value: "enabled", onChange: () => undefined },
} satisfies Meta<typeof InputRadioGroup<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveRadio = () => {
  const [value, setValue] = useState("enabled");
  return <InputRadioGroup options={options} value={value} onChange={setValue} />;
};

export const Default: Story = { render: () => <InteractiveRadio /> };
export const ReadOnly: Story = { args: { readOnly: true } };
