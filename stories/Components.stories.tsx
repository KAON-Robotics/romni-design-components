import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DeleteRowButton,
  InfoTable,
  InfoTableBody,
  InputButton,
  InputCheckbox,
  InputErrorMessage,
  InputPassword,
  InputSuccessMessage,
  ListTable,
  MainLayout,
  Pagination,
  RoleBadge,
  TableLoadingOverlay,
  ToggleSwitch,
} from "../src/index.js";
import type { ListTableColumn } from "../src/index.js";

const meta = {
  title: "ROMNI/Components",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
    {children}
  </div>
);

const inputStyle = {
  width: 500,
  height: 50,
  padding: "0 12px 0 16px",
  border: "1px solid #F0F0F0",
  borderRadius: 8,
  outline: 0,
  color: "#2A2C33",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: "22px",
  letterSpacing: "0.28px",
} as const;

export const Buttons: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <Stack>
        <input style={{ ...inputStyle, width: 400 }} value="서울특별시 중구" readOnly />
        <InputButton label="주소검색" />
      </Stack>
      <DeleteRowButton />
    </div>
  ),
};

export const Messages: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          style={{ ...inputStyle, borderColor: "#FF4747" }}
          value=""
          placeholder="런처명을 입력해 주세요."
          readOnly
        />
        <InputErrorMessage msg="필수 입력 항목입니다." />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input style={inputStyle} value="chungmu-launcher" readOnly />
        <InputSuccessMessage msg="사용할 수 있습니다." />
      </div>
    </div>
  ),
};

const FormControlsExample = () => {
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [password, setPassword] = useState("romni-password");

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <InputCheckbox
        label="목록에서 선택"
        isChecked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
      <ToggleSwitch
        checked={enabled}
        label={enabled ? "활성" : "비활성"}
        onChange={(event) => setEnabled(event.target.checked)}
      />
      <InputPassword
        value={password}
        placeholder="비밀번호"
        onChange={setPassword}
      />
    </div>
  );
};

export const FormControls: Story = {
  render: () => <FormControlsExample />,
};

export const Roles: Story = {
  render: () => (
    <Stack>
      {['administrator', 'manager', 'executive', 'staff', 'guest'].map((role) => (
        <RoleBadge key={role} role={role} />
      ))}
    </Stack>
  ),
};

export const InformationTable: Story = {
  render: () => (
    <InfoTable style={{ maxWidth: 700, paddingBottom: 25 }}>
      <InfoTableBody style={{ display: "grid", gap: 12 }}>
        <strong>빌딩 지도 정보</strong>
        <span>빌딩: 충무빌딩</span>
        <span>층: B1, 1F</span>
      </InfoTableBody>
    </InfoTable>
  ),
};

const PaginationExample = () => {
  const [page, setPage] = useState(2);
  return (
    <div style={{ position: "relative", width: 640, height: 52, background: "white" }}>
      <Pagination page={page} pageSize={10} total={47} onPageChange={setPage} />
    </div>
  );
};

export const PageNavigation: Story = {
  render: () => <PaginationExample />,
};

interface RobotRow {
  id: number;
  name: string;
  fleet: string;
  status: string;
}

const columns = [
  { key: "name", label: "로봇 이름" },
  { key: "fleet", label: "플릿" },
  { key: "status", label: "상태" },
] satisfies ListTableColumn<RobotRow>[];

const rows: RobotRow[] = Array.from({ length: 14 }, (_, index) => ({
  id: index + 1,
  name: `robot-${String(index + 1).padStart(2, "0")}`,
  fleet: index % 2 ? "delivery" : "cleaning",
  status: index % 3 ? "대기" : "작업 중",
}));

export const DataTable: Story = {
  render: () => (
    <ListTable
      data={rows}
      columns={columns}
      pageSize={5}
      total={rows.length}
      rowKey="id"
      selectAllEnabled
      backgroundHoverStyle
    />
  ),
};

export const LoadingOverlay: Story = {
  render: () => (
    <div style={{ position: "relative", width: 500, height: 220, background: "white" }}>
      <TableLoadingOverlay />
    </div>
  ),
};

export const Layout: Story = {
  render: () => (
    <div style={{ height: 260 }}>
      <MainLayout>
        <aside style={{ width: 180, padding: 20, borderRadius: 12, background: "#1E1F23", color: "white" }}>
          Navigation
        </aside>
        <main style={{ flex: 1, padding: 20, borderRadius: 12, background: "white" }}>
          Main content
        </main>
      </MainLayout>
    </div>
  ),
};
