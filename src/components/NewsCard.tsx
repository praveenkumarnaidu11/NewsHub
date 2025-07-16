
import React from 'react';
import { Article } from '../types/news';
import { useFavorites } from '../context/FavoritesContext';
import { Heart, ExternalLink, Calendar, User } from 'lucide-react';

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isArticleFavorite = isFavorite(article.url);

  const handleFavoriteClick = () => {
    if (isArticleFavorite) {
      removeFromFavorites(article.url);
    } else {
      addToFavorites(article);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image available</span>
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
        >
          <Heart
            size={18}
            className={`transition-colors ${
              isArticleFavorite 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {truncateText(article.description, 150)}
          </p>
        )}

        {/* Meta information */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            {article.author && (
              <div className="flex items-center space-x-1">
                <User size={12} />
                <span>{truncateText(article.author, 20)}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar size={12} />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
          <span className="text-blue-600 font-medium">
            {article.source.name}
          </span>
        </div>

        {/* Read More Button */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 justify-center"
        >
          <span>Read Full Article</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
