
"use client";

import type { LearningModule } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Bookmark, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

interface LearningModuleCardProps {
  module: LearningModule;
}

export default function LearningModuleCard({ module }: LearningModuleCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(module.bookmarked);
  const [currentProgress, setCurrentProgress] = useState(module.progress);
  const router = useRouter(); 

  useEffect(() => {
    setIsBookmarked(module.bookmarked);
    setCurrentProgress(module.progress);
  }, [module.bookmarked, module.progress]);


  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsBookmarked(!isBookmarked);
    // In a real app, you'd call an API here or update global state:
    // await api.updateBookmark(module.id, !isBookmarked);
    // For now, just visually toggle and update the module prop if necessary.
    // This component should not directly mutate dummyData.
    // module.bookmarked = !isBookmarked; // Avoid direct mutation of props
    console.log(`Visual bookmark for module ${module.id} toggled to ${!isBookmarked}. (Local state only)`);
  };

  const handleCardClick = () => {
    router.push(`/lessons/view/${module.id}`); 
  };

  return (
    <Card 
      className="overflow-hidden shadow-lg transition-all duration-300 rounded-xl cursor-pointer flex flex-col" // Removed hover:shadow-xl
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
        {currentProgress !== undefined && currentProgress >= 0 && ( 
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Прогресс</span>
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
          className="text-primary-foreground rounded-lg text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3" // Removed bg-primary hover:bg-primary/90 (handled by default variant)
          onClick={(e) => { 
            e.stopPropagation(); 
            router.push(`/lessons/view/${module.id}`); 
          }}
        >
          <PlayCircle className="mr-1.5 h-4 w-4" />
          {currentProgress && currentProgress > 0 ? 'Продолжить' : 'Начать'}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleBookmark} 
          aria-label={isBookmarked ? "Удалить закладку" : "Добавить закладку"}
          className="rounded-full text-muted-foreground" // Removed hover:bg-accent/10 hover:text-accent
          aria-pressed={isBookmarked}
        >
          <Bookmark className={cn("h-5 w-5 transition-colors", isBookmarked ? "fill-accent text-accent" : "")} />
        </Button>
      </CardFooter>
    </Card>
  );
}
