
import { ScrollText, Library } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const articles = [
  {
    id: '1',
    title: 'The Origins of the Tatar People',
    summary: 'A brief overview of the historical ethnogenesis of the Tatars, tracing their roots and early development.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'historical map ancient people',
    category: 'Early History',
  },
  {
    id: '2',
    title: 'Sabantuy: The Plow Festival',
    summary: 'Discover the traditions and significance of Sabantuy, a vibrant summer festival celebrating the end of spring field work.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'folk festival celebration',
    category: 'Traditions',
  },
  {
    id: '3',
    title: 'Traditional Tatar Cuisine: A Culinary Journey',
    summary: 'Explore the delicious world of Tatar food, from savory pastries to sweet desserts, and their cultural importance.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'traditional food spread',
    category: 'Culture',
  },
];

export default function HistoryArticlesPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <Library className="w-16 h-16 text-primary mb-4 inline-block" />
        <h1 className="text-3xl font-bold mb-2 text-foreground">Tatar History & Culture</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Delve into fascinating articles about the rich history, vibrant culture, and unique traditions of the Tatar people.
        </p>
      </section>

      <section className="space-y-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
            {article.imageUrl && (
              <div className="relative w-full h-48">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-xl"
                  data-ai-hint={article.imageHint}
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-1">{article.category}</p>
              <p className="text-foreground line-clamp-3">{article.summary}</p>
              {/* In a real app, this would link to a full article page */}
              <button className="text-sm text-primary hover:underline mt-3 font-medium flex items-center">
                Read More <ScrollText className="ml-1.5 h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        ))}
      </section>
      
      {articles.length === 0 && (
        <div className="text-center py-10">
          <ScrollText className="w-12 h-12 text-muted-foreground mb-4 inline-block" />
          <p className="text-muted-foreground">No articles available yet. Check back soon for enriching content!</p>
        </div>
      )}
    </div>
  );
}
