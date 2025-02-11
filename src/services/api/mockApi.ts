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
        title: "AI-Powered Code Generation Tools Raise Ethics Questions",
        summary: "The rise of AI code assistants sparks debate about code ownership, quality, and the future role of human developers in software engineering.",
        date: "2024-02-08",
        publisher: "AI Technology Review"
      },
      {
        id: generateId(),
        title: "Next.js 14 Performance Deep Dive",
        summary: "An in-depth analysis of the performance improvements in Next.js 14, including the new Turbopack bundler and enhanced server components.",
        date: "2024-02-10",
        publisher: "Frontend Weekly"
      },
      {
        id: generateId(),
        title: "Rust Gains Traction in Web Development",
        summary: "WebAssembly and new frameworks make Rust an increasingly popular choice for performance-critical web applications.",
        date: "2024-02-12",
        publisher: "Systems Programming Digest"
      },
      {
        id: generateId(),
        title: "GraphQL vs. tRPC: Modern API Design",
        summary: "Comparing two popular approaches to API design in TypeScript applications, with real-world performance benchmarks and use cases.",
        date: "2024-02-15",
        publisher: "API Design Journal"
      },
      {
        id: generateId(),
        title: "The Rise of Edge Computing in 2024",
        summary: "How edge computing is transforming web application architecture, with case studies from major tech companies.",
        date: "2024-02-18",
        publisher: "Cloud Computing Today"
      },
      {
        id: generateId(),
        title: "CSS Container Queries Transform Responsive Design",
        summary: "New CSS features enable more modular and maintainable approaches to responsive web design, reducing reliance on media queries.",
        date: "2024-02-20",
        publisher: "CSS Tricks"
      },
      {
        id: generateId(),
        title: "Securing Modern Web Applications",
        summary: "Best practices for web security in 2024, including CSRF protection, XSS prevention, and secure authentication patterns.",
        date: "2024-02-22",
        publisher: "Security Weekly"
      },
      {
        id: generateId(),
        title: "State Management in 2024: Beyond Redux",
        summary: "Exploring modern alternatives to Redux including Zustand, Jotai, and built-in React features for managing application state.",
        date: "2024-02-25",
        publisher: "React Ecosystem"
      },
      {
        id: generateId(),
        title: "The Impact of Web Components on Frontend Development",
        summary: "How Web Components are changing component architecture and enabling better cross-framework compatibility.",
        date: "2024-02-28",
        publisher: "Web Standards Monthly"
      },
      {
        id: generateId(),
        title: "Database Trends: The Rise of Edge-First Databases",
        summary: "New database technologies optimize for edge computing scenarios, promising better performance and offline capabilities.",
        date: "2024-03-01",
        publisher: "Database Insider"
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