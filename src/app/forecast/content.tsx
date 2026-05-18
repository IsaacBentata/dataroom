"use client";

import { Fragment, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Download } from "lucide-react";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

const QUARTERS = [
  "Q2 2026", "Q3 2026", "Q4 2026",
  "Q1 2027", "Q2 2027", "Q3 2027", "Q4 2027",
  "Q1 2028", "Q2 2028", "Q3 2028", "Q4 2028",
  "Q1 2029", "Q2 2029", "Q3 2029", "Q4 2029",
  "Q1 2030", "Q2 2030", "Q3 2030", "Q4 2030",
];
const N = QUARTERS.length;

// ===== Default driver values (sourced from Equals Forecast v3.xlsx) =====
const D_PAID_SPEND  = [270, 320, 380, 450, 550, 600, 650, 1000, 1250, 1500, 1750, 2500, 3500, 5000, 6500, 12000, 15000, 20000, 25000];
const D_PAID_CPI    = [1.40, 1.40, 1.30, 1.20, 1.10, 1.10, 1.15, 1.20, 1.25, 1.30, 1.40, 1.50, 1.60, 1.70, 1.85, 2.10, 2.40, 2.70, 3.50];
const D_BASELINE    = [0.50, 0.55, 0.60, 0.65, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75];
const D_KFACTOR     = [0.10, 0.30, 0.50, 0.45, 0.40, 0.40, 0.40, 0.35, 0.30, 0.25, 0.20, 0.15, 0.10, 0.10, 0.05, 0.05, 0.01, 0.01, 0.01];
const D_MONTHLY_RET = [0.45, 0.50, 0.54, 0.57, 0.60, 0.63, 0.65, 0.68, 0.61, 0.64, 0.60, 0.62, 0.64, 0.65, 0.65, 0.66, 0.67, 0.67, 0.68];
const D_RESURRECT   = [0.40, 0.40, 0.40, 0.40, 0.40, 0.35, 0.35, 0.35, 0.30, 0.25, 0.25, 0.25, 0.20, 0.20, 0.20, 0.15, 0.15, 0.15, 0.15];
const D_INITIAL_MAU = 532; // K
const D_SUB_SHARE   = [0.005, 0.005, 0.005, 0.006, 0.007, 0.008, 0.009, 0.010, 0.015, 0.020, 0.024, 0.028, 0.031, 0.034, 0.037, 0.040, 0.043, 0.046, 0.050];
const D_ARPU_ADS    = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 3.00, 6.00, 8.00, 10.00, 10.50, 11.00, 11.30, 11.60, 12.00];
const D_ARPU_SUBS   = [0.72, 0.72, 0.72, 0.864, 1.008, 1.152, 1.296, 1.44, 2.16, 2.88, 3.456, 4.20, 4.65, 5.40, 5.88, 7.10, 8.10, 8.67, 9.30];
const D_ARPU_COMM   = [0.05, 0.10, 0.15, 0.20, 0.25, 0.28, 0.31, 0.34, 0.36, 0.38, 0.39, 0.40, 0.40, 0.41, 0.41, 0.42, 0.42, 0.42, 0.42];
const D_ARPU_LABEL  = [0, 0, 0, 0, 0.05, 0.05, 0.10, 0.10, 0.15, 0.15, 0.20, 0.20, 0.25, 0.25, 0.30, 0.30, 0.30, 0.35, 0.40];
const D_ARPU_LIVE   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.05, 0.09, 0.12, 0.14, 0.16, 0.17, 0.18, 0.19, 0.19, 0.20];
const D_ARPU_TICK   = [0, 0, 0, 0, 0, 0.01, 0.02, 0.02, 0.03, 0.03, 0.04, 0.04, 0.04, 0.05, 0.05, 0.05, 0.06, 0.06, 0.06];

// ===== Format spec =====

type FormatId =
  | "K"        // thousands of units (K/M)
  | "Kmo"      // K/month
  | "pct"      // 0-1 fraction → "45.0%"
  | "ratio"    // raw number
  | "usd2"     // $1.40
  | "arpu"     // $0.05
  | "moneyKmo" // $K monthly spend
  | "moneyKq"  // $K quarterly bucket
  | "moneyKyr";// $K annual

function fmt(v: number, format: FormatId): string {
  if (v == null || Number.isNaN(v)) return "—";
  switch (format) {
    case "K":
      if (Math.abs(v) >= 1000) return `${(v / 1000).toFixed(1)}M`;
      return `${v.toFixed(v < 10 ? 1 : 0)}K`;
    case "Kmo":
      if (Math.abs(v) >= 1000) return `${(v / 1000).toFixed(1)}M`;
      return `${v.toFixed(0)}K`;
    case "pct":   return `${(v * 100).toFixed(1)}%`;
    case "ratio": return v.toFixed(2);
    case "usd2":  return `$${v.toFixed(2)}`;
    case "arpu":  return `$${v.toFixed(2)}`;
    case "moneyKmo":
      if (Math.abs(v) >= 1000) return `$${(v / 1000).toFixed(1)}M`;
      return `$${v.toFixed(0)}K`;
    case "moneyKq":
      if (Math.abs(v) >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}B`;
      if (Math.abs(v) >= 1_000) return `$${(v / 1_000).toFixed(1)}M`;
      return `$${v.toFixed(1)}K`;
    case "moneyKyr":
      if (Math.abs(v) >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}B`;
      if (Math.abs(v) >= 1_000) return `$${(v / 1_000).toFixed(0)}M`;
      return `$${v.toFixed(0)}K`;
  }
}

