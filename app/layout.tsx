import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven – Unique Handmade Goods & Artisan Marketplace",
    template: "%s | Handcrafted Haven",
  },
  description:
    "Discover unique handmade products crafted by talented artisans. Handcrafted Haven is your marketplace for one-of-a-kind decor, jewelry, art, gifts, and sustainable handcrafted goods.",
  keywords: [
    "handmade marketplace",
    "artisan products",
    "handcrafted goods",
    "unique gifts",
    "artisan shop",
    "craft marketplace",
    "sustainable products",
    "handmade decor",
    "custom gifts",
  ],
  authors: [{ name: "Handcrafted Haven" }],
  creator: "Handcrafted Haven",
  metadataBase: new URL("https://wdd430-team-05-group-project.vercel.app/"),

  openGraph: {
    title: "Handcrafted Haven – Discover Unique Handmade Goods",
    description:
      "Shop authentic artisan-made products: decor, jewelry, art, apparel, gifts, and eco-friendly handcrafted items.",
    url: "https://wdd430-team-05-group-project.vercel.app/",
    siteName: "Handcrafted Haven",
    type: "website",
    images: [
      {
        url: "logo-white.png",
        width: 1200,
        height: 630,
        alt: "Handcrafted Haven Marketplace",
      },
    ],
  },

  alternates: {
    canonical: "https://wdd430-team-05-group-project.vercel.app/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="antialiased bg-color-background text-color-foreground font-sans">
        <SessionProvider>
          <Navbar />
          <main className="mt-16">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}



