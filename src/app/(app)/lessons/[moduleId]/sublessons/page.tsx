
"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { dummyModules } from '@/lib/dummyData';
import type { SubLesson } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckSquare, Square, Circle, BookOpenText, AlertTriangle } from 'lucide-react';

export default function SubLessonsListPage() {
  const params = useParams();
  const router = useRouter();
  
  const moduleId = params?.moduleId as string | undefined;

  if (!moduleId) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-10">
        <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
        <h1 className="text-2xl font-bold text-foreground">Ошибка загрузки подуроков</h1>
        <p className="text-muted-foreground mb-4">Не удалось определить идентификатор модуля из URL.</p>
        <p className="text-sm text-muted-foreground mb-4">Пожалуйста, убедитесь, что URL корректен, или вернитесь назад и попробуйте снова.</p>
        <Link href="/courses">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> К списку всех модулей
          </Button>
        </Link>
      </div>
    );
  }

  const module = dummyModules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-10">
        <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
        <h1 className="text-2xl font-bold text-foreground">Модуль не найден</h1>
        <p className="text-muted-foreground mb-4">Информация о модуле с ID "{moduleId}" не найдена.</p>
        <Link href="/courses">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> К списку всех модулей
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusIcon = (status: SubLesson['status']) => {
    switch (status) {
      case 'completed':
        return <CheckSquare className="h-5 w-5 text-green-500" />;
      case 'in_progress': 
        return <Circle className="h-5 w-5 text-yellow-500 animate-pulse" />;
      case 'not_started':
      default:
        return <Square className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const hasSubLessons = module.subLessons && module.subLessons.length > 0;

  return (
    <div className="space-y-6 p-4"> 
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Уроки модуля: {module.title}</h1>
        </div>
      </div>

      {!hasSubLessons ? (
        <Card className="shadow-md rounded-xl">
          <CardContent className="pt-6 text-center">
            <BookOpenText className="w-12 h-12 text-muted-foreground mb-4 inline-block" />
            <p className="text-muted-foreground">В этом модуле пока нет детализированных уроков.</p>
            <p className="text-sm text-muted-foreground mt-1">Контент скоро появится. Загляните позже!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {module.subLessons!.map((subLesson, index) => (
            <Link
              key={subLesson.id}
              href={`/lessons/${moduleId}/sublessons/${subLesson.id}`}
              className="block" 
            >
              <Card className="transition-shadow duration-200 rounded-lg cursor-pointer group"> {/* Removed hover:shadow-lg */}
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 text-primary font-semibold">{index + 1}.</div>
                    <h3 className="text-md font-medium text-foreground"> {/* Removed group-hover:text-primary */}
                      {subLesson.title}
                    </h3>
                  </div>
                  {getStatusIcon(subLesson.status)}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
