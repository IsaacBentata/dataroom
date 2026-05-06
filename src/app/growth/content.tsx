"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";
import DataChart from "@/components/DataChart";
import DownloadAllButton from "@/components/DownloadAllButton";
import TopVideosCarousel from "@/components/TopVideosCarousel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  parseMAUData,
  parseMAUDataExcludingCurrent,
} from "@/lib/data";

// Monthly average eCPI from AppsFlyer (USD, converted from GBP at 1.35).
// October 2025 excluded (only 3 days of data).
const ecpiMonthly = [
  { month: "Nov 2025", "eCPI": 1.24 },
  { month: "Dec 2025", "eCPI": 1.43 },
  { month: "Jan 2026", "eCPI": 1.34 },
  { month: "Feb 2026", "eCPI": 1.15 },
  { month: "Mar 2026", "eCPI": 1.19 },
  { month: "Apr 2026", "eCPI": 0.70 },
];

// Monthly average CPM (USD, converted from GBP at 1.35). October 2025 excluded.
const cpmMonthly = [
  { month: "Nov 2025", CPM: 1.77 },
  { month: "Dec 2025", CPM: 1.97 },
  { month: "Jan 2026", CPM: 1.38 },
  { month: "Feb 2026", CPM: 1.23 },
  { month: "Mar 2026", CPM: 1.34 },
  { month: "Apr 2026", CPM: 1.20 },
];

