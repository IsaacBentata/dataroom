// ── Data Parsing Helpers ────────────────────────────────────────────

export function parseMAUData() {
  const months = [
    "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025", "Sep 2025",
    "Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026",
  ];
  const mau = [4304, 3747, 4331, 11973, 25640, 41347, 59335, 97425, 145108, 235264, 283810, 350999, 531585];
  const installs = [3382, 2726, 3147, 10397, 21979, 34266, 50027, 83775, 119964, 196366, 216011, 243541, 385366];
  return months.map((m, i) => ({ date: m, MAU: mau[i], Installs: installs[i] }));
}

export function parseMAUDataExcludingCurrent() {
  return parseMAUData();
}

export function parseDAUData() {
  const dates = [
    "2025-10-26","2025-10-29","2025-11-12","2025-11-26","2025-12-10",
    "2025-12-24","2026-01-07","2026-01-21","2026-02-04","2026-02-18",
    "2026-03-04","2026-03-18","2026-04-01","2026-04-15","2026-04-25",
  ];
  const values = [3691, 3938, 5003, 5887, 7180, 6717, 9697, 12959, 19477, 30150, 38357, 43116, 47634, 61793, 69911];
  return dates.map((d, i) => ({
    date: new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    DAU: Math.round(values[i]),
  }));
}

export function parseRetentionByFriends() {
  const days = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  const allPct = [100,66.36,51.58,43.96,39.13,35.36,32.72,32.49,29.83,27.23,25.76,24.49,23.39,22.71,23.17,21.52,19.89,18.86,18.1,17.7,17.07,16.54,16.04,15.59,14.83,14.67,13.91,13.55,13.25,12.61,13.86];
  const one = [100,85.91,72.02,62.9,56.67,51.59,47.9,47.51,44.03,40.54,38.4,36.53,34.88,34.06,34.62,32.53,30.29,28.81,27.68,26.81,25.83,24.93,23.91,23.02,21.69,21.23,20.05,19.31,18.78,17.83,19.26];
  const ten = [100,93.24,84.56,77.04,70.96,65.87,61.75,61.1,57.73,53.76,51.37,48.85,47.04,46.0,46.22,44.06,41.7,39.78,38.33,37.31,36.08,34.53,33.41,32.2,30.54,29.76,28.22,27.59,26.69,25.74,27.05];
  const fifty = [100,95.13,90.35,85.21,80.81,76.67,72.62,71.42,68.99,65.35,63.08,60.63,58.54,57.55,56.82,54.85,52.69,50.12,48.72,48.41,46.27,44.5,43.14,41.89,40.01,38.98,38.17,36.12,35.73,34.2,35.57];
  return days.map((d, i) => ({
    day: `D${d}`,
    "All Users": allPct[i],
    "1+ Friends": one[i],
    "10+ Friends": ten[i],
    "50+ Friends": fifty[i],
  }));
}

export function parseWeeklyRetention() {
  const weeks = [
    "Sep 22", "Oct 13", "Nov 03", "Nov 24", "Dec 15", "Jan 05",
    "Jan 26", "Feb 16", "Mar 09", "Mar 30",
  ];
  const w1 = [0.2997, 0.2803, 0.2917, 0.3539, 0.3206, 0.4324, 0.452, 0.5028, 0.5172, 0.4982];
  const w2 = [0.1987, 0.1865, 0.1977, 0.2297, 0.2032, 0.3156, 0.3415, 0.3914, 0.4011, 0.3816];
  const w4 = [0.0944, 0.0854, 0.0954, 0.1386, 0.1258, 0.2016, 0.2318, 0.2657, 0.2804, 0.2272];
  return weeks.map((w, i) => ({
    week: w,
    "Week 1": Math.round(w1[i] * 100 * 10) / 10,
    "Week 2": Math.round(w2[i] * 100 * 10) / 10,
    "Week 4": Math.round(w4[i] * 100 * 10) / 10,
  }));
}

export function parsePowerCurve() {
  // Non-cumulative: % of users active on exactly N days per week (Apr 13 week)
  const segments = [
    { segment: "All Users", data: [30.5, 18.9, 13.4, 10.2, 8.2, 7.3, 11.4] },
    { segment: "1+ Friends", data: [24.0, 17.9, 14.2, 11.5, 9.6, 8.8, 14.0] },
    { segment: "10+ Friends", data: [20.0, 15.7, 13.3, 11.8, 10.7, 10.3, 18.2] },
    { segment: "50+ Friends", data: [17.5, 13.6, 12.0, 11.1, 11.0, 11.2, 23.6] },
  ];
  return Array.from({ length: 7 }, (_, i) => {
    const point: Record<string, string | number> = { days: `${i + 1} day${i > 0 ? "s" : ""}` };
    segments.forEach((s) => {
      point[s.segment] = s.data[i];
    });
    return point;
  });
}

