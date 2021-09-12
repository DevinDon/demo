export type Category = 'article' | 'image' | 'question' | 'song' | 'video';

export interface Content {
  id: number;
  author: string;
  category: Category;
  content: string;
  date: number;
  image?: string;
  liked: number;
  shared: number;
  summary: string;
  title: string;
}
