
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { dummyModules } from '@/lib/dummyData';
import { ArrowLeft, CheckCircle, BookOpen, XCircle } from 'lucide-react';
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

// Define a simple quiz structure
interface QuizOption {
  id: string;
  text: string;
}
interface QuizData {
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
}

export default function LessonContentPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  
  const module = dummyModules.find(m => m.id === moduleId);

  // State for the quiz
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Dummy quiz data - in a real app, this would come from a CMS or be module-specific
  const quizData: QuizData = {
    question: `What is the primary ingredient in the traditional Tatar sweet "Çäkçäk"?`,
    options: [
      { id: 'a', text: 'Potatoes and Onions' },
      { id: 'b', text: 'Honey and Dough' },
      { id: 'c', text: 'Rice and Meat' },
      { id: 'd', text: 'Berries and Cream' },
    ],
    correctAnswerId: 'b',
  };

  const handleStartQuizClick = () => {
    // Reset quiz state when opening the dialog
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    // setIsQuizDialogOpen(true); // AlertDialogTrigger handles opening
  };

  const handleQuizSubmit = () => {
    if (!selectedAnswer) {
      // This should ideally be a toast message
      alert("Please select an answer before submitting.");
      return;
    }
    setQuizSubmitted(true);
  };
  
  const handleQuizDialogClose = () => {
    setIsQuizDialogOpen(false);
    // No need to reset state here if handleStartQuizClick resets it before opening
  }


  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-10">
        <h1 className="text-2xl font-bold mb-2">Lesson Not Found</h1>
        <p className="text-muted-foreground mb-4">The lesson you are looking for does not exist.</p>
        <Link href="/">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Home
            </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        {module.imageUrl && (
          <div className="relative w-full h-56 sm:h-64">
            <Image
              src={module.imageUrl}
              alt={module.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 60vw"
              style={{ objectFit: 'cover' }}
              className="bg-muted"
              data-ai-hint={module.imageHint}
              priority
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">{module.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm sm:prose-base max-w-none text-foreground">
            <p className="text-muted-foreground text-sm mb-1">
              {module.tags?.join(' • ')} {module.lessonsCount && `• ${module.lessonsCount} lessons`}
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Lesson Content
            </h3>
            <p>{module.description}</p>
            <p className="mt-4">
              Welcome to the lesson on "{module.title}". This section will guide you through the key concepts and materials.
              Make sure to read through all the provided text and examine any supporting images or examples.
            </p>
            <p>
              Once you feel comfortable with the material presented here, you can proceed to test your knowledge with a quiz.
              The quiz will cover the topics discussed in this instructional segment. Good luck!
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <AlertDialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg text-base"
                onClick={handleStartQuizClick} // Reset state before dialog opens
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Start Quiz
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md w-[calc(100%-2rem)]"> {/* Ensure it fits mobile nicely */}
              <AlertDialogHeader>
                <AlertDialogTitle>{module.title} Quiz</AlertDialogTitle>
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
                {quizData.options.map((option) => {
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
                      htmlFor={`quiz-option-${option.id}`}
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
                        id={`quiz-option-${option.id}`}
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
                    ? 'Correct! Well done.'
                    : `Incorrect. The correct answer was: "${quizData.options.find(o => o.id === quizData.correctAnswerId)?.text}".`}
                </div>
              )}

              <AlertDialogFooter className="mt-6">
                {!quizSubmitted ? (
                  <>
                    <AlertDialogCancel onClick={handleQuizDialogClose}>Cancel</AlertDialogCancel>
                    <Button
                      onClick={handleQuizSubmit}
                      disabled={!selectedAnswer}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Submit Answer
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleQuizDialogClose} className="w-full bg-primary hover:bg-primary/90">Close</Button>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}

