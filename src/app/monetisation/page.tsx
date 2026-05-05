"use client";

import { useMemo } from "react";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import DataChart from "@/components/DataChart";
import StatCallout from "@/components/StatCallout";
import DownloadAllButton from "@/components/DownloadAllButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueData, parseEngagementExcludingCurrent } from "@/lib/data";

const revenueStreams = [
  {
    name: "Advertising",
    arpu: "$12",
    total: "$1.2B",
    color: "text-accent-green",
    description:
      "Content feed with high-impression inventory. Gen Z is the most sought-after advertising demographic, and music context is brand-safe and high-intent. Contextual targeting based on music taste - the strongest psychographic signal available. Native ad formats include sponsored vinyls, branded quizzes, and artist-sponsored channels.",
    justification: "Comps: Snapchat ~$11 ARPU, TikTok ~$8-10, Instagram ~$20+. At $12, Equals sits between TikTok and Snapchat - conservative given 37+ min/day engagement and premium Gen Z audience.",
  },
  {
    name: "Subscriptions",
    arpu: "$2.40",
    total: "$240M",
    color: "text-accent-blue",
    description:
      "4% conversion to Pro at $5.99/mo, adjusted for regional pricing. Pro features include unlimited quiz entries, advanced profile customisation, exclusive community access, early vinyl drops, and an ad-free experience.",
    justification: "Comps: Discord Nitro converts at ~3-4% and trending up. Snapchat+ reached 12M subscribers (~2% of MAU) within 2 years. 4% is in line with proven social app benchmarks.",
  },
  {
    name: "Commerce",
    arpu: "$0.78",
    total: "$78M",
    color: "text-accent-purple",
    description:
      "Digital Vinyls and merch marketplace. Today, ~2% of users buy at least one Digital Vinyl per quarter. As the product matures and Digital Vinyls become tied to chart positioning, uptake grows - we model 10% of users purchasing regularly at scale, averaging 4 per year at $5 each with ~30% margins. Merch marketplace adds a 15% take rate on $35 average orders.",
    justification: "Current baseline: 2% quarterly buyer rate. At scale with chart-certified vinyls and gifting mechanics, 10% annual buyer rate is conservative. ~30% margins after licensing costs.",
  },
  {
    name: "Label Services",
    arpu: "$0.40",
    total: "$40M",
    color: "text-accent-green",
    description:
      "B2B revenue from major labels. Includes album release activations (~300/yr at $130K avg), data insights packages (audience sentiment, taste clustering, trend prediction), and campaign management fees. High-margin revenue - mostly platform configuration, not incremental cost.",
    justification: "Labels currently spend billions on marketing with poor attribution. Equals offers direct-to-fan activation with measurable chart impact - pricing power increases as ROI is proven.",
  },
  {
    name: "Live Experiences",
    arpu: "$0.35",
    total: "$35M",
    color: "text-accent-blue",
    description:
      "Equals Live events across 15+ cities, targeting 480K attendees at $50 average ticket price, plus sponsorship revenue from brand partners.",
    justification: "Modelled on Fever's economics (~$600M+ revenue). Equals has the audience data to curate premium, intimate music experiences that command higher ticket prices and sponsorship value.",
  },
  {
    name: "Ticketing",
    arpu: "$0.06",
    total: "$6M",
    color: "text-accent-purple",
    description:
      "4% of MAUs buy tickets through the platform at $55 average ticket price with a 2.5% referral fee. Lightweight revenue built on existing social intent - users discover concerts inside artist profiles.",
    justification: "Aggregator referral model. Upside: launching primary ticketing pushes take rate to 15-20%+ on owned inventory.",
  },
];

