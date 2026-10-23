import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, within } from "storybook/test";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="ncco-ui">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const Options = () => (
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Status</SelectLabel>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="pending">Pending</SelectItem>
      <SelectItem value="assigned">Assigned</SelectItem>
    </SelectGroup>
  </SelectContent>
);

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="tw:w-[180px]">
        <SelectValue placeholder="Placeholder" />
      </SelectTrigger>
      <Options />
    </Select>
  ),
};

export const Small: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="sm" className="tw:w-[180px]">
        <SelectValue placeholder="Placeholder" />
      </SelectTrigger>
      <Options />
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="tw:w-[180px]">
        <SelectValue placeholder="Placeholder" />
      </SelectTrigger>
      <Options />
    </Select>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-invalid className="tw:w-[180px]">
        <SelectValue placeholder="Placeholder" />
      </SelectTrigger>
      <Options />
    </Select>
  ),
};

export const SelectsAnOption: Story = {
  render: Default.render,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox");
    await userEvent.click(trigger);
    const option = await screen.findByRole("option", { name: "Pending" });
    await userEvent.click(option);
    await expect(trigger).toHaveTextContent("Pending");
  },
};
