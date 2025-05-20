
import type { LearningModule } from '@/types';

export const dummyModules: LearningModule[] = [
  { id: '1', title: 'Tatar Language Basics', description: 'Start your journey with fundamental Tatar phrases, alphabet, and basic grammar rules. This module covers greetings, introductions, numbers, and common expressions. You will also learn the specifics of the Tatar alphabet and its pronunciation.', progress: 25, bookmarked: true, imageUrl: 'https://placehold.co/600x400.png', imageHint: 'language book', lessonsCount: 10, tags: ['Beginner', 'Grammar'] },
  { id: '2', title: 'Tatar Culture & Traditions', description: 'Explore the rich history, customs, music, and art of the Tatar people. Learn about traditional holidays, clothing, folklore, and the historical significance of various Tatar symbols and practices.', progress: 60, bookmarked: false, imageUrl: 'https://placehold.co/600x400.png', imageHint: 'culture folk art', lessonsCount: 8, tags: ['Culture', 'History'] },
  { id: '3', title: 'Conversational Tatar', description: 'Practice common dialogues, improve pronunciation, and learn idiomatic expressions for everyday situations. This includes scenarios like shopping, asking for directions, ordering food, and making small talk.', progress: 0, bookmarked: false, imageUrl: 'https://placehold.co/600x400.png', imageHint: 'people talking', lessonsCount: 12, tags: ['Intermediate', 'Speaking'] },
  { id: '4', title: 'Tatar Cuisine Masterclass', description: 'Learn to cook famous Tatar dishes like çäkçäk, öçpoçmaq, and bäliş. This module provides step-by-step recipes, video tutorials, and information about the cultural context of these delightful foods.', progress: 10, bookmarked: true, imageUrl: 'https://placehold.co/600x400.png', imageHint: 'food cooking', lessonsCount: 5, tags: ['Cooking', 'Culture'] },
];

export interface HistoryArticle {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageHint?: string;
  category: string;
  fullContent: string; // Added full content field
}

export const historyArticles: HistoryArticle[] = [
  {
    id: '1',
    title: 'The Origins of the Tatar People',
    summary: 'A brief overview of the historical ethnogenesis of the Tatars, tracing their roots and early development.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'historical map ancient people',
    category: 'Early History',
    fullContent: `The Tatar people boast a rich and complex history, with roots intertwining with various Turkic and Mongol tribes that roamed the vast Eurasian steppes.
    Their ethnogenesis is a subject of ongoing scholarly discussion, but it's widely accepted that the Volga Tatars, the largest group, formed primarily from the Turkic-speaking Bulgars who established the Volga Bulgaria state in the 7th-10th centuries.
    This state became a significant trading and cultural hub.
    Later, the Mongol invasion in the 13th century and the subsequent Golden Horde period profoundly influenced the political and cultural landscape, leading to the consolidation of various groups under the "Tatar" ethnonym.
    Over centuries, distinct Tatar subgroups emerged, each with unique cultural nuances, but all sharing a common linguistic and historical heritage. Understanding these origins is key to appreciating the depth of Tatar culture today.`,
  },
  {
    id: '2',
    title: 'Sabantuy: The Plow Festival',
    summary: 'Discover the traditions and significance of Sabantuy, a vibrant summer festival celebrating the end of spring field work.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'folk festival celebration',
    category: 'Traditions',
    fullContent: `Sabantuy, literally "plow festival" (saban - plow, tuy - festival, holiday), is one of the most beloved and widespread Tatar national holidays.
    It traditionally marks the completion of spring agricultural work and is celebrated with great enthusiasm in summer.
    The festival is a vibrant showcase of Tatar culture, featuring traditional sports like koresh (Tatar wrestling), horse racing, and pillar climbing.
    Music and dance are integral parts of Sabantuy, with lively folk songs and performances. Feasting is also central, with families and communities sharing traditional dishes.
    Sabantuy is more than just a celebration; it's a way to honor agricultural labor, strengthen community bonds, and pass down cultural heritage to younger generations. It is officially celebrated in Tatarstan and many regions across Russia and internationally where Tatar communities reside.`,
  },
  {
    id: '3',
    title: 'Traditional Tatar Cuisine: A Culinary Journey',
    summary: 'Explore the delicious world of Tatar food, from savory pastries to sweet desserts, and their cultural importance.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'traditional food spread',
    category: 'Culture',
    fullContent: `Tatar cuisine is renowned for its hearty, flavorful dishes, heavily influenced by a historically nomadic lifestyle and agricultural traditions.
    Meat, particularly lamb and beef, plays a significant role, as do dairy products. Dough-based dishes are a hallmark, with a wide variety of pastries, pies, and dumplings.
    Öçpoçmaq (a triangular pastry filled with meat and potatoes), bäliş (a large, often round pie with a savory filling), and qıstıbí (pan-fried flatbreads with potato or millet filling) are iconic savory dishes.
    For sweets, çäkçäk (a honey-drenched fried dough dessert) is perhaps the most famous, often served at celebrations.
    Soups like tokmaç (noodle soup) are also common. Tatar cuisine emphasizes natural ingredients and traditional cooking methods, reflecting a deep connection to the land and a rich culinary heritage passed down through generations.`,
  },
];
