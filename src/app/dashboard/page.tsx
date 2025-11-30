'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Cog6ToothIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CubeIcon,
  ArrowsRightLeftIcon,
  CalendarIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  BellIcon,
  PlusIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ChartPieIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  ClockIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

interface User {
  name: string;
  email: string;
  role: string;
}

const menuIcons: Record<string, any> = {
  activities: CalendarIcon,
  transactions: ArrowsRightLeftIcon,
  lists: UserGroupIcon,
  reports: DocumentTextIcon,
  analytics: ChartBarIcon,
  customization: Cog6ToothIcon,
};

// Data for list items
const listItems = [
  {
    id: 'customers',
    title: 'Customers',
    description: 'Manage your customer base',
    icon: UsersIcon,
    color: 'from-blue-500 to-cyan-500',
    route: '/dashboard/customers'
  },
  {
    id: 'suppliers',
    title: 'Suppliers',
    description: 'Manage suppliers and partners',
    icon: BuildingStorefrontIcon,
    color: 'from-green-500 to-emerald-500',
    route: '/dashboard/suppliers'
  },
  {
    id: 'products',
    title: 'Products',
    description: 'Manage products and inventory',
    icon: CubeIcon,
    color: 'from-purple-500 to-indigo-500',
    route: '/dashboard/products'
  },
  {
    id: 'employees',
    title: 'Employees',
    description: 'Manage your team',
    icon: UserCircleIcon,
    color: 'from-orange-500 to-red-500',
    route: '/dashboard/employees'
  },
  {
    id: 'inventory',
    title: 'Inventory',
    description: 'Manage warehouses and stock',
    icon: ClipboardDocumentListIcon,
    color: 'from-pink-500 to-rose-500',
    route: '/dashboard/inventory'
  },
];

const kpiStats = [
  { 
    title: 'Total Customers', 
    value: '2,847', 
    icon: UserGroupIcon, 
    trend: '+12%', 
    color: 'from-blue-500 to-cyan-500',
    description: 'Active customers'
  },
  { 
    title: 'Pending Invoices', 
    value: '1,234', 
    icon: DocumentTextIcon, 
    trend: '+8%', 
    color: 'from-green-500 to-emerald-500',
    description: 'Awaiting payment'
  },
  { 
    title: 'Monthly Sales', 
    value: '$48.2K', 
    icon: ChartBarIcon, 
    trend: '+23%', 
    color: 'from-purple-500 to-indigo-500',
    description: 'Current month'
  },
  { 
    title: 'Active Products', 
    value: '567', 
    icon: CubeIcon, 
    trend: '+5%', 
    color: 'from-orange-500 to-red-500',
    description: 'In inventory'
  },
];

