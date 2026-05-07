import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const fairFavoritBody = localFont({
  src: [
    { path: "../../public/fonts/FAIRFavorit-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/FAIRFavorit-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-fair-favorit-body",
  display: "swap",
});

const fairFavoritHeading = localFont({
  src: "../../public/fonts/FAIRFavorit-Regular.woff2",
  variable: "--font-fair-favorit-heading",
  display: "swap",
  preload: false,
});

const fairFavoritBook = localFont({
  src: "../../public/fonts/FAIRFavorit-Book.otf",
  variable: "--font-fair-favorit-book",
  display: "swap",
  preload: false,
});

const fairFavoritMono = localFont({
  src: "../../public/fonts/FAIRFavoritMono-Book.woff2",
  variable: "--font-fair-favorit-mono",
  display: "swap",
});

const pitchSans = localFont({
  src: "../../public/fonts/TestPitchSans-Regular.otf",
  variable: "--font-pitch-sans",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "=DATA",
  description: "Equals Series A investor data room. The music social network uniting the world through music.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fairFavoritBody.variable} ${fairFavoritHeading.variable} ${fairFavoritBook.variable} ${fairFavoritMono.variable} ${pitchSans.variable} h-full antialiased`}>
      <head>
        {/* Lightweight prefetches only — the heavy assets (three.module.js,
            earth-blue-marble.jpg) stay off the home critical path; LiveContent
            requests them after the menu transition completes. */}
        <link rel="prefetch" href="/equals-globe/globe.html" as="document" />
        <link rel="prefetch" href="https://dataroom-production-ac2b.up.railway.app/api/globe-pairs?limit=100" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
