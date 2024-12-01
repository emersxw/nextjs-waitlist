import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Inquitab - AI-Powered Chrome Extension for Students",
  description: "Get instant answers and explanations for your online questions. Inquitab automatically detects questions and provides detailed explanations using AI.",
  keywords: [
    "online learning",
    "student help",
    "AI education",
    "chrome extension",
    "study aid",
    "homework help",
    "educational technology",
    "e-learning",
    "AI tutor",
    "question answering"
  ],
  authors: [{ name: "Inquitab" }],
  creator: "Inquitab",
  publisher: "Inquitab",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inquitab.com",
    siteName: "Inquitab",
    title: "Inquitab - Smart Learning Assistant",
    description: "AI-powered Chrome extension that helps students get instant answers and explanations for online questions.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inquitab Chrome Extension",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inquitab - AI Study Assistant",
    description: "Get instant answers and explanations for your online questions with AI",
    images: ["/images/twitter-image.png"],
    creator: "@inquitab",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  alternates: {
    canonical: "https://inquitab.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