const quickStats = [
  { icon: ShoppingCartIcon, value: '324', label: 'New Orders', color: 'bg-blue-500' },
  { icon: BanknotesIcon, value: '$12.4K', label: 'Revenue', color: 'bg-green-500' },
  { icon: ClockIcon, value: '28', label: 'Pending', color: 'bg-amber-500' },
  { icon: ChartPieIcon, value: '94%', label: 'Growth', color: 'bg-purple-500' },
];

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user_data');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user_data');
    router.push('/login');
  };

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const menuItems = {
    activities: ['Tasks', 'Calendar', 'Meetings', 'Calls', 'Mail'],
    transactions: ['Invoices', 'Sales', 'Purchases', 'Payments', 'Notifications'],
    lists: ['Customers', 'Suppliers', 'Products', 'Inventory', 'Projects'],
    reports: ['Financial Reports', 'Sales Reports', 'Inventory Reports', 'Customer Reports'],
    analytics: ['Dashboard', 'Sales Analytics', 'Customer Analytics', 'KPIs'],
    customization: ['Screen Settings', 'Templates', 'Custom Fields', 'Workflow'],
  };

  // Different content based on active menu
  const renderMainContent = () => {
    if (activeMenu === 'lists') {
      return (
        <main className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {listItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => navigateTo(item.route)}
                className="group bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200/60 hover:border-blue-200/60 hover:scale-105"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-br ${item.color} rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-2xl font-bold text-slate-800">
                    {item.count}
                  </div>
                  <div className="text-blue-600 text-sm font-semibold bg-blue-50 px-3 py-1 rounded-lg border border-blue-200/60">
                    Manage
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      );  
    }

    // Default content (Dashboard)
    return (
      <>
        {/* KPI CARDS */}
        <section className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {kpiStats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200/60 hover:border-transparent hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-slate-600 mt-2 text-sm font-medium">{stat.title}</p>
                  <p className="text-slate-400 text-xs mt-1">{stat.description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 text-sm font-semibold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200/60">
                      {stat.trend}
                    </span>
                    <span className="text-slate-400 text-xs">from last month</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-slate-200/40">
                  <stat.icon className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* MAIN CARDS - Default */}
        <main className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
          {Object.entries(menuItems).map(([key, items], idx) => {
            const Icon = menuIcons[key];
            return (
              <div
                key={idx}
                className="group bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200/60 hover:border-blue-200/60 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300 shadow-sm border border-blue-200/40">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-700 transition-colors">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </h3>
                  </div>
                  <div className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-xl border border-slate-200/60">
                    {items.length} items
                  </div>
                </div>

                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-slate-600 hover:text-blue-600 transition-all duration-300 py-3 px-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50/60 hover:to-indigo-50/40 group/item border border-transparent hover:border-blue-200/40 hover:scale-105"
                    >
                      <div className="w-2 h-2 bg-blue-300 rounded-full group-hover/item:bg-blue-500 group-hover/item:scale-125 transition-all duration-300"></div>
                      <span className="font-medium text-[15px]">{item}</span>
                      <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                        <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200/60">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </main>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-indigo-400 animate-spin animation-delay-500"></div>
          </div>
          <p className="text-gray-700 text-lg font-semibold mt-4">Loading Dashboard</p>
          <p className="text-gray-500 text-sm mt-2">Preparing your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-sans text-gray-800 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-white/95 backdrop-blur-xl text-slate-700 min-h-screen p-8 flex flex-col gap-2 shadow-2xl shadow-blue-500/10 border-r border-slate-200/60">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <CubeIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              ERP System
            </div>
            <div className="text-slate-400 text-sm font-medium">Business Platform</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-6 px-4">
            Main Navigation
          </div>
          {Object.entries(menuItems).map(([key, _items]) => {
            const Icon = menuIcons[key];
            return (
              <button
                key={key}
                onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                className={`flex items-center justify-between w-full px-4 py-4 rounded-2xl transition-all duration-300 group mb-3 ${
                  activeMenu === key
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 shadow-lg shadow-blue-500/20 text-blue-700 transform scale-105'
                    : 'text-slate-600 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent hover:border-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                    activeMenu === key 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/40' 
                      : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-[15px]">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </div>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${
                  activeMenu === key ? 'rotate-180 text-blue-500' : 'text-slate-400 group-hover:text-slate-600'
                }`} />
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-slate-200/60 pt-6 mt-6">
          <div className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-200/40 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 truncate text-[15px]">{user?.name}</p>
              <p className="text-slate-500 text-sm truncate">{user?.role}</p>
              <div className="flex gap-2 mt-1.5">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg border border-blue-200/60">Pro</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-200/60">Active</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/40 p-8 shadow-sm shadow-slate-500/5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {activeMenu === 'lists' ? 'List Management' : `Good morning, ${user?.name?.split(' ')[0]}! 🌟`}
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                {activeMenu === 'lists' ? 'Manage all basic data in the system' : 'Here\'s your business overview for today'}
              </p>
            </div>
            
            <div className="flex items-center gap-6">

              {/* Search Bar */}
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={activeMenu === 'lists' ? "Search in lists..." : "Search reports, analytics..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3.5 w-96 border border-slate-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-slate-400"
                />
              </div>

              {/* Notifications & User */}
              <div className="flex items-center gap-4">
                <button className="relative p-3 text-slate-600 hover:text-blue-600 transition-all duration-200 hover:bg-blue-50 rounded-2xl group">
                  <BellIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>

                <div className="w-px h-8 bg-slate-300/60"></div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-slate-800">{user?.name}</p>
                    <p className="text-sm text-slate-500">{user?.role}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform duration-200">
                    {user?.name?.charAt(0)}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-gradient-to-br from-slate-800 to-slate-600 hover:from-slate-700 hover:to-slate-500 text-white rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats - Only shown in main Dashboard */}
          {activeMenu !== 'lists' && (
            <div className="grid grid-cols-4 gap-6 mt-8">
              {quickStats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-slate-200/40 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    <p className="text-slate-600 text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Render Dynamic Content */}
        {renderMainContent()}

        {/* FOOTER */}
        <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200/40 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-semibold text-slate-700">© {new Date().getFullYear()} ERP Business Suite</p>
                <p className="text-slate-500 text-sm mt-1">Complete Accounting & Management System</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-sm">Developed by Abdullah Bassasi</p>
                <p className="text-slate-400 text-xs mt-1">Version 2.1.0 • Professional Edition</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}