export function parseEngagement() {
  const months = ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026"];
  const values = [283, 252, 325, 415, 640, 636];
  return months.map((m, i) => ({ month: m, "Avg Actions": Math.round(values[i]) }));
}

export function parseEngagementExcludingCurrent() {
  return parseEngagement();
}

export function parseOnboardingFunnel() {
  const months = ["Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026"];
  const rates = [22.9, 20.2, 37.6, 53.7, 51.5];
  return months.map((m, i) => ({ month: m, "Verification Rate": rates[i] }));
}

export function parseOnboardingFunnelExcludingCurrent() {
  return parseOnboardingFunnel();
}

export function parseMessagesPerUser() {
  const dates = [
    "2025-10-29","2025-11-12","2025-11-26","2025-12-10","2025-12-24",
    "2026-01-07","2026-01-21","2026-02-04","2026-02-18","2026-03-04",
    "2026-03-18","2026-04-01","2026-04-15","2026-04-26",
  ];
  const values = [35.9, 35.0, 36.7, 38.6, 32.4, 34.1, 36.4, 37.5, 44.7, 42.5, 38.0, 37.1, 36.6, 35.6];
  return dates.map((d, i) => ({
    date: new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    "Messages / User": values[i],
  }));
}

export function parseTimeSpentPerUser() {
  const dates = [
    "2025-10-29","2025-11-12","2025-11-26","2025-12-10","2025-12-24",
    "2026-01-07","2026-01-21","2026-02-04","2026-02-18","2026-03-04",
    "2026-03-18","2026-04-01","2026-04-15","2026-04-26",
  ];
  const values = [22.5, 19.8, 22.1, 24.8, 21.1, 22.6, 27.8, 32.4, 38.1, 36.3, 33.0, 32.6, 34.5, 34.7];
  return dates.map((d, i) => ({
    date: new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    "Minutes / User": values[i],
  }));
}

export function parseSessionsPerUser() {
  const dates = [
    "2025-10-29","2025-11-12","2025-11-26","2025-12-10","2025-12-24",
    "2026-01-07","2026-01-21","2026-02-04","2026-02-18","2026-03-04",
    "2026-03-18","2026-04-01","2026-04-15","2026-04-26",
  ];
  const values = [3.2, 3.1, 3.4, 4.1, 4.1, 4.2, 4.8, 5.3, 5.7, 5.9, 5.8, 5.6, 5.5, 5.5];
  return dates.map((d, i) => ({
    date: new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    "Sessions / User": values[i],
  }));
}

export function parseAppOpensPerUser() {
  const dates = [
    "2025-10-29","2025-11-12","2025-11-26","2025-12-10","2025-12-24",
    "2026-01-07","2026-01-21","2026-02-04","2026-02-18","2026-03-04",
    "2026-03-18","2026-04-01","2026-04-15","2026-04-26",
  ];
  const values = [8.9, 8.4, 9.5, 11.3, 9.9, 10.6, 13.4, 15.8, 18.0, 17.4, 16.2, 15.8, 16.3, 16.2];
  return dates.map((d, i) => ({
    date: new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    "App Opens / User": values[i],
  }));
}

export function parseRetentionOverTime() {
  const periods = ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026"];
  const d1 = [36, 41, 42, 49, 57, 61];
  const d7 = [12, 14, 17, 23, 31, 34];
  const d14 = [7, 9, 10, 16, 22, 24];
  const d30 = [3, 4, 6, 9, 13, 15];
  return periods.map((p, i) => ({
    period: p,
    "D1": d1[i],
    "D7": d7[i],
    "D14": d14[i],
    "D30": d30[i],
  }));
}

// ── Revenue Data ────────────────────────────────────────────────────

export const revenueData = [
  { month: "Mar 2025", revenue: 0 },
  { month: "Apr 2025", revenue: 0 },
  { month: "May 2025", revenue: 144 },
  { month: "Jun 2025", revenue: 353 },
  { month: "Jul 2025", revenue: 2472 },
  { month: "Aug 2025", revenue: 7732 },
  { month: "Sep 2025", revenue: 9126 },
  { month: "Oct 2025", revenue: 14337 },
  { month: "Nov 2025", revenue: 40539 },
  { month: "Dec 2025", revenue: 49341 },
  { month: "Jan 2026", revenue: 50271 },
  { month: "Feb 2026", revenue: 33931 },
];

