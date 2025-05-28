
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { dummyModules } from '@/lib/dummyData';
import type { SubLesson, QuizData, QuizOption } from '@/types';
import { ArrowLeft, CheckCircle, BookOpen, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

export default function SubLessonPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const subLessonId = params.subLessonId as string;
  
  const module = dummyModules.find(m => m.id === moduleId);
  const subLesson = module?.subLessons?.find(sl => sl.id === subLessonId);

  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-10">
        <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
        <h1 className="text-2xl font-bold mb-2 text-foreground">Модуль не найден</h1>
        <p className="text-muted-foreground mb-4">Модуль с ID "{moduleId}" не существует.</p>
        <Link href="/courses">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> К списку всех модулей
            </Button>
        </Link>
      </div>
    );
  }

  if (!subLesson) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-10">
        <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
        <h1 className="text-2xl font-bold mb-2 text-foreground">Урок не найден</h1>
        <p className="text-muted-foreground mb-4">Урок с ID "{subLessonId}" не найден в модуле "{module.title}".</p>
        <Link href={`/lessons/${moduleId}/sublessons`}>
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> К списку уроков модуля "{module.title}"
            </Button>
        </Link>
      </div>
    );
  }
  
  const quizData = subLesson.quizData;

  const handleStartQuizClick = () => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    // setIsQuizDialogOpen(true); // AlertDialogTrigger handles this
  };

  const handleQuizSubmit = () => {
    if (!selectedAnswer) {
      // Ideally, use a toast notification here for better UX
      alert("Пожалуйста, выберите ответ перед отправкой.");
      return;
    }
    setQuizSubmitted(true);
    // Here you could also update subLesson.status to 'completed' if the answer is correct,
    // and persist this change (e.g., via API or localStorage for demo)
  };
  
  const handleQuizDialogClose = () => {
    setIsQuizDialogOpen(false);
    // Optionally reset quiz state if dialog is closed before finishing.
    // setSelectedAnswer(null);
    // setQuizSubmitted(false);
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Назад к списку уроков
      </Button>

      <Card className="overflow-hidden shadow-lg rounded-xl">
        {subLesson.imageUrl && (
          <div className="relative w-full h-56 sm:h-64">
            <Image
              src={subLesson.imageUrl}
              alt={subLesson.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 60vw"
              style={{ objectFit: 'cover' }}
              className="bg-muted rounded-t-xl"
              data-ai-hint={subLesson.imageHint}
            />
          </div>
        )}
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{subLesson.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm sm:prose-base max-w-none text-foreground dark:prose-invert prose-p:leading-relaxed prose-headings:text-primary">
            <h3 className="text-lg font-semibold mt-2 mb-2 text-primary flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Материал урока
            </h3>
            {subLesson.lessonContent.split('\\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
            ))}

            {subLesson.quizPrompt && (
              <div className="mt-6 p-4 bg-muted/70 rounded-lg">
                <p className="font-semibold text-foreground">{subLesson.quizPrompt}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <AlertDialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg text-base"
                onClick={handleStartQuizClick}
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Проверить знания
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md w-[calc(100%-2rem)]">
              <AlertDialogHeader>
                <AlertDialogTitle>Викторина: {subLesson.title}</AlertDialogTitle>
                <AlertDialogDescription className="text-base text-foreground pt-2">
                  {quizData.question}
                </AlertDialogDescription>
              </AlertDialogHeader>
              
              <RadioGroup
                value={selectedAnswer ?? undefined}
                onValueChange={setSelectedAnswer}
                disabled={quizSubmitted}
                className="my-4 space-y-3"
              >
                {quizData.options.map((option: QuizOption) => {
                  let optionSpecificClass = "";
                  if (quizSubmitted) {
                    if (option.id === quizData.correctAnswerId) {
                      optionSpecificClass = "bg-green-100 border-green-500 text-green-800 dark:bg-green-800/30 dark:border-green-600 dark:text-green-300";
                    } else if (option.id === selectedAnswer) {
                      optionSpecificClass = "bg-red-100 border-red-500 text-red-800 dark:bg-red-800/30 dark:border-red-600 dark:text-red-300";
                    }
                  } else if (selectedAnswer === option.id) {
                     optionSpecificClass = "border-primary bg-primary/10 ring-2 ring-primary";
                  }

                  return (
                    <Label
                      key={option.id}
                      htmlFor={`quiz-option-${option.id}-${subLesson.id}`} // Ensure unique ID
                      className={cn(
                        "flex items-center space-x-3 p-3.5 border rounded-lg transition-all",
                        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                        quizSubmitted 
                          ? "cursor-not-allowed opacity-80" 
                          : "cursor-pointer hover:bg-muted/70",
                        optionSpecificClass
                      )}
                    >
                      <RadioGroupItem
                        value={option.id}
                        id={`quiz-option-${option.id}-${subLesson.id}`} // Ensure unique ID
                        disabled={quizSubmitted}
                        className="border-muted-foreground data-[state=checked]:border-primary"
                      />
                      <span className="flex-1">{option.text}</span>
                      {quizSubmitted && option.id === quizData.correctAnswerId && <CheckCircle className="ml-auto h-5 w-5 text-green-600 dark:text-green-400" />}
                      {quizSubmitted && option.id === selectedAnswer && option.id !== quizData.correctAnswerId && <XCircle className="ml-auto h-5 w-5 text-red-600 dark:text-red-400" />}
                    </Label>
                  );
                })}
              </RadioGroup>

              {quizSubmitted && (
                <div className={cn(
                  "mt-4 p-3 rounded-md text-sm text-center font-semibold",
                  selectedAnswer === quizData.correctAnswerId 
                    ? 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300' 
                    : 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-300'
                )}>
                  {selectedAnswer === quizData.correctAnswerId
                    ? 'Правильно! Отличная работа.'
                    : `Неправильно. Правильный ответ: "${quizData.options.find(o => o.id === quizData.correctAnswerId)?.text}".`}
                </div>
              )}

              <AlertDialogFooter className="mt-6">
                {!quizSubmitted ? (
                  <>
                    <AlertDialogCancel onClick={handleQuizDialogClose}>Отмена</AlertDialogCancel>
                    <Button
                      onClick={handleQuizSubmit}
                      disabled={!selectedAnswer}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Отправить ответ
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleQuizDialogClose} className="w-full bg-primary hover:bg-primary/90">Закрыть</Button>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}

