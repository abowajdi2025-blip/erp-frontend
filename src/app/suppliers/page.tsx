'use client'
import { useState } from 'react'
import QuickNav from '@/components/QuickNav'
import { Supplier } from '@/types'

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'شركة Pfizer العالمية',
      country: 'USA',
      contactPerson: 'John Smith',
      phone: '+1-555-0100',
      email: 'john.smith@pfizer.com',
      address: 'New York, USA',
      paymentTerms: 60,
      currency: 'USD',
      status: 'active',
      createdAt: '2024-01-10'
    },
    {
      id: '2', 
      name: 'شركة Novartis السويسرية',
      country: 'Switzerland',
      contactPerson: 'Maria Schmidt',
      phone: '+41-555-0200',
      email: 'maria.schmidt@novartis.com',
      address: 'Basel, Switzerland',
      paymentTerms: 45,
      currency: 'EUR',
      status: 'active',
      createdAt: '2024-02-05'
    }
  ])

  const quickNavItems = [
    {
      id: "all-suppliers",
      title: "جميع الموردين",
      subtitle: "عرض الكل",
      href: "/suppliers",
      icon: "🏢",
    },
    {
      id: "add-supplier",
      title: "إضافة مورد",
      subtitle: "مورد جديد",
      href: "/suppliers/add",
      icon: "➕",
    },
    {
      id: "international",
      title: "موردين دوليين",
      subtitle: "استيراد مباشر",
      href: "/suppliers/international",
      icon: "🌎",
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">إدارة الموردين</h1>
          <p className="text-gray-600 mt-2">إدارة موردي الاستيراد المحليين والدوليين</p>
        </div>

        <QuickNav items={quickNavItems} />

        <div className="mt-8 bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">قائمة الموردين</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              إضافة مورد جديد
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المورد</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البلد</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">جهة الاتصال</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">شروط الدفع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العملة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">حالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{supplier.name}</div>
                        <div className="text-sm text-gray-500">{supplier.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {supplier.country}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{supplier.contactPerson}</div>
                      <div className="text-sm text-gray-500">{supplier.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{supplier.paymentTerms} يوم</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {supplier.currency}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        supplier.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {supplier.status === 'active' ? 'نشط' : 'غير نشط'}
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
