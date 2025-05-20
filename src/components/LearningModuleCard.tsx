"use client";

import type { LearningModule } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Bookmark, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface LearningModuleCardProps {
  module: LearningModule;
}

export default function LearningModuleCard({ module }: LearningModuleCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(module.bookmarked);
  const [currentProgress, setCurrentProgress] = useState(module.progress);

  // Effect to handle prop changes if module could be updated from parent
  useEffect(() => {
    setIsBookmarked(module.bookmarked);
    setCurrentProgress(module.progress);
  }, [module.bookmarked, module.progress]);


  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when toggling bookmark
    setIsBookmarked(!isBookmarked);
    // In a real app, you'd call an API here:
    // await api.updateBookmark(module.id, !isBookmarked);
  };

  const handleCardClick = () => {
    // Navigate to module details page
    // router.push(`/courses/${module.id}`);
    console.log(`Navigate to module: ${module.title}`);
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
            priority={module.id === '1'} // Example: prioritize first image
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle id={`module-title-${module.id}`} className="text-md sm:text-lg font-semibold text-foreground leading-tight">{module.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{module.description}</p>
        {currentProgress !== undefined && (
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
          onClick={(e) => { e.stopPropagation(); console.log('Start Learning'); }} // Prevent card click
        >
          <PlayCircle className="mr-1.5 h-4 w-4" />
          Start
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
