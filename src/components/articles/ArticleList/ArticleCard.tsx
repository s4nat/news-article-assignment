// src/components/articles/ArticleList/ArticleCard.tsx
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useState } from 'react';
import { Article } from '@/types/article';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
  onDelete: (id: string) => void;
}

export const ArticleCard = ({ article, onDelete }: ArticleCardProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/upload?id=${article.id}`);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(article.id!);
    handleClose();
  };

  return (
    <Card elevation={0} sx={{ 
      border: theme => `1px solid ${theme.palette.divider}`,
      '&:hover': {
        borderColor: theme => theme.palette.text.secondary,
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
            {article.title}
          </Typography>
          <IconButton
            aria-label="more"
            onClick={handleClick}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>Delete</MenuItem>
          </Menu>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {article.summary}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {article.publisher}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(article.date).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};