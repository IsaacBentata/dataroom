# Equals - Series A Data Room

A production-quality data room website for Equals' Series A fundraise. Built with Next.js 16, Tailwind CSS 4, Recharts, and TypeScript.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Password:** `equals2026`

## Refreshing Data from Amplitude

All charts pull data from the Equa.ls Prod project (App ID: 598644). See **[DATA_REFRESH.md](./DATA_REFRESH.md)** for the full refresh guide, including exact date ranges and rules for each chart.

## Updating Content

Content is sourced from markdown files in `/data/`:

| Section | File |
|---|---|
| Mission & Vision | `data/vision-roadmap/mission.md` |
| Product Walkthrough | `data/product-engagement/product-walkthrough.md` |
| Music Industry | `data/music-industry/partnerships-overview.md` |
| Monetisation | `data/vision-roadmap/monetisation-strategy.md` |
| Team | `data/team/team-overview.md` |
| Roadmap | `data/vision-roadmap/product-roadmap.md` |
| Corporate Structure | `data/legal/corporate-structure.md` |
| SAFE Holders | `data/legal/safe-holders.md` |

Screenshots are in `/public/screenshots/` and can be replaced with updated app screenshots.

## Project Structure

```
src/
  app/
    layout.tsx      - Root layout with Inter font and metadata
    page.tsx        - Main single-page app with all sections
    globals.css     - Tailwind CSS config and custom animations
  components/
    PasswordGate.tsx - Password protection (localStorage persistence)
    Navigation.tsx   - Fixed sidebar nav with scroll tracking
    DataChart.tsx    - Reusable Recharts chart with date filter and CSV export
    Section.tsx      - Scroll-animated section wrapper
    StatCallout.tsx  - Large stat display component
data/               - Source CSV and markdown files
public/screenshots/ - App screenshots for the product section
```

## Deployment

```bash
npm run build
npm start
```

Or deploy to Vercel, Netlify, etc.
