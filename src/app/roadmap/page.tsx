"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";

export default function RoadmapPage() {
  return (
    <Section>
      <div className="mb-12">
        <PageHeader
          label="Roadmap"
          title="From 530K to 10M MAUs"
          subtitle="A detailed, data-backed plan for how Equals becomes the default music social network. Every target below is grounded in current trendlines, proven mechanics, and signed partnerships."
        />
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 md:left-7 top-0 bottom-0 w-px bg-border" />

        {/* -- TODAY -- */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-green border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-green/30 p-5">
            <div className="text-accent-green text-xs font-medium mb-1">Today - May 2026</div>
            <h3 className="text-lg font-semibold mb-4">Where we are now</h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-green">530K</div>
                <div className="text-xs text-muted-foreground">MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-green">80K+</div>
                <div className="text-xs text-muted-foreground">DAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-green">33%</div>
                <div className="text-xs text-muted-foreground">D7 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-green">~20%</div>
                <div className="text-xs text-muted-foreground">D30 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-green">35 min</div>
                <div className="text-xs text-muted-foreground">Time Spent/Day</div>
              </div>
            </div>

            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <p>
                Equals has achieved 9x MAU growth in 6 months, going from ~50K in November 2025 to 530K by May 2026.
                The growth curve is accelerating, not flattening. Daily active users have grown from under 4K to over 80K
                in the same period. Users spend 35 minutes per day on the app - comparable to Instagram and TikTok.
              </p>
              <p>
                The UMG worldwide catalogue deal is signed. Warner and Sony term sheets are pending. This means Equals
                will have access to all three major labels - the same catalogue access as Spotify and Apple Music,
                but in a social-first context.
              </p>
              <p>
                Revenue infrastructure is proven: paywall conversion sits at 4.5-5% (top-quartile for consumer social),
                but has been deliberately scaled back to prioritise network effects and growth over near-term revenue.
                The team ships at extraordinary velocity - 483 tickets in April alone, 90%+ of code written by AI agents
                (see <a href="/ai" className="text-accent-blue hover:underline">AI Adoption</a> for details).
              </p>
            </div>
          </div>
        </div>

        {/* -- Q3 2026: FAN LAYER -- */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-blue border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-blue/30 p-5">
            <div className="text-accent-blue text-xs font-medium mb-1">Q3 2026 - Fan Layer</div>
            <h3 className="text-lg font-semibold mb-4">1M MAUs</h3>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">1M</div>
                <div className="text-xs text-muted-foreground">Target MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">200K+</div>
                <div className="text-xs text-muted-foreground">DAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">38%+</div>
                <div className="text-xs text-muted-foreground">D7 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">25%+</div>
                <div className="text-xs text-muted-foreground">D30 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">40 min</div>
                <div className="text-xs text-muted-foreground">Time Spent/Day</div>
              </div>
            </div>

            {/* How We Get There */}
            <h4 className="text-sm font-medium mb-3">How we get there</h4>
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-6">
              <p>
                The core thesis is simple: every retention metric improves with friend count. The data proves it
                (see <a href="/retention" className="text-accent-blue hover:underline">Retention</a> - users with 50+ friends retain at 36% D30 vs 14% for all users).
                So the Fan Layer is about accelerating friend connections through k-factor mechanics deployed across multiple surfaces.
              </p>
              <p>
                K-factor mechanics include social features gated behind referrals, DSP integration showing friends' activity,
                and user-led chatrooms. Each surface creates a natural reason to invite friends, and each invited friend
                improves retention for the inviter. This is the same flywheel that drove early Instagram and Snapchat growth.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-medium mb-2">Product Milestones</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>- DSP integration: See friends' Spotify and Apple Music activity inside Equals</li>
                <li>- Social features gated behind referrals: K-factor flywheel, every user brings their friends</li>
                <li>- User-led chatrooms: Create and manage your own chatrooms with friends inside Equals</li>
                <li>- Listen to music together in real time: Friends stream music together, radio-style sessions around shared artists</li>
                <li>- Activation pilot with UMG: Leverage Digital Vinyls to boost chart positioning on album release week</li>
                <li>- Collaborative playlists: Co-curated playlists where each addition becomes a social post</li>
              </ul>
            </div>

            {/* Why achievable */}
            <div className="bg-secondary rounded-xl p-4 mt-5">
              <h4 className="text-sm font-medium mb-2">Why 2x growth in one quarter is achievable</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Equals already grew 9x in 6 months (Nov 2025 to May 2026). The 2x target from 530K to 1M is far more
                conservative than the trajectory already demonstrated. Label partnerships bring built-in audiences -
                a single major artist activation can drive 100K+ installs. K-factor mechanics have not yet been deployed,
                representing a major untapped growth lever. And the team ships features in days, not months -
                483 tickets completed in April alone with just 4 engineers.
              </p>
            </div>
          </div>
        </div>

        {/* -- Q4 2026: ARTIST LAYER -- */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-purple border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-purple/30 p-5">
            <div className="text-accent-purple text-xs font-medium mb-1">Q4 2026 - Artist Layer</div>
            <h3 className="text-lg font-semibold mb-4">2M MAUs</h3>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">2M</div>
                <div className="text-xs text-muted-foreground">Target MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">400K+</div>
                <div className="text-xs text-muted-foreground">DAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">42%+</div>
                <div className="text-xs text-muted-foreground">D7 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">30%+</div>
                <div className="text-xs text-muted-foreground">D30 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">45 min</div>
                <div className="text-xs text-muted-foreground">Time Spent/Day</div>
              </div>
            </div>

            {/* How We Get There */}
            <h4 className="text-sm font-medium mb-3">How we get there</h4>
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-6">
              <p>
                By Q4 2026, network effects should be compounding from the Fan Layer investments. The Artist Layer
                shifts focus to making Equals the go-to activation channel for all major labels. Digital Vinyls move
                from king-maker to table stakes for charting, creating a self-reinforcing industry standard.
              </p>
              <p>
                Artist-driven growth becomes a major lever. Artists promote their Equals communities to their fanbases,
                creating a virtuous cycle: artists get direct fan access, fans get exclusive content and early album access,
                Equals gets distribution. Community listening parties around album drops create event-driven engagement spikes.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-medium mb-2">Product Milestones</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>- Go-to activation channel for all major labels: Digital Vinyls shift from king-maker to table stakes for charting</li>
                <li>- The IMDB of music reviews: Surface verified user reviews on a public website for organic search acquisition</li>
                <li>- Album Pre-release: Fans purchase Digital Vinyls to unlock albums before general release</li>
                <li>- Community listening parties: Real-time group listening events built around album drops</li>
                <li>- AI Conversations with Artist: AI-powered 1:1 conversations, personalised by Equals data</li>
              </ul>
            </div>

            {/* Why achievable */}
            <div className="bg-secondary rounded-xl p-4 mt-5">
              <h4 className="text-sm font-medium mb-2">Why 2x growth from Q3 to Q4 is achievable</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                By this point, k-factor mechanics from the Fan Layer are compounding. Each new user brings friends,
                and each friend improves retention for everyone in their network. Label partnerships bring built-in audiences -
                with all three major labels signed, Equals will have access to hundreds of artists with millions of fans.
                The public reviews website opens an entirely new organic acquisition channel through search traffic,
                while community listening parties create viral, event-driven growth moments.
              </p>
            </div>
          </div>
        </div>

        {/* -- 2027: CULTURE LAYER -- */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-orange border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-orange/30 p-5">
            <div className="text-accent-orange text-xs font-medium mb-1">2027 - Culture Layer</div>
            <h3 className="text-lg font-semibold mb-4">10M MAUs</h3>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">10M</div>
                <div className="text-xs text-muted-foreground">Target MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">2.5M+</div>
                <div className="text-xs text-muted-foreground">DAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">50%+</div>
                <div className="text-xs text-muted-foreground">D7 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">40%+</div>
                <div className="text-xs text-muted-foreground">D30 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">50 min</div>
                <div className="text-xs text-muted-foreground">Time Spent/Day</div>
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-6">
              <p>
                At 10M MAUs, Equals IS where music fans live online. The platform is the default destination for
                direct-to-fan engagement, music discovery, and fan community. Artists launch music on Equals first
                because that is where their most engaged fans are.
              </p>
              <p>
                The taste graph - the proprietary data asset built from hundreds of millions of music interactions -
                becomes the most valuable dataset in music. The Culture Layer expands Equals beyond listening and social
                into the full music lifestyle: concerts, collectibles, merchandise, and predictions.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-medium mb-2">Product Milestones</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>- Exclusive artist content: Behind-the-scenes, unreleased tracks, and artist-only posts</li>
                <li>- Ticketing and merch aggregation: Surface tickets and merch directly within artist profiles</li>
                <li>- Find Friends at Concerts: Connect users attending the same gig with shared taste or mutual friends</li>
                <li>- Trade + Gift Digital Vinyls: A social collectibles economy around Digital Vinyls</li>
                <li>- Music predictions: Predict chart positions and award winners, compete on leaderboards</li>
              </ul>
            </div>
          </div>
        </div>

        {/* -- WHY THESE NUMBERS ARE ACHIEVABLE -- */}
        <div className="relative pl-14 md:pl-18">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-foreground border-4 border-background" />
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="text-lg font-semibold mb-4">Why these numbers are achievable</h3>

            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Retention improves with friends - this is proven</h4>
                <p>
                  The single most important chart in this data room is the retention-by-friends curve
                  (see <a href="/retention" className="text-accent-blue hover:underline">Retention</a>). Users with 50+ friends retain at 36% D30 -
                  nearly 3x the all-users average. Every investment in k-factor directly improves retention, which improves
                  LTV, which funds more growth. This is a classic network effects flywheel and the data already proves it works.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">K-factor mechanics are an untapped lever</h4>
                <p>
                  The 9x growth from Nov 2025 to May 2026 was achieved without any dedicated k-factor mechanics.
                  Social features gated behind referrals, DSP integration, and user-led chatrooms represent major untapped
                  growth levers. Deploying these across multiple surfaces should meaningfully accelerate organic acquisition.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Label partnerships bring built-in audiences</h4>
                <p>
                  A single major artist activation can drive 100K+ installs. With all three major labels signed,
                  Equals will have access to hundreds of artists with millions of fans. Each artist activation is a
                  distribution event that brings a pre-qualified, music-obsessed audience directly to the platform.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">35 min/day proves deep product-market fit</h4>
                <p>
                  Users do not spend 35 minutes per day on a product they are lukewarm about. This level of engagement -
                  comparable to Instagram and approaching TikTok - indicates genuine product-market fit. Time spent is
                  the hardest metric to fake and the most predictive of long-term retention.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Team velocity is a structural advantage</h4>
                <p>
                  483 tickets completed in April with just 4 engineers. AI-multiplied output means Equals can iterate on
                  product faster than competitors with 5x the headcount. Speed of iteration compounds - each experiment run,
                  each feature shipped, each insight gained happens faster than the competition can respond
                  (see <a href="/ai" className="text-accent-blue hover:underline">AI Adoption</a> for the full picture).
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">The growth engine works and is accelerating</h4>
                <p>
                  9x growth in 6 months is not a one-time spike - the month-over-month growth rate has been consistent
                  (see <a href="/growth" className="text-accent-blue hover:underline">Growth</a>). The curve is accelerating,
                  not flattening. Marketing automation continues to reduce CPI while organic channels grow.
                  The targets ahead are more conservative than the trajectory already demonstrated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
