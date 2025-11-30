import { Cog6ToothIcon, ChartBarIcon, UserGroupIcon, DocumentTextIcon, ArrowsRightLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';

const menuIcons: Record<string, any> = {
  activities: CalendarIcon,
  transactions: ArrowsRightLeftIcon,
  lists: UserGroupIcon,
  reports: DocumentTextIcon,
  analytics: ChartBarIcon,
  customization: Cog6ToothIcon,
};

interface SidebarProps {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  menuItems: Record<string, string[]>;
}

export default function Sidebar({ activeMenu, setActiveMenu, menuItems }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-800 text-gray-100 min-h-screen p-6 flex flex-col gap-6">
      <div className="text-2xl font-bold mb-8">ERP System</div>
      {Object.entries(menuItems).map(([key, _items]) => {
        const Icon = menuIcons[key];
        return (
          <button
            key={key}
            onClick={() => setActiveMenu(activeMenu === key ? null : key)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeMenu === key
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        );
      })}
    </aside>
  );
}