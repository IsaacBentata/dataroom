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
    arpu: "$3",
    total: "$300M",
    color: "text-accent-blue",
    description:
      "5% conversion to Pro at $5.99/mo, adjusted for regional pricing. Pro features include unlimited quiz entries, advanced profile customisation, exclusive community access, early vinyl drops, and an ad-free experience.",
    justification: "Comps: Discord Nitro converts at ~3-4% and trending up. Snapchat+ reached 12M subscribers (~2% of MAU) within 2 years. 5% is achievable for a mature social app with sticky features.",
  },
  {
    name: "Commerce",
    arpu: "$1.20",
    total: "$120M",
    color: "text-accent-purple",
    description:
      "Digital Vinyls and merch marketplace. Today, ~2% of users buy at least one Digital Vinyl per quarter. As the product matures and Digital Vinyls become tied to chart positioning, uptake grows - we model 10% of users purchasing regularly at scale, averaging 4 per year at $5 each. Merch marketplace adds a 15% take rate on $35 average orders.",
    justification: "Current baseline: 2% quarterly buyer rate. At scale with chart-certified vinyls and gifting mechanics, 10% annual buyer rate is conservative. Digital goods carry 70% margins.",
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
  { stream: "Advertising", arpu: "$12.00", annual: "$1.2B", share: "70.6%" },
  { stream: "Subscriptions", arpu: "$3.00", annual: "$300M", share: "17.6%" },
  { stream: "Commerce", arpu: "$1.20", annual: "$120M", share: "7.1%" },
  { stream: "Label Services", arpu: "$0.40", annual: "$40M", share: "2.4%" },
  { stream: "Live Experiences", arpu: "$0.35", annual: "$35M", share: "2.1%" },
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
            <CardTitle>The A/B test that proved monetisation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3">
              Between November 2025 and January 2026, Equals ran an extended A/B test on monetisation.
              The results were strong - top-quartile conversion for consumer social:
            </p>
            <div className="grid grid-cols-2 gap-4 my-4">
              <StatCallout value="4.5-5%" label="Paywall conversion rate" color="text-accent-green" />
              <StatCallout value="$3M+" label="Projected ARR at current MAU base" color="text-accent-blue" />
            </div>
          </CardContent>
        </Card>

        <h3 className="text-lg font-semibold text-foreground">The trade-off we made</h3>
        <p>
          The team deliberately pulled back monetisation in late January 2026 because aggressive
          monetisation was dampening network effects - users hitting paywalls early were less likely
          to add friends, join chatrooms, and engage with core social loops. The friction was
          suppressing the very behaviours that drive long-term retention and virality.
        </p>
        <p>
          The impact was immediate. February saw a spike in growth, engagement, and retention as
          friction was removed from the core experience. The decision to prioritise network effects
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
        subtitle="Revenue peaked at $50K/mo before deliberate pull-back to prioritise growth"
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
          <StatCallout value="$17.01" label="Blended ARPU" color="text-accent-purple" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {revenueStreams.map((stream) => (
          <Card key={`detail-${stream.name}`} className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{stream.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                {stream.description}
              </p>
              <p className="text-muted-foreground text-[11px] leading-relaxed bg-secondary rounded-lg p-2">
                {stream.justification}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

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
                  <td className="pt-3 text-right text-foreground">$17.01</td>
                  <td className="pt-3 text-right text-accent-green">$1.7B</td>
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
