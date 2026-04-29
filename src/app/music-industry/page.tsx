"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MusicIndustryPage() {
  return (
    <Section>
      <div className="mb-12">
        <PageHeader
          label="Music Industry"
          title="The distribution layer the music industry has been missing"
        />
      </div>

      <div className="flex items-center gap-12 mb-6">
        <img src="/umg.png" alt="Universal Music Group" style={{ height: 60, width: 'auto' }} />
        <img src="/sony-music.png" alt="Sony Music" style={{ height: 70, width: 'auto' }} />
        <img src="/warner-music.png" alt="Warner Music Group" style={{ height: 40, width: 'auto' }} />
        <img src="/ninja.jpg" alt="Ninjatune" style={{ height: 70, width: 'auto' }} />
      </div>

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

      <div className="max-w-3xl space-y-4 text-muted-foreground text-sm leading-relaxed mb-10">
        <h3 className="text-lg font-semibold text-foreground">Why labels need Equals</h3>
        <p>
          Streaming revenue has plateaued. Labels built their business on distribution, but Spotify
          and Apple Music now account for roughly 80% of their revenue and own the consumer relationship
          entirely. Labels have catalogue but no direct line to the fans who love their artists.
        </p>
        <p>
          Equals fills that gap. We are where labels can engage fans directly, drive commerce through
          Digital Vinyls and exclusives, and access data on how fans discover and connect through music.
        </p>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Digital Vinyls</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Branded digital downloads that users collect and pin to their profile. Labels love this for
            a very specific reason: download sales count toward chart positioning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="bg-secondary border-0">
              <CardContent className="p-4">
                <div className="text-accent-green font-semibold text-sm mb-1">For Artists</div>
                <p className="text-muted-foreground text-xs">Digital Vinyl sales push artists up the charts. Net-new revenue that does not cannibalise streaming.</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-0">
              <CardContent className="p-4">
                <div className="text-accent-blue font-semibold text-sm mb-1">For Labels</div>
                <p className="text-muted-foreground text-xs">Direct fan engagement channel. Drive fans to Equals for exclusive drops and activations.</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-0">
              <CardContent className="p-4">
                <div className="text-accent-purple font-semibold text-sm mb-1">For Fans</div>
                <p className="text-muted-foreground text-xs">Collectibles that express music identity. Pin them to your Vinyl Grid on your profile.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
