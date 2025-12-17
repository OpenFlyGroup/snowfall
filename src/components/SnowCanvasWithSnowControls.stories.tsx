import type { Meta, StoryObj } from "@storybook/react";
import { SnowControls } from "./SnowControls";
import { SnowCanvas } from "./SnowCanvas";

const meta = {
  title: "Components/SnowCanvasWithSnowControls",
  component: SnowCanvas,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Interactive control panel for configuring snowfall effects. Users can toggle snow, adjust intensity, change themes, and more.",
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
          width: "100%",
          background: "linear-gradient(to bottom, #0f172a, #1e293b)",
          padding: "2rem",
        }}
      >
        <SnowControls />
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  render: () => (
    <>
      <SnowCanvas />
      <div style={{ transform: "scale(0.8)", transformOrigin: "top left" }}>
        <SnowControls />
      </div>
    </>
  ),
};
