import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from './card'
import { Button } from './button'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="tw:w-90">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <p>Card footer</p>
      </CardFooter>
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card size="sm" className="tw:w-90">
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>Compact size variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="tw:w-90">
      <CardHeader>
        <CardTitle>Card With Action</CardTitle>
        <CardDescription>Card with an action in the header.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">See all</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  ),
}

export const ContentOnly: Story = {
  render: () => (
    <Card className="tw:w-90">
      <CardContent>
        <p>Card with content only — no header or footer.</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooterAction: Story = {
  render: () => (
    <Card className="tw:w-90">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card with a footer action.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit</Button>
      </CardFooter>
    </Card>
  ),
}

export const DashboardCard: Story = {
  render: () => (
    <Card className="tw:w-90">
      <CardHeader>
        <CardTitle>Devices</CardTitle>
        <CardAction>
          <Button variant="default" size="sm">See all</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Table content would go here.</p>
      </CardContent>
    </Card>
  ),
}