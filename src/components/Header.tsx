import { User } from '../types/user';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function Header({ user, onLogout, searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-sm">
      <div className="text-xl font-bold">Dashboard</div>
      
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold shadow-sm">
            {user?.name?.charAt(0)}
          </div>
          <button
            onClick={onLogout}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}