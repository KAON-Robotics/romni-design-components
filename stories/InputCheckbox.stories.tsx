import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputCheckbox } from "../src/index.js";

const meta = {
  title: "ROMNI/Form Controls/InputCheckbox",
  component: InputCheckbox,
  args: { label: "선택", onChange: () => undefined },
} satisfies Meta<typeof InputCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveCheckbox = () => {
  const [checked, setChecked] = useState(false);
  return <InputCheckbox label="선택" isChecked={checked} onChange={(event) => setChecked(event.target.checked)} />;
};

export const Default: Story = { render: () => <InteractiveCheckbox /> };
export const Checked: Story = { args: { isChecked: true } };
export const ReadOnly: Story = { args: { isChecked: true, readOnly: true } };
export const ReadOnlyUnchecked: Story = { args: { isChecked: false, readOnly: true } };
