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

export function parseWeeklyRetention() {
  const weeks = [
    "Sep 22", "Oct 13", "Nov 03", "Nov 24", "Dec 15", "Jan 05",
    "Jan 26", "Feb 16", "Mar 09",
  ];
  const w1 = [0.2997, 0.2803, 0.2917, 0.3539, 0.3206, 0.4324, 0.452, 0.5028, 0.5172];
  const w2 = [0.1987, 0.1865, 0.1977, 0.2297, 0.2032, 0.3156, 0.3415, 0.3914, 0.4011];
  const w4 = [0.0944, 0.0854, 0.0954, 0.1386, 0.1258, 0.2016, 0.2318, 0.2657, 0.2804];
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
  const months = ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026"];
  const values = [283, 255, 326, 415, 640, 635, 655];
  return months.map((m, i) => ({ month: m, "Avg Actions": Math.round(values[i]) }));
}

export function parseEngagementExcludingCurrent() {
  return parseEngagement();
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

export function parseWauMau() {
  // Monthly averages of weekly WAU/MAU. April excludes 2026-04-27 (incomplete
  // week - query date 2026-04-29 cut the rolling window short).
  const months = [
    { label: "Sep 2025", value: 33 },
    { label: "Oct 2025", value: 38 },
    { label: "Nov 2025", value: 36 },
    { label: "Dec 2025", value: 37 },
    { label: "Jan 2026", value: 37 },
    { label: "Feb 2026", value: 41 },
    { label: "Mar 2026", value: 45 },
    { label: "Apr 2026", value: 46 },
  ];
  return months.map((m) => ({
    month: m.label,
    "WAU/MAU": m.value,
  }));
}

export function parseFriendCountDistribution() {
  // Active onboarded users by friend count bucket. Chart ID: m6gb7rrt.
  // Derived from cumulative segments: All verified active, 1+, 10+, 50+ Friends MatchMade (rolling 365d).
  // Range: Last 30 Days (use the most recent complete month).
  return [
    { name: "0 friends", value: 66180, color: "rgba(0,0,0,0.35)" },
    { name: "1-9 friends", value: 67892, color: "rgba(0, 204, 120, 1)" },
    { name: "10-49 friends", value: 58336, color: "#0066FF" },
    { name: "50+ friends", value: 42296, color: "#8627FF" },
  ];
}

export function parseWeeklyRetentionByFriends() {
  // Weekly retention bracket view, segmented by Friends MatchMade count (rolling 365d).
  // Start event: Verify Successful. Return event: Any Active Event.
  // Chart ID: qkwq1kog. Start date: T-10 weeks. End date: T-3 days.
  const weeks = ["W0", "W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  const allUsers = [100, 48.8, 37.6, 30.1, 26.6, 22.8, 20.7, 18.5, 17.8];
  const friends1 = [100, 65.5, 51.9, 42.2, 36.5, 30.7, 27.7, 24.6, 22.7];
  const friends10 = [100, 78.1, 64.8, 54.7, 47.7, 40.9, 36.8, 32.9, 29.9];
  const friends50 = [100, 86.9, 75.6, 66.5, 58.9, 52.1, 47.7, 43.2, 39.7];
  return weeks.map((w, i) => ({
    week: w,
    "All Users": allUsers[i],
    "1+ Friends": friends1[i],
    "10+ Friends": friends10[i],
    "50+ Friends": friends50[i],
  }));
}

export function parseChatMessagesSentMonthly() {
  // Monthly totals of Chat MessageSent event. Source: Amplitude.
  const months = [
    { label: "Oct 2025", value: 2193475 },
    { label: "Nov 2025", value: 3499026 },
    { label: "Dec 2025", value: 5196269 },
    { label: "Jan 2026", value: 7595755 },
    { label: "Feb 2026", value: 17941249 },
    { label: "Mar 2026", value: 22189512 },
    { label: "Apr 2026", value: 28444336 },
  ];
  return months.map((m) => ({
    month: m.label,
    "Messages Sent": m.value,
  }));
}

// ── Team Data ───────────────────────────────────────────────────────

export const teamMembers = [
  {
    name: "Isaac Kamlish",
    handle: "=isaac",
    role: "Co-Founder & CEO",
    bg: "Ex Instagram/Meta | MSc Machine Learning, UCL | Forbes 30u30",
    detail: "First Data Scientist for Instagram LDN. Published AI researcher cited by Nobel laureate Demis Hassabis.",
    bio: [
      "Data Scientist at Facebook, then the first Data Scientist in Instagram's London office.",
      "Published AI researcher, cited by Nobel laureate Demis Hassabis. MSc Machine Learning and BSc Mathematics from UCL.",
      "Co-founded Fair.xyz, which grew into Europe's largest NFT minting platform - processing $45M in NFT sales volume.",
      "At Equals: co-leads product development, spearheads marketing through a fully agentic acquisition workforce, drives product analytics and A/B testing, and architected the recommendation system.",
      "Built the entire AI stack in-house, slashing per-user inference costs from $0.27 to $0.01 - powering recommendations, safety, and personalization at scale.",
      "Interned at Boiler Room, working on the world's first VR Nightclub.",
      "Forbes 30 Under 30. 3rd place, World Mind Sports Olympiad (Perudo).",
    ],
    linkedin: "https://www.linkedin.com/in/isaac-kamlish-a0901088/",
    logo: "/team-logos/IG_logo.png",
    song: { title: "Runaway", artist: "Kanye West", cover: "/team-songs/runaway.jpeg" },
  },
  {
    name: "Isaac Bentata",
    handle: "=bento",
    role: "Co-Founder & COO",
    bg: "Ex Goldman Sachs | MSc Machine Learning, UCL | Forbes 30u30",
    detail: "Ran the most profitable algorithmic credit trading desk in Europe at Goldman Sachs as part of a two-person team.",
    bio: [
      "Co-founded Fair.xyz, which grew into Europe's largest NFT minting platform - processing $45M in NFT sales volume.",
      "At Equals: spearheads licensing negotiations with major labels and publishers (including the UMG worldwide deal).",
      "Runs operations and finance. Secured $500K+ in grants.",
      "Manages a fully agentic workforce across content moderation, platform moderation, and support.",
      "Leads the engineering team and co-leads product development alongside Isaac Kamlish.",
      "Ran the most profitable algorithmic credit trading desk in Europe at Goldman Sachs, as part of a two-person team.",
      "MSc Machine Learning & Data Science and BEng Chemical Engineering, both from UCL.",
      "Forbes 30 Under 30. Le Rossignol Scholar. Published AI researcher (NLP for chess).",
    ],
    linkedin: "https://www.linkedin.com/in/isaacbc/",
    logo: "/team-logos/goldman_logo.png",
    song: { title: "Romeo and Juliet", artist: "Dire Straits", cover: "/team-songs/romeo-juliet.jpeg" },
  },
  {
    name: "Ray Cheung",
    handle: "=nacoki",
    role: "Head of Product Design",
    bg: "Ex Apple | Ex Nike | Ex AKQA | Ex Wieden+Kennedy",
    detail: "Shaped products for Apple, Nike, AKQA, Wieden+Kennedy, and Net-a-Porter - building at the intersection of culture, design, and technology.",
    bio: [
      "Product designer and 0-to-1 builder with experience across London, Portland, Hong Kong, and Shanghai.",
      "Shaped products for Apple, Nike, AKQA, Wieden+Kennedy, and Net-a-Porter - building at the intersection of culture, design, and technology.",
      "At Nike, built key parts of the company's early app ecosystem.",
      "As a founder, built and launched his own product from the ground up with end-to-end ownership across product and execution.",
    ],
    linkedin: "https://www.linkedin.com/in/nacoki/",
    logo: "/team-logos/Nike_logo.png",
    song: { title: "Automatic", artist: "Hikaru Utada", cover: "/team-songs/ab67616d0000b2734fa36b14a276fe560940baa0.jpeg" },
  },
  {
    name: "Carlos Saenz",
    handle: "=carlos",
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
    logo: "/team-logos/rappi_BIG.D-07f475bf.png",
    song: { title: "Tabaco y Chanel", artist: "Bacilos", cover: "/team-songs/ab67616d0000b273508f6cb8971fc173e1b6f26f.jpeg" },
  },
  {
    name: "Jacint Varga",
    handle: "=jacint",
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
    logo: "/team-logos/solana-sol-logo.png",
    song: { title: "Pedro", artist: "Raffaella Carrà", cover: "/team-songs/maxresdefault.jpg" },
  },
  {
    name: "Ilken Bahcecioglu",
    handle: "=ilken",
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
    logo: "/team-logos/nmusic.png",
    song: { title: "In the End", artist: "Linkin Park", cover: "/team-songs/LinkinParkIntheEnd.jpg" },
  },
  {
    name: "Norman Wilde",
    handle: "=norman",
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
    logo: "/team-logos/ledger-logo-black-and-white.png",
    song: { title: "Riptide", artist: "Vance Joy", cover: "/team-songs/riptide.jpeg" },
  },
  {
    name: "Dora Yilmaz",
    handle: "=dora",
    role: "Community, QA & Artist Liaison",
    bg: "UCL Genetics | International DJ",
    detail: "Took Equals past 1 billion TikTok views in 8 months. Built and runs the 11-strong ambassador programme.",
    bio: [
      "An internationally recognised DJ who brings an artist's instinct and insider's network to product building.",
      "Moves inside a tight circle of musicians, producers, DJs, and label executives across multiple scenes and continents - often first to hear what's breaking before it hits the mainstream.",
      "Designed and launched Equals' ambassador programme from scratch - in eight months took the platform past one billion views on TikTok alone.",
      "Scaled the programme to a 11-strong ambassador network she runs today.",
      "Previously led artist liaison and supported A&R, giving her end-to-end fluency across product, music, and audience.",
      "Now leads quality assurance across iOS and Android, running structured manual testing, regression, and release validation.",
      "BSc Genetics (2:1) from UCL - dissertation applied computational eQTL analysis to Crohn's disease-linked genes in R.",
    ],
    linkedin: "https://www.linkedin.com/in/dora-yilmaz-5248851b9/",
    logo: "/team-logos/NTS-PNG.png",
    song: { title: "Love No More", artist: "The Durutti Column", cover: "/team-songs/love-no-more.jpg" },
  },
];

// ── Sensitive data (cap table, SAFE holders) moved to src/lib/sensitive-data.ts ──
// Access via /api/sensitive (authenticated)

// ── Screenshots Config ──────────────────────────────────────────────

export const screenshots = [
  { src: "/screenshots/feed.png", caption: "The Feed - music-first social conversations" },
  { src: "/screenshots/meet-card.png", caption: "Meet - taste-based friend recommendations" },
  { src: "/screenshots/artist-profile-highlight.png", caption: "Artist Profiles - deep fan engagement" },
  { src: "/screenshots/album-page.png", caption: "Album Pages and Digital Vinyls\u2122" },
  { src: "/screenshots/music-player.png", caption: "Music Player with social context" },
  { src: "/screenshots/music-quiz.png", caption: "Music Quizzes - competitive superfan tests" },
  { src: "/screenshots/chats-with-rooms.png", caption: "Chat Rooms - real-time fan communities" },
  { src: "/screenshots/dm-conversation.png", caption: "Direct Messages with friends" },
  { src: "/screenshots/user-profile.png", caption: "User Profile - your music passport" },
  { src: "/screenshots/activity-viewers.png", caption: "Activity - see who viewed your profile" },
];

// Legacy exports removed:
// safeHolders, capTableData, capTableTotals
