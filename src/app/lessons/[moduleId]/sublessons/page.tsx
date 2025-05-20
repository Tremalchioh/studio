
"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { dummyModules } from '@/lib/dummyData';
import type { SubLesson } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardTitle as they weren't used here
import { ArrowLeft, CheckSquare, Square, RadioButton } from 'lucide-react';

export default function SubLessonsListPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;

  const module = dummyModules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-10">
        <h1 className="text-2xl font-bold mb-2 text-foreground">Модуль не найден</h1>
        <p className="text-muted-foreground mb-4">Информация о модуле не найдена.</p>
        <Link href="/courses">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> К списку модулей
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
        return <RadioButton className="h-5 w-5 text-yellow-500 animate-pulse" />;
      case 'not_started':
      default:
        return <Square className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Уроки модуля: {module.title}</h1>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Назад
        </Button>
      </div>

      {(!module.subLessons || module.subLessons.length === 0) ? (
        <Card className="shadow-md rounded-xl">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">В этом модуле пока нет уроков. Загляните позже!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {module.subLessons.map((subLesson, index) => (
            <Link 
              key={subLesson.id} 
              href={`/lessons/${moduleId}/sublessons/${subLesson.id}`}
              className="block" // Apply styling to the Link itself
            >
              <Card className="hover:shadow-lg transition-shadow duration-200 rounded-lg cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 text-primary font-semibold">{index + 1}.</div>
                    <h3 className="text-md font-medium text-foreground group-hover:text-primary">
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
