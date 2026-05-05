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

      {/* Engineering Velocity */}
      <Card className="bg-card border-accent-green/30 mb-6">
        <CardHeader>
          <div className="text-accent-green text-xs font-medium mb-1">Real Linear Data - April 2026</div>
          <CardTitle>Engineering Velocity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-green">483</div>
                <div className="text-xs text-muted-foreground">Tickets in April</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-blue">~22</div>
                <div className="text-xs text-muted-foreground">Tickets per working day</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-purple">~5.5</div>
                <div className="text-xs text-muted-foreground">Tickets / engineer / day</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-orange">22</div>
                <div className="text-xs text-muted-foreground">Working days in April</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
            <p>
              4 engineers shipped 483 tickets in April across 22 working days - roughly 121 tickets per engineer per month,
              or 5.5 tickets per engineer per working day. That is approximately 22 tickets per working day across the entire team.
            </p>
          </div>
        </CardContent>
      </Card>

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
          <CardTitle>Marketing Automation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-green">30%+</div>
                <div className="text-xs text-muted-foreground">CPI reduction</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-blue">50M+</div>
                <div className="text-xs text-muted-foreground">Organic views</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-purple">11</div>
                <div className="text-xs text-muted-foreground">Ambassadors</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-orange">$0</div>
                <div className="text-xs text-muted-foreground">Paid for organic views</div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
            <p>
              Equals runs a fully agentised marketing pipeline. AI generates and tests ad creative at scale,
              with automated campaign optimisation across TikTok and social channels. This has driven a 30%+ reduction
              in cost-per-install since automation was deployed.
            </p>
            <p>
              On the organic side, 11 ambassadors are coordinated through AI-assisted systems, contributing to
              over 50 million organic views without any paid spend. The combination of AI-generated creative
              and human ambassador authenticity creates a marketing engine that scales without proportional cost increases.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Content Moderation & Safety */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Content Moderation and Safety</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <p>
                Equals runs self-hosted ML models for both message and image moderation. This is not a third-party
                API call - the models run on Equals infrastructure for speed, cost control, and customisation.
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
                10+ AI agents are running in production handling user support. These agents classify incoming
                tickets, route them to the appropriate team, and resolve common issues automatically.
              </p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue">-</span>
                  <span>Automated classification and routing of support tickets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue">-</span>
                  <span>Multi-language support capabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue">-</span>
                  <span>Common issue resolution without human intervention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue">-</span>
                  <span>Escalation to human agents for complex cases</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Intelligence */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Product Intelligence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-green">$0.01</div>
                <div className="text-xs text-muted-foreground">Per-user inference cost</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-blue">96%</div>
                <div className="text-xs text-muted-foreground">Cost reduction (from $0.27)</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl font-bold text-accent-purple">5+</div>
                <div className="text-xs text-muted-foreground">Concurrent A/B tests</div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
            <p>
              AI powers the core product experience - recommendations, safety, and personalisation. A concrete example:
              every user on Equals must verify their identity. External identity verification providers charge $0.15-0.30
              per verification. We built our own in-house verification system that runs at $0.01 per inference - a 93-97%
              cost reduction. At 500K+ MAUs and growing, this saves hundreds of thousands of dollars per year on
              verification alone, and the same approach applies across recommendations, moderation, and personalisation.
            </p>
            <p>
              Equals runs an extensive A/B testing suite across all product surfaces - onboarding, feed, recommendations,
              social features, and monetisation. The team runs 5+ concurrent experiments at any time, with every test
              designed to drive higher retention. Every product decision is data-driven, and the experimentation
              infrastructure allows rapid iteration on what keeps users coming back. This is the same testing rigour
              that companies like Spotify and Netflix deploy - built and maintained by 4 engineers.
            </p>
          </div>
        </CardContent>
      </Card>

    </Section>
  );
}
