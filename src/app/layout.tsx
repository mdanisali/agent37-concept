import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent37 — Managed OpenClaw Hosting & Skill Monetization",
  description:
    "Get your own OpenClaw instance for $3.99/mo. No setup work. Full terminal access. Live in ~60 seconds.",
  openGraph: {
    title: "Agent37 — Managed OpenClaw Hosting",
    description:
      "Your own OpenClaw instance. $3.99/mo. No setup. Full terminal. Live in ~60s.",
    siteName: "Agent37",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent37 — Managed OpenClaw Hosting",
    description:
      "Your own OpenClaw instance. $3.99/mo. No setup. Full terminal. Live in ~60s.",
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
