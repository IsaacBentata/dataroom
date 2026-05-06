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
          subtitle="How Equals gets to 10M MAUs. Every target is grounded in current trendlines, proven mechanics, and signed partnerships."
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
            <div
              className="mb-4"
              style={{
                fontFamily: "var(--font-fair-favorit-mono), ui-monospace, Menlo, monospace",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#000",
              }}
            >Where we are now</div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-green">530K</div>
                <div className="text-xs text-muted-foreground">MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-green">27%</div>
                <div className="text-xs text-muted-foreground">W4 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-green">18%</div>
                <div className="text-xs text-muted-foreground">W8 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-green">35 min</div>
                <div className="text-xs text-muted-foreground">Time Spent/Day</div>
              </div>
            </div>

            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <p>
                We've spent the last 6 months focussed on building an engaging, retentive product with the
                foundational blocks to absorb accelerated growth. 530K MAUs, growing 30% m/m (50%+ in the trailing
                month), from ~60K at the beginning of November 2025. Users spend 35 mins a day on Equals, more
                than Instagram or Snapchat. 72% of onboarded users have made at least one friend, and users with
                50+ friends retain at 40% at W8, over 2x the all-users average.
              </p>
              <p>
                On the industry side, we've signed a worldwide catalogue deal with UMG, which gives us the
                licensing foundation for everything on this roadmap. Term sheets with Warner and Sony are on
                similar terms. We're the only social music platform with major label access at this level.
              </p>
            </div>
          </div>
        </div>

        {/* -- Q3 2026: FAN LAYER -- */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-blue border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-blue/30 p-5">
            <div className="text-accent-blue text-xs font-medium mb-1">Q3 2026 - Fan Layer</div>
            <div
              className="mb-4"
              style={{
                fontFamily: "var(--font-fair-favorit-mono), ui-monospace, Menlo, monospace",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#000",
              }}
            >1M MAUs</div>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">1M</div>
                <div className="text-xs text-muted-foreground">Target MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">32%+</div>
                <div className="text-xs text-muted-foreground">W4 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">22%+</div>
                <div className="text-xs text-muted-foreground">W8 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-blue">40 min</div>
                <div className="text-xs text-muted-foreground">Time Spent/Day</div>
              </div>
            </div>

            {/* K-factor as core PLG lever */}
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-6">
              <p>
                Referred users have the best retention performance across our entire acquisition funnel. That makes
                k-factor the core PLG lever for Q3. We're targeting k=0.5-0.6. At k=0.5, every user acquired turns
                into 2 through viral compounding. At k=0.6, it's 2.5x. At current acquisition of ~385K installs/month,
                that alone turns into 770K-960K users from the same spend. We're excited about this for two reasons.
                First, growth: higher k-factor brings down eCPI and increases the organic share of our funnel. Second,
                retention: it's a double-whammy, because both the referrer and the referred user gain a valuable node
                in their network inside Equals, which we know makes them retain much better.
              </p>

              <p>
                We're working on upping k-factor in two ways.
              </p>

              <p>
                <strong className="text-foreground">1. Referral-gated features.</strong> We have desirable features on
                Equals that don't dampen network effects but are still very much wanted by users. We're adding an
                invite-3-friends unlock to these. Turns existing product demand into distribution.
              </p>

              <p>
                <strong className="text-foreground">2. Features best enjoyed with a friend.</strong> Today the product
                appeals to users in social discovery mode, but the Equals messaging experience doesn't yet replace
                another app you'd use with an IRL friend. We want to change that. The feature we're most excited about
                is "radio" chatting: you and a friend build a radio station of your shared taste, and it plays while
                you're both chatting through Equals. The flow is oriented entirely around k-factor: don't just start radio
                with someone we recommended you meet, start it with someone you already know. This can be extended
                in future product roadmap. In-app karaoke with friends, for example, has serious viral potential
                through seeping into other social platforms (think Musical.ly lip syncing).
              </p>

              <p>
                A feature that encompasses both of these is <strong className="text-foreground">DSP friend activity</strong>: a
                feed showing what your friends are listening to across Spotify and Apple Music, inside Equals. This is a
                proven k-factor playbook (AirBuds built a business on this alone). Neither DSP wants to surface this
                natively because it sends users to competitors. Equals is the neutral layer that can. It's referral-gated
                (invite 3 friends to unlock) and it's best enjoyed with friends (seeing what your IRL friends are
                listening to is inherently social).
              </p>

              <p>
                <strong className="text-foreground">Planting seeds for artist-led growth.</strong> We intentionally
                built Equals as a horizontal product first, with fan-to-fan interaction as the core network foundation.
                We didn't want to rely on artist engagement as a top-down mechanic. The product retains without it. That
                means we can now bring in artist activation knowing it won't create a leaky bucket. We're already in
                conversations with UMG today about Q3 catalogue activation pilots around album
                release week: early access via Digital Vinyl™ purchases, which count as 1,500 stream units toward chart
                positioning. Successful pilots give us a repeatable growth framework into Q4.
              </p>

            </div>
          </div>
        </div>

        {/* -- Q4 2026: ARTIST LAYER -- */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-purple border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-purple/30 p-5">
            <div className="text-accent-purple text-xs font-medium mb-1">Q4 2026 - Artist Layer</div>
            <div
              className="mb-4"
              style={{
                fontFamily: "var(--font-fair-favorit-mono), ui-monospace, Menlo, monospace",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#000",
              }}
            >2M MAUs</div>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">2M</div>
                <div className="text-xs text-muted-foreground">Target MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">38%+</div>
                <div className="text-xs text-muted-foreground">W4 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">27%+</div>
                <div className="text-xs text-muted-foreground">W8 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-purple">45 min</div>
                <div className="text-xs text-muted-foreground">Time Spent/Day</div>
              </div>
            </div>

            {/* How We Get There */}
            <div
              className="mb-3"
              style={{
                fontFamily: "var(--font-fair-favorit-mono), ui-monospace, Menlo, monospace",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#000",
              }}
            >How we get there</div>
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-6">
              <p>
                <strong className="text-foreground">Digital Vinyls™ as a chart lever.</strong> Digital Vinyls™ are
                specifically built as music industry assets that can make an artist boom to the top of the charts. We
                made this part of the platform "expensive" by design, because it gives us a massive lever when activating
                with labels. We're very confident the Q3 pilots will land, and Q4 is full rollout with the majors.
              </p>

              <p>
                The economics are compelling. If an artist gets just 1,000 of their biggest fans to buy their album at
                $4.99-6.99 for early access (a very low target for the upper quartile of UMG's catalogue), that's
                1,000 album units on day 0, enough for a top 20 chart position on Billboard and Official Charts. And
                that's before counting the new fans who get onboarded by the activation itself, which feeds back into
                the k-factor loop.
              </p>

              <p>
                <strong className="text-foreground">Artist accounts and direct fan engagement.</strong> We're getting
                increasing inbound from artists who downloaded the app and see they already have a community on Equals.
                They want to engage with their fans directly. So we need to build artist accounts that let them own their
                artist profile, import their community, and speak to their fans on Equals. This is organic pull from the
                supply side, which is a good sign.
              </p>

              <p>
                What we really like about both of these is that they compound with everything from Q3. Artist-led
                growth doesn't mean all our growth comes from artist activations. It's the seed. PLG (the k-factor
                surfaces we built in Q3) then catalyses on top of it. At one activation every 3 days, that's ~30
                artist activations per quarter. If each brings an average of 10K new users (conservative for a major
                label artist promoting to their audience), that's 300K new users from artist-led growth alone. With
                k=0.5 from Q3, those 300K turn into 600K. Layer on existing paid and organic acquisition, and 2M MAU
                becomes very reachable.
              </p>

              <p>
                <strong className="text-foreground">The IMDB of music reviews.</strong> Through the feed we've been
                gathering a large database of album and track reviews. We want to surface these to a website, with
                reviews open to everyone so they appear on search engines. There's no aggregator of track reviews on the
                internet today. We can use this content to score music the way Rotten Tomatoes scores film. The website
                then leads to a CTA to install the app to engage with the community, leave comments, etc. A great organic
                acquisition funnel, and it lays the foundation for a core goal in 2027: cementing the Equals brand into
                music culture.
              </p>
            </div>
          </div>
        </div>

        {/* -- 2027: CULTURE LAYER -- */}
        <div className="relative pl-14 md:pl-18 pb-12">
          <div className="absolute left-3 md:left-5 top-1 w-4 h-4 rounded-full bg-accent-orange border-4 border-background" />
          <div className="bg-card rounded-2xl border border-accent-orange/30 p-5">
            <div className="text-accent-orange text-xs font-medium mb-1">2027 - Culture Layer</div>
            <div
              className="mb-4"
              style={{
                fontFamily: "var(--font-fair-favorit-mono), ui-monospace, Menlo, monospace",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#000",
              }}
            >10M MAUs</div>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">10M</div>
                <div className="text-xs text-muted-foreground">Target MAUs</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">45%+</div>
                <div className="text-xs text-muted-foreground">W4 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">45%+</div>
                <div className="text-xs text-muted-foreground">W8 Retention</div>
              </div>
              <div className="text-center bg-secondary rounded-xl p-3">
                <div className="text-xl font-bold text-accent-orange">50 min</div>
                <div className="text-xs text-muted-foreground">Time Spent/Day</div>
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-6">
              <p>
                By 2027, the combination of k-factor, strong product retention and artist-led growth should give
                us a flywheel that compounds on its own. So 2027 shifts focus: if growth has a strong flywheel,
                long term retention becomes the lever that unblocks 100M MAU. We want to push W8 retention from ~27% to 45%+
                by adding evergreen features that consistently pull the user back into the product. The product needs
                to become the overall home for music for any consumer.
              </p>

              <p>
                We do this in two ways: aggregation (importing external sources into the product) and network-native
                features (things only Equals can build because of our social graph).
              </p>

              <p>
                <strong className="text-foreground">Aggregation.</strong> Artist profiles on Equals already have
                communities, chatrooms, reviews, and discographies. We make them the single destination for
                everything about an artist by pulling in what's missing:
              </p>

              <ul className="space-y-1.5 text-xs text-muted-foreground ml-1">
                <li>- <strong className="text-foreground">Ticketing:</strong> Surface tour dates and tickets
                  directly in artist profiles. User discovers an artist, sees they're playing nearby, buys a ticket
                  without leaving.</li>
                <li>- <strong className="text-foreground">Merchandise:</strong> Aggregate existing artist merch
                  stores into the profile. One place for music, community, tickets, and merch.</li>
              </ul>

              <p>
                <strong className="text-foreground">Network-native features.</strong> The social graph enables
                experiences no other platform can build. Includes:
              </p>

              <ul className="space-y-1.5 text-xs text-muted-foreground ml-1">
                <li>- <strong className="text-foreground">Concert buddy matching:</strong> Match users attending the same gig who share taste or mutual friends</li>
                <li>- <strong className="text-foreground">Music predictions:</strong> Chart predictions, Grammy picks, competitive leaderboards with friends</li>
                <li>- <strong className="text-foreground">Digital Vinyl™ trading:</strong> Users trade vinyls with friends, creating a collectibles economy</li>
                <li>- <strong className="text-foreground">Taste-based group chats:</strong> Auto-generated groups for users with niche overlapping taste</li>
              </ul>

              <p>
                Each of these gives users a new reason to open Equals. That's how W8 gets to 45%. We think for
                Equals to win music social outright we need to be deeply embedded in culture, and the way we do
                that is by owning every part of the vertical.
              </p>
            </div>

          </div>
        </div>

      </div>

    </Section>
  );
}
