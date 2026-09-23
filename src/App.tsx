import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import MovieDetailsPage from './pages/MovieDetails';
import PersonDetailsPage from './pages/PersonDetails';
import SearchPage from './pages/Search';
import AdvancedSearchPage from './pages/AdvancedSearch';
import LibraryPage from './pages/Library';
import GenresPage from './pages/Genres';
import NotFound from './pages/NotFound';
import { useUIStore } from './stores/useStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { darkMode } = useUIStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.style.backgroundColor = darkMode ? '#030712' : '#f9fafb';
    document.body.style.color = darkMode ? '#ffffff' : '#111827';
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-950">
      <ScrollToTop />
      <Navbar />
      <main>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/tv/:id" element={<MovieDetailsPage />} />
            <Route path="/person/:id" element={<PersonDetailsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/advanced" element={<AdvancedSearchPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}
