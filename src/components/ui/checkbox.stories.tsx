import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Checkbox } from "./checkbox"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="ncco-ui">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } }
export const Invalid: Story = { args: { "aria-invalid": true } }

// Core contract the table selection depends on:
export const TogglesOnClick: Story = {
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole("checkbox")
    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}

export const DisabledDoesNotToggle: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole("checkbox")
    await expect(checkbox).toBeDisabled()
    await userEvent.click(checkbox, { pointerEventsCheck: 0 })
    await expect(checkbox).not.toBeChecked()
  },
}