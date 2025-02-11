// src/pages/ArticleList/ArticleList.tsx
import { Box, Typography, Stack, Alert, CircularProgress } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/types/article';
import { articlesApi } from '@/services/api/articles';
import { ArticleCard } from '@/components/articles/ArticleList/ArticleCard';
import { SearchBar } from '@/components/articles/ArticleList/SearchBar';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const loadArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await articlesApi.getAll();
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleSearch = (query: string) => {
    const filtered = articles.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.summary.toLowerCase().includes(query.toLowerCase()) ||
      article.publisher.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      await articlesApi.delete(id);
      await loadArticles();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const displayedArticles = filteredArticles.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = displayedArticles.length < filteredArticles.length;

  useInfiniteScroll(loadMore, hasMore);

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>Articles</Typography>
      
      <SearchBar onSearch={handleSearch} />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        {displayedArticles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            onDelete={handleDelete}
          />
        ))}
      </Stack>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && displayedArticles.length === 0 && (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8,
            border: theme => `1px dashed ${theme.palette.divider}`,
            borderRadius: 1
          }}
        >
          <Typography color="text.secondary">
            No articles found
          </Typography>
        </Box>
      )}
    </Box>
  );
};
