"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamMembers } from "@/lib/data";

export default function TeamPage() {
  const [openBio, setOpenBio] = useState<number | null>(null);

  return (
    <Section>
      <div className="mb-12">
        <PageHeader
          label="Team"
          title="A team of 8 doing the work of 100"
          subtitle="Deliberately lean and high-output. No middle management. Founders hands-on across every function. Our MAU-per-employee outpaces Meta, TikTok, and most consumer giants."
        />
      </div>

      <Card className="bg-card mb-10">
        <CardHeader>
          <CardTitle>From Fair.xyz to Equals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Together we built Fair.xyz, Europe&apos;s largest NFT platform, processing millions of transactions
            and generating $45M in sales volume over 2 years. We also received OpenSea&apos;s first venture
            investment. Worked with Kendall Jenner, J Balvin, Peggy Gou, Kate Moss, Jeff Koons, and the
            Ukrainian Government.
          </p>
          <div className="bg-secondary rounded-2xl px-5 py-4 mt-4">
            <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
              <li>
                -{" "}
                <a
                  href="https://www.forbes.com/sites/abrambrown/2022/03/26/exclusive-inside-the-ukrainian-governments-nft-sale-and-the-3-young-entrepreneurs-who-helped-create-it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4 hover:text-accent-blue transition-colors"
                >
                  Forbes
                </a>
                {" "}- launching the first government-backed NFT.
              </li>
              <li>
                -{" "}
                <a
                  href="https://www.theblock.co/post/162065/opensea-backs-nft-minting-platform-fair-xyz-in-4-5-million-round"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4 hover:text-accent-blue transition-colors"
                >
                  The Block
                </a>
                {" "}- OpenSea&apos;s first-ever venture investment into Fair.xyz.
              </li>
              <li>
                -{" "}
                <a
                  href="https://fortune.com/2022/06/24/web3-startup-fairxyz-hires-impersonator-nft-kingpin-snoop-dogg-nycnft-conference-doop-snogg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4 hover:text-accent-blue transition-colors"
                >
                  Fortune
                </a>
                {" "}- hijacking NFT NYC with the Doop Snogg stunt.
              </li>
            </ul>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mt-4">
            When the NFT market collapsed, we asked ourselves what of our initial hypothesis still held true.
            We realised people had been using NFTs to express their identity through cultural artifacts and
            connect with others - that was the latent job-to-be-done. We iterated through many ideas around
            self-expression through culture, and eventually realised it didn&apos;t need to span every cultural
            vertical - just the largest. Music had a massive white space.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member, i) => (
          <Card
            key={i}
            className="bg-card hover:border-accent-blue/30 transition-colors h-full"
          >
            <CardContent
              className="p-5 grid"
              style={{ gridTemplateRows: "1fr auto", height: "100%", minHeight: "100%" }}
            >
              <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <p
                    className="text-accent-blue text-xs mb-1"
                    style={{
                      fontFamily: 'var(--font-fair-favorit-mono), monospace',
                      fontSize: 10,
                      fontWeight: 400,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {member.role}
                  </p>
                  <h4
                    className="text-[20px] leading-tight"
                    style={{ fontFamily: 'var(--font-fair-favorit-heading), sans-serif', fontWeight: 400, letterSpacing: '-0.02em', color: "#FFFFFF" }}
                  >
                    {member.name}
                  </h4>
                  {"logo" in member && member.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.logo}
                      alt=""
                      draggable={false}
                      className={`team-logo mt-2 object-contain${member.logo.includes("Nike_logo") ? " team-logo--nike" : ""}`}
                      style={{ width: "auto", maxWidth: 80, opacity: 0.9 }}
                    />
                  )}
                </div>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>
              {member.bg && (
                <p
                  className="text-muted-foreground text-xs mb-2"
                  style={{
                    fontFamily: 'var(--font-fair-favorit-mono), monospace',
                    fontSize: 11,
                    lineHeight: 1.5,
                    letterSpacing: 0,
                    textTransform: 'uppercase',
                  }}
                >
                  {member.bg}
                </p>
              )}
              {member.detail && (
                <p
                  className="text-sm"
                  style={{ fontSize: 13, lineHeight: 1.55, color: "#FFFFFF" }}
                >
                  {member.detail}
                </p>
              )}
              {member.bio && (
                <button
                  onClick={() => setOpenBio(i)}
                  className="text-accent-blue text-xs mt-3 hover:underline cursor-pointer self-start text-left block"
                >
                  Read more →
                </button>
              )}
              </div>
              {"song" in member && member.song && (
                <div
                  style={{
                    marginTop: 16,
                    marginBottom: -18,
                    background: "rgba(255,255,255,0.06)",
                    border: "none",
                    borderRadius: 8,
                    padding: "12px",
                  }}
                >
                  <p
                    className="mb-2"
                    style={{
                      fontFamily: "var(--font-fair-favorit-mono), monospace",
                      fontSize: 10,
                      fontWeight: 400,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Favourite Song
                  </p>
                  <div className="flex items-center gap-2 min-w-0">
                    {"cover" in member.song && member.song.cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.song.cover}
                        alt={`${member.song.title} cover`}
                        width={28}
                        height={28}
                        draggable={false}
                        className="shrink-0 rounded-[4px] object-cover"
                        style={{ width: 28, height: 28, border: "0.5px solid rgba(255,255,255,0.1)" }}
                      />
                    )}
                    <div className="flex flex-col min-w-0">
                      <p
                        className="truncate"
                        style={{
                          color: "#FFFFFF",
                          fontFamily: "var(--font-fair-favorit-body), sans-serif",
                          fontWeight: 700,
                          fontSize: 12,
                          lineHeight: 1.2,
                          letterSpacing: "0.24px",
                        }}
                      >
                        {member.song.title}
                      </p>
                      <p
                        className="truncate"
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontFamily: "var(--font-fair-favorit-body), sans-serif",
                          fontWeight: 700,
                          fontSize: 12,
                          lineHeight: 1.2,
                          letterSpacing: "0.24px",
                        }}
                      >
                        {member.song.artist}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {openBio !== null && createPortal(
        <BioModal member={teamMembers[openBio]} onClose={() => setOpenBio(null)} />,
        document.body
      )}
    </Section>
  );
}

