
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { dummyModules } from '@/lib/dummyData';
import { ArrowLeft, BookOpen, ListChecks, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

export default function LessonModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  
  const module = dummyModules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-10">
        <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
        <h1 className="text-2xl font-bold mb-2 text-foreground">Модуль не найден</h1>
        <p className="text-muted-foreground mb-4">К сожалению, модуль с идентификатором "{moduleId}" не найден.</p>
        <Link href="/courses">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Вернуться ко всем модулям
            </Button>
        </Link>
      </div>
    );
  }

  const handleGoToSubLessons = () => {
    router.push(`/lessons/${moduleId}/sublessons`);
  };

  const hasSubLessons = module.subLessons && module.subLessons.length > 0;

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Назад
      </Button>
      <Card className="overflow-hidden shadow-lg rounded-xl">
        {module.imageUrl && (
          <div className="relative w-full h-56 sm:h-64">
            <Image
              src={module.imageUrl}
              alt={module.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 60vw"
              style={{ objectFit: 'cover' }}
              className="bg-muted rounded-t-xl"
              data-ai-hint={module.imageHint}
              priority
            />
          </div>
        )}
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{module.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm sm:prose-base max-w-none text-foreground dark:prose-invert prose-p:leading-relaxed prose-headings:text-primary">
            <p className="text-muted-foreground text-sm mb-2">
              {module.tags?.join(' • ')} 
              {hasSubLessons && ` • ${module.subLessons?.length} уроков`}
              {!hasSubLessons && module.lessonsCount && ` • ${module.lessonsCount} уроков (контент скоро появится)`}
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Описание модуля
            </h3>
            <p>{module.description}</p>
            <p className="mt-4">
              Этот модуль "{module.title}" проведет вас через ключевые понятия и материалы. 
              {hasSubLessons ? "Каждый модуль разбит на более мелкие уроки для лучшего усвоения." : "Содержание этого модуля скоро будет детализировано по урокам."}
            </p>
            {!hasSubLessons && (
              <p className="mt-4 text-muted-foreground">
                Подробные уроки для этого модуля скоро появятся. Загляните позже!
              </p>
            )}
          </div>
        </CardContent>
        {hasSubLessons && (
          <CardFooter>
            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-base"
              onClick={handleGoToSubLessons}
            >
              <ListChecks className="mr-2 h-5 w-5" />
              Перейти к урокам модуля
            </Button>
          </CardFooter>
        )}
         {!hasSubLessons && (
          <CardFooter>
            <p className="text-sm text-muted-foreground w-full text-center">
              Детализированные уроки для этого модуля скоро будут добавлены.
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
