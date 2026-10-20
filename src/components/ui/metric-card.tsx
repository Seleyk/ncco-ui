import * as React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "./card";
import { ChartContainer } from "./chart";
import type { ChartConfig } from "./chart";
import { cn } from "@/lib/utils";

export interface MetricCardTrend {
  value: string;
  direction: "positive" | "negative" | "neutral";
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  activePercent: number;
  inactivePercent: number;
  activeLabel?: string;
  inactiveLabel?: string;
  trend?: MetricCardTrend;
  icon?: React.ReactNode;
  size?: "default" | "sm";
  className?: string;
}

export function MetricCard({
  title,
  value,
  activePercent,
  inactivePercent,
  activeLabel,
  inactiveLabel,
  trend,
  icon,
  size = "default",
  className,
}: MetricCardProps) {
  const donutData = [
    { status: "active", value: activePercent },
    { status: "inactive", value: inactivePercent },
  ];

  const chartConfig = {
    active: {
      label: activeLabel ?? `Active ${activePercent}%`,
      color: "var(--ncco-colors-primary-light)",
    },
    inactive: {
      label: inactiveLabel ?? `Inactive ${inactivePercent}%`,
      color: "var(--ncco-colors-muted-foreground-light)",
    },
  } satisfies ChartConfig;

  const donutFills = {
    active: "var(--ncco-colors-primary-light)",
    inactive: "var(--ncco-colors-muted-light)",
  };

  const isSmall = size === "sm";

  return (
    <Card size={size} className={cn("tw:w-full", className)}>
      <CardHeader>
        <CardTitle className={isSmall ? "tw:text-xs" : "tw:text-sm"}>
          {title}
        </CardTitle>
        {icon && (
          <div className="tw:col-start-2 tw:row-start-1 tw:self-start tw:justify-self-end tw:text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="tw:flex tw:items-center tw:gap-3">
          {/* Donut */}
          <ChartContainer
            config={chartConfig}
            className={isSmall ? "tw:h-10 tw:w-10" : "tw:h-14 tw:w-14"}
          >
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={isSmall ? 12 : 18}
                outerRadius={isSmall ? 18 : 26}
                dataKey="value"
                strokeWidth={0}
              >
                {donutData.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={donutFills[entry.status as keyof typeof donutFills]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* Stats */}
          <div className="tw:flex tw:flex-col tw:gap-1">
            <span
              className={cn(
                "tw:font-bold tw:leading-none",
                isSmall ? "tw:text-xl" : "tw:text-2xl",
              )}
            >
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
            {/* Legend */}
            <div className="tw:flex tw:flex-wrap tw:gap-2 tw:text-xs tw:text-muted-foreground">
              {donutData.map((entry) => (
                <div
                  key={entry.status}
                  className="tw:flex tw:items-center tw:gap-1"
                >
                  <div
                    className="tw:h-1.5 tw:w-1.5 tw:rounded-full"
                    style={{
                      backgroundColor:
                        donutFills[entry.status as keyof typeof donutFills],
                    }}
                  />
                  <span>
                    {
                      chartConfig[entry.status as keyof typeof chartConfig]
                        .label
                    }
                  </span>
                </div>
              ))}
            </div>
            {/* Trend */}
            {trend && (
              <div
                className={cn(
                  "tw:flex tw:items-center tw:gap-1 tw:text-xs",
                  trend.direction === "positive" && "tw:text-primary",
                  trend.direction === "negative" && "tw:text-destructive",
                  trend.direction === "neutral" && "tw:text-muted-foreground",
                )}
              >
                {trend.direction === "positive" && (
                  <TrendingUp className="tw:h-3 tw:w-3" />
                )}
                {trend.direction === "negative" && (
                  <TrendingDown className="tw:h-3 tw:w-3" />
                )}
                <span>{trend.value}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
