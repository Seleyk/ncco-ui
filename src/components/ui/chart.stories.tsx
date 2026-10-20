import type { Meta, StoryObj } from '@storybook/react-vite'
import { PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './chart'
import type { ChartConfig } from './chart'

const meta: Meta = {
  title: 'UI/Chart',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

// --- Donut ---
const donutConfig = {
  active: { label: 'Active', color: 'var(--ncco-colors-primary-light)' },
  inactive: { label: 'Inactive', color: 'var(--ncco-colors-muted-light)' },
} satisfies ChartConfig

const donutData = [
  { name: 'active', value: 75 },
  { name: 'inactive', value: 25 },
]

export const DonutBasic: Story = {
  render: () => (
    <ChartContainer config={donutConfig} className="tw:h-50 tw:w-50">
      <PieChart>
        <Pie
          data={donutData}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={75}
          dataKey="value"
          strokeWidth={0}
        >
          {donutData.map((entry, index) => (
            <Cell
              key={index}
              fill={`var(--color-${entry.name})`}
            />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  ),
}

export const DonutWithLabel: Story = {
  render: () => (
    <div className="tw:relative tw:flex tw:items-center tw:justify-center">
      <ChartContainer config={donutConfig} className="tw:h-50 tw:w-50">
        <PieChart>
          <Pie
            data={donutData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={75}
            dataKey="value"
            strokeWidth={0}
          >
            {donutData.map((entry, index) => (
              <Cell key={index} fill={`var(--color-${entry.name})`} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ChartContainer>
      <div className="tw:absolute tw:flex tw:flex-col tw:items-center tw:justify-center">
        <span className="tw:text-2xl tw:font-bold">5,329</span>
      </div>
    </div>
  ),
}

// --- MetricCard Donut (dashboard-accurate) ---
const metricDonutData = [
    { status: 'active', value: 75, fill: 'var(--color-active)' },
    { status: 'inactive', value: 25, fill: 'var(--color-inactive)' },
]

const metricConfig = {
  active: { label: `Active ${metricDonutData[0].value}%`, color: 'var(--chart-3)' },
  inactive: { label: `Inactive ${metricDonutData[1].value}%`, color: 'var(--ncco-colors-muted-foreground-light)' },
} satisfies ChartConfig

export const DonutMetricCard: Story = {
  render: () => (
    <div className="tw:flex tw:items-center tw:gap-3">
      <ChartContainer config={metricConfig} className="tw:h-14 tw:w-14">
        <PieChart>
          <Pie
            data={metricDonutData}
            cx="50%"
            cy="50%"
            innerRadius={18}
            outerRadius={26}
            dataKey="value"
            strokeWidth={0}
          >
            {metricDonutData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:text-2xl tw:font-bold">5,329</span>
        <div className="tw:flex tw:gap-2 tw:text-xs tw:text-muted-foreground">
          <div className="tw:flex tw:items-center tw:gap-1"><div className='tw:h-2 tw:w-2 tw:rounded-xs' style={{ backgroundColor: metricConfig.active.color }}></div><span>Active 75%</span></div>
          <div className="tw:flex tw:items-center tw:gap-1"><div className='tw:h-2 tw:w-2 tw:rounded-xs' style={{ backgroundColor: metricConfig.inactive.color }}></div><span>Inactive 25%</span></div>
        </div>
      </div>
    </div>
  ),
}

// --- Bar ---
const barConfig = {
  locations: { label: 'Locations', color: 'var(--ncco-colors-primary-light)' },
} satisfies ChartConfig

const barData = [
  { month: 'Jan', locations: 40 },
  { month: 'Feb', locations: 55 },
  { month: 'Mar', locations: 48 },
  { month: 'Apr', locations: 70 },
  { month: 'May', locations: 65 },
  { month: 'Jun', locations: 85 },
]

export const BarBasic: Story = {
  render: () => (
    <ChartContainer config={barConfig} className="h-50 w-full">
      <BarChart data={barData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="locations" fill="var(--color-locations)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}

// --- Area ---
const areaConfig = {
  users: { label: 'Active Users', color: 'var(--ncco-colors-primary-light)' },
} satisfies ChartConfig

const areaData = [
  { month: 'Jan', users: 4200 },
  { month: 'Feb', users: 4800 },
  { month: 'Mar', users: 4600 },
  { month: 'Apr', users: 5100 },
  { month: 'May', users: 5000 },
  { month: 'Jun', users: 5329 },
]

export const AreaBasic: Story = {
  render: () => (
    <ChartContainer config={areaConfig} className="tw:h-50 tw:w-full">
      <AreaChart data={areaData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="users"
          fill="var(--color-users)"
          fillOpacity={0.2}
          stroke="var(--color-users)"
        />
      </AreaChart>
    </ChartContainer>
  ),
}