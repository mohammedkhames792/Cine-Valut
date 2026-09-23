import { Film, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950 py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-amber-400" />
            <span className="text-lg font-bold text-white">CineVault</span>
          </div>
          <p className="text-center text-sm text-gray-400">
            Made with <Heart size={14} className="inline text-red-500" fill="currentColor" /> using React,
            TypeScript & TMDB API
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()}Built with ❤️ by Mohamed Khames

          </p>
        </div>
      </div>
    </footer>
  );
}
