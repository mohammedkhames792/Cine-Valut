import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8">
          <AlertTriangle size={48} className="text-red-400" />
          <h2 className="text-xl font-bold text-white">Something went wrong</h2>
          <p className="max-w-md text-center text-sm text-gray-400">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 font-semibold text-black transition hover:bg-amber-400"
          >
            <RefreshCw size={18} /> Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
