import type { Meta, StoryObj } from "@storybook/react";
import { SnowCanvas } from "./SnowCanvas";

const meta = {
  title: "Components/SnowCanvas",
  component: SnowCanvas,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Interactive canvas for rendering snowfall effects.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SnowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "500px",
          width: "100vw",
          background: "linear-gradient(to bottom, #0f172a, #1e293b)",
          padding: "2rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  render: () => (
    <div style={{ transform: "scale(0.8)", transformOrigin: "top left" }}>
      <SnowCanvas />
    </div>
  ),
};
