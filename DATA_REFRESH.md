# Data Refresh Guide

All charts are in the **Equa.ls Prod** Amplitude project (App ID: `598644`). This guide tells you exactly how to refresh each chart's data for the data room.

## General Process

1. Query each Amplitude chart using the chart IDs and date ranges below
2. Update the corresponding CSV files in `/data/`
3. **CRITICAL: The site does NOT read from the CSVs at runtime.** The chart data is hardcoded in `src/lib/data.ts`. After updating CSVs, you MUST also update the inline arrays in `src/lib/data.ts` to match the new CSV values. The CSVs are the canonical source of truth; `data.ts` is the rendering layer that must stay in sync.
4. Update any stat callouts in the page components (e.g. `src/app/growth/page.tsx`) if the headline numbers have changed (MAU count, DAU count, etc.)
5. Run `npm run build` to verify no errors

## Chart Refresh Rules

Each chart has fixed start dates and relative end dates. "Today" means the day the refresh is being run.

---

### 1. MAU and Install Growth

- **Chart ID:** `0fzez654`
- **Type:** Events Segmentation (line)
- **CSV:** `data/growth-marketing/mau-install-growth.csv`
- **Start date:** April 1, 2025 (always fixed)
- **End date:** Last day of the month before the current month
- **Example:** If refreshing on April 26 2026, end date = March 31, 2026

---

### 2. DAUs Rolling Average

- **Chart ID:** `0y7ihf40`
- **Type:** Events Segmentation (line, 30-day rolling average)
- **CSV:** `data/growth-marketing/dau-rolling-average.csv`
- **Start date:** October 26, 2025 (always fixed)
- **End date:** Yesterday (T-1 from today)
- **Example:** If refreshing on April 26 2026, end date = April 25, 2026

---

### 3. Retention Over Time

- **Chart ID:** `73g3ajox`
- **Type:** Retention (n-day, start event: Verify Successful)
- **CSV:** `data/product-engagement/retention-over-time.csv`
- **Start date:** October 1, 2025 (always fixed)
- **End date:** Last day of the current month
- **Example:** If refreshing on April 26 2026, end date = April 30, 2026

---

### 4. Retention per Friend Added

- **Chart ID:** `j256t416`
- **Type:** Retention (bracket view, segments: All Users / 1 / 10 / 50 friends)
- **CSV:** `data/product-engagement/retention-by-friends.csv`
- **Start date:** T-36 days from today
- **End date:** T-3 days from today
- **Example:** If refreshing on April 26 2026, start = March 21, 2026, end = April 23, 2026
- **IMPORTANT: Always confirm with the user before updating this chart. Do not refresh automatically.**

---

### 5. Weekly Retention Evolution

- **Chart ID:** `ayo280o0`
- **Type:** Retention (weekly interval, time view, start event: Verify Successful)
- **CSV:** `data/product-engagement/weekly-retention-evolution.csv`
- **Start date:** September 22, 2025 (always fixed)
- **End date:** T-30 days from today, then round down to the last complete week boundary so that Week 4 data is fully elapsed (i.e. exclude any week where W4 retention hasn't had time to complete)
- **Example:** If refreshing on April 26 2026, T-30 = March 27 → last complete week with full W4 data starts March 9 (Mar 23 would have incomplete W4)

---

### 6. Power Curve / Stickiness

- **Chart ID:** `cg9l2f2e`
- **Type:** Stickiness (segments by friend count: All / 1 / 10 / 50 friends)
- **CSV:** `data/product-engagement/power-curve-stickiness.csv`
- **Start date:** T-36 days from today
- **End date:** T-3 days from today
- **Example:** If refreshing on April 26 2026, start = March 21, 2026, end = April 23, 2026
- **IMPORTANT: Always confirm with the user before updating this chart. Do not refresh automatically.**

---

### 7. Avg Engagement per User

- **Chart ID:** `yn25sa7b`
- **Type:** Events Segmentation (formula: sum of 8 engagement events / active users)
- **CSV:** `data/product-engagement/engagement-per-user.csv`
- **Start date:** October 1, 2025 (always fixed)
- **End date:** Last day of the month before the current month
- **Example:** If refreshing on April 26 2026, end date = March 31, 2026

---

### 8. Users Who Verify (Onboarding Funnel)

- **Chart ID:** `s3xv7z2k`
- **Type:** Funnel (Onboarding Completed -> Verify Result success)
- **CSV:** `data/product-engagement/onboarding-verification-funnel.csv`
- **Start date:** November 1, 2025 (always fixed)
- **End date:** Last day of the month before the current month
- **Example:** If refreshing on April 26 2026, end date = March 31, 2026

---

## Quick Reference

| # | Chart | Chart ID | Fixed Start | End Date Rule | Confirm? |
|---|---|---|---|---|---|
| 1 | MAU and Install Growth | `0fzez654` | Apr 1, 2025 | End of prior month | No |
| 2 | DAUs Rolling Average | `0y7ihf40` | Oct 26, 2025 | Yesterday (T-1) | No |
| 3 | Retention Over Time | `73g3ajox` | Oct 1, 2025 | End of current month | No |
| 4 | Retention per Friend Added | `j256t416` | T-36 days | T-3 days | YES |
| 5 | Weekly Retention Evolution | `ayo280o0` | Sep 22, 2025 | T-30 days, rounded to last full W4 week | No |
| 6 | Power Curve / Stickiness | `cg9l2f2e` | T-36 days | T-3 days | YES |
| 7 | Avg Engagement per User | `yn25sa7b` | Oct 1, 2025 | End of prior month | No |
| 8 | Users Who Verify | `s3xv7z2k` | Nov 1, 2025 | End of prior month | No |
