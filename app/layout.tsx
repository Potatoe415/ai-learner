import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { ProgressProvider } from "@/lib/progress";
import SideNav from "@/components/SideNav";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-bricolage" });
const body = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-figtree" });

export const metadata: Metadata = {
  title: "AI Academy · AI integration in organisations",
  description: "Learn applied agentic AI step by step, from the agent loop to your own enterprise adoption plan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <ProgressProvider>
          <SideNav>{children}</SideNav>
        </ProgressProvider>
      </body>
    </html>
  );
}
