"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const communityData = [
  { artist: "Drake", equals: "253K", discord: "49K" },
  { artist: "Billie Eilish", equals: "244K", discord: "69K" },
  { artist: "The Weeknd", equals: "241K", discord: "64K" },
  { artist: "Kendrick Lamar", equals: "210K", discord: "16K" },
  { artist: "Tyler the Creator", equals: "171K", discord: "71K" },
  { artist: "Sabrina Carpenter", equals: "160K", discord: "44K" },
  { artist: "Lana Del Rey", equals: "154K", discord: "51K" },
  { artist: "SZA", equals: "153K", discord: "19K" },
  { artist: "Kanye West", equals: "152K", discord: "39K" },
  { artist: "Travis Scott", equals: "147K", discord: "48K" },
  { artist: "Ariana Grande", equals: "142K", discord: "74K" },
  { artist: "Frank Ocean", equals: "137K", discord: "10K" },
  { artist: "Bad Bunny", equals: "124K", discord: "12K" },
  { artist: "Olivia Rodrigo", equals: "122K", discord: "47K" },
  { artist: "Playboi Carti", equals: "121K", discord: "18K" },
];

export default function MusicIndustryPage() {
  return (
    <Section>
      <div className="mb-12">
        <PageHeader
          label="Music Industry"
          title="The missing distribution layer for music"
        />
      </div>

      {/* Label Logos */}
      <div className="flex items-center gap-12 mb-6">
        <img src="/umg.png" alt="Universal Music Group" style={{ height: 60, width: 'auto' }} />
        <img src="/sony-music.png" alt="Sony Music" style={{ height: 70, width: 'auto' }} />
        <img src="/warner-music.png" alt="Warner Music Group" style={{ height: 40, width: 'auto' }} />
        <img src="/ninja.jpg" alt="Ninjatune" style={{ height: 70, width: 'auto' }} />
      </div>

      {/* Deal Status */}
      <Card className="bg-card mb-6">
        <CardContent>
          <div className="flex items-start gap-3 mb-5">
            <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0" />
            <div>
              <div className="font-bold text-accent-green mb-1" style={{ fontSize: 18 }}>Universal Music Group - Worldwide Catalogue Deal</div>
              <p className="text-muted-foreground text-sm">
                Full worldwide catalogue deal with UMG - the world&apos;s largest music company.
                The only superfan/social music platform to close one this year.
                UMG wants Equals to be a core part of their activation strategy.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 mb-5">
            <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0" />
            <div>
              <div className="font-semibold text-accent-orange mb-1" style={{ fontSize: 18 }}>Sony Music & Warner Music Group - Term Sheets</div>
              <p className="text-muted-foreground text-sm">
                Term sheets from both Sony and Warner on similar terms to UMG.
                Path to having all three majors on platform.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0" />
            <div>
              <div className="font-semibold text-accent-purple mb-1" style={{ fontSize: 18 }}>Ninjatune</div>
              <p className="text-muted-foreground text-sm">
                Deal in place with one of the most respected independent labels in the world.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Digital Vinyls™ - New Asset Class */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Digital Vinyl™ - A New Asset Class for Music</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Full-width intro */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            We created a new asset class for music. Digital Vinyl™ (a trademark Equals owns)
            is a rebrand of digital downloads, turned into displayable collectibles that fans pin to their
            profiles. Superfans buy them to push their favourite artists up the charts while
            displaying their fandom.
          </p>

          {/* image | comparison stats */}
          <div className="grid grid-cols-1 md:grid-cols-[259px_1fr] gap-6 md:gap-8 items-center mb-6">
            {/* Hero graphic — sits to the side */}
            <div className="rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/digital-vinyl-hero.png"
                alt="Digital Vinyl™"
                className="w-full block"
              />
            </div>

            <div>
              {/* Chart-impact comparison — two stacked conversion stats */}
              <div className="rounded-xl border border-border p-5">
                <div
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-fair-favorit-mono), ui-monospace, Menlo, monospace",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  Billboard &amp; Official Charts Certified
                </div>
                <div className="space-y-4">
                  <div>
                    <div
                      className="flex items-baseline gap-2 flex-wrap mb-1 text-foreground"
                      style={{
                        fontFamily: "var(--font-fair-favorit-body), sans-serif",
                        fontWeight: 700,
                        fontSize: 20,
                        letterSpacing: 0,
                      }}
                    >
                      <span>1 Digital Vinyl™</span>
                      <span>=</span>
                      <span>1,500 stream units</span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Each Digital Vinyl™ purchase counts as 1,500 streams towards chart positioning.
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div
                      className="flex items-baseline gap-2 flex-wrap mb-1 text-foreground"
                      style={{
                        fontFamily: "var(--font-fair-favorit-body), sans-serif",
                        fontWeight: 700,
                        fontSize: 20,
                        letterSpacing: 0,
                      }}
                    >
                      <span>1K fans</span>
                      <span>=</span>
                      <span>1.5M passive listeners</span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      1,000 passionate fans buying Digital Vinyl™ has the same chart impact as 1.5M passive fans
                      streaming.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                A small, engaged fanbase on Equals can match the chart impact of millions of passive
                listeners. Labels no longer need to rely solely on mass streaming volume. They activate their most
                dedicated fans to move charts directly.
              </p>
            </div>
          </div>

          <div className="bg-secondary rounded-2xl px-5 py-4 mb-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              UMG sees Equals as core to their ARPU strategy. In Q3 2026, Equals deepens the partnership to do
              pre-releases as Digital Vinyl™ - giving fans exclusive early access to new music while driving chart
              performance from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                label: "For Artists",
                body:
                  "Digital Vinyl™ sales push artists up the charts. Net-new revenue that does not cannibalise streaming.",
              },
              {
                label: "For Labels",
                body:
                  "Direct fan engagement channel. Drive fans to Equals for exclusive drops and activations during release weeks.",
              },
              {
                label: "For Fans",
                body:
                  "Collectibles that express music identity. Pin them to your Vinyl Grid on your profile. Take your favourite artists to the top of the charts.",
              },
            ].map((stake) => (
              <div key={stake.label} className="rounded-xl border border-border p-4">
                <div
                  className="flex items-center gap-2 mb-2"
                  style={{
                    fontFamily: "var(--font-fair-favorit-mono), ui-monospace, Menlo, monospace",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                >
                  <span className="inline-block w-[6px] h-[6px] rounded-full bg-black shrink-0" />
                  {stake.label}
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{stake.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* We Own the Community Layer */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>We Own the Community Layer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-5">
            Equals is where the most passionate music fans gather. Verified humans, actively engaging in artist communities. Equals consistently outperforms artists' official Discord channels (the incumbent
            for online artist communities) across the biggest names in music.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 font-semibold text-foreground">Artist</th>
                  <th className="text-right py-3 px-4 font-semibold text-accent-green">Equals Members</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Official Discord Members</th>
                  <th className="text-right py-3 pl-4 font-semibold text-foreground">Multiplier</th>
                </tr>
              </thead>
              <tbody>
                {communityData.map((row) => {
                  const equalsNum = parseFloat(row.equals.replace("K", ""));
                  const discordNum = parseFloat(row.discord.replace("K", ""));
                  const multiplier = (equalsNum / discordNum).toFixed(1);
                  return (
                    <tr key={row.artist} className="border-b border-border/50">
                      <td className="py-3 pr-4 font-medium text-foreground">{row.artist}</td>
                      <td className="text-right py-3 px-4 text-accent-green font-semibold">{row.equals}</td>
                      <td className="text-right py-3 px-4 text-muted-foreground">{row.discord}</td>
                      <td className="text-right py-3 pl-4 font-semibold text-foreground">{multiplier}x</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground text-xs mt-4">
            All Equals communities are verified, active users. No bots, no idle accounts. Labels
            and artists get a high-signal audience they can activate.
          </p>
        </CardContent>
      </Card>

      {/* We Own the Fan Data */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>We Own the Fan Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-2">
            Equals has the deepest fandom data in music. We pre-trained our <span className="font-semibold text-foreground">Universe 1</span> model
            on this proprietary dataset. No other platform has access to these insights.
          </p>

          <div className="bg-secondary rounded-lg p-5 mb-5 mt-4">
            <p className="key-insight-label mb-3">The key insight</p>
            <p className="text-sm text-muted-foreground">
              Every streaming platform knows what fans listen to. Equals knows
              how fans <span className="font-semibold text-foreground">talk</span> about music,
              how they <span className="font-semibold text-foreground">think</span> about artists,
              and how they <span className="font-semibold text-foreground">socialise</span> around music.
              Fundamentally different data. Fundamentally richer.
            </p>
          </div>

          <p className="text-muted-foreground text-sm mb-5">
            This produces audience insights no DSP can offer: sentiment analysis, taste clustering,
            social influence mapping, and trend prediction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                label: "For Users",
                body:
                  "Personalised recommendations and artist discovery powered by social context, not listening history alone.",
              },
              {
                label: "For Labels",
                body:
                  "Hyper-targeting and artist discovery. Understand which fan segments drive the most engagement and revenue.",
              },
              {
                label: "For Artists",
                body:
                  "Full visibility into their fanbase: who their fans are, how they connect, and what drives loyalty.",
              },
            ].map((stake) => (
              <div key={stake.label} className="rounded-xl border border-border p-4">
                <div
                  className="flex items-center gap-2 mb-2"
                  style={{
                    fontFamily: "var(--font-fair-favorit-mono), ui-monospace, Menlo, monospace",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                >
                  <span className="inline-block w-[6px] h-[6px] rounded-full bg-black shrink-0" />
                  {stake.label}
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{stake.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Partnership Conversations */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Why Labels Need Equals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Streaming saved the music industry. It also commoditised it. Spotify and Apple Music now control 80% of label revenue and own the consumer
            relationship entirely. Labels have the catalogue, the artists, and the marketing budget. What
            they don&apos;t have is a direct line to the superfans who pay for it all.
          </p>
          <p className="text-muted-foreground text-sm mb-5">
            Equals fills that gap. We are the social, marketing, and
            commerce layer on top of streaming. Labels understand their fans, speak to them
            directly, drive chart-moving Digital Vinyl™ sales, and unlock incremental revenue. Our
            worldwide UMG agreement is signed and live. Sony and Warner conversations are active.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-green mt-2 flex-shrink-0" />
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Audience intelligence</div>
                <p className="text-muted-foreground text-xs">
                  Streaming tells labels what fans listen to. Equals tells them who those fans are, who they
                  trust, and who they influence. Every Equals user has a verified human identity, a music
                  taste graph, and a social signal. This is a structural data layer no streaming
                  platform or social network can replicate. It powers A&amp;R signing decisions, catalogue
                  strategy, tour routing, and talent scouting.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-blue mt-2 flex-shrink-0" />
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Targeted marketing</div>
                <p className="text-muted-foreground text-xs">
                  That intelligence becomes precision marketing. Labels run campaigns against superfan
                  cohorts segmented by taste, influence within the social graph, and predicted purchase
                  intent. The same targeting layer that powers Meta&apos;s ad business, applied to music for the
                  first time.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-purple mt-2 flex-shrink-0" />
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Direct fan access</div>
                <p className="text-muted-foreground text-xs">
                  Labels have no direct line to their superfans.
                  Equals gives them one. Our chat rooms for major artists are already bigger than the
                  labels&apos; own official community channels. The densest, most active
                  superfan clusters are on Equals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-orange mt-2 flex-shrink-0" />
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Chart performance</div>
                <p className="text-muted-foreground text-xs">
                  Every Digital Vinyl™ sale counts toward Billboard chart positioning. A coordinated Equals
                  drop during release week moves charts in ways that would otherwise require tens of
                  millions of streams. No playlist gatekeepers, no streaming
                  algorithms, no paid streaming farms.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-green mt-2 flex-shrink-0" />
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Net-new revenue</div>
                <p className="text-muted-foreground text-xs">
                  Digital Vinyl™ sales, premium subscriptions, and fan-to-fan commerce on Equals do not
                  cannibalise streaming. Incremental revenue. A new line item that grows with engagement,
                  not a redistribution of the same pie. First uplift to label P&amp;Ls in a decade that
                  does not depend on raising streaming prices.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
