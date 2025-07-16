// src/utils/api.ts
import axios from 'axios';
import { NewsResponse, NewsCategory } from '../types/news';

const API_KEY = '637bcf85cf274b1db04620fa85529b42';
const BASE_URL = 'https://newsapi.org/v2';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const newsApi = {
  getTopHeadlines: async (
    category: NewsCategory = 'general',
    country: string = 'us'
  ): Promise<NewsResponse> => {
    const response = await api.get('/top-headlines', {
      params: {
        category,
        country,
        pageSize: 20,
      },
    });
    return response.data;
  },

  searchNews: async (query: string, page: number = 1): Promise<NewsResponse> => {
    const response = await api.get('/everything', {
      params: {
        q: query,
        page,
        pageSize: 20,
        sortBy: 'publishedAt',
      },
    });
    return response.data;
  },
};
