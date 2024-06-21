export interface Annotation {
  id: string;
  type: 'text' | 'image';
  text?: string;
  imageUrl?: string;
  x: number;
  y: number;
  pageIndex: number;
}
