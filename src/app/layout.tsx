
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Correct import from next/font/google
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/AppHeader';

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
  description: 'Интерактивная платформа для изучения татарского языка и культуры.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <div className="flex flex-col min-h-screen max-w-md mx-auto bg-card shadow-xl overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4"> {/* Removed pb-20, default p-4 is fine */}
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}

