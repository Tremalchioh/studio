export interface LearningModule {
  id: string;
  title: string;
  description: string;
  progress?: number;
  bookmarked: boolean;
  imageUrl?: string;
  imageHint?: string; 
  lessonsCount?: number;
  tags?: string[];
}
