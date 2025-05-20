
"use client";

import type { LearningModule } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Bookmark, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

interface LearningModuleCardProps {
  module: LearningModule;
}

export default function LearningModuleCard({ module }: LearningModuleCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(module.bookmarked);
  const [currentProgress, setCurrentProgress] = useState(module.progress);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    setIsBookmarked(module.bookmarked);
    setCurrentProgress(module.progress);
  }, [module.bookmarked, module.progress]);


  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsBookmarked(!isBookmarked);
    // In a real app, you'd call an API here:
    // await api.updateBookmark(module.id, !isBookmarked);
    // For now, also update the global dummyModules for some consistency IF this card is on profile page and its bookmarked state changes
    // This is a hacky way to simulate persistence for the demo
    const mod = dummyModules.find(m => m.id === module.id);
    if (mod) mod.bookmarked = !isBookmarked;
    console.log(`Bookmark for module ${module.id} toggled to ${!isBookmarked}`);
  };

  const handleCardClick = () => {
    router.push(`/lessons/${module.id}`); // Navigate to lesson content page
  };

  return (
    <Card 
      className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer flex flex-col"
      onClick={handleCardClick}
      role="article"
      aria-labelledby={`module-title-${module.id}`}
    >
      {module.imageUrl && (
        <div className="relative w-full h-40 sm:h-48">
          <Image
            src={module.imageUrl}
            alt={module.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="rounded-t-xl"
            data-ai-hint={module.imageHint}
            priority={module.id === '1'} 
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle id={`module-title-${module.id}`} className="text-md sm:text-lg font-semibold text-foreground leading-tight">{module.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{module.description}</p>
        {currentProgress !== undefined && currentProgress >= 0 && ( // Ensure progress is valid
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{currentProgress}%</span>
            </div>
            <Progress value={currentProgress} className="h-2 bg-secondary" indicatorClassName="bg-primary" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0 pb-3 px-4 sm:px-6">
        <Button 
          variant="default" 
          size="sm" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3"
          onClick={(e) => { 
            e.stopPropagation(); 
            router.push(`/lessons/${module.id}`); // Also navigate on button click
          }}
        >
          <PlayCircle className="mr-1.5 h-4 w-4" />
          {currentProgress && currentProgress > 0 ? 'Continue' : 'Start'}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleBookmark} 
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          className="rounded-full text-muted-foreground hover:bg-accent/10 hover:text-accent"
          aria-pressed={isBookmarked}
        >
          <Bookmark className={cn("h-5 w-5 transition-colors", isBookmarked ? "fill-accent text-accent" : "")} />
        </Button>
      </CardFooter>
    </Card>
  );
}

// Hacky way to make dummyModules accessible for bookmark toggle simulation
// In a real app, this would be managed by a global state or API
import { dummyModules } from '@/lib/dummyData';
