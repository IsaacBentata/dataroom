"use client";

import Link from "next/link";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import DataChart from "@/components/DataChart";
import DownloadAllButton from "@/components/DownloadAllButton";
import { revenueData } from "@/lib/data";

export default function FinancialsPage() {
  return (
    <Section>
      <div className="flex items-start justify-between gap-4 mb-12">
        <PageHeader
          label="Financials"
          title="Revenue and Financial Position"
        />
        <DownloadAllButton
          datasets={[
            { name: "Revenue by Month", data: revenueData },
          ]}
          filename="equals-financials-data"
        />
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
        <h3 className="text-base font-semibold mb-4">Revenue by Month</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-foreground-secondary font-medium">Month</th>
                <th className="text-right py-2 text-foreground-secondary font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((r, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2">{r.month}</td>
                  <td className="py-2 text-right font-mono">
                    {r.revenue === 0 ? "$0" : `$${r.revenue.toLocaleString()}`}
                  </td>
                </tr>
              ))}
              <tr className="font-semibold border-t border-border">
                <td className="py-2">Total</td>
                <td className="py-2 text-right font-mono text-accent-green">
                  ${revenueData.reduce((sum, r) => sum + r.revenue, 0).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-foreground-secondary text-xs mt-3">
          Revenue peaked at $50K/mo before deliberate pull-back in Feb 2026 to prioritise network effects and growth.
          Monetisation infrastructure is built and tested - the 4.5-5% paywall conversion rate has been proven.
        </p>
      </div>

      <DataChart
        data={revenueData}
        series={[
          { key: "revenue", name: "Monthly Revenue ($)", color: "rgba(0, 204, 120, 1)" },
        ]}
        xKey="month"
        title="Revenue Trend"
        subtitle="Monthly revenue showing A/B test period and deliberate pull-back"
        type="bar"
        height={300}
        yAxisFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
        tooltipFormatter={(v: number) => `$${v.toLocaleString()}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-surface rounded-2xl border border-border p-5 text-center">
          <div className="text-2xl font-bold text-accent-green mb-1">$208K</div>
          <div className="text-foreground-secondary text-xs">Total Revenue to Date</div>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-5 text-center">
          <div className="text-2xl font-bold text-accent-blue mb-1">$3.7M</div>
          <div className="text-foreground-secondary text-xs">SAFE Investment Raised</div>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-5 text-center">
          <div className="text-2xl font-bold text-accent-purple mb-1">$45M</div>
          <div className="text-foreground-secondary text-xs">SAFE Valuation Cap</div>
        </div>
      </div>

      <div className="mt-8 bg-surface rounded-2xl border border-border p-5">
        <p className="text-foreground-secondary text-xs">
          For the full cap table and ownership breakdown, see the{" "}
          <Link href="/legal" className="text-accent-blue hover:underline">
            Legal & Corporate
          </Link>{" "}
          section.
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border text-center">
        <h2 className="text-lg font-bold mb-1">EQUALS</h2>
        <p className="text-foreground-secondary text-xs mb-3">
          Uniting the world through music
        </p>
        <p className="text-foreground-secondary text-xs">
          This data room contains confidential information intended for prospective investors of Fair Software Limited.
          Do not distribute without permission.
        </p>
      </footer>
    </Section>
  );
}
