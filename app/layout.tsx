import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  icons: "",
  title: "Nexus",
  description: "Management project app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster
          position="top-center"
          duration={10000}
          expand
          theme="dark"
          closeButton
          richColors
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
