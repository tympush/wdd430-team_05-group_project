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
  title: "Handcrafted Haven",
  description: "Marketplace for artisans and handmade goods",
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



