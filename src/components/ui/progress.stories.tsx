import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './progress'

const meta = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { value: 50 },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = { args: { value: 0 } }

export const Full: Story = { args: { value: 100 } }

export const Low: Story = {
  args: { value: 15 },
}

export const DashboardUsage: Story = {
  render: () => (
    <div className="tw:flex tw:flex-col tw:gap-4 w-75">
      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:text-xs tw:text-muted-foreground">DCG Pro — West · Expiring soon</span>
        <Progress value={15} className="tw:h-1 *:data-[slot=progress-indicator]:bg-destructive" />
      </div>
      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:text-xs tw:text-muted-foreground">DCG Pro — East · Active</span>
        <Progress value={60} />
      </div>
      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:text-xs tw:text-muted-foreground">DCG Starter · Expired</span>
        <Progress value={5} className="tw:h-1 tw:*:data-[slot=progress-indicator]:bg-destructive" />
      </div>
      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:text-xs tw:text-muted-foreground">DCG Pro — South · Active</span>
        <Progress value={75} />
      </div>
    </div>
  ),
}