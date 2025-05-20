
import { BookOpenText } from 'lucide-react';
import LearningModuleCard from '@/components/LearningModuleCard';
import { dummyModules } from '@/lib/dummyData';
import type { LearningModule } from '@/types';

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <BookOpenText className="w-16 h-16 text-primary mb-4 inline-block" />
        <h1 className="text-3xl font-bold mb-2 text-foreground">All Lessons</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Explore our collection of interactive lessons designed to help you learn Tatar language and culture.
        </p>
      </section>

      {dummyModules.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 sm:gap-6">
          {dummyModules.map((module: LearningModule) => (
            <LearningModuleCard key={module.id} module={module} />
          ))}
        </section>
      ) : (
        <div className="text-center py-10">
          <BookOpenText className="w-12 h-12 text-muted-foreground mb-4 inline-block" />
          <p className="text-muted-foreground">No lessons available at the moment. Please check back soon!</p>
        </div>
      )}
    </div>
  );
}
