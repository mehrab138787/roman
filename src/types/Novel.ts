export interface Novel {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  pdfUrl: string;
  uploadDate: Date;
  views: number;
  likes: number;
}