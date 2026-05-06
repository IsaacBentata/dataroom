"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      <Card className="bg-card mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-xl px-5 py-3 text-center">
              <div className="font-semibold text-sm">Fair Software Limited</div>
              <div className="text-xs text-muted-foreground">Holding Company - Investor Entity</div>
              <div className="text-xs text-muted-foreground">Registered in England and Wales</div>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex flex-col md:flex-row gap-3 md:gap-6">
              <div className="bg-muted/60 border border-border rounded-xl px-5 py-3 text-center">
                <div className="font-semibold text-sm">Equals Collective Limited</div>
                <div className="text-xs text-muted-foreground">IP Holder & Operating Entity</div>
                <div className="text-xs text-accent-green mt-1">100% owned</div>
              </div>
              <div className="bg-muted/60 border border-border rounded-xl px-5 py-3 text-center opacity-50">
                <div className="font-semibold text-sm">Fair.xyz Limited</div>
                <div className="text-xs text-muted-foreground">Shell - Inactive</div>
                <div className="text-xs text-muted-foreground mt-1">100% owned</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SAFE Holders */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>SAFE Holders</CardTitle>
          <CardDescription>
            Our last round was a SAFE round in November 2024 at a $45M valuation cap. All SAFEs above are
            non-converted and will convert at the next priced round.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Investor</TableHead>
                <TableHead className="text-right text-muted-foreground">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safeHolders.map((h, i) => (
                <TableRow key={i}>
                  <TableCell className="align-top whitespace-normal">
                    <div className="whitespace-normal">{h.investor}</div>
                    {h.description && (
                      <div className="text-muted-foreground text-xs mt-1 leading-relaxed font-normal whitespace-normal break-words">
                        {h.description}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono align-top whitespace-nowrap">{h.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="font-semibold">
                <TableCell>Total SAFE Investment</TableCell>
                <TableCell className="text-right font-mono text-accent-green">$3,656,090</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      {/* Cap Table */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Cap Table</CardTitle>
          <CardDescription>
            Ownership breakdown of Fair Software Limited (excluding Employee Option Scheme).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Member</TableHead>
                <TableHead className="text-right text-muted-foreground">Ordinary Shares</TableHead>
                <TableHead className="text-right text-muted-foreground">Seed Preferred</TableHead>
                <TableHead className="text-right text-muted-foreground">% Ownership</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {capTableData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.member}</TableCell>
                  <TableCell className="text-right font-mono">{row.ordinaryShares}</TableCell>
                  <TableCell className="text-right font-mono">{row.seedPreferred}</TableCell>
                  <TableCell className="text-right font-mono">{row.ownership}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="font-semibold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right font-mono">{capTableTotals.ordinaryShares}</TableCell>
                <TableCell className="text-right font-mono">{capTableTotals.seedPreferred}</TableCell>
                <TableCell className="text-right font-mono">100.0%</TableCell>
              </TableRow>
              <TableRow className="text-muted-foreground">
                <TableCell>Employee Option Scheme</TableCell>
                <TableCell className="text-right font-mono">{capTableTotals.employeeOptionScheme}</TableCell>
                <TableCell className="text-right font-mono">-</TableCell>
                <TableCell className="text-right font-mono">-</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-card text-center">
        <CardContent className="pt-5">
          <p className="text-muted-foreground text-xs">
            Articles of Association available upon request. Companies House documentation included in the data room files.
          </p>
        </CardContent>
      </Card>
    </Section>
  );
}