// Parse user input, format-aware. Accepts e.g. "45", "45%", "0.45" (pct),
// "$270K", "270", "$1.4M" (money), "1.40", "$1.40" (usd).
function parseInput(raw: string, format: FormatId): number {
  let s = raw.trim();
  if (!s) return NaN;
  let mult = 1;
  // Suffix multipliers
  const last = s.slice(-1).toUpperCase();
  if (last === "B") { mult = 1_000_000; s = s.slice(0, -1); }
  else if (last === "M") { mult = 1_000; s = s.slice(0, -1); }
  else if (last === "K") { mult = 1; s = s.slice(0, -1); }
  s = s.replace(/[$,%\s]/g, "");
  const n = parseFloat(s);
  if (Number.isNaN(n)) return NaN;
  let val = n * mult;
  if (format === "pct") {
    // If user typed something > 1, assume it's a percentage value.
    if (val > 1) val = val / 100;
  }
  return val;
}

// ===== Driver registry =====

type DriverKey =
  | "paidSpend" | "paidCPI" | "baseline" | "kFactor"
  | "monthlyRet" | "resurrect"
  | "subShare" | "arpuAds" | "arpuSubs" | "arpuComm" | "arpuLabel" | "arpuLive" | "arpuTick";

type DriversState = Record<DriverKey, number[]> & { initialMAU: number };

const DEFAULT_DRIVERS: DriversState = {
  paidSpend:  [...D_PAID_SPEND],
  paidCPI:    [...D_PAID_CPI],
  baseline:   [...D_BASELINE],
  kFactor:    [...D_KFACTOR],
  monthlyRet: [...D_MONTHLY_RET],
  resurrect:  [...D_RESURRECT],
  initialMAU: D_INITIAL_MAU,
  subShare:   [...D_SUB_SHARE],
  arpuAds:    [...D_ARPU_ADS],
  arpuSubs:   [...D_ARPU_SUBS],
  arpuComm:   [...D_ARPU_COMM],
  arpuLabel:  [...D_ARPU_LABEL],
  arpuLive:   [...D_ARPU_LIVE],
  arpuTick:   [...D_ARPU_TICK],
};

// ===== Formula engine =====

type Computed = {
  paidInstalls: number[];   // K/qtr
  organicShare: number[];   // 0-1
  totalInstalls: number[];  // K/qtr
  organicInstalls: number[];
  monthlyRunRate: number[]; // K/mo
  blendedECPI: number[];    // $
  qRet: number[];           // 0-1
  instToMau: number[];      // 0-1
  mauStart: number[];       // K
  mauRetained: number[];
  mauAdded: number[];
  mauEnd: number[];
  mauAvg: number[];
  netMauAdds: number[];
  qqGrowth: number[];
  arpuTotal: number[];      // $/yr
  payingSubs: number[];     // K
  revAds: number[];         // $K/qtr
  revSubs: number[];
  revComm: number[];
  revLabel: number[];
  revLive: number[];
  revTick: number[];
  revTotal: number[];
  monthlyRev: number[];     // $K (at quarter end)
  arr: number[];            // $K (annualised revenue)
  // Revenue mix (% of total) — section 4b in the sheet
  mixAds: number[];
  mixSubs: number[];
  mixComm: number[];
  mixLabel: number[];
  mixLive: number[];
  mixTick: number[];
  // Unit Economics — section 5 in the sheet
  paidSpendQ: number[];     // $K per quarter
  revPerMauMo: number[];    // $ per MAU per month
  ltv: number[];            // $ per MAU
  cac: number[];            // $ (blended CAC)
  ltvCac: number[];         // ratio (x)
};

