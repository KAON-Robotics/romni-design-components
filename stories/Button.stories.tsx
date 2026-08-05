import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button, type ButtonSize, type ButtonVariant } from "../src/index.js";

const meta = {
  title: "ROMNI/Buttons/Button",
  component: Button,
  args: { children: "저장", variant: "primary", size: "medium" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "neutral"] },
    size: { control: "select", options: ["compact", "medium", "large"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interaction: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "저장" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const DisabledInteraction: Story = {
  args: { disabled: true, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "저장" });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

const variants: ButtonVariant[] = ["primary", "secondary", "neutral"];
const sizes: ButtonSize[] = ["compact", "medium", "large"];

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "100px repeat(3, max-content)", gap: 20, alignItems: "center" }}>
      <strong>Variant</strong><strong>Default</strong><strong>Hover</strong><strong>Disabled</strong>
      {variants.map((variant) => (
        <div key={variant} style={{ display: "contents" }}>
          <span>{variant}</span>
          <Button variant={variant}>버튼</Button>
          <Button variant={variant} data-state="hover">버튼</Button>
          <Button variant={variant} disabled>버튼</Button>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      {sizes.map((size) => <Button key={size} size={size}>{size}</Button>)}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: "등록",
    startIcon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    children: undefined,
    iconOnly: true,
    "aria-label": "새로고침",
    startIcon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M15.8 7A6 6 0 1 0 16 12" stroke="currentColor" strokeWidth="1.5" />
        <path d="m12.5 4.5 3.5 2.7.5-4.2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
};
