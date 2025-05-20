
"use client";

import { useState, useEffect } from 'react';
import { UserCog, Bookmark, Image as ImageIcon, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LearningModuleCard from '@/components/LearningModuleCard';
import { dummyModules } from '@/lib/dummyData'; // Assuming dummyModules are moved here
import type { LearningModule } from '@/types';
import { cn } from '@/lib/utils';

type BackgroundOption = 'default' | 'tyubeteika' | 'tulip';

export default function ProfilePage() {
  const [bookmarkedModules, setBookmarkedModules] = useState<LearningModule[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<BackgroundOption>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Filter bookmarked modules once on client-side
    const filteredBookmarks = dummyModules.filter(m => m.bookmarked);
    setBookmarkedModules(filteredBookmarks);

    // Persist/retrieve background choice from localStorage
    const storedBg = localStorage.getItem('profileBackground') as BackgroundOption | null;
    if (storedBg) {
      setSelectedBackground(storedBg);
    }
  }, []);

  const handleBackgroundChange = (bg: BackgroundOption) => {
    setSelectedBackground(bg);
    if (mounted) {
      localStorage.setItem('profileBackground', bg);
    }
  };
  
  // Prevent hydration mismatch for localStorage access
  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-10">
        <UserCog className="w-16 h-16 text-primary mb-6 animate-pulse" />
        <h1 className="text-2xl font-bold mb-2 text-foreground">Loading Profile...</h1>
      </div>
    );
  }

  return (
    <div className={cn(
      "space-y-8 transition-all duration-500",
      selectedBackground === 'tyubeteika' ? 'profile-bg-tyubeteika' : '', // These classes would need to be defined in globals.css
      selectedBackground === 'tulip' ? 'profile-bg-tulip' : ''
    )}>
      <section className="text-center">
        <UserCog className="w-20 h-20 text-primary mb-4 inline-block" />
        <h1 className="text-3xl font-bold mb-2 text-foreground">My Profile</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Manage your account, track progress, and customize your learning space.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3 text-foreground">Customize Background</h2>
        <div className="flex gap-3 justify-center">
          <Button 
            variant={selectedBackground === 'tyubeteika' ? 'default' : 'outline'} 
            onClick={() => handleBackgroundChange('tyubeteika')}
            className="rounded-lg"
          >
            <ImageIcon className="mr-2 h-5 w-5" /> Tyubeteika
          </Button>
          <Button 
            variant={selectedBackground === 'tulip' ? 'default' : 'outline'} 
            onClick={() => handleBackgroundChange('tulip')}
            className="rounded-lg"
          >
            <Flower2 className="mr-2 h-5 w-5" /> Tulip
          </Button>
          {selectedBackground !== 'default' && (
             <Button 
              variant="ghost" 
              onClick={() => handleBackgroundChange('default')}
              className="rounded-lg text-muted-foreground"
            >
              Reset
            </Button>
          )}
        </div>
        {/* Placeholder for what the background would look like. In a real app, this div's background would change. */}
        { selectedBackground !== 'default' && 
          <p className="text-xs text-center mt-2 text-muted-foreground">
            Selected: {selectedBackground}. Background applied to profile container. (Styling for actual background image/pattern needs to be added in CSS)
          </p>
        }
      </section>

      <section>
        <div className="flex items-center mb-4">
          <Bookmark className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-xl font-semibold text-foreground">My Bookmarks</h2>
        </div>
        {bookmarkedModules.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {bookmarkedModules.map(module => (
              <LearningModuleCard key={module.id} module={module} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted/50 rounded-lg">
            <Bookmark className="w-12 h-12 text-muted-foreground mb-4 inline-block" />
            <p className="text-muted-foreground">You haven't bookmarked any lessons yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Explore lessons and tap the bookmark icon to save them here.</p>
          </div>
        )}
      </section>
      
      {/* Future: Display user stats, settings, etc. */}
      <section className="text-center py-6">
        <p className="text-muted-foreground">More profile features coming soon!</p>
      </section>
    </div>
  );
}
