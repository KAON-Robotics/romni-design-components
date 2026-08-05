import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleSwitch } from "../src/index.js";

const meta = {
  title: "ROMNI/Form Controls/ToggleSwitch",
  component: ToggleSwitch,
  args: { checked: true, label: "활성", onChange: () => undefined },
} satisfies Meta<typeof ToggleSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveToggle = () => {
  const [checked, setChecked] = useState(true);
  return <ToggleSwitch checked={checked} label={checked ? "활성" : "비활성"} onChange={(event) => setChecked(event.target.checked)} />;
};

export const Default: Story = { render: () => <InteractiveToggle /> };
export const Small: Story = { args: { small: true } };
export const Disabled: Story = { args: { disabled: true } };