function BioModal({ member, onClose }: { member: typeof teamMembers[number]; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <Card
        className="bg-card max-w-xl w-full mx-4 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="px-7 pt-6 pb-7">
          <div className="flex items-start justify-between mb-5">
            <div className="min-w-0">
              <p
                style={{
                  fontFamily: 'var(--font-fair-favorit-mono), monospace',
                  fontSize: 10,
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.5)',
                }}
              >
                {member.role}
              </p>
              <h4
                className="mt-1"
                style={{
                  fontFamily: 'var(--font-fair-favorit-heading), sans-serif',
                  fontWeight: 400,
                  fontSize: 24,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: '#0A0A0A',
                }}
              >
                {member.name}
              </h4>
              {"handle" in member && member.handle && (
                <p
                  className="mt-1"
                  style={{
                    fontFamily: 'var(--font-fair-favorit-mono), monospace',
                    fontSize: 12,
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  {member.handle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0 ml-4"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {member.bg && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {member.bg.split("|").map((tag, j) => (
                <span
                  key={j}
                  style={{
                    fontFamily: 'var(--font-fair-favorit-mono), monospace',
                    fontSize: 10,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.7)',
                    background: 'rgba(0,0,0,0.05)',
                    padding: '4px 8px',
                    borderRadius: 4,
                  }}
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
          <ul className="space-y-3">
            {member.bio.map((point, j) => (
              <li
                key={j}
                className="flex items-start gap-3"
                style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(0,0,0,0.75)' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-fair-favorit-mono), monospace',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#0A0A0A',
                    lineHeight: 1.55,
                    flexShrink: 0,
                  }}
                >
                  =
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
