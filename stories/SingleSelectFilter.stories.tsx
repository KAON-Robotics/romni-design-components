import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SingleSelectFilter, type SingleSelectFilterProps } from "../src/index.js";

const meta = {
  title: "ROMNI/Filters/SingleSelectFilter",
  component: SingleSelectFilter,
  args: {
    label: "상태",
    selected: "전체",
    options: [
      { label: "전체", value: "all" },
      { label: "대기", value: "idle" },
      { label: "작업 중", value: "working" },
      { label: "충전 중", value: "charging" },
    ],
  },
} satisfies Meta<typeof SingleSelectFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = (args: SingleSelectFilterProps) => {
  const [selected, setSelected] = useState(args.selected);
  return <SingleSelectFilter {...args} selected={selected} onSelect={(label) => setSelected(label)} />;
};

export const Default: Story = { render: (args) => <Example {...args} /> };

export const WithoutCheck: Story = {
  args: { showSelectedIcon: false, centerOptionText: true },
  render: (args) => <Example {...args} />,
};
