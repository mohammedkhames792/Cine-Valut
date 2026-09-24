import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

if (!TMDB_BEARER_TOKEN) {
  console.warn(
    'TMDB Bearer Token is missing. Add VITE_TMDB_BEARER_TOKEN to your .env.local file.'
  );
}

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    ...(TMDB_BEARER_TOKEN
      ? {
          Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        }
      : {}),
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `TMDB API Error [${error.response.status}]:`,
        error.response.data
      );
    } else if (error.request) {
      console.error('Network Error: No response received');
    } else {
      console.error('Request Setup Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;