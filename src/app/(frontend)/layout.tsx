import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import "./styles.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "John Dennehy — Software Engineer",
  description:
    "John Dennehy — frontend and full-stack developer based in London. Portfolio, projects, and a bit about the journey from financial services to code.",
};

export default async function RootLayout(props: { 
  children: React.ReactNode
  modal: React.ReactNode 
}) {
  const { children, modal } = props;

  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Analytics />
        {/* Ambient background gradient mesh */}
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full opacity-20 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-1/3 -right-1/4 h-[600px] w-[600px] rounded-full opacity-15 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, var(--color-accent-secondary) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Page content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1 pt-16">{children}</main>
          {modal}
          <Footer />
        </div>
      </body>
    </html>
  );
}
