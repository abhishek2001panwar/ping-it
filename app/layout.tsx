import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReminderProvider } from "@/contexts/ReminderContext";
import { BottomNav } from "@/components/BottomNav";
import { InstallPrompt } from "@/components/InstallPrompt";
import { PWAInstaller } from "@/components/PWAInstaller";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ping It - Context Reminder",
  description: "Context-aware one-time reminder app for daily tasks",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ping It",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon-192.svg" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        <ReminderProvider>
          <PWAInstaller />
          <InstallPrompt />
          <main className="pb-20 max-w-4xl mx-auto">
            {children}
          </main>
          <BottomNav />
        </ReminderProvider>
      </body>
    </html>
  );
}
