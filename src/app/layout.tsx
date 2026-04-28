import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const fairFavoritBody = localFont({
  src: [
    { path: "../../public/fonts/FAIRFavorit-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/FAIRFavorit-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-fair-favorit-body",
  display: "swap",
});

const fairFavoritHeading = localFont({
  src: "../../public/fonts/FAIRFavoritExtended-Ultra.otf",
  variable: "--font-fair-favorit-heading",
  display: "swap",
});

const fairFavoritMono = localFont({
  src: "../../public/fonts/FAIRFavoritMono-Book.otf",
  variable: "--font-fair-favorit-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Equals - Series A Data Room",
  description: "Equals Series A investor data room. The music social network uniting the world through music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fairFavoritBody.variable} ${fairFavoritHeading.variable} ${fairFavoritMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
