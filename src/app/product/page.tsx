"use client";

import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";

interface FeatureSection {
  title: string;
  description: string;
  screenshots: { src: string; alt: string }[];
}

const features: FeatureSection[] = [
  {
    title: "The Feed - Hot Takes and Reviews",
    description:
      "The Feed is where music becomes conversation. Users post hot takes, album reviews, and music opinions that spark real debate. Unlike algorithmic content feeds, every post on Equals comes from a verified human. This is the core social loop - music as the starting point for genuine connection. The Feed drives daily return behavior and sets the tone for the entire experience.",
    screenshots: [{ src: "/screenshots/feed.png", alt: "The Feed" }],
  },
  {
    title: "Meet - Friend Recommendations Based on Music Taste",
    description:
      "Meet is how users discover each other. Rather than following celebrities or influencers, Equals recommends real people based on shared music taste. The algorithm analyses listening preferences, reviews, and engagement patterns to surface people you would actually want to be friends with. This is the engine behind the social graph - and it is why users with more friends retain dramatically better.",
    screenshots: [{ src: "/screenshots/meet-card.png", alt: "Meet card" }],
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
      { src: "/screenshots/album-page.png", alt: "Album page" },
      { src: "/screenshots/track-detail.png", alt: "Track detail" },
    ],
  },
  {
    title: "Music Quizzes - Test Your Knowledge",
    description:
      "Quizzes turn music fandom into a game. Users compete on artist-specific trivia, testing their superfan credentials. This feature drives engagement and time-on-app while reinforcing music identity - one of the core emotional hooks that keeps users coming back. Quizzes also create shareable moments that drive organic acquisition.",
    screenshots: [{ src: "/screenshots/music-quiz.png", alt: "Music quiz" }],
  },
  {
    title: "Chat Rooms - Live Fan Conversations",
    description:
      "Every artist and community on Equals has a live chat room. These are real-time, unmoderated spaces where fans talk about new releases, share opinions, and build relationships. Chat rooms are where casual users become power users - the transition from consuming content to participating in community. This is the feature that most directly competes with Discord and Reddit for music fan attention.",
    screenshots: [
      { src: "/screenshots/chats-with-rooms.png", alt: "Chat rooms overview" },
      { src: "/screenshots/chat-room-inside.png", alt: "Inside a chat room" },
    ],
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
    <Section>
      <div className="mb-12">
        <PageHeader
          label="The Product"
          title="A music social network built for real connection"
          subtitle="Every feature is connected by the same thread: music as the foundation for human connection. Here is how the app works, feature by feature."
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="text-xl font-bold text-accent-green mb-1">4.5+</div>
          <div className="text-xs text-foreground-secondary">App Store Rating</div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="text-xl font-bold text-accent-blue mb-1">1:1</div>
          <div className="text-xs text-foreground-secondary">Male / Female Ratio</div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="text-xl font-bold text-accent-purple mb-1">37 min</div>
          <div className="text-xs text-foreground-secondary">Daily Time Spent</div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="text-xl font-bold text-accent-orange mb-1">100%</div>
          <div className="text-xs text-foreground-secondary">Verified Humans</div>
        </div>
      </div>

      <div className="space-y-20">
        {features.map((feature, idx) => (
          <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className={`${idx % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="text-xs text-accent-blue font-medium uppercase tracking-wider mb-2">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className={`flex gap-3 justify-center ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
              {feature.screenshots.map((ss, i) => (
                <div
                  key={i}
                  className={`relative rounded-xl overflow-hidden border border-border ${
                    feature.screenshots.length === 1
                      ? "w-48 md:w-56"
                      : feature.screenshots.length === 2
                      ? "w-36 md:w-44"
                      : "w-28 md:w-36"
                  }`}
                  style={{ aspectRatio: "9/19.5" }}
                >
                  <Image
                    src={ss.src}
                    alt={ss.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
