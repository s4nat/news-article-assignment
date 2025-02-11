// src/hooks/useInfiniteScroll.ts
import { useEffect, useCallback } from 'react';

export const useInfiniteScroll = (
  callback: () => void,
  hasMore: boolean
) => {
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