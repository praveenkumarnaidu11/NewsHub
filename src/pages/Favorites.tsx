
import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import NewsCard from '../components/NewsCard';
import { Heart, BookmarkX } from 'lucide-react';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-8 w-8" />
              <h1 className="text-4xl font-bold">Favorite Articles</h1>
            </div>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Your saved articles in one place. 
              Keep track of interesting stories you want to read later.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md mx-auto">
              <BookmarkX className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start exploring news and save articles you find interesting.
              </p>
              <p className="text-sm text-gray-500">
                Click the heart icon on any article to add it to your favorites.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Favorite Articles
              </h2>
              <span className="text-sm text-gray-500">
                {favorites.length} article{favorites.length !== 1 ? 's' : ''} saved
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
