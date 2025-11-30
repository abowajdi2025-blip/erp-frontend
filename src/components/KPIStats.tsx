import { UserGroupIcon, DocumentTextIcon, ChartBarIcon, CubeIcon } from '@heroicons/react/24/outline';
import { KPIStat } from '../types/menu';

const kpiStats: KPIStat[] = [
  { title: 'Customers', value: 120, icon: UserGroupIcon, trend: 12 },
  { title: 'Invoices', value: 85, icon: DocumentTextIcon, trend: -5 },
  { title: 'Sales', value: '$12.5K', icon: ChartBarIcon, trend: 8 },
  { title: 'Products', value: 240, icon: CubeIcon, trend: 15 },
];

interface KPIStatsProps {
  stats?: KPIStat[];
}

export default function KPIStats({ stats = kpiStats }: KPIStatsProps) {
  return (
    <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="p-6 rounded-xl bg-white shadow-sm flex items-center justify-between hover:shadow-md transition-all cursor-pointer border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-500">{stat.title}</p>
            </div>
          </div>
          {stat.trend && (
            <div className={`text-sm font-medium ${stat.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
            </div>
          )}
        </div>
      ))}
    </section>
  );
}