const revenueSummary = [
  { stream: "Advertising", arpu: "$12.00", annual: "$1.2B", share: "75.1%" },
  { stream: "Subscriptions", arpu: "$2.40", annual: "$240M", share: "15.0%" },
  { stream: "Commerce", arpu: "$0.78", annual: "$78M", share: "4.9%" },
  { stream: "Label Services", arpu: "$0.40", annual: "$40M", share: "2.5%" },
  { stream: "Live Experiences", arpu: "$0.35", annual: "$35M", share: "2.2%" },
  { stream: "Ticketing", arpu: "$0.06", annual: "$6M", share: "0.4%" },
];

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

      {/* ── A/B Test Section ── */}
      <div className="space-y-4 text-muted-foreground text-sm leading-relaxed mb-10">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>We proved monetisation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3">
              Between October 2025 and January 2026, Equals ran an extended A/B test on monetisation
              across subscriptions and ads. At peak, the platform generated $46K in a single month on just
              90K MAU - an effective ARPU of $0.51/month per MAU.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
              <StatCallout value="$46K" label="Peak monthly revenue" color="text-accent-green" />
              <StatCallout value="90K" label="MAUs at peak" />
              <StatCallout value="$0.51" label="Monthly ARPU" color="text-accent-purple" />
              <StatCallout value="4.5-5%" label="Paywall conversion" color="text-accent-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-accent-green/30">
          <CardHeader>
            <CardTitle>Where we'd be today if we hadn't pulled back</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Applying the same $0.51/month ARPU to today's 530K MAU base, Equals would be generating
              ~$270K/month - a $3.2M annual run rate from subscriptions and ads alone, before any commerce,
              label services, or ticketing revenue. This is purely extrapolating the proven conversion rate
              to the current user base.
            </p>
            <div className="grid grid-cols-3 gap-4 my-4">
              <StatCallout value="$270K" label="Projected monthly revenue" color="text-accent-green" />
              <StatCallout value="$3.2M" label="Projected ARR" color="text-accent-blue" />
              <StatCallout value="530K" label="Current MAUs" color="text-accent-purple" />
            </div>
            <p className="text-xs">
              This projection is conservative - it assumes no improvement in conversion, pricing, or ARPU
              despite significantly better product-market fit and engagement metrics today vs October 2025.
              The real number would likely be higher.
            </p>
          </CardContent>
        </Card>

        <h3 className="text-lg font-semibold text-foreground">Why we chose growth over revenue</h3>
        <p>
          Starting at the end of December 2025, we began gradually rolling back paid features
          where we observed a significant impact on network effects. Users hitting paywalls early
          were less likely to add friends, join chatrooms, and engage with the core social loops
          that drive long-term retention and virality. We systematically identified which paid
          gates were suppressing these behaviours and removed them one by one.
        </p>
        <p>
          The impact was clear. As friction was removed from the core experience, growth,
          engagement, and retention all improved. The decision to prioritise network effects
          over near-term revenue is validated by the 9x MAU growth since. Revenue can be switched
          back on at any time - the audience cannot.
        </p>
      </div>

      {/* ── Revenue Chart ── */}
      <DataChart
        data={revenueData}
        series={[
          { key: "revenue", name: "Monthly Revenue ($)", color: "rgba(0, 204, 120, 1)" },
        ]}
        xKey="month"
        title="Revenue by Month"
        subtitle="Revenue peaked at $54K/mo (subs + ads) before deliberate pull-back to prioritise growth"
        type="bar"
        height={320}
        yAxisFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
        tooltipFormatter={(v: number) => `$${v.toLocaleString()}`}
      />

      {/* ── Engagement Chart ── */}
      <Card className="bg-card mt-10">
        <CardHeader>
          <CardTitle className="text-base">Engagement spike after pulling back monetisation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs mb-4">
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
            className="border-0 p-0 shadow-none ring-0"
          />
        </CardContent>
      </Card>

      {/* ── Future Revenue Vision ── */}
      <div className="mt-16">
        <h2
          className="text-2xl md:text-3xl font-bold text-foreground mb-2"
          style={{ fontFamily: "var(--font-fair-favorit-heading)", letterSpacing: "-0.03em" }}
        >
          By 2030, Equals will have 100M Monthly Active Users and $1.6B Annual Revenue
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-2">
          Six diversified revenue streams - weighted toward advertising, supplemented by subscriptions,
          commerce, and B2B label services. Each stream is benchmarked against public comps.
        </p>
        <div className="grid grid-cols-3 gap-4 my-6">
          <StatCallout value="100M" label="Monthly Active Users" color="text-accent-green" />
          <StatCallout value="$1.6B" label="Annual Revenue" color="text-accent-blue" />
          <StatCallout value="$15.99" label="Blended ARPU" color="text-accent-purple" />
        </div>
      </div>

      {/* ── Revenue Stream Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
        {revenueStreams.map((stream) => (
          <Card key={stream.name} className="bg-card text-center">
            <CardContent className="p-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">{stream.name}</h4>
              <div className={`text-2xl font-bold ${stream.color} mb-1`}>{stream.total}</div>
              <div className="text-xs text-muted-foreground">{stream.arpu} ARPU</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Revenue Stream Detail ── */}
      <Card className="bg-card mt-6">
        <CardHeader>
          <CardTitle>Revenue Stream Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {revenueStreams.map((stream) => (
              <div key={`detail-${stream.name}`}>
                <h4 className="text-sm font-semibold text-foreground mb-2">{stream.name}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                  {stream.description}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed bg-secondary rounded-lg p-3">
                  {stream.justification}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Revenue Summary Table ── */}
      <Card className="bg-card mt-8">
        <CardHeader>
          <CardTitle className="text-base">Revenue Summary at 100M MAU</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Stream</th>
                  <th className="pb-2 font-medium text-right">ARPU</th>
                  <th className="pb-2 font-medium text-right">Annual Revenue</th>
                  <th className="pb-2 font-medium text-right">Share</th>
                </tr>
              </thead>
              <tbody>
                {revenueSummary.map((row) => (
                  <tr key={row.stream} className="border-b border-border/50">
                    <td className="py-2 text-foreground font-medium">{row.stream}</td>
                    <td className="py-2 text-right text-muted-foreground">{row.arpu}</td>
                    <td className="py-2 text-right text-foreground font-semibold">{row.annual}</td>
                    <td className="py-2 text-right text-muted-foreground">{row.share}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="pt-3 text-foreground">Total</td>
                  <td className="pt-3 text-right text-foreground">$15.99</td>
                  <td className="pt-3 text-right text-accent-green">$1.6B</td>
                  <td className="pt-3 text-right text-foreground">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </Section>
  );
}
