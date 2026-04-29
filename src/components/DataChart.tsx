"use client";

import { useState, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

type DateRange = "30d" | "90d" | "6m" | "12m" | "all";

interface DataPoint {
  [key: string]: string | number;
}

interface SeriesConfig {
  key: string;
  name: string;
  color: string;
}

interface ReferenceLineConfig {
  y: number;
  label?: string;
  color?: string;
}

interface DataChartProps {
  data: DataPoint[];
  series: SeriesConfig[];
  xKey: string;
  title?: string;
  subtitle?: string;
  type?: "line" | "bar" | "area";
  height?: number;
  showDateFilter?: boolean;
  showExport?: boolean;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  className?: string;
  hero?: boolean;
  headerChildren?: React.ReactNode;
  referenceLines?: ReferenceLineConfig[];
}

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "6m", label: "Last 6 months" },
  { value: "12m", label: "Last 12 months" },
  { value: "all", label: "All time" },
];

function filterByDateRange(data: DataPoint[], range: DateRange, xKey: string): DataPoint[] {
  if (range === "all") return data;

  const now = new Date();
  let cutoff: Date;

  switch (range) {
    case "30d":
      cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "90d":
      cutoff = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case "6m":
      cutoff = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
      break;
    case "12m":
      cutoff = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
  }

  return data.filter((d) => {
    const dateStr = String(d[xKey]);
    const date = new Date(dateStr);
    return date >= cutoff;
  });
}

export default function DataChart({
  data,
  series,
  xKey,
  title,
  subtitle,
  type = "line",
  height = 400,
  showDateFilter = true,
  showExport = true,
  yAxisFormatter,
  tooltipFormatter,
  className = "",
  hero = false,
  headerChildren,
  referenceLines,
}: DataChartProps) {
  const [dateRange, setDateRange] = useState<DateRange>("all");

  const filteredData = useMemo(
    () => (showDateFilter ? filterByDateRange(data, dateRange, xKey) : data),
    [data, dateRange, xKey, showDateFilter]
  );

  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {};
    for (const s of series) {
      config[s.key] = { label: s.name, color: s.color };
    }
    return config;
  }, [series]);

  const exportCSV = useCallback(() => {
    if (!filteredData.length) return;
    const keys = Object.keys(filteredData[0]);
    const csv = [
      keys.join(","),
      ...filteredData.map((row) => keys.map((k) => {
        const val = row[k];
        const str = String(val);
        return str.includes(",") ? `"${str}"` : str;
      }).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title?.replace(/\s+/g, "-").toLowerCase() || "chart-data"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredData, title]);

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 10, right: 10, left: 0, bottom: 0 },
    };

    const xAxis = (
      <XAxis
        dataKey={xKey}
        stroke="rgba(0,0,0,0.2)"
        tick={{ fill: "rgba(0,0,0,0.55)", fontSize: 11, fontFamily: "var(--font-fair-favorit-book), sans-serif", fontWeight: 400 }}
        tickLine={false}
        axisLine={false}
      />
    );

    const yAxis = (
      <YAxis
        stroke="rgba(0,0,0,0.2)"
        tick={{ fill: "rgba(0,0,0,0.55)", fontSize: 11, fontFamily: "var(--font-fair-favorit-book), sans-serif", fontWeight: 400 }}
        tickLine={false}
        axisLine={false}
        tickFormatter={yAxisFormatter || ((v: number) => {
          if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
          if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
          return String(v);
        })}
        width={50}
      />
    );

    const grid = (
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="rgba(0,0,0,0.08)"
        vertical={false}
      />
    );

    const tooltip = (
      <ChartTooltip
        content={
          <ChartTooltipContent
            formatter={tooltipFormatter ? (value, name) => {
              const formatted = tooltipFormatter(Number(value));
              return (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{String(name)}</span>
                  <span className="font-mono font-medium text-foreground">{formatted}</span>
                </div>
              );
            } : undefined}
          />
        }
      />
    );

    const legend = series.length > 1 ? (
      <ChartLegend content={<ChartLegendContent />} />
    ) : null;

    const refLines = referenceLines?.map((r, i) => (
      <ReferenceLine
        key={`ref-${i}`}
        y={r.y}
        stroke={r.color ?? "#FF4D00"}
        strokeDasharray="4 4"
        strokeWidth={1.5}
        ifOverflow="extendDomain"
        label={
          r.label
            ? {
                value: r.label,
                position: "insideTopRight",
                fill: r.color ?? "#FF4D00",
                fontSize: 11,
                fontWeight: 500,
                offset: 6,
              }
            : undefined
        }
      />
    ));

    if (type === "area") {
      return (
        <AreaChart {...commonProps}>
          {grid}
          {xAxis}
          {yAxis}
          {tooltip}
          {legend}
          {refLines}
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              fill={s.color}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </AreaChart>
      );
    }

    if (type === "bar") {
      return (
        <BarChart {...commonProps}>
          {grid}
          {xAxis}
          {yAxis}
          {tooltip}
          {legend}
          {refLines}
          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              fill={s.color}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      );
    }

    return (
      <LineChart {...commonProps}>
        {grid}
        {xAxis}
        {yAxis}
        {tooltip}
        {legend}
        {refLines}
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name}
            stroke={s.color}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: s.color }}
          />
        ))}
      </LineChart>
    );
  };

  return (
    <Card className={`bg-card ${className}`}>
      {(title || showDateFilter || showExport) && (
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            {title && (
              <CardTitle className={hero ? "text-2xl" : "text-xl"}>
{title}
              </CardTitle>
            )}
            {subtitle && (
              <CardDescription className="text-xs mt-1">{subtitle}</CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showDateFilter && (
              <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
                <SelectTrigger size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {showExport && (
              <Button variant="outline" size="sm" onClick={exportCSV}>
                <Download className="size-3" data-icon="inline-start" />
                CSV
              </Button>
            )}
          </div>
        </CardHeader>
      )}
      {headerChildren && <div className="px-5">{headerChildren}</div>}
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full" style={{ height }}>
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
