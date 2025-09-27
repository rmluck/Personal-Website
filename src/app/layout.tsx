import { Geist, Geist_Mono, Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";
import { useEffect } from "react";
import VantaBackground from "./vanta-background";

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
    <html lang="en" className="scroll-smooth cursor-none bg-pro100 dark:bg-pro850">
      <head>
        <title>Rohan Mistry</title>
      </head>
      <body
        className={`${geistBold.variable} ${geistRegular.variable} ${geistMono.variable} ${interBold.variable} ${interRegular.variable} antialiased`}
      >
        <VantaBackground />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
