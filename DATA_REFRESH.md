# Data Refresh Guide

All charts are in the **Equa.ls Prod** Amplitude project (App ID: `598644`). This guide tells you exactly how to refresh each chart's data for the data room.

## General Process

For each chart:

1. **Query Amplitude** using the chart ID, query definition, and date range rules below
2. **Update `src/lib/data.ts`** — this is where ALL chart data lives. Find the corresponding `parse*()` function and update its inline arrays with the new values. For daily data (charts 9-12), compute a 30-day rolling average from the raw daily values, then sample every 14 days plus the last available day.
3. **Update CSVs in `/data/`** (charts 1-8 only) — these are reference copies for download/export. The site does NOT read from them at runtime.
4. **Update stat callouts** in page components (e.g. `src/app/growth/page.tsx`) if headline numbers changed (MAU count, DAU, etc.)
5. **Run `npm run build`** to verify no errors

### Where data lives

| What | Where | Function |
|---|---|---|
| MAU & Installs | `src/lib/data.ts` | `parseMAUData()` |
| DAU Rolling Avg | `src/lib/data.ts` | `parseDAUData()` |
| Retention Over Time | `src/lib/data.ts` | `parseRetentionOverTime()` |
| Retention by Friends | `src/lib/data.ts` | `parseRetentionByFriends()` |
| Weekly Retention | `src/lib/data.ts` | `parseWeeklyRetention()` |
| Power Curve | `src/lib/data.ts` | `parsePowerCurve()` |
| Engagement per User | `src/lib/data.ts` | `parseEngagement()` |
| Users Who Verify | `src/lib/data.ts` | `parseOnboardingFunnel()` |
| Messages per User | `src/lib/data.ts` | `parseMessagesPerUser()` |
| Time Spent per User | `src/lib/data.ts` | `parseTimeSpentPerUser()` |
| Sessions per User | `src/lib/data.ts` | `parseSessionsPerUser()` |
| App Opens per User | `src/lib/data.ts` | `parseAppOpensPerUser()` |

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

### 9. Messages per Verified Active User (30d Rolling Avg)

- **Chart ID:** `fd50nvge`
- **Type:** Events Segmentation — `Chat MessageSent`, metric `average`, `rollingAverage: 30`, segment: Verify Successful >= 1 (rolling 365d)
- **CSV:** N/A (inline in `src/lib/data.ts` → `parseMessagesPerUser`)
- **Start date:** October 26, 2025 (always fixed)
- **End date:** Yesterday (T-1)
- **Sampling:** Every 14 days from the daily data, plus the last available day
- **Amplitude query definition:**
  ```json
  {"type": "eventsSegmentation", "app": "598644", "params": {"range": "Last 180 Days", "events": [{"event_type": "Chat MessageSent", "filters": [], "group_by": []}], "metric": "average", "rollingAverage": 30, "interval": 1, "segments": [{"conditions": [{"op": ">=", "type": "event", "value": 1, "filters": [], "time_type": "rolling", "event_type": "Verify Successful", "time_value": 365}]}], "timezone": "UTC", "countGroup": "User"}}
  ```

---

### 10. Time Spent per Verified User (30d Rolling Avg)

- **Chart ID:** `hjcyzzzi`
- **Type:** Sessions — `sessionType: "averageTimePerUser"`, segment: Verify Successful >= 1 (rolling 365d). Returns seconds — compute 30d rolling avg manually, then convert to minutes.
- **CSV:** N/A (inline in `src/lib/data.ts` → `parseTimeSpentPerUser`)
- **Start date:** October 26, 2025 (always fixed)
- **End date:** Yesterday (T-1)
- **Sampling:** Every 14 days from the daily data, plus the last available day
- **Amplitude query definition:**
  ```json
  {"type": "sessions", "app": "598644", "params": {"range": "Last 180 Days", "sessionType": "averageTimePerUser", "sessions": [{"filters": [], "group_by": []}], "useNewSessionSemantics": true, "interval": 1, "segments": [{"conditions": [{"op": ">=", "type": "event", "value": 1, "filters": [], "time_type": "rolling", "event_type": "Verify Successful", "time_value": 365}]}], "timezone": "UTC", "countGroup": "User"}}
  ```

---

### 11. Sessions per Verified User (30d Rolling Avg)

- **Chart ID:** `eixd4by7`
- **Type:** Sessions — `sessionType: "peruser"`, segment: Verify Successful >= 1 (rolling 365d). Returns daily sessions per user — compute 30d rolling avg manually.
- **CSV:** N/A (inline in `src/lib/data.ts` → `parseSessionsPerUser`)
- **Start date:** October 26, 2025 (always fixed)
- **End date:** Yesterday (T-1)
- **Sampling:** Every 14 days from the daily data, plus the last available day
- **Amplitude query definition:**
  ```json
  {"type": "sessions", "app": "598644", "params": {"range": "Last 180 Days", "sessionType": "peruser", "sessions": [{"filters": [], "group_by": []}], "useNewSessionSemantics": true, "interval": 1, "segments": [{"conditions": [{"op": ">=", "type": "event", "value": 1, "filters": [], "time_type": "rolling", "event_type": "Verify Successful", "time_value": 365}]}], "timezone": "UTC", "countGroup": "User"}}
  ```

---

### 12. App Opens per Verified DAU (30d Rolling Avg)

- **Chart ID:** `vvmn2y01`
- **Type:** Events Segmentation — formula `TOTALS(Application Opened) / UNIQUES(Any Active Event)`, segment: Verify Successful >= 1 (rolling 365d). Returns raw daily values — compute 30d rolling avg manually before sampling. Note: `rollingAverage` param does NOT work with formula metrics.
- **CSV:** N/A (inline in `src/lib/data.ts` → `parseAppOpensPerUser`)
- **Start date:** October 26, 2025 (always fixed)
- **End date:** Yesterday (T-1)
- **Sampling:** Every 14 days from the daily data, plus the last available day
- **Amplitude query definition:**
  ```json
  {"type": "eventsSegmentation", "app": "598644", "name": "Avg App Opens per Verified DAU", "params": {"range": "Last 180 Days", "events": [{"event_type": "Application Opened", "filters": [], "group_by": []}, {"event_type": "_active", "filters": [], "group_by": []}], "metric": "formula", "formula": "TOTALS(A)/UNIQUES(B)", "groupBy": [], "interval": 1, "rollingAverage": 30, "segments": [{"conditions": [{"op": ">=", "type": "event", "value": 1, "filters": [], "time_type": "rolling", "event_type": "Verify Successful", "time_value": 365}]}], "timezone": "UTC", "countGroup": "User"}}
  ```

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
| 9 | Messages per User | `fd50nvge` | Oct 26, 2025 | Yesterday (T-1) | No |
| 10 | Time Spent per User | `hjcyzzzi` | Oct 26, 2025 | Yesterday (T-1) | No |
| 11 | Sessions per User | `eixd4by7` | Oct 26, 2025 | Yesterday (T-1) | No |
| 12 | App Opens per User | `vvmn2y01` | Oct 26, 2025 | Yesterday (T-1) | No |
