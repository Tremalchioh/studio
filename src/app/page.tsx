import LearningModuleCard from '@/components/LearningModuleCard';
import type { LearningModule } from '@/types';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const dummyModules: LearningModule[] = [
  { id: '1', title: 'Tatar Language Basics', description: 'Start your journey with fundamental Tatar phrases, alphabet, and basic grammar rules.', progress: 25, bookmarked: true, imageUrl: 'https://placehold.co/600x400.png', imageHint: 'language book', lessonsCount: 10, tags: ['Beginner', 'Grammar'] },
  { id: '2', title: 'Tatar Culture & Traditions', description: 'Explore the rich history, customs, music, and art of the Tatar people.', progress: 60, bookmarked: false, imageUrl: 'https://placehold.co/600x400.png', imageHint: 'culture folk art', lessonsCount: 8, tags: ['Culture', 'History'] },
  { id: '3', title: 'Conversational Tatar', description: 'Practice common dialogues, improve pronunciation, and learn idiomatic expressions for everyday situations.', progress: 0, bookmarked: false, imageUrl: 'https://placehold.co/600x400.png', imageHint: 'people talking', lessonsCount: 12, tags: ['Intermediate', 'Speaking'] },
  { id: '4', title: 'Tatar Cuisine Masterclass', description: 'Learn to cook famous Tatar dishes like çäkçäk, öçpoçmaq, and bäliş.', progress: 10, bookmarked: true, imageUrl: 'https://placehold.co/600x400.png', imageHint: 'food cooking', lessonsCount: 5, tags: ['Cooking', 'Culture'] },
];

export default function HomePage() {
  const bookmarkedModules = dummyModules.filter(m => m.bookmarked);

  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Your Learning Path</h2>
          <Button variant="outline" size="sm" className="rounded-lg">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        {dummyModules.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {dummyModules.map(module => (
              <LearningModuleCard key={module.id} module={module} />
            ))}
          </div>
        ) : (
           <p className="text-muted-foreground text-center py-8">No learning modules available yet. Check back soon!</p>
        )}
      </section>

      {bookmarkedModules.length > 0 && (
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-foreground">Bookmarked Items</h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {bookmarkedModules.map(module => (
              <LearningModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
