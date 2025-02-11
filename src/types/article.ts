// src/types/article.ts
export interface Article {
    id?: string;
    title: string;
    summary: string;
    date: string;
    publisher: string;
  }
  
  export interface ArticleFormData {
    title: string;
    summary: string;
    date: string;
    publisher: string;
  }
  