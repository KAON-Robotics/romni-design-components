import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "../src/index.js";

const meta = {
  title: "ROMNI/Navigation/Pagination",
  component: Pagination,
  args: { page: 2, pageSize: 10, total: 47, onPageChange: () => undefined },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractivePagination = () => {
  const [page, setPage] = useState(2);
  return <div style={{ position: "relative", width: 640, height: 52, background: "white" }}><Pagination page={page} pageSize={10} total={47} onPageChange={setPage} /></div>;
};

export const Default: Story = { render: () => <InteractivePagination /> };
