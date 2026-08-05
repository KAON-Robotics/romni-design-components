import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoTable, InfoTableBody, InfoTableRow } from "../src/index.js";

const meta = {
  title: "ROMNI/Data Display/InfoTable",
  component: InfoTable,
} satisfies Meta<typeof InfoTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InfoTable style={{ maxWidth: 900 }}>
      <InfoTableBody>
        <InfoTableRow label="빌딩 지도 이름" required>
          충무빌딩
        </InfoTableRow>
        <InfoTableRow label="사용 가능 그래프" labelRange="최대 10개" help={{
          title: "사용 가능 그래프",
          contents: [{ type: "description", detail: "빌딩에서 사용할 그래프를 선택합니다." }],
        }}>
          B1, 1F
        </InfoTableRow>
      </InfoTableBody>
    </InfoTable>
  ),
};