function compute(d: DriversState): Computed {
  const paidInstalls = d.paidSpend.map((s, i) => (s * 3) / d.paidCPI[i]);
  const organicShare = d.baseline.map((b, i) => (b + d.kFactor[i]) / (1 + d.kFactor[i]));
  const totalInstalls = paidInstalls.map((p, i) => p / (1 - organicShare[i]));
  const organicInstalls = totalInstalls.map((t, i) => t - paidInstalls[i]);
  const monthlyRunRate = totalInstalls.map((t) => t / 3);
  const blendedECPI = d.paidSpend.map((s, i) => (s * 3) / totalInstalls[i]);

  const qRet = d.monthlyRet.map((m, i) => {
    const m3 = m * m * m;
    return m3 + (1 - m3) * d.resurrect[i];
  });
  const instToMau = d.monthlyRet.map((m) => (1 + m + m * m) / 3);

  const mauStart: number[] = new Array(N);
  const mauRetained: number[] = new Array(N);
  const mauAdded: number[] = new Array(N);
  const mauEnd: number[] = new Array(N);
  const mauAvg: number[] = new Array(N);
  const netMauAdds: number[] = new Array(N);
  const qqGrowth: number[] = new Array(N);
  for (let i = 0; i < N; i++) {
    mauStart[i] = i === 0 ? d.initialMAU : mauEnd[i - 1];
    mauRetained[i] = mauStart[i] * qRet[i];
    mauAdded[i] = totalInstalls[i] * instToMau[i];
    mauEnd[i] = mauRetained[i] + mauAdded[i];
    mauAvg[i] = (mauStart[i] + mauEnd[i]) / 2;
    netMauAdds[i] = mauEnd[i] - mauStart[i];
    qqGrowth[i] = mauStart[i] === 0 ? 0 : (mauEnd[i] - mauStart[i]) / mauStart[i];
  }

  const arpuTotal = d.arpuAds.map(
    (a, i) => a + d.arpuSubs[i] + d.arpuComm[i] + d.arpuLabel[i] + d.arpuLive[i] + d.arpuTick[i],
  );
  const payingSubs = mauAvg.map((m, i) => m * d.subShare[i]);

  const revAds   = mauAvg.map((m, i) => (m * d.arpuAds[i]) / 4);
  const revSubs  = mauAvg.map((m, i) => (m * d.arpuSubs[i]) / 4);
  const revComm  = mauAvg.map((m, i) => (m * d.arpuComm[i]) / 4);
  const revLabel = mauAvg.map((m, i) => (m * d.arpuLabel[i]) / 4);
  const revLive  = mauAvg.map((m, i) => (m * d.arpuLive[i]) / 4);
  const revTick  = mauAvg.map((m, i) => (m * d.arpuTick[i]) / 4);
  const revTotal = revAds.map((a, i) => a + revSubs[i] + revComm[i] + revLabel[i] + revLive[i] + revTick[i]);
  const monthlyRev = revTotal.map((r) => r / 3);
  const arr = mauEnd.map((m, i) => m * arpuTotal[i]);

  // Revenue mix (% of total)
  const safeDiv = (n: number, dv: number) => (dv > 0 ? n / dv : 0);
  const mixAds   = revAds.map((v, i) => safeDiv(v, revTotal[i]));
  const mixSubs  = revSubs.map((v, i) => safeDiv(v, revTotal[i]));
  const mixComm  = revComm.map((v, i) => safeDiv(v, revTotal[i]));
  const mixLabel = revLabel.map((v, i) => safeDiv(v, revTotal[i]));
  const mixLive  = revLive.map((v, i) => safeDiv(v, revTotal[i]));
  const mixTick  = revTick.map((v, i) => safeDiv(v, revTotal[i]));

  // Unit economics (section 5)
  const paidSpendQ = d.paidSpend.map((s) => s * 3);                    // $K per quarter
  const revPerMauMo = arpuTotal.map((a) => a / 12);                    // $ per MAU per month
  const ltv = d.monthlyRet.map((m, i) => {                              // $ per MAU
    const churn = 1 - m;
    if (churn <= 0) return Infinity;
    return revPerMauMo[i] / churn;
  });
  const cac = blendedECPI.slice();                                      // $ — blended CAC == blended eCPI
  const ltvCac = ltv.map((l, i) => (cac[i] > 0 ? l / cac[i] : 0));

  return {
    paidInstalls, organicShare, totalInstalls, organicInstalls, monthlyRunRate, blendedECPI,
    qRet, instToMau, mauStart, mauRetained, mauAdded, mauEnd, mauAvg, netMauAdds, qqGrowth,
    arpuTotal, payingSubs,
    revAds, revSubs, revComm, revLabel, revLive, revTick, revTotal, monthlyRev, arr,
    mixAds, mixSubs, mixComm, mixLabel, mixLive, mixTick,
    paidSpendQ, revPerMauMo, ltv, cac, ltvCac,
  };
}

// ===== Assumption tooltips =====

