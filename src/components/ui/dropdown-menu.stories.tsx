import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, within } from "storybook/test";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="ncco-ui">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="tw:w-56">
        <DropdownMenuLabel>Label Text</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Dropdown Menu Item Text</DropdownMenuItem>
          <DropdownMenuItem>
            Dropdown Menu Item Text
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          Dropdown Menu Item Text
        </DropdownMenuCheckboxItem>
        <DropdownMenuItem variant="destructive">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>SubTrigger Text</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Dropdown Menu Item Text</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const OpensOnClick: Story = {
  render: Default.render,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Open" });
    await userEvent.click(trigger);
    const menu = await screen.findByRole("menu");
    await expect(menu).toBeVisible();
  },
};
