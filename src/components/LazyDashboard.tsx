// components/LazyDashboard.tsx
import { lazy, Suspense } from 'react';

const KPIStats = lazy(() => import('./KPIStats'));
const Sidebar = lazy(() => import('./Sidebar'));
const Header = lazy(() => import('./Header'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-700"></div>
  </div>
);

export default function LazyDashboard() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );
}