type RefNote = { title: string; body: string };
const REF_NOTES: Record<DriverKey | "initialMAU", RefNote> = {
  initialMAU: { title: "MAU baseline (Q1 2026 end)",   body: "532K MAU measured April 2026 per the Equals growth report. Starting point for the Q2 2026 MAU build." },
  paidSpend:  { title: "Paid spend (monthly)",         body: "$270K/mo today, back-solved from $1.40 paid CPI and 188K paid installs/mo (385K total at 49% paid mix). Scales to $25M/mo by Q4 2030 ($300M annualised), comparable to Bumble at scale. Step-changes reflect Series B (Q1 2028) and Series C/D (Q1 2030)." },
  paidCPI:    { title: "Paid CPI (paid channels only)",body: "$1.40 today (vs $1.43 in Dec 2025). Declines to $1.10 floor in Q2-Q3 2027 driven by Android rollout and internationalisation beyond English. From Q4 2027 CPI climbs as paid spend scales into less efficient supply, reaching $3.50 by Q4 2030." },
  baseline:   { title: "Baseline organic share",       body: "Share of installs that would be organic absent any K-factor invite mechanics. 50% today, growing to 75% by 2030 as Equals reaches mainstream music-consumer awareness." },
  kFactor:    { title: "K-factor",                      body: "Viral coefficient. Peaks at 0.50 in Q4 2026 when the Artist Layer launches and the social graph densifies. Declines to 0.01 by Q4 2030 as local networks saturate." },
  monthlyRet: { title: "Monthly MAU retention",         body: "45% today (verified-user retention materially higher). Rises through 2027 as retention milestones land. Two intentional dips: Q2 2028 (sub paywall upweighted) and Q4 2028 (ads introduced). Recovers to 68% by Q4 2030." },
  resurrect:  { title: "Resurrected users",             body: "Fraction of lapsed users returning within the same quarter. 40% today, declining to 15% by 2030 as the product becomes daily-habit." },
  subShare:   { title: "Subscribed userbase (% of MAU)",body: "0.5% today. Stays low through 2026 (growth-first). Ramps via Digital Vinyl gates in 2027, paywall stack matures 2028-2030. Reaches 5.0% by Q4 2030, a modest improvement on the 4.5% proven during the Nov 2025 deployment." },
  arpuAds:    { title: "ARPU - Ads",                    body: "Effectively zero through 2028. Steps to $3.00 in Q4 2028 when advertising is introduced. Ramps to $12.00 by Q4 2030. Snapchat ~$11, TikTok $8-10, Instagram $20+." },
  arpuSubs:   { title: "ARPU - Subscriptions",          body: "$0.72/MAU/yr today. Builds to $9.30/MAU/yr by Q4 2030, the proven annualised ARPU from Nov 2025 deployment. Implies $186/yr per paying user at 5% conversion." },
  arpuComm:   { title: "ARPU - Commerce",               body: "Digital Vinyl and merch. Inflects from Q4 2026 with artist activations. $0.42/MAU/yr by Q4 2030. Buyer rate 2% today to 4% at scale." },
  arpuLabel:  { title: "ARPU - Label Services",         body: "Kicks off Q2 2027 with UMG (signed) plus Sony/Warner term sheets. Captures <1% of major-label $5B annual marketing spend by Q4 2030." },
  arpuLive:   { title: "ARPU - Live Experiences",       body: "Kicks off Q3 2028. Delayed launch reflects need for sufficient artist density on platform." },
  arpuTick:   { title: "ARPU - Ticketing",              body: "Affiliate/referral model via venue ticketing platforms. Smallest stream at $0.06/MAU/yr by Q4 2030." },
};

// ===== Row spec =====

type Row =
  | { kind: "driver"; key: DriverKey; label: string; format: FormatId; indent?: boolean }
  | { kind: "scalar-driver"; key: "initialMAU"; label: string; format: FormatId }
  | { kind: "formula"; label: string; pick: (c: Computed) => number[]; format: FormatId; indent?: boolean };

type SectionSpec = { title: string; rows: Row[] };

