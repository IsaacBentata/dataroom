"use client";

import { useMemo } from "react";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";
import DataChart from "@/components/DataChart";
import DownloadAllButton from "@/components/DownloadAllButton";
import {
  parseMAUData,
  parseMAUDataExcludingCurrent,
  parseDAUData,
  parseOnboardingFunnelExcludingCurrent,
} from "@/lib/data";

export default function GrowthPage() {
  const mauData = useMemo(() => parseMAUData(), []);
  const mauDataFiltered = useMemo(() => parseMAUDataExcludingCurrent(), []);
  const dauData = useMemo(() => parseDAUData(), []);
  const onboardingFunnel = useMemo(() => parseOnboardingFunnelExcludingCurrent(), []);

  return (
    <Section>
      <div className="flex items-start justify-between gap-4 mb-12">
        <PageHeader
          label="Growth"
          title="From 50K to 500K MAUs in 5 months"
          subtitle="Equals has achieved 10x user growth since November 2025, driven by strong organic acquisition and improving retention. The growth curve is accelerating, not flattening."
        />
        <DownloadAllButton
          datasets={[
            { name: "MAU and Install Growth", data: mauData },
            { name: "DAU Rolling Average", data: dauData },
            { name: "Onboarding Verification Rate", data: onboardingFunnel },
          ]}
          filename="equals-growth-data"
        />
      </div>

      <DataChart
        data={mauDataFiltered}
        series={[
          { key: "MAU", name: "Monthly Active Users", color: "#0000FF" },
          { key: "Installs", name: "App Installs", color: "rgba(0, 204, 120, 1)" },
        ]}
        xKey="date"
        title="MAU and Install Growth"
        subtitle="Monthly Active Users and Application Installs (excluding current incomplete month)"
        type="area"
        height={400}
        hero
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
        <StatCallout value="351K" label="MAUs (Mar 2026)" />
        <StatCallout value="243K" label="Installs (Mar 2026)" />
        <StatCallout value="3.6x" label="Growth since Nov 2025" color="text-accent-purple" />
        <StatCallout value="70K" label="DAU (Rolling Avg)" color="text-accent-blue" />
      </div>

      <DataChart
        data={dauData}
        series={[
          { key: "DAU", name: "DAU (30-day rolling avg)", color: "#8627FF" },
        ]}
        xKey="date"
        title="Daily Active Users - Rolling Average"
        subtitle="30-day rolling average of Daily Active Users"
        type="area"
        height={320}
      />

      <div className="mt-10">
        <div className="bg-surface rounded-2xl border border-border p-5 mb-4">
          <p className="text-foreground-secondary text-sm leading-relaxed">
            Equals is a human-only social network. Every user must complete identity verification to participate.
            The chart below shows the percentage of onboarded users who successfully verify their identity.
            Verification rates have improved significantly as the onboarding flow has been refined - from 20% in late 2025 to over 50% in early 2026.
          </p>
        </div>
        <DataChart
          data={onboardingFunnel}
          series={[
            { key: "Verification Rate", name: "Verification Rate (%)", color: "rgba(0, 204, 120, 1)" },
          ]}
          xKey="month"
          title="Onboarding Verification Rate"
          subtitle="Percentage of new users who complete identity verification (excluding current month)"
          type="bar"
          height={280}
          yAxisFormatter={(v: number) => `${v}%`}
          tooltipFormatter={(v: number) => `${v}%`}
        />
      </div>
    </Section>
  );
}
