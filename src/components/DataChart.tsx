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
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

type DateRange = "30d" | "90d" | "6m" | "12m" | "all";

interface DataPoint {
  [key: string]: string | number;
}

interface SeriesConfig {
  key: string;
  name: string;
  color: string;
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
}

const dateRangeLabels: Record<DateRange, string> = {
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "6m": "Last 6 months",
  "12m": "Last 12 months",
  all: "All time",
};

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
}: DataChartProps) {
  const [dateRange, setDateRange] = useState<DateRange>("all");

  const filteredData = useMemo(
    () => (showDateFilter ? filterByDateRange(data, dateRange, xKey) : data),
    [data, dateRange, xKey, showDateFilter]
  );

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

  const formatTooltipValue = (value: number) => {
    if (tooltipFormatter) return tooltipFormatter(value);
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 10, right: 10, left: 0, bottom: 0 },
    };

    const commonAxisProps = {
      xAxis: (
        <XAxis
          dataKey={xKey}
          stroke="rgba(255,255,255,0.3)"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
      ),
      yAxis: (
        <YAxis
          stroke="rgba(255,255,255,0.3)"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={yAxisFormatter || ((v: number) => {
            if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
            if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
            return String(v);
          })}
          width={50}
        />
      ),
      grid: (
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.06)"
          vertical={false}
        />
      ),
      tooltip: (
        <Tooltip
          contentStyle={{
            backgroundColor: "#2C2C2E",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            color: "#fff",
            fontSize: 13,
          }}
          labelStyle={{ color: "rgba(255,255,255,0.6)" }}
          formatter={(value: unknown, name: unknown) => [formatTooltipValue(Number(value)), String(name)]}
        />
      ),
      legend: series.length > 1 ? (
        <Legend
          wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}
        />
      ) : null,
    };

    if (type === "area") {
      return (
        <AreaChart {...commonProps}>
          {commonAxisProps.grid}
          {commonAxisProps.xAxis}
          {commonAxisProps.yAxis}
          {commonAxisProps.tooltip}
          {commonAxisProps.legend}
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
          {commonAxisProps.grid}
          {commonAxisProps.xAxis}
          {commonAxisProps.yAxis}
          {commonAxisProps.tooltip}
          {commonAxisProps.legend}
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
        {commonAxisProps.grid}
        {commonAxisProps.xAxis}
        {commonAxisProps.yAxis}
        {commonAxisProps.tooltip}
        {commonAxisProps.legend}
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
    <div
      className={`bg-surface rounded-2xl border border-border p-5 ${hero ? "p-6" : ""} ${className}`}
    >
      {(title || showDateFilter || showExport) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            {title && (
              <h3 className={`font-semibold ${hero ? "text-xl" : "text-base"}`}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-foreground-secondary text-xs mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showDateFilter && (
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as DateRange)}
                className="bg-surface-elevated text-xs text-foreground border border-border rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-accent-blue cursor-pointer"
              >
                {Object.entries(dateRangeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            )}
            {showExport && (
              <button
                onClick={exportCSV}
                className="text-foreground-secondary hover:text-foreground text-xs flex items-center gap-1.5 px-2.5 py-1.5 border border-border rounded-lg hover:bg-surface-elevated transition-colors cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                CSV
              </button>
            )}
          </div>
        </div>
      )}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