const SECTIONS: SectionSpec[] = [
  {
    title: "Acquisition",
    rows: [
      { kind: "driver",  key: "paidSpend", label: "Paid spend (monthly)",          format: "moneyKmo" },
      { kind: "driver",  key: "paidCPI",   label: "Paid CPI (paid channels only)", format: "usd2", indent: true },
      { kind: "formula", label: "Paid installs",                                    pick: (c) => c.paidInstalls,     format: "K", indent: true },
      { kind: "driver",  key: "baseline",  label: "Baseline organic share",         format: "pct" },
      { kind: "driver",  key: "kFactor",   label: "K-factor",                       format: "ratio" },
      { kind: "formula", label: "Organic share of installs",                        pick: (c) => c.organicShare,    format: "pct", indent: true },
      { kind: "formula", label: "Total installs",                                   pick: (c) => c.totalInstalls,   format: "K" },
      { kind: "formula", label: "Organic installs",                                 pick: (c) => c.organicInstalls, format: "K", indent: true },
      { kind: "formula", label: "Monthly install run-rate",                         pick: (c) => c.monthlyRunRate,  format: "Kmo", indent: true },
      { kind: "formula", label: "Blended eCPI",                                     pick: (c) => c.blendedECPI,     format: "usd2" },
    ],
  },
  {
    title: "Users & Retention",
    rows: [
      { kind: "driver",  key: "monthlyRet", label: "Monthly MAU retention",         format: "pct" },
      { kind: "driver",  key: "resurrect",  label: "Resurrected users",             format: "pct" },
      { kind: "formula", label: "Quarterly retention",                              pick: (c) => c.qRet,      format: "pct", indent: true },
      { kind: "formula", label: "EOQ install-to-MAU conversion",                    pick: (c) => c.instToMau, format: "pct" },
      { kind: "scalar-driver", key: "initialMAU", label: "MAU - start of quarter", format: "K" },
      { kind: "formula", label: "MAU retained",                                     pick: (c) => c.mauRetained, format: "K", indent: true },
      { kind: "formula", label: "MAU added",                                        pick: (c) => c.mauAdded,    format: "K", indent: true },
      { kind: "formula", label: "MAU - end of quarter",                             pick: (c) => c.mauEnd,      format: "K" },
      { kind: "formula", label: "MAU - average",                                    pick: (c) => c.mauAvg,      format: "K", indent: true },
      { kind: "formula", label: "Net MAU adds",                                     pick: (c) => c.netMauAdds,  format: "K", indent: true },
      { kind: "formula", label: "Q/Q growth rate",                                  pick: (c) => c.qqGrowth,    format: "pct", indent: true },
    ],
  },
  {
    title: "Monetization",
    rows: [
      { kind: "driver",  key: "subShare",   label: "Subscribed userbase (% of MAU)", format: "pct" },
      { kind: "formula", label: "Paying subscribers",                                pick: (c) => c.payingSubs, format: "K", indent: true },
      { kind: "driver",  key: "arpuAds",    label: "ARPU - Ads",                     format: "arpu" },
      { kind: "driver",  key: "arpuSubs",   label: "ARPU - Subscriptions",           format: "arpu" },
      { kind: "driver",  key: "arpuComm",   label: "ARPU - Commerce",                format: "arpu" },
      { kind: "driver",  key: "arpuLabel",  label: "ARPU - Label Services",          format: "arpu" },
      { kind: "driver",  key: "arpuLive",   label: "ARPU - Live Experiences",        format: "arpu" },
      { kind: "driver",  key: "arpuTick",   label: "ARPU - Ticketing",               format: "arpu" },
      { kind: "formula", label: "ARPU - Total blended",                              pick: (c) => c.arpuTotal,  format: "arpu" },
    ],
  },
  {
    title: "Revenue",
    rows: [
      { kind: "formula", label: "Revenue - Ads",                  pick: (c) => c.revAds,     format: "moneyKq", indent: true },
      { kind: "formula", label: "Revenue - Subscriptions",        pick: (c) => c.revSubs,    format: "moneyKq", indent: true },
      { kind: "formula", label: "Revenue - Commerce",             pick: (c) => c.revComm,    format: "moneyKq", indent: true },
      { kind: "formula", label: "Revenue - Label Services",       pick: (c) => c.revLabel,   format: "moneyKq", indent: true },
      { kind: "formula", label: "Revenue - Live Experiences",     pick: (c) => c.revLive,    format: "moneyKq", indent: true },
      { kind: "formula", label: "Revenue - Ticketing",            pick: (c) => c.revTick,    format: "moneyKq", indent: true },
      { kind: "formula", label: "Total revenue (quarterly)",      pick: (c) => c.revTotal,   format: "moneyKq" },
      { kind: "formula", label: "Monthly revenue (run-rate)",     pick: (c) => c.monthlyRev, format: "moneyKq", indent: true },
      { kind: "formula", label: "Annualised Revenue",             pick: (c) => c.arr,        format: "moneyKyr" },
    ],
  },
  {
    title: "Revenue mix (% of total)",
    rows: [
      { kind: "formula", label: "Ads mix",              pick: (c) => c.mixAds,   format: "pct", indent: true },
      { kind: "formula", label: "Subscriptions mix",    pick: (c) => c.mixSubs,  format: "pct", indent: true },
      { kind: "formula", label: "Commerce mix",         pick: (c) => c.mixComm,  format: "pct", indent: true },
      { kind: "formula", label: "Label Services mix",   pick: (c) => c.mixLabel, format: "pct", indent: true },
      { kind: "formula", label: "Live Experiences mix", pick: (c) => c.mixLive,  format: "pct", indent: true },
      { kind: "formula", label: "Ticketing mix",        pick: (c) => c.mixTick,  format: "pct", indent: true },
    ],
  },
  {
    title: "Unit Economics",
    rows: [
      { kind: "formula", label: "Paid spend (quarterly)",   pick: (c) => c.paidSpendQ,  format: "moneyKq", indent: true },
      { kind: "formula", label: "Blended CAC",              pick: (c) => c.cac,         format: "usd2", indent: true },
      { kind: "formula", label: "Revenue per MAU (monthly)",pick: (c) => c.revPerMauMo, format: "usd2", indent: true },
      { kind: "formula", label: "LTV proxy ($ per MAU)",    pick: (c) => c.ltv,         format: "usd2" },
      { kind: "formula", label: "LTV / CAC ratio",          pick: (c) => c.ltvCac,      format: "ratio" },
    ],
  },
];

// ===== Quarter narratives (sourced from Equals Forecast v3.xlsx, row 70) =====

