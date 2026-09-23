import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="mb-6 inline-block"
        >
          <Film size={80} className="text-amber-400" />
        </motion.div>

        <h1 className="mb-2 text-7xl font-extrabold text-white md:text-9xl">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-300">Page Not Found</h2>
        <p className="mb-8 max-w-md text-gray-400">
          Looks like this scene didn't make the final cut. Let's get you back to something worth
          watching.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black transition hover:bg-amber-400"
          >
            <Home size={18} /> Back to Home
          </Link>
          <Link
            to="/search"
            className="flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <Search size={18} /> Search Movies
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
