
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article } from '../types/news';

interface FavoritesContextType {
  favorites: Article[];
  addToFavorites: (article: Article) => void;
  removeFromFavorites: (articleUrl: string) => void;
  isFavorite: (articleUrl: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Article[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('news-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('news-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (article: Article) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.url === article.url);
      if (isAlreadyFavorite) {
        return prev;
      }
      return [...prev, article];
    });
  };

  const removeFromFavorites = (articleUrl: string) => {
    setFavorites(prev => prev.filter(article => article.url !== articleUrl));
  };

  const isFavorite = (articleUrl: string) => {
    return favorites.some(article => article.url === articleUrl);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
