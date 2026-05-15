import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LEOV | Redefining Authority in Global Business",
  description: "LEOV combines fintech-grade innovation with world-class corporate strategy to scale your vision across borders. Fast, secure, and relentlessly professional.",
  keywords: ["LEOV", "Corporate Strategy", "Fintech Innovation", "Global Business", "Infrastructure", "African Business"],
  authors: [{ name: "LEOV Corporate" }],
  openGraph: {
    title: "LEOV | Redefining Authority in Global Business",
    description: "LEOV combines fintech-grade innovation with world-class corporate strategy to scale your vision across borders.",
    url: "https://leov.com",
    siteName: "LEOV",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEOV | Redefining Authority in Global Business",
    description: "LEOV combines fintech-grade innovation with world-class corporate strategy to scale your vision across borders.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
