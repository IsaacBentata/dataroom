"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { teamMembers } from "@/lib/data";

export default function TeamPage() {
  return (
    <Section>
      <div className="mb-12">
        <PageHeader
          label="Team"
          title="A team of 9 doing the work of 30"
          subtitle="Deliberately lean and high-output. No middle management. Founders hands-on across every function. Over 90% of production code written by AI agents, giving this team the output of one three times its size."
        />
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 mb-10">
        <h3 className="text-base font-semibold mb-2">From Fair.xyz to Equals</h3>
        <p className="text-foreground-secondary text-sm leading-relaxed">
          The founding team previously built Fair.xyz together, which grew to become the largest NFT minting
          platform in Europe. Fair.xyz processed millions of transactions and served some of the biggest
          brands and creators in the space. The team applied the same technical rigour and speed of execution
          to pivot into Equals - bringing deep experience in building consumer-facing products, managing
          high-throughput systems, and shipping rapidly with a small team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="bg-surface rounded-xl border border-border p-4 hover:border-accent-blue/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <h4 className="font-semibold text-sm">{member.name}</h4>
                <p className="text-accent-blue text-xs">{member.role}</p>
              </div>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-secondary hover:text-foreground transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
            {member.bg && (
              <p className="text-foreground-secondary text-xs mb-0.5">{member.bg}</p>
            )}
            {member.detail && (
              <p className="text-foreground-secondary text-xs">{member.detail}</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
