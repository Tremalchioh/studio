
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md sticky top-0 z-50 w-full">
      <div className="flex items-center justify-start gap-3">
        {!isHomePage ? (
          <Link href="/" aria-label="Вернуться на главную">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 h-8 w-8">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
        ) : (
          <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8" />
        )}
        <Link href="/" className="flex items-center gap-2">
           {isHomePage && <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 md:hidden" />} {/* Show icon on mobile home */}
          <h1 className="text-lg sm:text-xl font-bold">Zilant Learn</h1>
        </Link>
      </div>
    </header>
  );
}

