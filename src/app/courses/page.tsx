import { Construction } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-10">
      <Construction className="w-16 h-16 text-primary mb-6" />
      <h1 className="text-2xl font-bold mb-2 text-foreground">Courses</h1>
      <p className="text-muted-foreground max-w-sm">
        Our full course catalog is currently under construction. Exciting new learning modules will be available here soon!
      </p>
    </div>
  );
}
