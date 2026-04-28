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
          title="From 500K to 15M MAUs"
          subtitle="A detailed, data-backed plan for how Equals becomes the default music social network. Every target below is grounded in current trendlines, proven mechanics, and signed partnerships."
        />
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 md:left-7 top-0 bottom-0 w-px bg-border" />

        {/* ── TODAY ── */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-green border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-green/30 p-5">
            <div className="text-accent-green text-xs font-medium mb-1">Today - April 2026</div>
            <h3 className="text-lg font-semibold mb-4">Where we are now</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-accent-green">500K</div>
                <div className="text-xs text-muted-foreground">MAUs</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent-blue">80K+</div>
                <div className="text-xs text-muted-foreground">DAUs</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent-purple">34%</div>
                <div className="text-xs text-muted-foreground">D7 Retention</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent-orange">37 min</div>
                <div className="text-xs text-muted-foreground">Daily Time Spent</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-accent-green">~20%</div>
                <div className="text-xs text-muted-foreground">D30 Retention</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent-blue">4.5+</div>
                <div className="text-xs text-muted-foreground">App Store Rating</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent-purple">54/46</div>
                <div className="text-xs text-muted-foreground">Male/Female Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent-orange">9</div>
                <div className="text-xs text-muted-foreground">Team Size</div>
              </div>
            </div>

            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <p>
                Equals has achieved 10x MAU growth in 5 months, going from ~50K in November 2025 to 500K by April 2026.
                The growth curve is accelerating, not flattening. Daily active users have grown from under 4K to over 80K
                in the same period. Users spend 37 minutes per day on the app - comparable to Instagram and TikTok.
              </p>
              <p>
                The UMG worldwide catalogue deal is signed. Warner and Sony term sheets are pending. This means Equals
                will have access to all three major labels - the same catalogue access as Spotify and Apple Music,
                but in a social-first context.
              </p>
              <p>
                Revenue infrastructure is proven: paywall conversion sits at 4.5-5% (top-quartile for consumer social),
                but has been deliberately scaled back to prioritise network effects and growth over near-term revenue.
                The team ships at extraordinary velocity - 250+ tickets in 90 days, 90%+ of code written by AI agents
                (see <a href="/ai" className="text-accent-blue hover:underline">AI Adoption</a> for details).
              </p>
            </div>
          </div>
        </div>

        {/* ── 6 MONTHS ── */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-blue border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-blue/30 p-5">
            <div className="text-accent-blue text-xs font-medium mb-1">Q4 2026 - 6 Months</div>
            <h3 className="text-lg font-semibold mb-4">Network effects compounding</h3>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">2M</div>
                <div className="text-xs text-muted-foreground">Target MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">400K+</div>
                <div className="text-xs text-muted-foreground">DAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">40%+</div>
                <div className="text-xs text-muted-foreground">D7 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">30%+</div>
                <div className="text-xs text-muted-foreground">D30 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">45 min</div>
                <div className="text-xs text-muted-foreground">Time Spent/Day</div>
              </div>
            </div>

            {/* How We Get There */}
            <h4 className="text-sm font-medium mb-3">How we get there</h4>
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-6">
              <p>
                The core thesis is simple: every retention metric improves with friend count. The data proves it
                (see <a href="/retention" className="text-accent-blue hover:underline">Retention</a> - users with 50+ friends retain at 36% D30 vs 14% for all users).
                So the 6-month plan is about accelerating friend connections through k-factor mechanics deployed across 3+ surfaces.
              </p>
              <p>
                K-factor mechanics include: a viewers invite gate (see who viewed your profile, invite friends to unlock),
                DSP integration (see what friends listen to on Spotify/Apple Music), and referral rewards.
                Each surface creates a natural reason to invite friends, and each invited friend improves retention for the inviter.
                This is the same flywheel that drove early Instagram and Snapchat growth.
              </p>
              <p>
                Organic acquisition is targeted to cross 60% of total installs, up from current levels. CPI will be
                reduced a further 25% through continued marketing automation. The A/B testing engine will run 5+ concurrent
                experiments at all times, optimising every step of the user journey.
              </p>
            </div>

            {/* Product & Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-sm font-medium mb-2">Product Milestones</h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>- DSP integration live - connect Spotify/Apple Music to see what friends listen to</li>
                  <li>- Invite friends bottom sheet deployed across multiple surfaces (viewers, profile, feed)</li>
                  <li>- Digital Vinyl drops generating measurable download revenue</li>
                  <li>- Enhanced music quiz features driving repeat engagement and virality</li>
                  <li>- Feed personalisation v2 - algorithmic and friend-weighted</li>
                  <li>- Cross-platform sharing optimised for TikTok, Instagram Stories, and Snapchat</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Music Industry</h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>- First major UMG artist activation - full fanbase capture onto Equals</li>
                  <li>- All three major labels live (UMG active, Warner and Sony signed)</li>
                  <li>- Pre-release exclusives running on platform</li>
                  <li>- Label marketing spend beginning to flow through Equals</li>
                  <li>- Artist profile tools enabling direct fan engagement</li>
                  <li>- First data insights reports delivered to label partners</li>
                </ul>
              </div>
            </div>

            {/* Why achievable */}
            <div className="bg-secondary rounded-xl p-4 mt-5">
              <h4 className="text-sm font-medium mb-2">Why 4x growth in 6 months is achievable</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Equals already grew 10x in 5 months (Nov 2025 to Apr 2026). The 4x target from 500K to 2M is more
                conservative than the trajectory already demonstrated. Label partnerships bring built-in audiences -
                a single major artist activation can drive 100K+ installs. K-factor mechanics have not yet been deployed,
                representing a major untapped growth lever. And the team ships features in days, not months -
                244 tickets completed in April alone.
              </p>
            </div>
          </div>
        </div>

        {/* ── 12 MONTHS ── */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-purple border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-purple/30 p-5">
            <div className="text-accent-purple text-xs font-medium mb-1">Q2 2027 - 12 Months</div>
            <h3 className="text-lg font-semibold mb-4">Category definition</h3>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">5M</div>
                <div className="text-xs text-muted-foreground">Target MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">1M+</div>
                <div className="text-xs text-muted-foreground">DAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">45%+</div>
                <div className="text-xs text-muted-foreground">D7 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">35%+</div>
                <div className="text-xs text-muted-foreground">D30 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">90%</div>
                <div className="text-xs text-muted-foreground">Organic Acquisition</div>
              </div>
            </div>

            {/* How We Get There */}
            <h4 className="text-sm font-medium mb-3">How we get there</h4>
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-6">
              <p>
                By Q2 2027, network effects should be fully compounding. Each new user makes the product better for
                everyone - more content, more conversations, more taste-based connections. Word-of-mouth becomes the
                primary growth driver, with organic acquisition targeted at 90% of total.
              </p>
              <p>
                International expansion accelerates into non-English markets. Equals already has content moderation
                in 40+ languages and a genuinely global user base (see <a href="/demographics" className="text-accent-purple hover:underline">Demographics</a> -
                users across 100+ countries today). The infrastructure for international scale is already built.
              </p>
              <p>
                Artist-driven growth becomes a major lever. Artists promote their Equals communities to their fanbases,
                creating a virtuous cycle: artists get direct fan access, fans get exclusive content, Equals gets
                distribution. After 10+ artist activations, the playbook is proven and repeatable.
              </p>
            </div>

            {/* Product & Revenue */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-sm font-medium mb-2">Product Milestones</h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>- 10+ artist activations completed with measurable fanbase growth</li>
                  <li>- Social streaming beta - social listening experience built on the taste graph</li>
                  <li>- Creator tools for artists building communities on Equals</li>
                  <li>- Advanced recommendation engine driven by taste graph data</li>
                  <li>- Live event integration - discover and attend concerts with friends</li>
                  <li>- Group listening sessions and shared playlists</li>
                  <li>- Taste graph API powering personalisation across every surface</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Revenue</h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>- Labels actively routing marketing spend through Equals</li>
                  <li>- Live event ticketing generating revenue in 2+ markets</li>
                  <li>- Digital Vinyl sales at scale</li>
                  <li>- B2B revenue stream from label partnerships and data insights</li>
                  <li>- Premium features generating predictable subscription revenue</li>
                  <li>- Clear path to profitability demonstrated</li>
                  <li>- Revenue run rate supporting next fundraise narrative</li>
                </ul>
              </div>
            </div>

            {/* 50 min/day context */}
            <div className="bg-secondary rounded-xl p-4 mt-5">
              <h4 className="text-sm font-medium mb-2">Time spent: 50 min/day target</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Equals already achieves 37 min/day - comparable to Instagram (33 min) and approaching TikTok (52 min).
                DSP integration, social streaming, and live event features each add incremental engagement time.
                The 50 min/day target is achievable because each new feature adds a new reason to open the app,
                and friend-driven content creates compounding engagement loops.
              </p>
            </div>
          </div>
        </div>

        {/* ── 18 MONTHS ── */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-orange border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-orange/30 p-5">
            <div className="text-accent-orange text-xs font-medium mb-1">Q4 2027 - 18 Months</div>
            <h3 className="text-lg font-semibold mb-4">The music social network</h3>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">15M</div>
                <div className="text-xs text-muted-foreground">Target MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">4M+</div>
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
            </div>

            {/* Vision */}
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-6">
              <p>
                At 15M MAUs, Equals IS where music fans live online. The platform is the default destination for
                direct-to-fan engagement, music discovery, and fan community. Artists launch music on Equals first
                because that is where their most engaged fans are.
              </p>
              <p>
                The taste graph - the proprietary data asset built from hundreds of millions of music interactions -
                becomes the most valuable dataset in music. Labels, artists, and brands all want access to the
                Equals community because it represents the highest-intent music audience on the internet.
              </p>
            </div>

            {/* Product & Revenue */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-sm font-medium mb-2">Product and Position</h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>- Equals is the default platform for direct-to-fan engagement</li>
                  <li>- Full social streaming experience live with major label catalogues</li>
                  <li>- Music industry standard for fan data and insights</li>
                  <li>- Expansion into adjacent culture verticals under evaluation</li>
                  <li>- Labels, artists, and brands all actively building on Equals</li>
                  <li>- International presence across 150+ countries</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Revenue</h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>- Diversified: advertising, ticketing, label partnerships, premium features</li>
                  <li>- Social streaming revenue share with major labels</li>
                  <li>- B2B data and insights platform for the music industry</li>
                  <li>- Brand partnership programme at scale</li>
                  <li>- Clear path to sustainable profitability</li>
                  <li>- Multiple revenue streams reducing concentration risk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── WHY THESE NUMBERS ARE ACHIEVABLE ── */}
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
                  The 10x growth from Nov 2025 to Apr 2026 was achieved without any dedicated k-factor mechanics.
                  The viewers invite gate, DSP integration, and referral rewards represent major untapped growth levers.
                  Deploying these across 3+ surfaces should meaningfully accelerate organic acquisition.
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
                <h4 className="text-sm font-medium text-foreground mb-1">37 min/day proves deep product-market fit</h4>
                <p>
                  Users do not spend 37 minutes per day on a product they are lukewarm about. This level of engagement -
                  comparable to Instagram and approaching TikTok - indicates genuine product-market fit. Time spent is
                  the hardest metric to fake and the most predictive of long-term retention.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Team velocity is a structural advantage</h4>
                <p>
                  250+ tickets shipped in 90 days. 244 tickets in April alone. 112 tickets in a single sprint.
                  AI-multiplied output means Equals can iterate on product faster than competitors with 5x the headcount.
                  Speed of iteration compounds - each experiment run, each feature shipped, each insight gained happens
                  faster than the competition can respond
                  (see <a href="/ai" className="text-accent-blue hover:underline">AI Adoption</a> for the full picture).
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">The growth engine works and is accelerating</h4>
                <p>
                  10x growth in 5 months is not a one-time spike - the month-over-month growth rate has been consistent
                  (see <a href="/growth" className="text-accent-blue hover:underline">Growth</a>). The curve is accelerating,
                  not flattening. Marketing automation continues to reduce CPI while organic channels grow.
                  The 4x target for the next 6 months is more conservative than the trajectory already demonstrated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
