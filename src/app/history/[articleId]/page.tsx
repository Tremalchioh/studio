
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { historyArticles, type HistoryArticle } from '@/lib/dummyData';
import { ArrowLeft, CalendarDays, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.articleId as string;

  const article = historyArticles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-10">
        <h1 className="text-2xl font-bold mb-2 text-foreground">Article Not Found</h1>
        <p className="text-muted-foreground mb-4">The article you are looking for does not exist.</p>
        <Link href="/history">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden shadow-lg rounded-xl">
        {article.imageUrl && (
          <div className="relative w-full h-64 sm:h-80">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
              style={{ objectFit: 'cover' }}
              className="bg-muted rounded-t-xl"
              data-ai-hint={article.imageHint}
              priority
            />
          </div>
        )}
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
            {article.title}
          </CardTitle>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground pt-2">
            <div className="flex items-center">
              <Tag className="mr-1.5 h-4 w-4" />
              <span>{article.category}</span>
            </div>
            {/* Placeholder for date, if you add it later */}
            {/* <div className="flex items-center">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              <span>Month Day, Year</span>
            </div> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm sm:prose-base max-w-none text-foreground dark:prose-invert prose-p:leading-relaxed prose-headings:text-primary">
            {/* Split content by newline to render paragraphs */}
            {article.fullContent.split('\\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mt-8">
        <Link href="/history">
          <Button variant="outline" size="lg" className="rounded-lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to All Articles
          </Button>
        </Link>
      </div>
    </div>
  );
}
