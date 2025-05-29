
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
        <h1 className="text-2xl font-bold mb-2 text-foreground">Загрузка профиля...</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6"> {/* Removed transition and background classes from here */}
      {/* Dedicated div for background image */}
      <div
        className={cn(
          "w-full h-52 rounded-lg transition-all duration-500", // Increased height
          selectedBackground === 'tyubeteika' ? 'profile-bg-tyubeteika' : '', 
          selectedBackground === 'tulip' ? 'profile-bg-tulip' : '',
          selectedBackground === 'default' ? 'bg-muted/50' : 'bg-card' // Default or card bg
        )}
        aria-hidden="true" // Decorative
      >
        {/* This div is intentionally empty if it's just for background */}
      </div>

      <section className="text-center -mt-20 relative z-10"> {/* Adjust margin to overlap or position user info */}
        <UserCog className="w-20 h-20 text-primary mb-3 inline-block bg-card p-2 rounded-full shadow-lg" />
        <h1 className="text-3xl font-bold mb-1 text-foreground">Мой профиль</h1>
        <p className="text-muted-foreground max-w-sm mx-auto text-sm">
          Управляйте своим аккаунтом, отслеживайте прогресс и настраивайте свое учебное пространство.
        </p>
      </section>

      <section className="relative z-10">
        <h2 className="text-xl font-semibold mb-3 text-foreground text-center">Настроить фон</h2>
        <div className="flex gap-3 justify-center">
          <Button 
            variant={selectedBackground === 'tyubeteika' ? 'default' : 'outline'} 
            onClick={() => handleBackgroundChange('tyubeteika')}
            className="rounded-lg"
          >
            <ImageIcon className="mr-2 h-5 w-5" /> Тюбетейка
          </Button>
          <Button 
            variant={selectedBackground === 'tulip' ? 'default' : 'outline'} 
            onClick={() => handleBackgroundChange('tulip')}
            className="rounded-lg"
          >
            <Flower2 className="mr-2 h-5 w-5" /> Тюльпан
          </Button>
          {selectedBackground !== 'default' && (
             <Button 
              variant="ghost" 
              onClick={() => handleBackgroundChange('default')}
              className="rounded-lg text-muted-foreground"
            >
              Сбросить
            </Button>
          )}
        </div>
        { selectedBackground !== 'default' && 
          <p className="text-xs text-center mt-2 text-muted-foreground">
            Выбран фон: {selectedBackground === 'tyubeteika' ? 'Тюбетейка' : 'Тюльпан'}.
          </p>
        }
      </section>

      <section className="relative z-10">
        <div className="flex items-center mb-4">
          <Bookmark className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-xl font-semibold text-foreground">Мои закладки</h2>
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
            <p className="text-muted-foreground">Вы еще не добавили ни одного урока в закладки.</p>
            <p className="text-sm text-muted-foreground mt-1">Изучайте уроки и нажимайте на значок закладки, чтобы сохранить их здесь.</p>
          </div>
        )}
      </section>
      
      <section className="text-center py-6 relative z-10">
        <p className="text-muted-foreground">Больше функций профиля скоро!</p>
      </section>
    </div>
  );
}
