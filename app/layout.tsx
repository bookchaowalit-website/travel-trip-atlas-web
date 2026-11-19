import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Trip Atlas | Route planning desk | Bookchaowalit",
  description: "Three illustrative travel routes, read day by day with a rough budget: northern Thailand, the Gulf coast and Singapore. Not live travel data.",
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Bookchaowalit", title: "Trip Atlas | Route planning desk", description: "Illustrative routes read day by day, with the cost visible." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={geistSans.variable}><body>{children}</body></html>;
}
