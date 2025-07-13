import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClarityLegal AI Agent",
  description: "AI-powered legal document explainer for freelancers and small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      className={`bg-gradient-to-br from-primary-light via-white to-accent-light ${poppins.variable} ${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <body className="font-body antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
