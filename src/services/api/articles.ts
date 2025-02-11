// src/services/api/articles.ts
import { ArticleFormData } from '@/types/article';
import { mockApi } from './mockApi';

// We can easily switch between mock and real API here
const api = mockApi;

export const articlesApi = {
  getAll: () => api.getAll(),
  create: (data: ArticleFormData) => api.create(data),
  update: (id: string, data: ArticleFormData) => api.update(id, data),
  delete: (id: string) => api.delete(id),
  getById: (id: string) => api.getById(id)
};