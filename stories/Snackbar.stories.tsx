import type { Meta, StoryObj } from "@storybook/react-vite";
import { Snackbar } from "../src/index.js";

const meta = {
  title: "ROMNI/Feedback/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      canvas: { height: "160px" },
      description: {
        component:
          "화면 하단 중앙에 표시되는 피드백 메시지입니다. info는 오류/안내, success는 성공 상태에 사용합니다.",
      },
    },
  },
  args: {
    open: true,
    autoHideDuration: null,
    message:
      "해당 로봇은 오프라인 상태로 지도에서 로봇 위치를 확인할 수 없습니다.",
    horizontal: "center",
    vertical: "top",
  },
  argTypes: {
    horizontal: { control: "inline-radio", options: ["left", "center", "right"] },
    vertical: { control: "inline-radio", options: ["top", "bottom"] },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Information: Story = {
  render: (args) => (
    <div style={{ width: "100%", height: 160 }}>
      <Snackbar {...args} />
    </div>
  ),
};

export const Success: Story = {
  args: { variant: "success" },
  render: (args) => (
    <div style={{ width: "100%", height: 160 }}>
      <Snackbar {...args} />
    </div>
  ),
};
