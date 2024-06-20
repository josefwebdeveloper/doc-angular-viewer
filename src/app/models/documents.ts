export interface DocumentData {
  name: string;
  pages: Page[];
}

export interface Page {
  number: number;
  imageUrl: string;
}
