
import React, { useState } from 'react';
import { newsApi } from '../utils/api';
import { Article } from '../types/news';
import SearchBar from '../components/SearchBar';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Search as SearchIcon } from 'lucide-react';

const Search: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      setSearchQuery(query);
      setHasSearched(true);
      console.log(`Searching for: ${query}`);
      const response = await newsApi.searchNews(query);
      console.log(`Found ${response.articles.length} articles`);
      setArticles(response.articles);
    } catch (err) {
      console.error('Error searching news:', err);
      setError('Failed to search news. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <SearchIcon className="h-8 w-8" />
              <h1 className="text-4xl font-bold">Search News</h1>
            </div>
            <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">
              Find articles on any topic that interests you. 
              Search through thousands of news sources worldwide.
            </p>
            
            {/* Search Bar */}
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={loading}
              placeholder="Search for news articles..."
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content */}
        {loading ? (
          <LoadingSpinner size="lg" text={`Searching for "${searchQuery}"...`} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : !hasSearched ? (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ready to search
            </h3>
            <p className="text-gray-600">
              Enter a search term above to find relevant news articles.
            </p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md mx-auto">
              <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any articles matching "{searchQuery}".
              </p>
              <p className="text-sm text-gray-500">
                Try different keywords or check your spelling.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results for "{searchQuery}"
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

export default Search;
