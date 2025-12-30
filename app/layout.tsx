import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "Nexus - Modern Project Management",
    template: "%s | Nexus",
  },
  description:
    "Nexus is a modern project management platform designed to help teams organize tasks, track progress, and collaborate efficiently. Features smart task management, real-time dashboards, and seamless team collaboration.",

  // Keywords for SEO
  keywords: [
    "project management",
    "task management",
    "team collaboration",
    "productivity",
    "project tracking",
    "task organizer",
    "workflow management",
    "agile",
    "kanban",
    "real-time dashboard",
    "project planning",
  ],

  // Authors
  authors: [
    {
      name: "Fandresena",
      url: "https://fandresena.vercel.app",
    },
  ],

  // Creator
  creator: "Fandresena",

  // Publisher
  publisher: "Fandresena",

  // Format Detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Robots
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

  // Verification
  verification: {
    google: "your-google-verification-code",
  },

  // Category
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Toaster position="top-center" duration={5000} closeButton richColors />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
