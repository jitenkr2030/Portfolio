import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JitenderKumar - Full-Stack Developer & UI/UX Designer",
  description: "Professional portfolio of JitenderKumar, showcasing expertise in full-stack development, UI/UX design, and modern web technologies. Built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: ["JitenderKumar", "Full-Stack Developer", "UI/UX Designer", "Next.js", "TypeScript", "Tailwind CSS", "React", "Web Development"],
  authors: [{ name: "JitenderKumar" }],
  openGraph: {
    title: "JitenderKumar - Full-Stack Developer & UI/UX Designer",
    description: "Professional portfolio showcasing full-stack development and UI/UX design expertise",
    url: "https://jitenderkumar.com",
    siteName: "JitenderKumar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JitenderKumar - Full-Stack Developer & UI/UX Designer",
    description: "Professional portfolio showcasing full-stack development and UI/UX design expertise",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