// Install split, April 2026 (AppsFlyer). User_invite (2,214) is reattributed
// from Apple Search Ads → Organic. af_app_invites (585) is also folded into
// Organic. Both are peer invites, not paid acquisition.
const installSplit = [
  { name: "Organic", value: 177402 + 2214 + 585, color: "#00CC78" },
  { name: "TikTok", value: 104722, color: "#D6ED5E" },
  { name: "Meta", value: 54462, color: "#0066FF" },
  { name: "Apple Search Ads", value: 13083 - 2214, color: "#8627FF" },
];
const installSplitTotal = installSplit.reduce((s, d) => s + d.value, 0);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderInstallLabel = (props: any) => {
  const { name, percent, x, y, textAnchor } = props;
  if (percent < 0.03) return null;
  return (
    <text x={x} y={y} fill="#000" textAnchor={textAnchor} dominantBaseline="central" fontSize={13}>
      {`${name} ${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export default function GrowthPage() {
  const mauData = useMemo(() => parseMAUData(), []);
  const mauDataFiltered = useMemo(() => parseMAUDataExcludingCurrent(), []);


  return (
    <Section>
      <div className="flex items-start justify-between gap-4 mb-12">
        <PageHeader
          label="Growth"
          title="From 60K to 530K MAUs in 6 months"
          subtitle="9x user growth since November 2025 on organic acquisition and improving retention. The growth curve is accelerating."
        />
        <DownloadAllButton
          datasets={[
            { name: "MAU and Install Growth", data: mauData },

            { name: "Monthly Avg eCPI", data: ecpiMonthly },
            { name: "Monthly Avg CPM", data: cpmMonthly },
            { name: "Install Split (Apr 2026)", data: installSplit },
          ]}
          filename="equals-growth-data"
        />
      </div>

      <DataChart
        data={mauDataFiltered}
        series={[
          { key: "MAU", name: "Monthly Active Users", color: "#0066FF" },
          { key: "Installs", name: "App Installs", color: "rgba(0, 204, 120, 1)" },
        ]}
        xKey="date"
        title="MAU and Install Growth"
        subtitle="Monthly Active Users and Application Installs (excluding current incomplete month)"
        type="area"
        height={400}
        hero
      />

      <div className="grid grid-cols-3 gap-4 my-10">
        <StatCallout value="532K" label="MAUs (Apr 2026)" />
        <StatCallout value="385K" label="Installs (Apr 2026)" />
        <StatCallout value="8.7x" label="Growth since Nov 2025 start" color="text-accent-purple" />
      </div>

      <Card className="bg-card mt-16">
        <CardHeader>
          <CardTitle>We are majority organic</CardTitle>
          <CardDescription>
            Install split by channel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={installSplit}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={68}
                  dataKey="value"
                  label={renderInstallLabel}
                  labelLine={false}
                  strokeWidth={0}
                >
                  {installSplit.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                  itemStyle={{ color: "var(--foreground)" }}
                  formatter={(value: unknown) => {
                    const v = Number(value);
                    const pct = ((v / installSplitTotal) * 100).toFixed(1);
                    return [`${v.toLocaleString()} (${pct}%)`, "Installs"];
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px" }}
                  formatter={(value) => <span style={{ color: "#000" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-secondary rounded-2xl px-5 py-4 mt-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              51% of April 2026 installs were organic. TikTok and Meta
              together account for ~46%, Apple Search Ads ~3%. Product-led growth is working.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-16">
        <DataChart
          headerChildren={
            <div className="bg-secondary rounded-md px-4 py-3 mb-2">
              <p className="text-muted-foreground text-sm leading-relaxed">
                eCPI peaked at $1.43 in December 2025 and fell to $0.70 in April 2026, a 51% reduction.
                Same budget now buys ~2x the users it did five months ago.
                Every month measured is well below the $2.31 social-app benchmark.
              </p>
            </div>
          }
          data={ecpiMonthly}
          series={[
            { key: "eCPI", name: "Average eCPI (GBP)", color: "rgba(0, 204, 120, 1)" },
          ]}
          xKey="month"
          title="We have been getting cheaper over time"
          subtitle="Average effective Cost-Per-Install per month (USD)"
          type="area"
          height={320}
          yAxisFormatter={(v: number) => `$${v.toFixed(2)}`}
          tooltipFormatter={(v: number) => `$${v.toFixed(2)}`}
          referenceLines={[{ y: 2.31, label: "Benchmark $2.31" }]}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
        <StatCallout value="$1.43" label="Peak eCPI (Dec 2025)" />
        <StatCallout value="$0.70" label="eCPI (Apr 2026)" color="text-accent-green" />
        <StatCallout value="-51%" label="Cost reduction in 5 months" color="text-accent-purple" />
        <StatCallout value="2x" label="Installs per $ vs Dec 2025" color="text-accent-blue" />
      </div>

      <Card className="bg-card mt-16">
        <CardHeader>
          <CardTitle>We're a content machine</CardTitle>
          <CardDescription>
            1B+ views. ~150 videos a week. 30 accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold text-foreground">1B+</div>
              <div className="text-xs text-muted-foreground mt-1">views</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">150</div>
              <div className="text-xs text-muted-foreground mt-1">videos / week</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">30</div>
              <div className="text-xs text-muted-foreground mt-1">TikTok accounts</div>
            </div>
          </div>
          <TopVideosCarousel />
          <div className="bg-secondary rounded-2xl px-5 py-4 mt-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Owned content engine: ~7,800 videos a year across 30 TikTok accounts averaging ~128K views each.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-16">
        <DataChart
          headerChildren={
            <div className="bg-secondary rounded-md px-4 py-3 mb-2">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every month under $2.00 CPM. April 2026 at $1.20, ~7x below the $8.24 social-app benchmark.
                Cheap impressions plus falling eCPI means efficient full-funnel conversion.
              </p>
            </div>
          }
          data={cpmMonthly}
          series={[
            { key: "CPM", name: "Average CPM (GBP)", color: "#0066FF" },
          ]}
          xKey="month"
          title="CPMs well below benchmark"
          subtitle="Average Cost-Per-Mille (1,000 impressions) per month, USD"
          type="line"
          height={320}
          yAxisFormatter={(v: number) => `$${v.toFixed(2)}`}
          tooltipFormatter={(v: number) => `$${v.toFixed(2)}`}
          referenceLines={[{ y: 8.24, label: "Benchmark $8.24" }]}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
        <StatCallout value="$8.24" label="Industry benchmark CPM" />
        <StatCallout value="$1.20" label="Our CPM (Apr 2026)" color="text-accent-blue" />
        <StatCallout value="~7x" label="Below benchmark" color="text-accent-green" />
        <StatCallout value="100%" label="Months under benchmark" color="text-accent-purple" />
      </div>

      <Card className="bg-card mt-16">
        <CardHeader>
          <CardTitle>Identity Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-8">
            <div className="shrink-0">
              <div className="text-4xl font-bold text-accent-green">52%</div>
              <div className="text-xs text-black mt-1">Verification rate</div>
              <div
                className="stat-delta-green font-bold flex items-center gap-1 whitespace-nowrap mt-1"
                style={{ fontSize: 11, color: "#00CC78" }}
              >
                <svg width="7" height="7" viewBox="0 0 10 10" aria-hidden style={{ fill: "#00CC78" }}>
                  <path d="M5 1 L9 8 L1 8 Z" fill="#00CC78" />
                </svg>
                <span style={{ color: "#00CC78" }}>from 20% last Q</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">
              Equals is a human-only network. Every user must verify identity to unlock social features.
              Verification rate went from 20% in late 2025 to 52% today after onboarding refinements.
              More than half of users who start onboarding now complete it.
            </p>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
