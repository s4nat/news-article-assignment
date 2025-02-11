// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { AppLayout } from './components/layout/AppLayout';
import { CreateArticle } from './pages/CreateArticle/CreateArticle';
import { ArticleList } from './pages/ArticleList/ArticleList';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/upload" element={<CreateArticle />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/" element={<Navigate to="/articles" replace />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;