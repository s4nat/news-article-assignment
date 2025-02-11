// src/pages/CreateArticle/CreateArticle.tsx
import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArticleForm } from '@/components/articles/ArticleForm/ArticleForm';
import { useEffect, useState } from 'react';
import { Article } from '@/types/article';
import { articlesApi } from '@/services/api/articles';

export const CreateArticle = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [article, setArticle] = useState<Article | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  
  const articleId = searchParams.get('id');
  const isEditMode = !!articleId;

  useEffect(() => {
    const loadArticle = async () => {
      if (!articleId) return;
      
      setIsLoading(true);
      try {
        const response = await articlesApi.getById(articleId);
        setArticle(response.data);
      } catch (error) {
        console.error('Failed to load article:', error);
        navigate('/articles');
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [articleId, navigate]);

  if (isEditMode && isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {isEditMode ? 'Edit Article' : 'Create Article'}
      </Typography>
      <ArticleForm 
        article={article}
        onSuccess={() => {
          navigate('/articles');
        }} 
      />
    </Box>
  );
};