const QUARTER_COPY: { headline: string; body: string }[] = [
  { headline: "Baseline quarter", body: "532K starting MAU. Paid spend of $270K/mo back-solved from $1.40 paid CPI (data room growth report). 50% organic share of installs (split 51/30/15/3 across organic, TikTok, Meta, Apple Search Ads). Monthly MAU retention 45% (blended across verified and pre-verification users). Revenue $35K/mo, driven almost entirely by subscriptions at 0.5% paywall conversion. Ends Q2 at ~940K MAU." },
  { headline: "Fan Layer ships", body: "Fan Layer ships per the product roadmap. K-factor climbs from 0.10 to 0.30 as in-product invite mechanics improve. W4 retention improves from 27% to 32%. Paid CPI structurally compressed at $1.40 because the acquisition footprint is iOS-only and restricted to English-speaking devices. Ends at 1.6M MAU." },
  { headline: "Artist Layer goes live", body: "Artist Layer goes live. Approximately 30 artist activations per quarter (~10K users per activation per roadmap) drive a step-change in organic acquisition. Digital Vinyls launch at $4.99-6.99 per unit. Commerce ARPU begins inflecting upward from this point as artist fan bases come on-platform with intent to purchase Digital Vinyls and artist merchandise. K-factor peaks at 0.50, the high-water mark for viral mechanics. Ends at 2.8M MAU." },
  { headline: "First full quarter of artist-led growth", body: "First full quarter of artist-led growth. Chat messages running at 28.4M/mo (13x in 6 months per the retention report). Paid CPI continues declining as creative library matures and early Android + international supply opens. K-factor begins to decline from its peak as the initial viral wave normalises." },
  { headline: "Label Services kickstart", body: "Label Services revenue line kickstarts at $0.05/MAU/yr, the first revenue from the UMG partnership (signed) and the Sony / Warner term-sheet partners. Paid CPI bottoms at $1.10, reflecting both creative maturity and the early benefits of Android rollout and international expansion opening cheaper incremental supply pools." },
  { headline: "Ticketing kickstarts", body: "Ticketing revenue line kickstarts at $0.01/MAU/yr via venue affiliate partnerships. Paid CPI remains near the floor at $1.10 as Android and international supply expansion continues to absorb incremental spend efficiently." },
  { headline: "Culture Layer rollout completes", body: "Culture Layer rollout completes per the product roadmap (W4 and W8 retention both hitting the 45% targets). MAU ends Q4 at 10.1M, matching the roadmap anchor. Paid CPI begins climbing from $1.10 to $1.15 as the cheap-supply gains from Android + internationalisation start to exhaust." },
  { headline: "Series B raise", body: "Series B raise. Paid spend steps up from $650K/mo to $1.0M/mo as the acquisition budget is materially upweighted with new capital. Monthly retention crosses 68%, the highest of the forecast before the deliberate monetisation drag in subsequent quarters." },
  { headline: "Subscription upweight", body: "Subscription monetisation is materially upweighted. The paywall stack hardens, additional features move behind paid tiers, and paywall conversion climbs from 1.0% to 1.5%. Monthly retention dips 7 percentage points (68% -> 61%) reflecting the friction introduced by the monetisation push. Subscription ARPU jumps from $1.44 to $2.16/MAU/yr." },
  { headline: "Live Experiences kickstart", body: "Live Experiences revenue line kickstarts at $0.05/MAU/yr; the delayed launch reflects the need for sufficient artist density on platform to support live listening parties and concert co-watching formats. Retention recovers partially as subscription friction normalises (61% -> 64%)." },
  { headline: "Advertising introduced", body: "Advertising is introduced into the product as a deliberate monetisation layer. Ads ARPU steps from $0.05 to $3.00/MAU/yr, with eCPMs of $51 rewarded and $27 interstitial per the monetisation data. Monthly retention dips again 4 percentage points (64% -> 60%) as ad load impacts perceived experience. Revenue mix flips: ads jumps from <2% to 42% of total revenue." },
  { headline: "International expansion", body: "International expansion picks up the growth slack as English-speaking markets begin to saturate. Paid CPI now $1.50 as scale outpaces cheap-supply expansion. Ads ARPU doubles to $6.00/MAU/yr as inventory and demand mature. Baseline organic share steps up from 70% to 75% reflecting brand maturity at scale." },
  { headline: "Six-stream monetisation stack matures", body: "Mature six-stream monetisation stack: Ads $8 / Subs $4.65 / Commerce $0.40 / Label Services $0.25 / Live $0.14 / Ticketing $0.04, summing to $13.48/MAU/yr blended. 29M MAU." },
  { headline: "K-factor saturates", body: "K-factor declines to 0.10 as social graph density saturates. The structural reason: each user has a finite local network and most of it is now on-platform, so each new install generates fewer net-new viral invites. Brand-led organic acquisition compensates for the K-factor decay." },
  { headline: "Annualised Revenue crosses $800M", body: "Annualised Revenue reaches $812M at 47M MAU. Paid CPI now $1.85, cheap supply largely exhausted across iOS, Android, and international markets. LTV/CAC peaks at ~10x earlier in the year and begins declining as paid scales into less efficient supply." },
  { headline: "Series C/D raise", body: "Series C/D raise. Paid spend nearly doubles from $6.5M/mo to $12.0M/mo as growth capital is deployed aggressively into the saturation phase. Paid CPI climbs to $2.10 as the marginal install becomes more expensive at this scale." },
  { headline: "Paid spend at $15M/mo", body: "Paid spend reaches $15M/mo. 81M MAU. Subscription paywall conversion 4.3%. Ads ARPU at $11/MAU/yr, approaching the 2030 target of $12." },
  { headline: "96M MAU", body: "96M MAU. Blended ARPU $21.29/MAU/yr. Annualised Revenue $2.05B. Final saturation push underway with paid spend at $20M/mo and CPI at $2.70." },
  { headline: "Target reached", body: "Target reached. 102M MAU. 5.0% paywall conversion. Blended ARPU $22.38/MAU/yr matches the data room target exactly. Annualised Revenue $2.28B against the $2.2B data room target. Paid spend at $25M/mo (~$300M annualised), in line with mature consumer social comparables (Bumble ~$200M/yr)." },
];

// ===== Palette (sheet convention: cream = drivers, blue = formulas) =====
const CREAM_BG = "#FEF3C7";          // amber-100 — warm, soft driver-cell bg
const CREAM_BG_HOVER = "#FDE68A";    // amber-200 — interactive on hover/focus
const BLUE_FG  = "#1E40AF";          // blue-800 — deep, professional formula text

