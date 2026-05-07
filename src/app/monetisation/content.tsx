"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const revenueStreams = [
  {
    name: "Advertising",
    arpu: "$12",
    total: "$1.2B",
    color: "text-accent-green",
    description:
      "Content feed with high-impression inventory. Gen Z is the most valuable advertising demographic, and music context is brand-safe and high-intent. Contextual targeting based on music taste, the strongest psychographic signal available. Native ad formats include sponsored vinyls, branded quizzes, and artist-sponsored channels.",
    justification: "Comps: Snapchat ~$11 ARPU, TikTok ~$8-10, Instagram ~$20+. At $12, Equals sits between TikTok and Snapchat. We think this is reasonable given our average usage time (35 min/day) sits well above benchmark for the most popular social apps.",
  },
  {
    name: "Subscriptions",
    arpu: "$9.30",
    total: "$930M",
    color: "text-accent-blue",
    description:
      "Based on proven annualised ARPU of $9.30 from the end of November 2025 when full monetisation features were deployed. Pro features include unlimited quiz entries, advanced profile customisation, exclusive community access, early vinyl drops, and an ad-free experience.",
    justification: "This ARPU was achieved with a 4.5% paywall conversion rate on a less mature product with lower engagement than today.",
  },
  {
    name: "Commerce",
    arpu: "$0.42",
    total: "$42M",
    color: "text-accent-purple",
    description:
      "Digital Vinyls™ and merch marketplace. Today, ~2% of users buy at least one Digital Vinyl™ per quarter. As Digital Vinyls™ become tied to chart positioning, uptake grows. We model 4% of users purchasing regularly at scale, averaging 4 per year at $5 each with ~30% margins. Merch marketplace adds a 15% take rate on $35 average orders.",
    justification: "Current baseline: 2% quarterly buyer rate. At scale with chart-certified vinyls and gifting mechanics, 4% annual buyer rate is a reasonable uplift. ~30% margins after licensing costs.",
  },
  {
    name: "Label Services",
    arpu: "$0.40",
    total: "$40M",
    color: "text-accent-green",
    description:
      "B2B revenue from major labels. The three majors collectively spend ~$5B/year on marketing and promotion. Equals captures a fraction of this through daily activations (pre-release campaigns, Digital Vinyl™ drops, community listening parties), data insights packages (audience sentiment, taste clustering, trend prediction, fan targeting), and campaign management across artist profiles.",
    justification: "Labels want direct-to-fan channels with measurable ROI. Equals offers what no other platform can: chart-moving activations, behavioural fan data, and a verified audience. Capturing <1% of major label marketing spend gets to $40M.",
  },
  {
    name: "Live Experiences",
    arpu: "$0.20",
    total: "$20M",
    color: "text-accent-blue",
    description:
      "Festival partnerships and co-branded live experiences. This is as much a branding exercise as a revenue line. Embedding Equals into live music culture drives brand awareness and user acquisition that compounds across every other revenue stream. Revenue comes from sponsorship packages, ticketing referrals, and co-branded content.",
    justification: "We're more excited about this from a brand standpoint than a pure revenue one. Being present at festivals cements Equals in music culture, which feeds acquisition and retention across the board.",
  },
  {
    name: "Ticketing",
    arpu: "$0.06",
    total: "$6M",
    color: "text-accent-purple",
    description:
      "4% of MAUs buy tickets through the platform at $55 average ticket price with a 2.5% referral fee. Lightweight revenue built on existing social intent - users discover concerts inside artist profiles.",
    justification: "Aggregator referral model.",
  },
];

const revenueSummary = [
  { stream: "Advertising", arpu: "$12.00", annual: "$1.2B", share: "53.6%" },
  { stream: "Subscriptions", arpu: "$9.30", annual: "$930M", share: "42.3%" },
  { stream: "Commerce", arpu: "$0.42", annual: "$42M", share: "1.9%" },
  { stream: "Label Services", arpu: "$0.40", annual: "$40M", share: "1.8%" },
  { stream: "Live Experiences", arpu: "$0.20", annual: "$20M", share: "0.9%" },
  { stream: "Ticketing", arpu: "$0.06", annual: "$6M", share: "0.3%" },
];

function PhaseHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mt-20 mb-8">
      <p
        className="text-accent-blue mb-2"
        style={{
          fontFamily: "var(--font-fair-favorit-mono), monospace",
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
      <h2
        className="text-3xl md:text-5xl font-bold text-foreground"
        style={{ fontFamily: "var(--font-fair-favorit-heading)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
      >
        {title}
      </h2>
    </div>
  );
}

function MetricRow({
  label,
  value,
  benchmark,
  benchmarkLabel,
  color,
}: {
  label: string;
  value: string;
  benchmark: string;
  benchmarkLabel: string;
  color: string;
}) {
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-1" style={{ fontFamily: "var(--font-fair-favorit-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{value}</div>
      <div className={`text-xs ${color}`}>{benchmark} {benchmarkLabel}</div>
    </div>
  );
}

export default function MonetisationPage() {
  return (
    <Section>
      <div className="flex items-start justify-between gap-4 mb-12">
        <PageHeader
          label="Monetisation"
          title="The revenue is there when we want it"
        />
      </div>

      {/* ═══ EQUALS YESTERDAY ═══ */}
      <PhaseHeader label="Equals Yesterday" title="We proved we can monetise at world-class levels" />

      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>The monetisation experiment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Between October 2025 and January 2026, Equals ran an extended A/B test on subscription
            monetisation. When we deployed the majority of our monetisation-gated features at the end
            of November, we hit $910K ARR at our highest ARPU of $9.30 per user. Across every benchmark
            that matters - paid conversion, refunds, and ad eCPMs - we landed materially above industry
            standards for consumer social.
          </p>
          <div className="grid grid-cols-3 gap-4 my-4">
            <StatCallout value="$910K" label="ARR at highest ARPU" color="text-accent-green" />
            <StatCallout value="$9.30" label="Annualised ARPU" color="text-accent-purple" />
            <StatCallout value="4.5%" label="Paywall conversion" color="text-accent-blue" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Subscription Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricRow
              label="Paid Conversion Rate"
              value="4.5%"
              benchmark="198% above"
              benchmarkLabel="Benchmark (1.51%)"
              color="text-accent-green"
            />
            <MetricRow
              label="Refund Rate"
              value="1.7%"
              benchmark="46% below"
              benchmarkLabel="Benchmark (3.16%)"
              color="text-accent-green"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Ads Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricRow
              label="Rewarded eCPM"
              value="$51"
              benchmark="132% above"
              benchmarkLabel="Benchmark ($22)"
              color="text-accent-green"
            />
            <MetricRow
              label="Interstitial eCPM"
              value="$27"
              benchmark="93% above"
              benchmarkLabel="Benchmark ($14)"
              color="text-accent-green"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 text-muted-foreground text-sm leading-relaxed mt-8">
        <p>
          Starting at the end of December 2025, we gradually rolled back paid features where they were
          hurting network effects. Users hitting paywalls early were less likely to add friends, join
          chatrooms, and use the core social loops that drive retention and virality. We identified
          which paid gates were suppressing these behaviours and removed them one by one.
        </p>
        <p>
          The impact was clear. Removing friction from the core experience improved growth, engagement,
          and retention. The decision to prioritise network effects over near-term revenue was validated
          by an increase of 96% in average engagement per user (where engagement is measured by social
          interactions such as DMs, likes, and other actions users take on the platform).
        </p>
      </div>

      {/* ═══ EQUALS TODAY ═══ */}
      <PhaseHeader label="Equals Today" title="What revenue would look like if we turned it back on" />

      <Card className="bg-card border-accent-green/30 mb-6">
        <CardHeader>
          <CardTitle>Subscription revenue at today's scale</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Applying the proven $9.30 annualised ARPU to today's 530K MAU base gives a $4.9M ARR from
            subscriptions alone. This excludes commerce, label services, and ticketing revenue. The
            proven ARPU of $9.30 is the basis for our subscription line in the long-term revenue forecast.
          </p>
          <div className="grid grid-cols-3 gap-4 my-4">
            <StatCallout value="$4.9M" label="Projected ARR" color="text-accent-green" />
            <StatCallout value="$9.30" label="Proven annualised ARPU" color="text-accent-purple" />
            <StatCallout value="530K" label="Current MAUs" color="text-accent-blue" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This projection is conservative: it assumes no improvement in conversion or pricing despite
            better product-market fit today, and does not account for retained revenue compounding from
            prior months. November was the first month with full monetisation. Earlier months had
            limited paid features, so there was no subscriber base carrying over. A mature subscription
            base with retained cohorts would produce materially higher numbers.
          </p>
        </CardContent>
      </Card>

      {/* ═══ EQUALS TOMORROW ═══ */}
      <PhaseHeader label="Equals Tomorrow" title="By 2030: 100M MAU and $2.2B Annual Revenue" />

      <p className="text-muted-foreground text-sm leading-relaxed mb-2">
        Six diversified revenue streams - weighted toward advertising, supplemented by subscriptions,
        commerce, and B2B label services. Each stream is benchmarked against public comps.
      </p>
      <div className="grid grid-cols-3 gap-4 my-6">
        <StatCallout value="100M" label="Monthly Active Users" color="text-accent-green" />
        <StatCallout value="$2.2B" label="Annual Revenue" color="text-accent-blue" />
        <StatCallout value="$22.38" label="Blended ARPU" color="text-accent-purple" />
      </div>

      {/* ── Revenue Stream Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
        {revenueStreams.map((stream) => (
          <Card key={stream.name} className="bg-card text-center">
            <CardContent className="p-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">{stream.name}</h4>
              <div
                className={`text-2xl ${stream.color} mb-1`}
                style={{
                  fontFamily: "var(--font-fair-favorit-mono), ui-monospace, Menlo, monospace",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {stream.total}
              </div>
              <div
                className="text-xs text-muted-foreground"
                style={{
                  fontFamily: "var(--font-fair-favorit-mono), ui-monospace, Menlo, monospace",
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {stream.arpu} ARPU
              </div>
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
                  <td className="pt-3 text-right text-foreground">$22.38</td>
                  <td className="pt-3 text-right text-accent-green">$2.2B</td>
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
