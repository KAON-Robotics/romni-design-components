import type { Meta, StoryObj } from "@storybook/react-vite";
import { HelpTooltip } from "../src/index.js";

const meta = {
  title: "ROMNI/Feedback/HelpTooltip",
  component: HelpTooltip,
  args: {
    help: {
      title: "운영 모드",
      contents: [
        { type: "description", detail: "로봇의 현재 운영 상태를 표시합니다." },
        { type: "list", detail: "Online: 정상 연결" },
        { type: "sublist", detail: "Unstable: 연결 불안정" },
      ],
    },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof HelpTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Dashboard: Story = { args: { dashboard: true } };
export const Table: Story = {
  args: { help: { title: "범위", contents: [{ type: "table", detail: "최소.0/최대.100" }] } },
};
