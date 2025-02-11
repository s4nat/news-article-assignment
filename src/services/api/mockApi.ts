// src/services/api/mockApi.ts
import { Article, ArticleFormData } from '@/types/article';

// Type for our API Response to simulate real API behavior
interface ApiResponse<T> {
  data: T;
  status: number;
}

// Storage key for localStorage
const STORAGE_KEY = 'news_articles';

// Helper to generate unique IDs
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize localStorage with sample data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const sampleArticles: Article[] = [
      {
        id: generateId(),
        title: "TypeScript 5.0 Released",
        summary: "Microsoft announces TypeScript 5.0 with major improvements to type inference and decorator support.",
        date: "2024-02-01",
        publisher: "Tech News Daily"
      },
      {
        id: generateId(),
        title: "React Server Components Guide",
        summary: "A comprehensive guide to understanding and implementing React Server Components in your applications.",
        date: "2024-02-05",
        publisher: "React Blog"
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleArticles));
  }
};

// Initialize storage with sample data
initializeStorage();

// Mock API implementation
export const mockApi = {
  // Get all articles
  getAll: async (): Promise<ApiResponse<Article[]>> => {
    await delay(500); // Simulate network delay
    const articles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return {
      data: articles,
      status: 200
    };
  },

  // Create new article
  create: async (data: ArticleFormData): Promise<ApiResponse<Article>> => {
    await delay(500);
    const articles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    const newArticle: Article = {
      ...data,
      id: generateId()
    };

    articles.unshift(newArticle); // Add to beginning of array
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));

    return {
      data: newArticle,
      status: 201
    };
  },

  // Update existing article
  update: async (id: string, data: ArticleFormData): Promise<ApiResponse<Article>> => {
    await delay(500);
    const articles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    const index = articles.findIndex((article: Article) => article.id === id);
    if (index === -1) {
      throw new Error('Article not found');
    }

    const updatedArticle: Article = {
      ...data,
      id
    };

    articles[index] = updatedArticle;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));

    return {
      data: updatedArticle,
      status: 200
    };
  },

  // Delete article
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(500);
    const articles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    const filteredArticles = articles.filter((article: Article) => article.id !== id);
    
    if (filteredArticles.length === articles.length) {
      throw new Error('Article not found');
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredArticles));

    return {
      data: undefined,
      status: 200
    };
  },

  // Get single article by ID
  getById: async (id: string): Promise<ApiResponse<Article>> => {
    await delay(500);
    const articles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    const article = articles.find((article: Article) => article.id === id);
    if (!article) {
      throw new Error('Article not found');
    }

    return {
      data: article,
      status: 200
    };
  }
};