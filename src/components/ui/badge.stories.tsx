import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Offline' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
}

export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="tw:flex tw:flex-wrap tw:gap-2">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Offline</Badge>
      <Badge variant="outline">Physical</Badge>
      <Badge variant="ghost">SaaS</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
}

export const DashboardUsage: Story = {
  render: () => (
    <div className="tw:flex tw:flex-col tw:gap-2">
      <div className="tw:flex tw:gap-2">
        <Badge variant="destructive">Offline</Badge>
        <Badge variant="default">Active</Badge>
        <Badge variant="secondary">Pending</Badge>
      </div>
      <div className="tw:flex tw:gap-2">
        <Badge variant="destructive">Denied</Badge>
        <Badge variant="default">Accepted</Badge>
        <Badge variant="secondary">Waiting Approval</Badge>
      </div>
      <div className="tw:flex tw:gap-2">
        <Badge variant="destructive">Expiring soon</Badge>
        <Badge variant="default">Active</Badge>
        <Badge variant="destructive">Expired</Badge>
      </div>
    </div>
  ),
}