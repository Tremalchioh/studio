
import Link from 'next/link';
import { Bookmark, UserCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BookmarksPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-10">
      <Bookmark className="w-16 h-16 text-primary mb-6" />
      <h1 className="text-2xl font-bold mb-2 text-foreground">Bookmarks Have Moved!</h1>
      <p className="text-muted-foreground max-w-sm mb-6">
        Your saved lessons and quizzes are now conveniently located in your Profile section.
      </p>
      <Link href="/profile">
        <Button size="lg" className="rounded-lg">
          <UserCircle className="mr-2 h-5 w-5" />
          Go to My Profile
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
