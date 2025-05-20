
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { dummyModules } from '@/lib/dummyData';
import { ArrowLeft, CheckCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

export default function LessonContentPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  
  const module = dummyModules.find(m => m.id === moduleId);

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

  const handleStartQuiz = () => {
    console.log(`Start quiz for module: ${module.title}`);
    // Future: router.push(`/lessons/${module.id}/quiz`);
    alert("Quiz functionality coming soon!");
  };

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
            {/* Using description as instructional text for now */}
            <p>{module.description}</p>
            <p className="mt-4">
              Welcome to the lesson on "{module.title}". This section will guide you through the key concepts and materials.
              Make sure to read through all the provided text and examine any supporting images or examples.
            </p>
            <p>
              Once you feel comfortable with the material presented here, you can proceed to test your knowledge with a quiz.
              The quiz will cover the topics discussed in this instructional segment. Good luck!
            </p>
            {/* Add more instructional text as needed */}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            size="lg" 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg text-base"
            onClick={handleStartQuiz}
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
