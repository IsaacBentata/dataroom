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
        {/* Prefetch heavy /live globe assets so the Realtime preview feels
            instant when the user navigates to it from the home selector.
            All same-origin → just warms the HTTP cache; iframe re-uses. */}
        <link rel="prefetch" href="/equals-globe/globe.html" as="document" />
        <link rel="prefetch" href="/equals-globe/vendor/three.module.js" as="script" crossOrigin="anonymous" />
        <link rel="prefetch" href="/equals-globe/textures/earth-blue-marble.jpg" as="image" />
        <link rel="prefetch" href="https://dataroom-production-ac2b.up.railway.app/api/globe-pairs?limit=100" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
