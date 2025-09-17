// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReduceSize - Free Online Image Compression Tool",
  description:
    "ReduceSize helps you compress and reduce image file size instantly without losing quality. Optimize JPEG, PNG, WebP, HEIC, GIF images for web, social media, and storage.",
  keywords: [
    // Core
    "image compression",
    "reduce image size",
    "image optimizer",
    "image resizer",
    "online image compressor",
    "compress images without losing quality",

    // Formats
    "jpeg compressor",
    "jpg compressor",
    "png compressor",
    "webp compressor",
    "gif compressor",
    "heic compressor",
    "svg compressor",

    // Use cases
    "compress images for web",
    "compress images for social media",
    "compress images for whatsapp",
    "compress images for email",
    "compress images for storage",
    "compress images for website speed",

    // Features
    "bulk image compressor",
    "free online image compressor",
    "fast image compression tool",
    "reduce photo size kb mb",
    "shrink image file size",
    "optimize images for seo",
    "compress images to upload faster",
    "online photo compressor tool",

    // Brand
    "ReduceSize app",
    "ReduceSize online tool",
  ],
  openGraph: {
    title: "ReduceSize - Compress Images Instantly",
    description:
      "ReduceSize helps you compress and reduce image file size instantly without losing quality. Optimize JPEG, PNG, WebP, HEIC, GIF images for web, social media, and storage.",
    siteName: "ReduceSize",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReduceSize - Free Online Image Compression Tool",
    description:
      "ReduceSize helps you compress and reduce image file size instantly without losing quality. Optimize JPEG, PNG, WebP, HEIC, GIF images for web, social media, and storage.",
  },
  icons: {
    icon: "/favicon.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
