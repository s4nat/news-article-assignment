# NewsNexus - News Article Management System

A modern, responsive news article management system built with React, TypeScript, and Material-UI. This application provides a clean interface for creating, reading, updating, and deleting news articles with features like infinite scrolling and real-time search.

## Features

- 🎯 **CRUD Operations**: Complete article management system
- 🎨 **Modern UI**: Clean interface built with Material-UI
- 🌙 **Dark Mode**: Fully supported light/dark theme switching
- 🔍 **Search**: Real-time article filtering
- ♾️ **Infinite Scroll**: Smooth pagination implementation
- 📱 **Responsive**: Mobile-first design approach
- 🧪 **Type-Safe**: Built with TypeScript
- 🎭 **Mock API**: Local storage-based data persistence

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v7.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/s4nat/news-article-assignment.git
cd news-article-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
news-article/
├── src/
│   ├── components/
│   │   ├── articles/           # Article-related components
│   │   │   ├── ArticleForm/    # Create/Edit form
│   │   │   └── ArticleList/    # List view components
│   │   └── layout/            # Layout components
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   ├── services/              # API and service layer
│   ├── theme/                 # Theme configuration
│   └── types/                 # TypeScript type definitions
└── public/                    # Static assets
```

## Key Components

### ArticleForm
- Handles both creation and editing of articles
- Form validation with error messages
- Success/error state management
- Auto-navigation after successful submission

### ArticleList
- Displays articles in a card layout
- Implements infinite scrolling
- Real-time search functionality
- Article deletion with confirmation

### AppLayout
- Responsive layout with sidebar navigation
- Theme switching capability
- Consistent spacing and typography

## Key Functionalities

### Theme Implementation
- System preference detection for initial theme
- Persistent theme selection using localStorage
- Smooth transitions between themes
- Comprehensive theme configuration for all components

```typescript
// Theme configuration example
const getThemeConfig = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#000000' : '#FFFFFF',
    },
    background: {
      default: mode === 'light' ? '#FFFFFF' : '#191919',
      paper: mode === 'light' ? '#FFFFFF' : '#262626',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#FFFFFF',
      secondary: mode === 'light' ? '#666666' : '#999999',
    },
  }
});
```

### Search Implementation
- Real-time filtering using debounced input
- Searches across title, summary, and publisher fields
- Updates results without page reload

```typescript
const handleSearch = (query: string) => {
  const filtered = articles.filter(article => 
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.summary.toLowerCase().includes(query.toLowerCase()) ||
    article.publisher.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredArticles(filtered);
  setPage(1);
};
```

### Infinite Scroll
- Custom hook implementation
- Efficient pagination with configurable page size
- Smooth loading experience

```typescript
const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const handleScroll = useCallback(() => {
    if (!hasMore) return;
    
    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight;

    if (scrolledToBottom) {
      callback();
    }
  }, [callback, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};
```

### Delete Functionality
- Optimistic updates for better UX
- Error handling with user feedback
- Automatic list refresh after deletion

## Development Considerations

### Code Quality
- **ESLint**: Strict TypeScript rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for code quality

### Performance
- Debounced search to prevent excessive re-renders
- Lazy loading of components
- Memoization of expensive computations

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