const LABEL_COL_PX = 280;
const LEFT_BUFFER = 24;   // breathing-room between left menu and the sticky labels
const RIGHT_BUFFER = 48;  // buffer when scrolled to the end

// ===== Editable cell =====

function DriverCell({
  value,
  onChange,
  format,
}: {
  value: number;
  onChange: (v: number) => void;
  format: FormatId;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  return (
    <input
      type="text"
      inputMode="decimal"
      value={editing ? draft : fmt(value, format)}
      onFocus={(e) => {
        setEditing(true);
        // Show the underlying number — easier to edit than the formatted string.
        const raw =
          format === "pct" ? String(+(value * 100).toFixed(4))
          : String(value);
        setDraft(raw);
        // Defer selectAll so the focus event finishes first.
        requestAnimationFrame(() => e.target?.select?.());
      }}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        const n = parseInput(draft, format);
        if (!Number.isNaN(n)) onChange(n);
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        if (e.key === "Escape") { setDraft(""); setEditing(false); (e.target as HTMLInputElement).blur(); }
      }}
      className="w-full bg-transparent outline-none text-right tabular-nums focus:bg-white/40 focus:ring-1 focus:ring-foreground/30 rounded-sm"
      style={{ fontFamily: "inherit", color: "var(--foreground)" }}
    />
  );
}

// ===== Page =====

