"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";
import DataChart from "@/components/DataChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ticketsByMonth = [
  { month: "Jan 2026", Tickets: 211 },
  { month: "Feb 2026", Tickets: 303 },
  { month: "Mar 2026", Tickets: 391 },
  { month: "Apr 2026", Tickets: 483 },
];

export default function AIAdoptionPage() {
  return (
    <Section>
      <div className="mb-12">
        <PageHeader
          label="AI Adoption"
          title="AI is our multiplier, not our product"
          subtitle="We use AI aggressively internally so that the product itself can be about genuine human connection. Every other company is selling AI to users. We use AI to build FOR humans."
        />
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCallout value="483" label="Tickets shipped in April alone" />
        <StatCallout value="90%+" label="Code written by AI agents" color="text-accent-purple" />
        <StatCallout value="4" label="Engineers" color="text-accent-blue" />
        <StatCallout value="~121" label="Tickets per engineer per month" color="text-accent-orange" />
      </div>

      {/* Engineering Velocity Over Time */}
      <DataChart
        data={ticketsByMonth}
        series={[
          { key: "Tickets", name: "Tickets", color: "#0066FF" },
        ]}
        xKey="month"
        title="Engineering Velocity Over Time"
        subtitle="Tickets completed per month - 4 engineers"
        type="bar"
        height={280}
      />

      {/* Marketing Automation */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Marketing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
            <p>
              Equals runs a fully agentic growth stack. A fleet of agents, each with its own skill, plugs directly
              into Meta, TikTok, Snap, AppLovin, and Apple Search Ads, handling budget allocation across platforms
              in near real-time and shifting spend toward whatever is converting at the lowest CPI on any given day.
              The result: a 30%+ reduction in cost-per-install since automation was deployed.
            </p>
            <p>
              The team outputs 150 UGC creatives per week, tested and rotated by dedicated agents to combat ad
              exhaustion, with a performance skill auto-pausing underperformers and scaling winners. A separate ASA
              agent handles keyword bidding, match-type tuning, and CPT optimisation across our top markets,
              alongside an ASO programme that has compounded search volume month over month. On top of this,
              35 ambassadors are managed through agentic workflows, briefs, content review, and performance tracking,
              contributing 1B+ views, with the whole engine run end to end by a marketing team of one (Isaac Kamlish).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Content Moderation & Safety */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Content Moderation and Safety</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <p>
                Every user on Equals must verify their identity. External identity verification providers charge
                $0.15-0.30 per verification - we built our own in-house verification system that runs at $0.01
                per inference, a 93-97% cost reduction. At 500K+ MAUs and growing, this saves hundreds of thousands
                of dollars per year on verification alone, with the same approach applied across moderation and
                personalisation.
              </p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-accent-green">-</span>
                  <span>90%+ reduction in bad actor reports since deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-green">-</span>
                  <span>Real-time flagging across 40+ languages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-green">-</span>
                  <span>AI-powered identity verification support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-green">-</span>
                  <span>Automated escalation workflows for edge cases</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>User Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <p>
                User support runs as a multi-agent system, not a chatbot. 10+ specialised agents sit in front of
                every inbound ticket: a classifier reads the message and tags intent, a router dispatches to the
                right specialist (account recovery, payments, moderation appeals, safety, bug reports), and
                resolution agents own each lane end to end, pulling user context, checking history, and replying
                without a human in the loop. The result: 85% of tickets resolved fully automatically across 40+
                languages - higher than Klarna&apos;s widely-cited 66% benchmark.
              </p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue">-</span>
                  <span>Multi-agent system: classifier, router, and per-lane resolution agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue">-</span>
                  <span>40+ languages handled natively, no separate localisation team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue">-</span>
                  <span>85% of tickets resolved without human intervention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue">-</span>
                  <span>Edge cases auto-escalated to humans with full context pre-attached</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue">-</span>
                  <span>Same agentic foundation used across moderation, marketing, and verification</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

    </Section>
  );
}
