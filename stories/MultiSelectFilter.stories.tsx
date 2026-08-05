import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelectFilter } from "../src/index.js";

const meta = {
  title: "ROMNI/Filters/MultiSelectFilter",
  component: MultiSelectFilter,
  args: {
    filter: {
      label: "상태",
      options: [
        { label: "대기", value: "idle" },
        { label: "작업 중", value: "working" },
        { label: "충전 중", value: "charging" },
      ],
    },
    initialSelected: ["idle", "working", "charging"],
    onChange: () => undefined,
  },
} satisfies Meta<typeof MultiSelectFilter>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const PartiallySelected: Story = { args: { initialSelected: ["idle"] } };
export const Board: Story = { args: { board: true } };
