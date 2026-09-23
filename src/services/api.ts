import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzNhNmUyNWU0M2NjYWJiYTY0NDVhOWRjYzE4YWRjNyIsIm5iZiI6MTc4NzI2NDM1MC42OTUwMDAyLCJzdWIiOiI2YTg3N2Q1ZWVhMGYzNjc2YWM0NGQ0MzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AaYCZmNBQwaHdw7RrAz6g6UZpru7l7djCZg9Yr8HF3s';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`TMDB API Error [${error.response.status}]:`, error.response.data);
    } else if (error.request) {
      console.error('Network Error: No response received');
    } else {
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
