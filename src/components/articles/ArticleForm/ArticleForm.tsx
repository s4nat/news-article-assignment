// src/components/articles/ArticleForm/ArticleForm.tsx
import { useState } from 'react';
import { 
  Box,
  TextField,
  Button,
  Alert,
  Stack,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Article, ArticleFormData } from '@/types/article';
import { articlesApi } from '@/services/api/articles';

interface ArticleFormProps {
  article?: Article;  // Optional for edit mode
  onSuccess?: () => void;
}

interface FormErrors {
  title?: string;
  summary?: string;
  date?: string;
  publisher?: string;
}

export const ArticleForm = ({ article, onSuccess }: ArticleFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: article?.title || '',
    summary: article?.summary || '',
    date: article?.date || new Date().toISOString().split('T')[0],
    publisher: article?.publisher || ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.publisher.trim()) {
      newErrors.publisher = 'Publisher is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (article?.id) {
        await articlesApi.update(article.id, formData);
      } else {
        await articlesApi.create(formData);
      }
      
      // Clear form on successful submission
      if (!article) {
        setFormData({
          title: '',
          summary: '',
          date: new Date().toISOString().split('T')[0],
          publisher: ''
        });
      }
      
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, border: theme => `1px solid ${theme.palette.divider}` }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            label="Article Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
          />

          <TextField
            label="Article Summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            error={!!errors.summary}
            helperText={errors.summary}
            fullWidth
            required
            multiline
            rows={4}
          />

          <TextField
            label="Article Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            error={!!errors.date}
            helperText={errors.date}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            error={!!errors.publisher}
            helperText={errors.publisher}
            fullWidth
            required
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/articles')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? 'Saving...' 
                : article 
                  ? 'Update Article' 
                  : 'Create Article'
              }
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};