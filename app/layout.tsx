import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from 'next/link';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000", // Dark theme color
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gitwrap.dev'), // Update with your actual domain
  title: "GitWrap - GitHub Year in Review",
  description: "Transform your GitHub activity into a beautiful visualization. View your coding stats, contributions, and achievements in style. Your GitHub year in review made beautiful.",
  keywords: [
    "GitHub Stats",
    "Developer Portfolio",
    "Git Analytics",
    "Coding Activity",
    "GitHub Contributions",
    "Code Visualization",
    "Developer Tools",
    "GitHub Profile",
    "Contribution Graph",
    "Coding Metrics",
    "GitHub Year in Review",
    "Developer Statistics",
    "Code Activity Tracker",
    "GitHub Analytics",
    "Programming Stats"
  ],
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GitWrap",
  },
  other: {
    'mobile-web-app-capable': 'yes'
  },
  openGraph: {
    title: "GitWrap - Your GitHub Year in Review",
    description: "Transform your GitHub activity into a beautiful visualization. View your coding stats, contributions, and achievements in style.",
    url: "https://gitwrap.dev", // Update with your actual domain
    siteName: "GitWrap",
    images: [
      {
        url: "/og.jpg", // Create an attractive OG image
        width: 1200,
        height: 630,
        alt: "GitWrap - Beautiful GitHub Stats Visualization"
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitWrap - GitHub Year in Review",
    description: "Transform your GitHub activity into a beautiful visualization. Your coding journey, beautifully presented.",
    creator: "@must_be_ash", // Update with your Twitter handle
    images: ["/og.jpg"], // Same OG image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className="bg-black">
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black">
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="border-t border-gray-800 bg-black">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  © 2025 GitWrap. All rights reserved.
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <Link
                    href="https://mustbeash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    Created by @must_be_ash
                  </Link>
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
