'use client'
import { useState } from 'react'
import QuickNav from '@/components/QuickNav'
import { Account } from '@/types'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      code: '101',
      name: 'البنك الوطني',
      type: 'asset',
      balance: 500000,
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      code: '201',
      name: 'قروض طويلة الأجل',
      type: 'liability',
      balance: 200000,
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      code: '301',
      name: 'رأس المال',
      type: 'equity',
      balance: 1000000,
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      code: '401',
      name: 'مبيعات الأدوية',
      type: 'revenue',
      balance: 750000,
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '5',
      code: '501',
      name: 'مصاريف تشغيلية',
      type: 'expense',
      balance: 320000,
      isActive: true,
      createdAt: '2024-01-01'
    }
  ])

  const quickNavItems = [
    {
      id: "chart-of-accounts",
      title: "شجرة الحسابات",
      subtitle: "عرض الكل",
      href: "/accounts",
      icon: "📋",
    },
    {
      id: "add-account",
      title: "إضافة حساب",
      subtitle: "حساب جديد",
      href: "/accounts/add",
      icon: "➕",
    },
    {
      id: "balance-sheet",
      title: "الميزانية",
      subtitle: "قائمة المركز المالي",
      href: "/accounts/balance-sheet",
      icon: "⚖️",
    }
  ]

  const getAccountTypeColor = (type: string) => {
    const colors = {
      asset: 'bg-green-100 text-green-800',
      liability: 'bg-red-100 text-red-800',
      equity: 'bg-blue-100 text-blue-800',
      revenue: 'bg-purple-100 text-purple-800',
      expense: 'bg-yellow-100 text-yellow-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getAccountTypeName = (type: string) => {
    const names = {
      asset: 'أصول',
      liability: 'خصوم',
      equity: 'حقوق ملكية',
      revenue: 'إيرادات',
      expense: 'مصاريف'
    }
    return names[type as keyof typeof names] || type
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">شجرة الحسابات</h1>
          <p className="text-gray-600 mt-2">إدارة الحسابات المالية وتصنيفاتها</p>
        </div>

        <QuickNav items={quickNavItems} />

        <div className="mt-8 bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">قائمة الحسابات</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              إضافة حساب جديد
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">كود الحساب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم الحساب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع الحساب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الرصيد</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {accounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm text-gray-900">
                      {account.code}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{account.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccountTypeColor(account.type)}`}>
                        {getAccountTypeName(account.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${
                        account.type === 'asset' || account.type === 'revenue' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {account.balance.toLocaleString('ar-SA')} ر.س
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        account.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {account.isActive ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
