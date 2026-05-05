"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";
import dynamic from "next/dynamic";

const PhoneVideo3D = dynamic(() => import("@/components/PhoneVideo3D"), {
  ssr: false,
  loading: () => null,
});

interface FeatureSection {
  title: string;
  description: string;
  screenshots: { src: string; alt: string }[];
  video?: string;
}

const features: FeatureSection[] = [
  {
    title: "The Feed - Hot Takes and Reviews",
    description:
      "The Feed is where music becomes conversation. Users post hot takes, album reviews, and music opinions that spark real debate. Unlike algorithmic content feeds, every post on Equals comes from a verified human. This is the core social loop - music as the starting point for genuine connection. The Feed drives daily return behavior and sets the tone for the entire experience.",
    screenshots: [{ src: "/screenshots/feed.png", alt: "The Feed" }],
    video: "/videos/feature-3.mp4",
  },
  {
    title: "Meet - Friend Recommendations Based on Music Taste",
    description:
      "Meet is how users discover each other. Rather than following celebrities or influencers, Equals recommends real people based on shared music taste. The algorithm analyses listening preferences, reviews, and engagement patterns to surface people you would actually want to be friends with. This is the engine behind the social graph - and it is why users with more friends retain dramatically better.",
    screenshots: [{ src: "/screenshots/meet-card.png", alt: "Meet card" }],
    video: "/videos/feature-2.mp4",
  },
  {
    title: "Artist Profiles - Deep Fan Engagement Pages",
    description:
      "Every artist on Equals has a rich profile page with reviews from fans, their full discography, and a live chat room. These are not static pages - they are living communities where fans congregate, debate, and connect. With the UMG worldwide catalogue deal, every major artist has a fully populated profile. This is the kind of direct-to-fan channel that labels have been looking for.",
    screenshots: [
      { src: "/screenshots/artist-profile-highlight.png", alt: "Artist profile highlights" },
      { src: "/screenshots/artist-profile-reviews.png", alt: "Artist profile reviews" },
      { src: "/screenshots/artist-profile-music.png", alt: "Artist profile music" },
    ],
  },
  {
    title: "Album Pages and Digital Vinyls",
    description:
      "Every album has its own page where users can rate, review, and discuss the music. The Digital Vinyl feature lets users collect branded digital downloads and pin them to their profile. For labels, Digital Vinyl sales count toward chart positioning - creating net-new revenue that does not cannibalise streaming. For fans, it is a way to express identity through the music they love.",
    screenshots: [
      { src: "/screenshots/album-page-vinyl.png", alt: "Album page with digital vinyl" },
    ],
  },
  {
    title: "Music Quizzes - Test Your Knowledge",
    description:
      "Quizzes turn music fandom into a game. Users compete on artist-specific trivia, testing their superfan credentials. This feature drives engagement and time-on-app while reinforcing music identity - one of the core emotional hooks that keeps users coming back. Quizzes also create shareable moments that drive organic acquisition.",
    screenshots: [{ src: "/screenshots/music-quiz.png", alt: "Music quiz" }],
    video: "/videos/feature-4.mp4",
  },
  {
    title: "Chat Rooms - Live Fan Conversations",
    description:
      "Every artist and community on Equals has a live chat room. These are real-time, unmoderated spaces where fans talk about new releases, share opinions, and build relationships. Chat rooms are where casual users become power users - the transition from consuming content to participating in community. This is the feature that most directly competes with Discord and Reddit for music fan attention.",
    screenshots: [
      { src: "/screenshots/chats-with-rooms.png", alt: "Chat rooms overview" },
      { src: "/screenshots/chat-room-inside.png", alt: "Inside a chat room" },
    ],
    video: "/videos/feature-5.mp4",
  },
  {
    title: "DMs - Personal Connections with Music Match %",
    description:
      "Direct messages on Equals come with a unique twist: every conversation shows a music compatibility percentage based on shared taste. This gives users a natural conversation starter and makes every interaction feel personal. The DM experience reinforces the core value proposition - that music is the best foundation for human connection.",
    screenshots: [
      { src: "/screenshots/chats-overview.png", alt: "Chats overview" },
      { src: "/screenshots/dm-conversation.png", alt: "DM conversation" },
    ],
  },
  {
    title: "User Profile and Vinyl Grid - Your Music Identity",
    description:
      "The profile is a user's music passport. The Vinyl Grid lets people curate and display their favourite albums, creating a visual representation of who they are through music. Public profiles show taste compatibility with visitors, encouraging connection. The profile is the destination that ties every other feature together - the feed builds your taste, Meet finds your people, and the profile is where it all lives.",
    screenshots: [
      { src: "/screenshots/user-profile.png", alt: "User profile" },
      { src: "/screenshots/user-profile-public.png", alt: "Public profile" },
    ],
    video: "/videos/feature-1.mp4",
  },
  {
    title: "Activity and Viewers - See Who is Looking",
    description:
      "The activity feed shows who has viewed your profile, liked your posts, and engaged with your content. This is one of the most retention-driving features - it creates a compelling reason to check back frequently and drives reciprocal engagement. Profile viewers is also a premium feature that generates subscription revenue.",
    screenshots: [{ src: "/screenshots/activity-viewers.png", alt: "Activity and viewers" }],
  },
];

