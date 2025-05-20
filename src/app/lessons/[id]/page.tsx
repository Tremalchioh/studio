
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { dummyModules } from '@/lib/dummyData';
import { ArrowLeft, BookOpen, ListChecks } from 'lucide-react';
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
        <h1 className="text-2xl font-bold mb-2">Модуль не найден</h1>
        <p className="text-muted-foreground mb-4">Модуль, который вы ищете, не существует.</p>
        <Link href="/">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Вернуться на главную
            </Button>
        </Link>
      </div>
    );
  }

  const handleGoToSubLessons = () => {
    router.push(`/lessons/${moduleId}/sublessons`);
  };

  return (
    <div className="space-y-6">
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
              {module.subLessons && module.subLessons.length > 0 && ` • ${module.subLessons.length} уроков`}
              {(!module.subLessons || module.subLessons.length === 0) && module.lessonsCount && ` • ${module.lessonsCount} уроков`}
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Описание модуля
            </h3>
            <p>{module.description}</p>
            <p className="mt-4">
              Этот модуль "{module.title}" проведет вас через ключевые понятия и материалы. Каждый модуль разбит на более мелкие уроки для лучшего усвоения.
            </p>
            {(!module.subLessons || module.subLessons.length === 0) && (
              <p className="mt-4 text-muted-foreground">
                Содержание этого модуля скоро появится. Загляните позже!
              </p>
            )}
          </div>
        </CardContent>
        {module.subLessons && module.subLessons.length > 0 && (
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
      </Card>
    </div>
  );
}
