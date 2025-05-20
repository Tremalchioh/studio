// src/components/BottomNav.tsx
"use client";

import Link from 'next/link';
import { Home, BookOpenText, Bookmark, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/courses', label: 'Courses', icon: BookOpenText },
  { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-card border-t border-border shadow-t-lg fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 h-16">
      <div className="flex justify-around items-center h-full px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-1 rounded-md w-1/4 h-full transition-colors duration-200 ease-in-out",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs sm:text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
