import { GraduationCap } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md sticky top-0 z-50 w-full">
      <div className="flex items-center justify-start gap-2">
        <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8" />
        <h1 className="text-lg sm:text-xl font-bold">Zilant Learn</h1>
      </div>
      {/* Future additions: settings, user avatar */}
    </header>
  );
}
