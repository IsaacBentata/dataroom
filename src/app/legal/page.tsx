"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { safeHolders, capTableData, capTableTotals } from "@/lib/data";

export default function LegalPage() {
  return (
    <Section>
      <div className="mb-12">
        <PageHeader
          label="Legal & Corporate"
          title="Corporate Structure"
        />
      </div>

      {/* Org Chart */}
      <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-xl px-5 py-3 text-center">
            <div className="font-semibold text-sm">Fair Software Limited</div>
            <div className="text-xs text-foreground-secondary">Holding Company - Investor Entity</div>
            <div className="text-xs text-foreground-secondary">Registered in England and Wales</div>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex flex-col md:flex-row gap-3 md:gap-6">
            <div className="bg-surface-elevated rounded-xl px-5 py-3 text-center border border-border">
              <div className="font-semibold text-sm">Equals Collective Limited</div>
              <div className="text-xs text-foreground-secondary">IP Holder & Operating Entity</div>
              <div className="text-xs text-accent-green mt-1">100% owned</div>
            </div>
            <div className="bg-surface-elevated rounded-xl px-5 py-3 text-center border border-border opacity-50">
              <div className="font-semibold text-sm">Fair.xyz Limited</div>
              <div className="text-xs text-foreground-secondary">Shell - Inactive</div>
              <div className="text-xs text-foreground-secondary mt-1">100% owned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cap Table */}
      <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
        <h3 className="text-base font-semibold mb-1">Cap Table</h3>
        <p className="text-foreground-secondary text-xs mb-4">
          Ownership breakdown of Fair Software Limited (excluding Employee Option Scheme).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-foreground-secondary font-medium">Member</th>
                <th className="text-right py-2 text-foreground-secondary font-medium">Ordinary Shares</th>
                <th className="text-right py-2 text-foreground-secondary font-medium">Seed Preferred</th>
                <th className="text-right py-2 text-foreground-secondary font-medium">% Ownership</th>
              </tr>
            </thead>
            <tbody>
              {capTableData.map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2">{row.member}</td>
                  <td className="py-2 text-right font-mono">{row.ordinaryShares}</td>
                  <td className="py-2 text-right font-mono">{row.seedPreferred}</td>
                  <td className="py-2 text-right font-mono">{row.ownership}</td>
                </tr>
              ))}
              <tr className="font-semibold border-t border-border">
                <td className="py-2">Total</td>
                <td className="py-2 text-right font-mono">{capTableTotals.ordinaryShares}</td>
                <td className="py-2 text-right font-mono">{capTableTotals.seedPreferred}</td>
                <td className="py-2 text-right font-mono">100.0%</td>
              </tr>
              <tr className="text-foreground-secondary">
                <td className="py-2">Employee Option Scheme</td>
                <td className="py-2 text-right font-mono">{capTableTotals.employeeOptionScheme}</td>
                <td className="py-2 text-right font-mono">-</td>
                <td className="py-2 text-right font-mono">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SAFE Holders */}
      <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
        <h3 className="text-base font-semibold mb-1">SAFE Holders</h3>
        <p className="text-foreground-secondary text-xs mb-4">
          All SAFEs are non-converted at a $45M valuation cap. They will convert at the next priced round.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-foreground-secondary font-medium">Investor</th>
                <th className="text-right py-2 text-foreground-secondary font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {safeHolders.map((h, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2">{h.investor}</td>
                  <td className="py-2 text-right font-mono">{h.amount}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2">Total SAFE Investment</td>
                <td className="py-2 text-right font-mono text-accent-green">$3,656,090</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-5 text-center">
        <p className="text-foreground-secondary text-xs">
          Articles of Association available upon request. Companies House documentation included in the data room files.
        </p>
      </div>
    </Section>
  );
}
