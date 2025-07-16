
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Newspaper, Search, Heart, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Newspaper className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">NewsHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/search') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Search size={18} />
              <span>Search</span>
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/favorites') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Heart size={18} />
              <span>Favorites</span>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/"
              className={`p-2 rounded-md ${
                isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Home size={20} />
            </Link>
            <Link
              to="/search"
              className={`p-2 rounded-md ${
                isActive('/search') ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Search size={20} />
            </Link>
            <Link
              to="/favorites"
              className={`p-2 rounded-md ${
                isActive('/favorites') ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Heart size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
