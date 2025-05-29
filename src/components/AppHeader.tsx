
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // Determine if the current page is an "app" page (i.e., not the root login/landing page)
  // and specifically not the home page of the app section.
  const isAppSubPage = pathname.startsWith('/(app)/') && pathname !== '/(app)/home' && pathname !== '/home';
  const isHomePage = pathname === '/(app)/home' || pathname === '/home';


  const handleBack = () => {
    // If it's an app sub-page, try to go back, otherwise go to home.
    // This simplistic back might not always be ideal for deep navigation.
    if (pathname.includes('/lessons/') || pathname.includes('/history/')) {
        const segments = pathname.split('/');
        if (segments.length > 3) { // e.g. /(app)/lessons/id/sublessons or /(app)/history/id
            router.back(); // Go back to previous page in history
            return;
        }
    }
    router.push('/home'); // Default back to home for main app sections
  };


  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md sticky top-0 z-50 w-full">
      <div className="flex items-center justify-start gap-3">
        {!isHomePage ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack} 
            aria-label="Назад"
            className="text-primary-foreground hover:bg-primary/80 h-8 w-8"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        ) : (
           <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8" /> // Show icon on home page only
        )}
        <Link href="/home" className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl font-bold">Zilant Learn</h1>
        </Link>
      </div>
    </header>
  );
}
