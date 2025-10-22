import { Geist, Geist_Mono, Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";
import VantaBackground from "./vanta-background";
import { SanityLive } from "@/sanity/lib/live";

const geistBold = Geist({
  variable: "--font-geist-bold",
  subsets: ["latin"],
  weight: "700",
});

const geistRegular = Geist({
  variable: "--font-geist-regular",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interBold = Inter({
  variable: "--font-inter-bold",
  subsets: ["latin"],
  weight: "700",
});

const interRegular = Inter({
  variable: "--font-inter-regular",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth cursor-none dark">
      <head>
        <title>Rohan Mistry</title>
        <meta name="apple-mobile-web-app-title" content="Rohan" />
      </head>
      <body
        className={`${geistBold.variable} ${geistRegular.variable} ${geistMono.variable} ${interBold.variable} ${interRegular.variable} antialiased`}
      >
        <VantaBackground />
        <ClientLayout>{children}</ClientLayout>
        <SanityLive />
      </body>
    </html>
  );
}
