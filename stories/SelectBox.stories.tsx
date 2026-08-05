import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectBox, type SelectBoxProps } from "../src/index.js";

const meta = {
  title: "ROMNI/Forms/SelectBox",
  component: SelectBox,
  args: {
    placeholder: "로봇 모델을 선택하세요",
    options: [
      { label: "KARINA 1", value: "karina-1" },
      { label: "KARINA 2", value: "karina-2" },
      { label: "ROMNI Delivery", value: "delivery" },
    ],
  },
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = (args: SelectBoxProps) => {
  const [value, setValue] = useState(args.value);
  return <SelectBox {...args} value={value} onChange={setValue} onClear={() => setValue(undefined)} />;
};

export const Default: Story = { render: (args) => <Example {...args} /> };

export const Invalid: Story = {
  args: { isValid: false },
  render: (args) => <Example {...args} />,
};

export const Disabled: Story = { args: { disabled: true, value: "karina-1" } };