// ── Team Data ───────────────────────────────────────────────────────

export const teamMembers = [
  {
    name: "Isaac Kamlish",
    role: "Co-Founder & CEO",
    bg: "Forbes 30u30 | Ex Instagram/Meta | MSc Machine Learning, UCL",
    detail: "Built the entire AI stack in-house, cutting per-user inference costs from $0.27 to $0.01. 90%+ of production code written by AI agents.",
    bio: [
      "Published AI researcher. Forbes 30 Under 30.",
      "MSc Machine Learning and BSc Mathematics from UCL.",
      "Data Scientist at Facebook, then the first Data Scientist in Instagram's London office.",
      "Co-founded Fair.xyz, which grew into Europe's largest NFT minting platform.",
      "At Equals: co-leads product development, spearheads marketing through a fully agentic acquisition workforce, and drives product analytics and A/B testing.",
      "Built the entire AI stack in-house, slashing per-user inference costs from $0.27 to $0.01 - powering recommendations, safety, and personalization at scale.",
      "Core contributor to the engineering team and architect of the platform's recommendation system across all dimensions.",
    ],
    linkedin: "https://www.linkedin.com/in/isaac-kamlish-a0901088/",
  },
  {
    name: "Isaac Bentata",
    role: "Co-Founder & COO",
    bg: "Forbes 30u30 | Ex Goldman Sachs | MSc Machine Learning, UCL",
    detail: "Closed the UMG worldwide deal. Secured $500K+ in grants. Manages a 10+ agentic workforce in production.",
    bio: [
      "Published AI researcher (NLP for chess). Forbes 30 Under 30. Le Rossignol Scholar.",
      "MSc Machine Learning & Data Science and BEng Chemical Engineering, both from UCL.",
      "Ran the most profitable algorithmic credit trading desk in Europe at Goldman Sachs, as part of a two-person team.",
      "Co-founded Fair.xyz, which grew into Europe's largest NFT minting platform.",
      "At Equals: spearheads licensing negotiations with major labels and publishers (including the UMG worldwide deal).",
      "Runs operations and finance. Secured $500K+ in grants.",
      "Manages a fully agentic workforce across content moderation, platform moderation, and support.",
      "Leads the engineering team and co-leads product development alongside Isaac Kamlish.",
    ],
    linkedin: "https://www.linkedin.com/in/isaacbc/",
  },
  {
    name: "Ray Cheung",
    role: "Head of Product Design",
    bg: "Ex Apple | Ex Nike | Ex AKQA | Ex Wieden+Kennedy",
    detail: "Product designer and 0-to-1 builder across London, Portland, Hong Kong, and Shanghai.",
    bio: [
      "Product designer and 0-to-1 builder with experience across London, Portland, Hong Kong, and Shanghai.",
      "Shaped products for Apple, Nike, AKQA, Wieden+Kennedy, and Net-a-Porter - building at the intersection of culture, design, and technology.",
      "At Nike, built key parts of the company's early app ecosystem.",
      "As a founder, built and launched his own product from the ground up with end-to-end ownership across product and execution.",
    ],
    linkedin: "https://www.linkedin.com/in/nacoki/",
  },
  {
    name: "Carlos Saenz",
    role: "Head of Engineering",
    bg: "Ex Grability (Rappi origin) | Ex The Iconic | 13+ yrs",
    detail: "Early engineer at the company that spawned Rappi (YC unicorn). Built entire engineering ecosystems from scratch.",
    bio: [
      "13+ years shipping production software across three continents (LATAM, APAC, Europe).",
      "Career started at Grability in 2012 - the company from which Rappi (Y Combinator unicorn) was born. Rose from backend engineer to Tech Lead.",
      "Led enterprise integrations for El Corte Ingles (Spain), Walmart (Mexico), and Foodstuffs (New Zealand).",
      "Domain Lead at The Iconic, Australia's leading fashion e-commerce platform.",
      "At Muni Tienda, single-handedly built the entire technical ecosystem from zero - architecture, infrastructure, coding standards, tooling, and CI/CD.",
      "Scaled into Head of Engineering, hiring and structuring Domain-Driven teams and defining career paths.",
      "At Equals: drives the full mobile development lifecycle, scalable ecosystem design, and integration with global music content providers.",
    ],
    linkedin: "https://www.linkedin.com/in/cesaenzv/",
  },
  {
    name: "Jacint Varga",
    role: "Full Stack Engineer",
    bg: "Ex Solana Mobile | Ex Callstack | 12+ yrs",
    detail: "Primary contributor to the React Native repository. Lead mobile engineer on Solana Mobile's Saga wallet.",
    bio: [
      "12+ years of engineering experience with deep roots in the React Native ecosystem.",
      "Lead mobile engineer on Solana Mobile's (Saga) wallet application.",
      "Delivered Coinbase's WaaS integration for React Native.",
      "Primary contributor to the React Native repository. Well-known in the open-source community.",
      "Ex-Callstacker (the most prominent React Native-focused company). Participated in and organised React Conf and React Native Universe conferences.",
      "Built core components of Amazon's Kepler (Vega) OS, which shipped React Native baked in.",
      "Built his own streaming application, bringing first-hand knowledge of the platform and business side of running a consumer app.",
    ],
    linkedin: "",
  },
  {
    name: "Ilken Bahcecioglu",
    role: "Senior Full Stack Engineer",
    bg: "Ex Encore Musicians (Lead Dev) | 10+ yrs",
    detail: "Spearheads AI orchestration initiatives at Equals.",
    bio: [
      "10+ years of full-stack engineering experience spanning fintech, music-tech, and Web3.",
      "Spearheads AI orchestration initiatives at Equals.",
      "Previously Lead Developer at Encore Musicians - the UK's largest musician bookings platform - for nearly four years.",
      "Deep expertise across React Native, Next.js, Node.js, and modern infrastructure.",
      "Shipped at every layer of the stack, from casino gaming engines at Playtech to government digital services at Firmstep.",
    ],
    linkedin: "https://www.linkedin.com/in/ilken/",
  },
  {
    name: "Norman Wilde",
    role: "Full Stack Engineer",
    bg: "Ex Ledger | Cross-platform specialist",
    detail: "Improved Android crash-free users from 85% to 98%+. Built the core Equals feed and Community Channels from 0 to 1.",
    bio: [
      "At Equals: improved Android crash-free users from 85% to 98%+ and crash-free sessions from 95% to 99% - directly boosting retention and app store ratings.",
      "Built the core feed UI supporting text, music, polls, and photos with real-time state syncing across ~1,000 posts created daily.",
      "Built Community Channels from zero to one - the full create/join/manage feature including conditions, artist profile integration, and share flows.",
      "Developed custom native iOS modules (Snapchat sticker sharing, Apple MusicKit authentication) where no off-the-shelf solution existed.",
      "Previously co-built the first Bitcoin hardware wallet (Ledger) integration for a crypto browser extension - no prior implementation existed at the time.",
      "Shipped production apps across mobile, web, and blockchain.",
    ],
    linkedin: "https://www.linkedin.com/in/norman-wilde/",
  },
  {
    name: "Dora Yilmaz",
    role: "Community, QA & Artist Liaison",
    bg: "UCL Genetics | International DJ",
    detail: "Took Equals past 1 billion TikTok views in 8 months. Built and runs the 30-strong ambassador programme.",
    bio: [
      "An internationally recognised DJ who brings an artist's instinct and insider's network to product building.",
      "Moves inside a tight circle of musicians, producers, DJs, and label executives across multiple scenes and continents - often first to hear what's breaking before it hits the mainstream.",
      "Designed and launched Equals' ambassador programme from scratch - in eight months took the platform past one billion views on TikTok alone.",
      "Scaled the programme to a 30-strong ambassador network she runs today.",
      "Previously led artist liaison and supported A&R, giving her end-to-end fluency across product, music, and audience.",
      "Now leads quality assurance across iOS and Android, running structured manual testing, regression, and release validation.",
      "BSc Genetics (2:1) from UCL - dissertation applied computational eQTL analysis to Crohn's disease-linked genes in R.",
    ],
    linkedin: "https://www.linkedin.com/in/dora-yilmaz-5248851b9/",
  },
];

