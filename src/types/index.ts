export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizData {
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
}

export interface SubLesson {
  id: string;
  title: string;
  status: 'not_started' | 'in_progress' | 'completed';
  imageUrl?: string;
  imageHint?: string;
  lessonContent: string; // Основной учебный текст урока
  quizPrompt: string; // Вопрос-затравка перед викториной
  quizData: QuizData; // Данные для самой викторины
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  progress?: number;
  bookmarked: boolean;
  imageUrl?: string;
  imageHint?: string;
  lessonsCount?: number; // Может быть заменено на количество subLessons или удалено
  tags?: string[];
  subLessons?: SubLesson[];
}
