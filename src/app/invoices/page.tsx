'use client'
import QuickNav from '@/components/QuickNav'

export default function InvoicesPage() {
  const quickNavItems = [
    {
      id: "all-invoices",
      title: "جميع الفواتير",
      subtitle: "عرض الكل",
      href: "/invoices",
      icon: "🧾",
    },
    {
      id: "create-invoice",
      title: "إنشاء فاتورة",
      subtitle: "فاتورة جديدة",
      href: "/invoices/create",
      icon: "➕",
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">الفواتير</h1>
          <p className="text-gray-600 mt-2">إدارة فواتير المبيعات</p>
        </div>

        <QuickNav items={quickNavItems} />

        <div className="mt-8 bg-white rounded-xl shadow-sm border p-8 text-center">
          <div className="text-6xl mb-4">🧾</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">قريباً</h3>
          <p className="text-gray-600">وحدة الفواتير قيد التطوير</p>
        </div>
      </div>
    </div>
  )
}
