import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: [
        "default",
        "sm",
        "lg",
        "xs",
        "icon",
        "icon-sm",
        "icon-xs",
        "icon-lg",
      ],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    asChild: {
      control: "boolean",
      description: "Render as a child element using Radix Slot",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /button/i });

    // Verify button renders
    await expect(button).toBeInTheDocument();

    // Verify button is enabled
    await expect(button).not.toBeDisabled();

    // Simulate click
    await userEvent.click(button);
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /button/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAttribute("data-variant", "secondary");
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /button/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAttribute("data-variant", "outline");
  },
};

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /button/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAttribute("data-variant", "ghost");
  },
};

export const Destructive: Story = {
  args: {
    children: "Button",
    variant: "destructive",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /button/i });
    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();
    await expect(button).toHaveAttribute("data-variant", "destructive");
  },
};

export const Link: Story = {
  args: {
    children: "Button",
    variant: "link",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /button/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAttribute("data-variant", "link");
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /button/i });

    // Verify button is disabled
    await expect(button).toBeDisabled();

    // Verify pointer events are none
    await expect(button).toHaveStyle("pointer-events: none");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="tw:flex tw:items-center tw:gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="tw:flex tw:flex-wrap tw:gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