export default function ProductPage() {
  return (
    <>
      {/* Sticky page header - pins to top of scroll container in both direct
          route and inline preview. Out of normal flow concerns thanks to
          sticky semantics. */}
      <div
        className="sticky top-0 z-30 bg-background pt-6 pb-4 px-6 md:px-12"
        data-product-fixed-header
      >
        <div
          className="max-w-5xl mx-auto pb-4"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}
        >
          <PageHeader
            label="The Product"
            title="A music social network built for real connection"
            subtitle="Every feature is connected by the same thread: music as the foundation for human connection. Here is how the app works, feature by feature."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCallout value="4.5+" label="App Store Rating" />
            <StatCallout value="1:1" label="Male / Female Ratio" color="text-accent-blue" />
            <StatCallout value="35 min" label="Daily Time Spent" color="text-accent-purple" />
            <StatCallout value="100%" label="Verified Humans" color="text-accent-orange" />
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <FeaturesScrollStory features={features} />
        </div>
      </div>
    </>
  );
}

function FeaturesScrollStory({ features }: { features: FeatureSection[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [stickyOffset, setStickyOffset] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Measure the sticky page header. Result is held in state and used directly
  // on each section's inline height style + the phone's top/height. Also
  // mirrored to a CSS var so the scroll-snap padding-top can use it.
  useLayoutEffect(() => {
    const stickyHeader =
      document.querySelector<HTMLElement>("[data-product-fixed-header]");

    const update = () => {
      const h = Math.round(stickyHeader?.getBoundingClientRect().height ?? 0);
      setStickyOffset(h);
      const value = `${h}px`;
      document.documentElement.style.setProperty("--feature-sticky-offset", value);
      const preview = document.querySelector<HTMLElement>(".minimal-preview");
      if (preview) preview.style.setProperty("--feature-sticky-offset", value);
    };
    update();
    const ro = stickyHeader ? new ResizeObserver(update) : null;
    if (ro && stickyHeader) ro.observe(stickyHeader);
    window.addEventListener("resize", update);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", update);
      document.documentElement.style.removeProperty("--feature-sticky-offset");
    };
  }, []);

  // Active feature = the section closest to viewport center as you scroll.
  // Text scrolls naturally; only the phone stays sticky.
  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    let scrollEl: HTMLElement | null = null;
    let cursor: HTMLElement | null = sections[0].parentElement;
    while (cursor) {
      const cs = getComputedStyle(cursor);
      if (/(auto|scroll)/.test(cs.overflowY)) {
        scrollEl = cursor;
        break;
      }
      cursor = cursor.parentElement;
    }
    const target: EventTarget = scrollEl ?? window;

    let raf: number | null = null;
    const update = () => {
      raf = null;
      const containerTop = scrollEl
        ? scrollEl.getBoundingClientRect().top
        : 0;
      const containerH = scrollEl ? scrollEl.clientHeight : window.innerHeight;
      const visibleCenter = containerTop + containerH / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < sections.length; i++) {
        const r = sections[i].getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - visibleCenter);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setActiveIdx(best);
    };

    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(update);
    };

    update();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [features.length]);

  const active = features[activeIdx] ?? features[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] lg:gap-16 items-start">
      {/* Scrolling text column - hidden until sticky offset is measured to
          avoid a one-frame layout jump where sections center-justify in 100vh
          before re-centering in calc(100vh - stickyOffset). */}
      <div style={{ visibility: stickyOffset > 0 ? "visible" : "hidden" }}>
        {features.map((feature, idx) => (
          <section
            key={idx}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            className="feature-snap flex flex-col justify-center"
            style={{
              height: `calc(100vh - ${stickyOffset}px)`,
            }}
          >
            <div
              className="max-w-xl transition-opacity duration-500 ease-out"
              style={{ opacity: activeIdx === idx ? 1 : 0.25 }}
            >
              <div
                className="feature-mono-label flex items-start gap-2 mb-4"
                style={{ lineHeight: 1.4 }}
              >
                <span className="inline-block w-[10px] h-[10px] rounded-full bg-black mt-[3px] shrink-0" />
                <span>{feature.title.toUpperCase()}</span>
              </div>
              <p
                className="text-black leading-[1.5]"
                style={{
                  fontFamily: "var(--font-fair-favorit-book), sans-serif",
                  fontSize: 14,
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                {feature.description}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Sticky phone - stays put, screen content swaps with the active feature */}
      <div
        className="hidden lg:flex sticky self-start items-center justify-center"
        style={{
          top: `${stickyOffset}px`,
          height: `calc(100vh - ${stickyOffset}px)`,
          width: 400,
          visibility: stickyOffset > 0 ? "visible" : "hidden",
        }}
      >
        <PhoneVideo3D
          src={active?.video}
          imageSrc={active?.screenshots[0]?.src}
          baseTilt={{ x: -0.04, y: 0.12 }}
          height={720}
        />
      </div>
    </div>
  );
}
