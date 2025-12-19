import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "Nexus - Modern Project Management App",
    template: "%s | Nexus",
  },
  description:
    "Nexus is a modern project management application designed to help teams and individuals organize tasks, track progress, and collaborate efficiently. Real-time dashboards, smart task management, and seamless collaboration.",

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
      url: "https://yourcompany.com",
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

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexus-fandresena.vercel.app",
    siteName: "Nexus",
    title: "Nexus - Modern Project Management App",
    description:
      "Organize tasks, track progress, and collaborate efficiently with Nexus. The modern project management solution for teams and individuals.",
    images: [
      {
        url: "https://nexus-fandresena.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexus Project Management Dashboard",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@yournexusapp",
    creator: "@yournexusapp",
    title: "Nexus - Modern Project Management App",
    description:
      "Organize tasks, track progress, and collaborate efficiently with Nexus. The modern project management solution for teams and individuals.",
    images: ["https://nexus-fandresena.vercel.app/twitter-image.png"],
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },

  // Manifest for PWA
  manifest: "/manifest.json",

  // Theme Color
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],

  // Viewport (Next.js 14+ handles this automatically, but you can customize)
  // viewport: "width=device-width, initial-scale=1, maximum-scale=5",

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

  // Verification (add your verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Category
  category: "productivity",

  // Alternate Languages (if you support multiple languages)
  // alternates: {
  //   canonical: "https://nexus-fandresena.vercel.app",
  //   languages: {
  //     "en-US": "https://nexus-fandresena.vercel.app/en-US",
  //     "es-ES": "https://nexus-fandresena.vercel.app/es-ES",
  //     "fr-FR": "https://nexus-fandresena.vercel.app/fr-FR",
  //   },
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <Toaster
          position="top-center"
          duration={10000}
          expand
          theme="dark"
          closeButton
          richColors
        />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
