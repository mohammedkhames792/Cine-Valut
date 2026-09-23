import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Bookmark,
  Home,
  SlidersHorizontal,
  LayoutGrid,
} from 'lucide-react';
import { useUIStore } from '../stores/useStore';
import { useSearchMulti } from '../hooks/useTMDB';
import { posterUrl } from '../services/tmdb';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/genres', label: 'Genres', icon: LayoutGrid },
  { to: '/advanced', label: 'Advanced', icon: SlidersHorizontal },
  { to: '/library', label: 'Library', icon: Bookmark },
];

export default function Navbar() {
  const { darkMode, toggleDarkMode, sidebarOpen, toggleSidebar, closeSidebar } = useUIStore();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // debounced search handled by react-query enabled flag

  // ⌘K / Ctrl+K or "/" to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setShowSuggestions(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const debouncedQuery = query.length >= 2 ? query : '';
  const { data: searchResults } = useSearchMulti(debouncedQuery);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleInputChange = (val: string) => {
    setQuery(val);
    setShowSuggestions(val.length >= 2);
  };

  const handleSearch = (q?: string) => {
    const term = q ?? query;
    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term.trim())}`);
      setShowSuggestions(false);
      setQuery('');
    }
  };

  const results = searchResults?.results.filter((r) => r.media_type !== 'person').slice(0, 6) ?? [];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col bg-gray-900 p-6 lg:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <Link to="/" onClick={closeSidebar} className="flex items-center gap-2">
                <Film className="h-8 w-8 text-amber-400" />
                <span className="text-xl font-bold text-white">CineVault</span>
              </Link>
              <button onClick={closeSidebar} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeSidebar}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                >
                  <link.icon size={20} />
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-gray-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="text-gray-300 hover:text-white lg:hidden">
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <Film className="h-7 w-7 text-amber-400" />
              <span className="hidden text-xl font-bold text-white sm:inline">CineVault</span>
            </Link>
          </div>

          {/* Center Nav (Desktop) */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <div className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2">
                <Search size={18} className="text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                  placeholder="Search movies, TV..."
                  className="w-32 bg-transparent text-sm text-white placeholder-gray-500 outline-none sm:w-48 md:w-64"
                />
                {!query && (
                  <kbd className="hidden rounded border border-white/20 bg-gray-700 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 md:block">
                    ⌘K
                  </kbd>
                )}
              </div>
              {/* Autocomplete dropdown */}
              <AnimatePresence>
                {showSuggestions && results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-2xl sm:w-80"
                  >
                    {results.map((item) => {
                      const title = 'title' in item ? item.title : 'name' in item ? item.name : '';
                      const date = 'release_date' in item ? item.release_date : 'first_air_date' in item ? (item as any).first_air_date : '';
                      return (
                        <button
                          key={`${item.media_type}-${item.id}`}
                          onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-800"
                        >
                          <img
                            src={posterUrl(item.poster_path, 'w92')}
                            alt=""
                            className="h-10 w-7 rounded object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">{title}</p>
                            <p className="text-xs text-gray-400">
                              {item.media_type === 'tv' ? 'TV Show' : 'Movie'} • {date?.slice(0, 4)}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-amber-400">
                            {Math.round((item.vote_average ?? 0) * 10)}%
                          </span>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handleSearch()}
                      className="w-full border-t border-white/10 px-4 py-3 text-center text-sm text-amber-400 hover:bg-gray-800"
                    >
                      View all results →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
