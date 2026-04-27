"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";

export default function MusicIndustryPage() {
  return (
    <Section>
      <div className="mb-12">
        <PageHeader
          label="Music Industry"
          title="The distribution layer the music industry has been missing"
        />
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-2 h-2 rounded-full bg-accent-green mt-2 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-accent-green mb-1">Universal Music Group - Worldwide Catalogue Deal</h3>
            <p className="text-foreground-secondary text-sm">
              Full worldwide catalogue deal with UMG - the world&apos;s largest music company.
              The only superfan/social music platform to close one this year.
              UMG wants Equals to be a core part of their activation strategy.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 mb-5">
          <div className="w-2 h-2 rounded-full bg-accent-orange mt-2 flex-shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-accent-orange mb-1">Sony Music & Warner Music Group - Term Sheets</h3>
            <p className="text-foreground-secondary text-sm">
              Term sheets from both Sony and Warner on similar terms to UMG.
              Path to having all three majors on platform.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-accent-purple mt-2 flex-shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-accent-purple mb-1">Ninjatune</h3>
            <p className="text-foreground-secondary text-sm">
              Deal in place with one of the most respected independent labels in the world.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl space-y-4 text-foreground-secondary text-sm leading-relaxed mb-10">
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

      <div className="bg-surface rounded-2xl border border-border p-6">
        <h3 className="text-base font-semibold mb-3">Digital Vinyls</h3>
        <p className="text-foreground-secondary text-sm mb-4">
          Branded digital downloads that users collect and pin to their profile. Labels love this for
          a very specific reason: download sales count toward chart positioning.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-surface-elevated rounded-xl p-4">
            <div className="text-accent-green font-semibold text-sm mb-1">For Artists</div>
            <p className="text-foreground-secondary text-xs">Digital Vinyl sales push artists up the charts. Net-new revenue that does not cannibalise streaming.</p>
          </div>
          <div className="bg-surface-elevated rounded-xl p-4">
            <div className="text-accent-blue font-semibold text-sm mb-1">For Labels</div>
            <p className="text-foreground-secondary text-xs">Direct fan engagement channel. Drive fans to Equals for exclusive drops and activations.</p>
          </div>
          <div className="bg-surface-elevated rounded-xl p-4">
            <div className="text-accent-purple font-semibold text-sm mb-1">For Fans</div>
            <p className="text-foreground-secondary text-xs">Collectibles that express music identity. Pin them to your Vinyl Grid on your profile.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
