import { useState, useEffect } from 'react';

export function useAuth() {
  const [user] = useState<any>({
    id: 1,
    name: 'مستخدم تجريبي',
    email: 'demo@erp.com',
    role: 'admin'
  });
  
  const [isLoading] = useState(false);

  const login = async () => {
    return { success: true, user };
  };

  const logout = () => {
    // تعطيل تسجيل الخروج
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: true
  };
}
