
import { ScrollText, Library } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { historyArticles } from '@/lib/dummyData'; 
import { Button } from '@/components/ui/button';

export default function HistoryArticlesPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <Library className="w-16 h-16 text-primary mb-4 inline-block" />
        <h1 className="text-3xl font-bold mb-2 text-foreground">История и культура татар</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Погрузитесь в увлекательные статьи о богатой истории, яркой культуре и уникальных традициях татарского народа.
        </p>
      </section>

      <section className="space-y-6">
        {historyArticles.map((article) => (
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
              <Link href={`/history/${article.id}`} passHref legacyBehavior>
                <a className="text-sm text-primary hover:underline mt-3 font-medium flex items-center">
                  Читать далее <ScrollText className="ml-1.5 h-4 w-4" />
                </a>
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
      
      {historyArticles.length === 0 && (
        <div className="text-center py-10">
          <ScrollText className="w-12 h-12 text-muted-foreground mb-4 inline-block" />
          <p className="text-muted-foreground">Статей пока нет. Загляните позже, чтобы найти интересный контент!</p>
        </div>
      )}
    </div>
  );
}
