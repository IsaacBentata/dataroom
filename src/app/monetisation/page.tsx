"use client";

import { useMemo } from "react";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import DataChart from "@/components/DataChart";
import DownloadAllButton from "@/components/DownloadAllButton";
import { revenueData, parseEngagementExcludingCurrent } from "@/lib/data";

export default function MonetisationPage() {
  const engagement = useMemo(() => parseEngagementExcludingCurrent(), []);

  return (
    <Section>
      <div className="flex items-start justify-between gap-4 mb-12">
        <PageHeader
          label="Monetisation"
          title="The revenue is there when we want it"
        />
        <DownloadAllButton
          datasets={[
            { name: "Revenue by Month", data: revenueData },
            { name: "Engagement per User", data: engagement },
          ]}
          filename="equals-monetisation-data"
        />
      </div>

      <div className="max-w-3xl space-y-4 text-foreground-secondary text-sm leading-relaxed mb-10">
        <div className="bg-surface rounded-2xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">The A/B test that proved monetisation</h3>
          <p className="mb-3">
            Between November 2025 and January 2026, we ran an extended A/B test. The results were strong:
          </p>
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-green">4.5-5%</div>
              <div className="text-xs text-foreground-secondary mt-1">Paywall conversion rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-blue">$3M+</div>
              <div className="text-xs text-foreground-secondary mt-1">Projected ARR at current MAU base</div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground">The trade-off we made</h3>
        <p>
          We deliberately pulled back monetisation in late January 2026. Aggressive monetisation was
          dampening network effects - users who hit paywalls early were less likely to add friends,
          join chat rooms, and engage with the core social loops that drive retention.
        </p>
        <p>
          The impact was immediate. February saw a spike in growth, engagement, and retention as
          the friction was removed. We chose network effects over near-term revenue, and the
          10x MAU growth since validates that decision.
        </p>
      </div>

      <DataChart
        data={revenueData}
        series={[
          { key: "revenue", name: "Monthly Revenue ($)", color: "rgba(0, 204, 120, 1)" },
        ]}
        xKey="month"
        title="Revenue by Month"
        subtitle="Revenue peaked at $50K/mo before deliberate pull-back to prioritise growth"
        type="bar"
        height={320}
        yAxisFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
        tooltipFormatter={(v: number) => `$${v.toLocaleString()}`}
      />

      <div className="mt-10 bg-surface rounded-2xl border border-border p-6">
        <h3 className="text-base font-semibold mb-2">Engagement spike after pulling back monetisation</h3>
        <p className="text-foreground-secondary text-xs mb-4">
          This chart shows how average engagement per user spiked in February 2026 after monetisation was reduced.
          Removing friction from the core experience let users engage more deeply with the product.
        </p>
        <DataChart
          data={engagement}
          series={[
            { key: "Avg Actions", name: "Avg Actions per User", color: "#FF4D00" },
          ]}
          xKey="month"
          title="Engagement per User"
          subtitle="Average engagement actions per user per month (excluding current month)"
          type="bar"
          height={260}
          showDateFilter={false}
          className="border-0 p-0"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface rounded-2xl border border-border p-5">
          <h4 className="font-semibold text-accent-green text-sm mb-2">Today (proven)</h4>
          <ul className="space-y-1.5 text-foreground-secondary text-xs">
            <li>In-app subscriptions ($6.99/wk, $9.99/mo, $19.99/qtr)</li>
            <li>Premium features (profile viewers, filters)</li>
          </ul>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-5">
          <h4 className="font-semibold text-accent-blue text-sm mb-2">Near-term (6-12 months)</h4>
          <ul className="space-y-1.5 text-foreground-secondary text-xs">
            <li>Label-funded artist activations</li>
            <li>Digital Vinyl sales</li>
            <li>Live event ticketing</li>
            <li>Branded content & advertising</li>
          </ul>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-5">
          <h4 className="font-semibold text-accent-purple text-sm mb-2">Medium-term (12-18 months)</h4>
          <ul className="space-y-1.5 text-foreground-secondary text-xs">
            <li>Label marketing spend via Equals</li>
            <li>Social streaming revenue share</li>
            <li>Premium creator tools for artists</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
