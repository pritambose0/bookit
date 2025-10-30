import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bookit – Find and Book Your Next Stay or Experience",
  description:
    "Bookit helps you discover unique stays, adventures, and local experiences tailored to your preferences. Explore destinations, compare listings, and start your next journey effortlessly.",
  keywords: [
    "Bookit",
    "travel booking app",
    "hotel booking",
    "vacation rentals",
    "experiences",
    "nextjs project",
    "mern booking app",
    "trip planner",
    "adventure booking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#F9F9F9]`}>
        <ScrollToTop />
        <Toaster />
        <Header />
        <div className="pt-28">{children}</div>
      </body>
    </html>
  );
}