// ── SAFE Holders ────────────────────────────────────────────────────

export const safeHolders = [
  { investor: "Glaser Investments LLC", amount: "$2,500,000" },
  { investor: "JamJar Ventures II LP", amount: "$664,000" },
  { investor: "Firstminute Capital II LP", amount: "$336,000" },
  { investor: "Phil Hodari", amount: "$67,580" },
  { investor: "The Next Act Trust", amount: "$50,000" },
  { investor: "Gaingels Early Stage Fund I LLC", amount: "$25,000" },
  { investor: "Joseph Cohen", amount: "$13,510" },
];

// ── Cap Table Data ──────────────────────────────────────────────────

export const capTableData = [
  { member: "Isaac Kamlish", ordinaryShares: "400,000", seedPreferred: "0", ownership: "31.79%" },
  { member: "Isaac Bentata", ordinaryShares: "300,000", seedPreferred: "0", ownership: "23.84%" },
  { member: "Eden Block Fund I LP", ordinaryShares: "0", seedPreferred: "139,487", ownership: "11.09%" },
  { member: "Nathan Cohen", ordinaryShares: "100,651", seedPreferred: "0", ownership: "8.00%" },
  { member: "Talia Jenna Hannuna", ordinaryShares: "100,000", seedPreferred: "0", ownership: "7.95%" },
  { member: "Firstminute Capital II LP", ordinaryShares: "0", seedPreferred: "90,232", ownership: "7.17%" },
  { member: "NFX Capital Fund III LP", ordinaryShares: "0", seedPreferred: "49,669", ownership: "3.95%" },
  { member: "Three Arrows Capital Ltd.", ordinaryShares: "0", seedPreferred: "49,669", ownership: "3.95%" },
  { member: "Plassa Capital", ordinaryShares: "0", seedPreferred: "8,030", ownership: "0.64%" },
  { member: "Meyer Bengio", ordinaryShares: "0", seedPreferred: "4,015", ownership: "0.32%" },
  { member: "Jason Stone", ordinaryShares: "0", seedPreferred: "2,483", ownership: "0.20%" },
  { member: "Moonshot Ltd", ordinaryShares: "0", seedPreferred: "2,483", ownership: "0.20%" },
  { member: "Ozone Networks Inc (OpenSea)", ordinaryShares: "0", seedPreferred: "2,483", ownership: "0.20%" },
  { member: "Camron Miraftab", ordinaryShares: "0", seedPreferred: "993", ownership: "0.08%" },
  { member: "Christian Bolling", ordinaryShares: "0", seedPreferred: "993", ownership: "0.08%" },
  { member: "Rohit Bhasin", ordinaryShares: "0", seedPreferred: "745", ownership: "0.06%" },
  { member: "Raza Jack Rizvi", ordinaryShares: "0", seedPreferred: "745", ownership: "0.06%" },
  { member: "Powerbook Gestion S.L.", ordinaryShares: "0", seedPreferred: "745", ownership: "0.06%" },
  { member: "Strategic Partners Consulting, Inc", ordinaryShares: "0", seedPreferred: "745", ownership: "0.06%" },
  { member: "William Benattar", ordinaryShares: "0", seedPreferred: "497", ownership: "0.04%" },
  { member: "Michael Sutherland", ordinaryShares: "0", seedPreferred: "497", ownership: "0.04%" },
  { member: "Mavolta Holdings Pte. Ltd", ordinaryShares: "0", seedPreferred: "497", ownership: "0.04%" },
  { member: "Alexander James Rankin", ordinaryShares: "0", seedPreferred: "497", ownership: "0.04%" },
  { member: "Massimiliano Benedetti", ordinaryShares: "0", seedPreferred: "497", ownership: "0.04%" },
  { member: "Guido Ampollini", ordinaryShares: "0", seedPreferred: "497", ownership: "0.04%" },
  { member: "Batuhan Dasgin", ordinaryShares: "0", seedPreferred: "497", ownership: "0.04%" },
  { member: "Diana Lea Anthony 2015 Trust", ordinaryShares: "0", seedPreferred: "497", ownership: "0.04%" },
];

export const capTableTotals = {
  ordinaryShares: "900,651",
  seedPreferred: "357,493",
  employeeOptionScheme: "213,079",
};

// ── Screenshots Config ──────────────────────────────────────────────

export const screenshots = [
  { src: "/screenshots/feed.png", caption: "The Feed - music-first social conversations" },
  { src: "/screenshots/meet-card.png", caption: "Meet - taste-based friend recommendations" },
  { src: "/screenshots/artist-profile-highlight.png", caption: "Artist Profiles - deep fan engagement" },
  { src: "/screenshots/album-page.png", caption: "Album Pages and Digital Vinyls" },
  { src: "/screenshots/music-player.png", caption: "Music Player with social context" },
  { src: "/screenshots/music-quiz.png", caption: "Music Quizzes - competitive superfan tests" },
  { src: "/screenshots/chats-with-rooms.png", caption: "Chat Rooms - real-time fan communities" },
  { src: "/screenshots/dm-conversation.png", caption: "Direct Messages with friends" },
  { src: "/screenshots/user-profile.png", caption: "User Profile - your music passport" },
  { src: "/screenshots/activity-viewers.png", caption: "Activity - see who viewed your profile" },
];
