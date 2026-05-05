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
          title="A team of 8 doing the work of 30"
          subtitle="Deliberately lean and high-output. No middle management. Founders hands-on across every function. Over 90% of production code written by AI agents, giving our team the output of one three times its size."
        />
      </div>

      <Card className="bg-card mb-10">
        <CardHeader>
          <CardTitle>From Fair.xyz to Equals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The founding team previously built Fair.xyz together, which grew to become the largest NFT minting
            platform in Europe. Fair.xyz processed millions of transactions and served some of the biggest
            brands and creators in the space. The team applied the same technical rigour and speed of execution
            to pivot into Equals - bringing deep experience in building consumer-facing products, managing
            high-throughput systems, and shipping rapidly with a small team.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member, i) => (
          <Card
            key={i}
            className="bg-card hover:border-accent-blue/30 transition-colors"
          >
            <CardContent className="p-5">
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
                    style={{ fontFamily: 'var(--font-fair-favorit-heading), sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}
                  >
                    {member.name}
                  </h4>
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
                  }}
                >
                  {member.bg}
                </p>
              )}
              {member.detail && (
                <p
                  className="text-muted-foreground text-xs"
                  style={{ fontSize: 13, lineHeight: 1.55 }}
                >
                  {member.detail}
                </p>
              )}
              {member.bio && (
                <button
                  onClick={() => setOpenBio(i)}
                  className="text-accent-blue text-xs mt-3 hover:underline cursor-pointer"
                >
                  Read more →
                </button>
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
        className="bg-card max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-1.5">
            <div>
              <h4 className="text-[18px]" style={{ fontFamily: 'var(--font-fair-favorit-book), sans-serif', fontWeight: 400 }}>{member.name}</h4>
              <p className="text-accent-blue text-xs">{member.role}</p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {member.bg && (
            <p className="text-muted-foreground text-xs mb-3">{member.bg}</p>
          )}
          <ul className="space-y-2">
            {member.bio.map((point, j) => (
              <li key={j} className="text-muted-foreground text-xs leading-relaxed flex gap-2">
                <span className="text-accent-blue mt-0.5 shrink-0">-</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
