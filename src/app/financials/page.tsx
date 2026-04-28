"use client";

import Link from "next/link";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import DataChart from "@/components/DataChart";
import DownloadAllButton from "@/components/DownloadAllButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Revenue by Month</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Month</TableHead>
                <TableHead className="text-right text-muted-foreground">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueData.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>{r.month}</TableCell>
                  <TableCell className="text-right font-mono">
                    {r.revenue === 0 ? "$0" : `$${r.revenue.toLocaleString()}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="font-semibold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right font-mono text-accent-green">
                  ${revenueData.reduce((sum, r) => sum + r.revenue, 0).toLocaleString()}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <p className="text-muted-foreground text-xs mt-3">
            Revenue peaked at $50K/mo before deliberate pull-back in Feb 2026 to prioritise network effects and growth.
            Monetisation infrastructure is built and tested - the 4.5-5% paywall conversion rate has been proven.
          </p>
        </CardContent>
      </Card>

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
        <Card className="bg-card text-center">
          <CardContent className="pt-5">
            <div className="text-2xl font-bold text-accent-green mb-1">$208K</div>
            <div className="text-muted-foreground text-xs">Total Revenue to Date</div>
          </CardContent>
        </Card>
        <Card className="bg-card text-center">
          <CardContent className="pt-5">
            <div className="text-2xl font-bold text-accent-blue mb-1">$3.7M</div>
            <div className="text-muted-foreground text-xs">SAFE Investment Raised</div>
          </CardContent>
        </Card>
        <Card className="bg-card text-center">
          <CardContent className="pt-5">
            <div className="text-2xl font-bold text-accent-purple mb-1">$45M</div>
            <div className="text-muted-foreground text-xs">SAFE Valuation Cap</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card mt-8">
        <CardContent className="pt-5">
          <p className="text-muted-foreground text-xs">
            For the full cap table and ownership breakdown, see the{" "}
            <Link href="/legal" className="text-accent-blue hover:underline">
              Legal & Corporate
            </Link>{" "}
            section.
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border text-center">
        <h2 className="text-lg font-bold mb-1">EQUALS</h2>
        <p className="text-muted-foreground text-xs mb-3">
          Uniting the world through music
        </p>
        <p className="text-muted-foreground text-xs">
          This data room contains confidential information intended for prospective investors of Fair Software Limited.
          Do not distribute without permission.
        </p>
      </footer>
    </Section>
  );
}
