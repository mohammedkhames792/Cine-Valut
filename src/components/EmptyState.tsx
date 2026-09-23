import { Film } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 rounded-full bg-gray-800 p-6">
        <Film size={48} className="text-gray-500" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      {description && <p className="max-w-md text-sm text-gray-400">{description}</p>}
    </div>
  );
}
