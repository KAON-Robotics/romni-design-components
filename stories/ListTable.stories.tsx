import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListTable } from "../src/index.js";
import type { ListTableColumn } from "../src/index.js";

interface Row { id: number; name: string; fleet: string; status: string }
const columns = [
  { key: "name", label: "로봇 이름" },
  { key: "fleet", label: "플릿" },
  { key: "status", label: "상태" },
] satisfies ListTableColumn<Row>[];
const data: Row[] = Array.from({ length: 14 }, (_, index) => ({ id: index + 1, name: `robot-${index + 1}`, fleet: index % 2 ? "delivery" : "cleaning", status: index % 3 ? "대기" : "작업 중" }));

const meta = {
  title: "ROMNI/Data Display/ListTable",
  component: ListTable<Row>,
  args: { data, columns, pageSize: 5, total: data.length, rowKey: "id" },
} satisfies Meta<typeof ListTable<Row>>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Selectable: Story = { args: { selectAllEnabled: true } };
export const Loading: Story = { args: { isLoading: true } };
export const Empty: Story = { args: { data: [], total: 0 } };
