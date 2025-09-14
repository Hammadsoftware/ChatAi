import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ConverseAI',
  description: 'ConverseAI – Your intelligent AI chat and file upload platform.',
  keywords: ['AI Chatbot', 'ConverseAI', 'Next.js', 'Clerk', 'FastAPI', 'File Upload'],
  authors: [{ name: 'Hammad Tariq' }],
  creator: 'Hammad Tariq',
  themeColor: '#000000',
  openGraph: {
    title: 'ConverseAI',
    description: 'ConverseAI – Your intelligent AI chat and file upload platform.',
    siteName: 'ConverseAI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConverseAI',
    description: 'ConverseAI – Your intelligent AI chat and file upload platform.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
