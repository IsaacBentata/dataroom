"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";

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
        <StatCallout value="244" label="Tickets shipped in April alone" />
        <StatCallout value="90%+" label="Code written by AI agents" color="text-accent-purple" />
        <StatCallout value="5" label="Engineers" color="text-accent-blue" />
        <StatCallout value="~49" label="Tickets per engineer per month" color="text-accent-orange" />
      </div>

      {/* Engineering Velocity */}
      <div className="bg-surface rounded-2xl border border-accent-green/30 p-5 mb-6">
        <div className="text-accent-green text-xs font-medium mb-1">Real Linear Data - April 2026</div>
        <h3 className="text-lg font-semibold mb-4">Engineering Velocity</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-green">244</div>
            <div className="text-xs text-foreground-secondary">Tickets in April</div>
          </div>
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-blue">112</div>
            <div className="text-xs text-foreground-secondary">In a single sprint</div>
          </div>
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-purple">37</div>
            <div className="text-xs text-foreground-secondary">Projects completed</div>
          </div>
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-orange">67%</div>
            <div className="text-xs text-foreground-secondary">Weekly cycle completion</div>
          </div>
        </div>

        <div className="space-y-3 text-foreground-secondary text-sm leading-relaxed">
          <p>
            5 engineers shipped 244 tickets in April alone - that is roughly 49 tickets per engineer per month, or more than 2 per engineer per day.
            or nearly 3 per person per week. In April 2026 alone, the team completed 244 tickets by the 24th.
            That is approximately 12 tickets per working day across the entire team.
          </p>
          <p>
            The peak sprint (Cycle 79) saw 112 tickets completed in a single week. To put that in context, most
            Series A startups with teams of 20-30 engineers target 30-50 tickets per sprint. Equals does 2-3x that
            with a fraction of the headcount.
          </p>
          <p>
            37 projects were completed across the organisation. In April alone, 10+ projects shipped including:
            Feed Personalisation, New Posting Flow, Chatroom Pinning and Search, DM Search, Album Selection,
            Blocking changes, and A/B testing infrastructure. These are not minor tweaks - these are full features
            that shipped in days rather than weeks.
          </p>
        </div>
      </div>

      {/* AI-First Engineering */}
      <div className="bg-surface rounded-2xl border border-accent-purple/30 p-5 mb-6">
        <div className="text-accent-purple text-xs font-medium mb-1">How It Works</div>
        <h3 className="text-lg font-semibold mb-4">AI-First Engineering</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3 text-foreground-secondary text-sm leading-relaxed">
              <p>
                Over 90% of Equals production code is written by AI agents - primarily Claude Code and Cursor.
                47 tickets were directly delegated to and completed by AI agents in the last quarter.
                These are not simple autocomplete suggestions. AI agents are assigned Linear tickets, write complete
                implementations, and submit pull requests for human review.
              </p>
              <p>
                Human engineers focus on what humans do best: architectural decisions, edge case handling,
                code review, and product judgment. The AI handles the volume. This is not a productivity hack -
                it is a fundamentally different operating model that lets a team of 9 ship like a team of 30+.
              </p>
            </div>
          </div>
          <div>
            <div className="bg-surface-elevated rounded-xl p-4">
              <h4 className="text-sm font-medium mb-3">The AI Engineering Stack</h4>
              <ul className="space-y-2 text-foreground-secondary text-xs">
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
            </div>
          </div>
        </div>
      </div>

      {/* Marketing Automation */}
      <div className="bg-surface rounded-2xl border border-border p-5 mb-6">
        <h3 className="text-lg font-semibold mb-4">Marketing Automation</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-green">30%+</div>
            <div className="text-xs text-foreground-secondary">CPI reduction</div>
          </div>
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-blue">50M+</div>
            <div className="text-xs text-foreground-secondary">Organic views</div>
          </div>
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-purple">11</div>
            <div className="text-xs text-foreground-secondary">Ambassadors</div>
          </div>
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-orange">$0</div>
            <div className="text-xs text-foreground-secondary">Paid for organic views</div>
          </div>
        </div>
        <div className="space-y-3 text-foreground-secondary text-sm leading-relaxed">
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
      </div>

      {/* Content Moderation & Safety */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-surface rounded-2xl border border-border p-5">
          <h3 className="text-lg font-semibold mb-4">Content Moderation and Safety</h3>
          <div className="space-y-3 text-foreground-secondary text-sm leading-relaxed">
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
        </div>

        <div className="bg-surface rounded-2xl border border-border p-5">
          <h3 className="text-lg font-semibold mb-4">User Support</h3>
          <div className="space-y-3 text-foreground-secondary text-sm leading-relaxed">
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
        </div>
      </div>

      {/* Product Intelligence */}
      <div className="bg-surface rounded-2xl border border-border p-5 mb-6">
        <h3 className="text-lg font-semibold mb-4">Product Intelligence</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-green">$0.01</div>
            <div className="text-xs text-foreground-secondary">Per-user inference cost</div>
          </div>
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-blue">96%</div>
            <div className="text-xs text-foreground-secondary">Cost reduction (from $0.27)</div>
          </div>
          <div className="text-center bg-surface-elevated rounded-xl p-3">
            <div className="text-2xl font-bold text-accent-purple">5+</div>
            <div className="text-xs text-foreground-secondary">Concurrent A/B tests</div>
          </div>
        </div>
        <div className="space-y-3 text-foreground-secondary text-sm leading-relaxed">
          <p>
            AI powers the core product experience - recommendations, safety, and personalisation - at a per-user
            inference cost of just $0.01, down from $0.27. That 96% cost reduction was achieved through model
            optimisation and self-hosting, making AI-powered features economically viable even at scale.
          </p>
          <p>
            Equals has built an in-house experimentation engine for rapid A/B testing. The team runs 5+ concurrent
            experiments at any time, using data to drive every product decision. This is the same infrastructure
            that companies like Spotify and Netflix use - but built and maintained by a team of 9.
          </p>
        </div>
      </div>

      {/* The Philosophy */}
      <div className="bg-surface rounded-2xl border border-accent-blue/30 p-5">
        <h3 className="text-lg font-semibold mb-4">The Philosophy</h3>
        <div className="space-y-4 text-foreground-secondary text-sm leading-relaxed">
          <blockquote className="border-l-2 border-accent-blue pl-4 text-foreground italic">
            &ldquo;AI is our multiplier, not our product. We use AI aggressively internally so that the product itself
            can be about genuine human connection. Every other company is selling AI to users. We use AI to build FOR humans.&rdquo;
          </blockquote>
          <p>
            This philosophy runs through every part of Equals. The app itself contains zero visible AI features -
            no chatbots, no AI-generated content, no &ldquo;powered by AI&rdquo; badges. Users come to Equals for real human
            connection through music. But behind the scenes, AI is what makes it possible for a team of 9 to build
            and operate a platform serving 500K monthly active users across 100+ countries.
          </p>
          <p>
            The implication for investors is significant: Equals has the unit economics of a large engineering team
            with the cost structure of a small one. As the company scales, this advantage compounds. Adding users
            does not require proportional headcount growth because AI handles the operational load.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-surface-elevated rounded-xl p-4">
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
            </div>
            <div className="bg-surface-elevated rounded-xl p-4">
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
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
