import { BookmarkCheck } from 'lucide-react';

export default function BookmarksPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-10">
      <BookmarkCheck className="w-16 h-16 text-primary mb-6" />
      <h1 className="text-2xl font-bold mb-2 text-foreground">My Bookmarks</h1>
      <p className="text-muted-foreground max-w-sm">
        Your saved lessons and quizzes will appear here for easy access. Start exploring and bookmark your favorites!
      </p>
      {/* Future: List bookmarked items */}
    </div>
  );
}
