import { UserCog } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-10">
      <UserCog className="w-16 h-16 text-primary mb-6" />
      <h1 className="text-2xl font-bold mb-2 text-foreground">My Profile</h1>
      <p className="text-muted-foreground max-w-sm">
        Track your learning progress, manage your account settings, and view achievements. This section is coming soon!
      </p>
      {/* Future: Display user stats, settings, etc. */}
    </div>
  );
}
