
import Link from 'next/link';
import LearningModuleCard from '@/components/LearningModuleCard';
import { Button } from '@/components/ui/button';
import { BookOpenText, History, UserCircle, PlayCircle } from 'lucide-react';
import { dummyModules } from '@/lib/dummyData';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function HomePage() {
  const lastAccessedModule = dummyModules[0]; 

  return (
    <div className="space-y-8">
      
      {lastAccessedModule && (
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">Продолжить обучение</h2>
          <Card className="overflow-hidden shadow-lg transition-all duration-300 rounded-xl"> {/* Removed hover:shadow-xl */}
            {lastAccessedModule.imageUrl && (
              <div className="relative w-full h-40 sm:h-48">
                <Image
                  src={lastAccessedModule.imageUrl}
                  alt={lastAccessedModule.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-xl"
                  data-ai-hint={lastAccessedModule.imageHint}
                  priority
                />
              </div>
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-md sm:text-lg font-semibold text-foreground leading-tight">{lastAccessedModule.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">{lastAccessedModule.description}</p>
              {lastAccessedModule.progress !== undefined && (
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Прогресс</span>
                    <span>{lastAccessedModule.progress}%</span>
                  </div>
                  <Progress value={lastAccessedModule.progress} className="h-2 bg-secondary" indicatorClassName="bg-primary" />
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0 pb-3 px-4 sm:px-6">
              <Link href={`/lessons/view/${lastAccessedModule.id}`} className="w-full">
                <Button variant="default" size="sm" className="w-full bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm"> {/* Removed hover:bg-primary/90 */}
                  <PlayCircle className="mr-1.5 h-4 w-4" />
                  Возобновить урок
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
      )}

      
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Исследовать</h2>
        <div className="grid grid-cols-1 gap-3">
          <Link href="/courses">
            <Button variant="outline" className="w-full justify-start text-base py-6 rounded-lg border-primary/50"> {/* Removed hover:bg-primary/10 */}
              <BookOpenText className="mr-3 h-5 w-5 text-primary" />
              Все модули
            </Button>
          </Link>
          <Link href="/history">
            <Button variant="outline" className="w-full justify-start text-base py-6 rounded-lg border-primary/50"> {/* Removed hover:bg-primary/10 */}
              <History className="mr-3 h-5 w-5 text-primary" />
              Исторические статьи
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline" className="w-full justify-start text-base py-6 rounded-lg border-primary/50"> {/* Removed hover:bg-primary/10 */}
              <UserCircle className="mr-3 h-5 w-5 text-primary" />
              Профиль и закладки
            </Button>
          </Link>
        </div>
      </section>
      
      
      <section>
         <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Рекомендовано для вас</h2>
        {dummyModules.slice(1).length > 0 ? ( 
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {dummyModules.slice(1).map(module => (
              <LearningModuleCard key={module.id} module={module} />
            ))}
          </div>
        ) : (
           <p className="text-muted-foreground text-center py-8">Больше рекомендаций скоро!</p>
        )}
      </section>
    </div>
  );
}
