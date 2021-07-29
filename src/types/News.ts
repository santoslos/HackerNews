export interface News {
  id: number;
  title: string;
  points?: number | null;
  user?: string | null;
  time: number;
  time_ago: string;
  commentsCount: number;
  type: string;
  url?: string;
  domain?: string;
}
