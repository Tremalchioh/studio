import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Correct import from next/font/google
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zilant Learn',
  description: 'Interactive learning platform for Tatar language and culture.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <div className="flex flex-col min-h-screen max-w-md mx-auto bg-card shadow-xl overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 pb-20"> {/* Added pb-20 to prevent content overlap with BottomNav */}
            {children}
          </main>
          <BottomNav />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
