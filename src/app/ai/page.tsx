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

      {/* AI-First Engineering */}
      <Card className="bg-card border-accent-purple/30 mb-6">
        <CardHeader>
          <div className="text-accent-purple text-xs font-medium mb-1">How It Works</div>
          <CardTitle>AI-First Engineering</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Over 90% of Equals production code is written by AI agents - primarily Claude Code and Cursor.
                  47 tickets were directly delegated to and completed by AI agents in the last quarter.
                  These are not simple autocomplete suggestions. AI agents are assigned Linear tickets, write complete
                  implementations, and submit pull requests for human review.
                </p>
                <p>
                  Human engineers focus on what humans do best: architectural decisions, edge case handling,
                  code review, and product judgment. The AI handles the volume. This is not a productivity hack -
                  it is a fundamentally different operating model that lets 4 engineers ship like a team of 30+.
                </p>
              </div>
            </div>
            <div>
              <Card className="bg-secondary border-0">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium mb-3">The AI Engineering Stack</h4>
                  <ul className="space-y-2 text-muted-foreground text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-purple mt-0.5">-</span>
                      <span><strong className="text-foreground">Claude Code:</strong> Primary coding agent for complex implementations, architecture, and multi-file changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-purple mt-0.5">-</span>
                      <span><strong className="text-foreground">Cursor:</strong> IDE-integrated AI for rapid iteration and ticket completion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-purple mt-0.5">-</span>
                      <span><strong className="text-foreground">Linear Integration:</strong> AI agents pull tickets, understand context, and submit work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-purple mt-0.5">-</span>
                      <span><strong className="text-foreground">Human Review:</strong> Every AI-generated PR is reviewed by a senior engineer</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

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
              Equals has built an in-house experimentation engine for rapid A/B testing. The team runs 5+ concurrent
              experiments at any time, using data to drive every product decision. This is the same infrastructure
              that companies like Spotify and Netflix use - but built and maintained by 4 engineers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* The Philosophy */}
      <Card className="bg-card border-accent-blue/30">
        <CardHeader>
          <CardTitle>The Philosophy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <blockquote className="border-l-2 border-accent-blue pl-4 text-foreground italic">
              &ldquo;AI is our multiplier, not our product. We use AI aggressively internally so that the product itself
              can be about genuine human connection. Every other company is selling AI to users. We use AI to build FOR humans.&rdquo;
            </blockquote>
            <p>
              This philosophy runs through every part of Equals. The app itself contains zero visible AI features -
              no chatbots, no AI-generated content, no &ldquo;powered by AI&rdquo; badges. Users come to Equals for real human
              connection through music. But behind the scenes, AI is what makes it possible for 4 engineers to ship
              483 tickets in a single month while operating a platform serving 500K+ monthly active users across 100+ countries.
            </p>
            <p>
              The implication for investors is significant: Equals has the unit economics of a large engineering team
              with the cost structure of a small one. As the company scales, this advantage compounds. Adding users
              does not require proportional headcount growth because AI handles the operational load.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card className="bg-secondary border-0">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">What AI Does at Equals</h4>
                  <ul className="space-y-1.5 text-xs">
                    <li>- Writes 90%+ of production code</li>
                    <li>- Generates and optimises ad creative</li>
                    <li>- Moderates content in 40+ languages</li>
                    <li>- Handles user support at scale</li>
                    <li>- Powers recommendations and personalisation</li>
                    <li>- Runs identity verification workflows</li>
                    <li>- Manages ambassador coordination</li>
                    <li>- Analyses data and generates reports</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-secondary border-0">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">What Humans Do at Equals</h4>
                  <ul className="space-y-1.5 text-xs">
                    <li>- Make architectural and product decisions</li>
                    <li>- Review and approve AI-generated code</li>
                    <li>- Negotiate label and industry partnerships</li>
                    <li>- Define strategy and priorities</li>
                    <li>- Handle complex edge cases</li>
                    <li>- Build relationships with artists and labels</li>
                    <li>- Design the user experience</li>
                    <li>- Set the creative and brand direction</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
