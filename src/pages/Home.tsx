// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { newsApi } from '../utils/api';
import { Article, NewsCategory } from '../types/news';
import CategorySelector from '../components/CategorySelector';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('general');

  const fetchTopHeadlines = async (category: NewsCategory) => {
    try {
      setLoading(true);
      setError(null);
      const response = await newsApi.getTopHeadlines(category);
      setArticles(response.articles);
    } catch (err) {
      console.error('Error fetching top headlines:', err);
      setError('Failed to fetch news. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopHeadlines(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: NewsCategory) => {
    setSelectedCategory(category);
  };

  const handleRetry = () => {
    fetchTopHeadlines(selectedCategory);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="h-8 w-8" />
              <h1 className="text-4xl font-bold">Top Headlines</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Stay updated with the latest news from around the world.
              Browse by category and discover what's happening right now.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {loading ? (
          <LoadingSpinner text="Loading top headlines..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found for this category.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {selectedCategory} News
              </h2>
              <span className="text-sm text-gray-500">
                {articles.length} articles found
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