export default function ForecastPage() {
  const [drivers, setDrivers] = useState<DriversState>(DEFAULT_DRIVERS);
  const computed = useMemo(() => compute(drivers), [drivers]);

  // Portal target — body is only defined on the client; computed per render.
  const portalNode = typeof document !== "undefined" ? document.body : null;

  const updateArray = (key: DriverKey, idx: number, v: number) =>
    setDrivers((prev) => ({ ...prev, [key]: prev[key].map((x, i) => (i === idx ? v : x)) }));
  const updateScalar = (v: number) =>
    setDrivers((prev) => ({ ...prev, initialMAU: v }));

  // Tooltip — `key` is bumped each time we set, forcing a remount so the CSS
  // mount-animation re-fires from the initial state.
  const [tooltip, setTooltip] = useState<{ x: number; y: number; title: string; body: string; key: number } | null>(null);

  const handleLabelHover = (e: React.MouseEvent, refKey: DriverKey | "initialMAU") => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const note = REF_NOTES[refKey];
    if (!note) return;
    // Anchor below the label, clamped within viewport.
    const x = Math.min(rect.right + 12, window.innerWidth - 380);
    const y = Math.min(rect.bottom + 6, window.innerHeight - 200);
    setTooltip((prev) => ({ x, y, title: note.title, body: note.body, key: (prev?.key ?? 0) + 1 }));
  };

  // Quarter narrative on Q header hover. Copy sourced from the Equals Forecast v3
  // sheet (row 70 "QUARTERLY DRIVERS"), one per quarter.
  const handleQuarterHover = (e: React.MouseEvent, i: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const copy = QUARTER_COPY[i];
    if (!copy) return;
    const x = Math.min(rect.right + 12, window.innerWidth - 420);
    const y = Math.min(rect.bottom + 6, window.innerHeight - 280);
    setTooltip((prev) => ({ x, y, title: `${QUARTERS[i]} - ${copy.headline}`, body: copy.body, key: (prev?.key ?? 0) + 1 }));
  };

  return (
    <>
      <Section>
        <div className="flex items-start justify-between gap-6">
          <PageHeader
            label="Forecast"
            title="Our road to 100M MAU"
          />
          <a
            href="/equals-forecast-2026-2030.xlsx"
            download="Equals Forecast 2026-2030.xlsx"
            className="shrink-0"
          >
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download forecast
            </Button>
          </a>
        </div>
        <p className="text-foreground text-base mt-4 leading-relaxed" style={{ fontFamily: "var(--font-fair-favorit-book), sans-serif", maxWidth: 760 }}>
          By 2030, Equals will be at 102M MAU, $2.3B Annualised Revenue, and 5M paying subscribers.{" "}
          <span className="underline decoration-dotted decoration-foreground/40 underline-offset-4">Hover</span> over row and column titles for information and assumptions.{" "}
          <span style={{ backgroundColor: CREAM_BG, padding: "1px 6px", borderRadius: 3, color: "var(--foreground)", fontWeight: 500 }}>
            Cream
          </span>{" "}
          cells are editable model drivers.{" "}
          <span style={{ color: BLUE_FG, fontWeight: 500 }}>Blue</span> values derive live from the formulas.
        </p>
      </Section>

      {/* Outer wrapper: left breathing room lives here, OUTSIDE the scroll container,
          so scrolled content never bleeds into this gap.
          Inner overflow-x-auto carries the table; paddingRight gives a buffer when
          the user scrolls all the way to the right. */}
      <div style={{ paddingLeft: LEFT_BUFFER }}>
        <div
          className="overflow-x-auto"
          style={{ paddingRight: RIGHT_BUFFER, paddingBottom: 8 }}
        >
          <table
            className="text-xs border-collapse"
            style={{ fontFamily: "var(--font-fair-favorit-mono), monospace" }}
          >
            <thead>
              <tr>
                <th
                  className="sticky left-0 z-20 bg-background"
                  style={{ minWidth: LABEL_COL_PX, width: LABEL_COL_PX }}
                />
                {QUARTERS.map((q, i) => (
                  <th
                    key={q}
                    className="text-right px-3 py-2 text-muted-foreground font-normal uppercase tracking-[0.06em] whitespace-nowrap bg-background"
                    style={{ fontSize: 10, minWidth: 84 }}
                  >
                    <span
                      className="cursor-help underline decoration-dotted decoration-foreground/40 underline-offset-4"
                      onMouseEnter={(e) => handleQuarterHover(e, i)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {q}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SECTIONS.map((sec) => (
                <Fragment key={sec.title}>
                  <tr>
                    <td
                      colSpan={1 + N}
                      className="bg-secondary uppercase tracking-[0.08em] text-foreground"
                      style={{ fontSize: 11, padding: 0 }}
                    >
                      <span
                        className="inline-block font-mono uppercase"
                        style={{ position: "sticky", left: 0, padding: "8px 12px", fontFamily: "var(--font-fair-favorit-mono), ui-monospace, monospace" }}
                      >
                        {sec.title}
                      </span>
                    </td>
                  </tr>
                  {sec.rows.map((row) => {
                    const refKey =
                      row.kind === "driver" ? row.key
                      : row.kind === "scalar-driver" ? row.key
                      : null;
                    const note = refKey ? REF_NOTES[refKey] : null;
                    const indent = "indent" in row ? row.indent : false;

                    return (
                      <tr key={row.label} className="border-t border-border/40">
                        <td
                          className={`sticky left-0 z-10 bg-background px-3 py-1.5 whitespace-nowrap ${indent ? "pl-8" : ""}`}
                          style={{
                            minWidth: LABEL_COL_PX,
                            width: LABEL_COL_PX,
                            boxShadow: "1px 0 0 0 var(--border)",
                          }}
                        >
                          {note ? (
                            <span
                              className="cursor-help underline decoration-dotted decoration-foreground/40 underline-offset-4"
                              style={{ color: indent ? "var(--muted-foreground)" : "var(--foreground)" }}
                              onMouseEnter={(e) => handleLabelHover(e, refKey!)}
                              onMouseLeave={() => setTooltip(null)}
                            >
                              {row.label}
                            </span>
                          ) : (
                            <span style={{ color: indent ? "var(--muted-foreground)" : "var(--foreground)" }}>
                              {row.label}
                            </span>
                          )}
                        </td>
                        {row.kind === "scalar-driver"
                          ? QUARTERS.map((_, i) => (
                              <td
                                key={i}
                                className="px-3 py-1.5 text-right whitespace-nowrap tabular-nums"
                                style={
                                  i === 0
                                    ? { backgroundColor: CREAM_BG, color: "var(--foreground)" }
                                    : { color: BLUE_FG }
                                }
                              >
                                {i === 0 ? (
                                  <DriverCell value={drivers.initialMAU} onChange={updateScalar} format={row.format} />
                                ) : (
                                  fmt(computed.mauStart[i], row.format)
                                )}
                              </td>
                            ))
                          : row.kind === "driver"
                          ? drivers[row.key].map((v, i) => (
                              <td
                                key={i}
                                className="px-3 py-1.5 text-right whitespace-nowrap tabular-nums driver-cell"
                                style={{ backgroundColor: CREAM_BG, color: "var(--foreground)" }}
                              >
                                <DriverCell
                                  value={v}
                                  onChange={(nv) => updateArray((row as { key: DriverKey }).key, i, nv)}
                                  format={row.format}
                                />
                              </td>
                            ))
                          : row.pick(computed).map((v, i) => (
                              <td
                                key={i}
                                className="px-3 py-1.5 text-right whitespace-nowrap tabular-nums"
                                style={{ color: BLUE_FG }}
                              >
                                {fmt(v, row.format)}
                              </td>
                            ))}
                      </tr>
                    );
                  })}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      <div style={{ height: 160 }} />

      {/* Tooltip is portalled into <body> so it escapes the ScrollReveal opacity
          wrapper in page.tsx — otherwise the fixed-positioned element inherits
          the parent's animated opacity and renders almost invisible. */}
      {tooltip && portalNode && createPortal(
        <div
          key={tooltip.key}
          className="forecast-tooltip"
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            zIndex: 9999,
            maxWidth: 380,
            backgroundColor: "#0A0A0A",
            color: "#FFFFFF",
            padding: "12px 14px",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            pointerEvents: "none",
            fontFamily: "var(--font-fair-favorit-book), sans-serif",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              marginBottom: 6,
              color: "#FFFFFF",
              fontFamily: "var(--font-fair-favorit-heading), var(--font-fair-favorit-book), sans-serif",
            }}
          >
            {tooltip.title}
          </div>
          <div
            style={{
              fontSize: 12,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.82)",
              fontWeight: 400,
              fontFamily: "var(--font-fair-favorit-book), sans-serif",
            }}
          >
            {tooltip.body}
          </div>
        </div>,
        portalNode,
      )}

      {/* CSS for hover + tooltip ease-in */}
      <style jsx global>{`
        .driver-cell:hover { background-color: ${CREAM_BG_HOVER} !important; }
        .forecast-tooltip {
          animation: forecast-tooltip-in 160ms ease-out both;
        }
        @keyframes forecast-tooltip-in {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
