'use client'
import QuickNav from '@/components/QuickNav'

export default function ReportsPage() {
  const quickNavItems = [
    {
      id: "financial-reports",
      title: "تقارير مالية",
      subtitle: "تقارير شاملة",
      href: "/reports/financial",
      icon: "📊",
    },
    {
      id: "sales-reports",
      title: "تقارير المبيعات",
      subtitle: "تحليل المبيعات",
      href: "/reports/sales",
      icon: "💰",
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">التقارير</h1>
          <p className="text-gray-600 mt-2">تقارير وتحليلات مالية</p>
        </div>

        <QuickNav items={quickNavItems} />

        <div className="mt-8 bg-white rounded-xl shadow-sm border p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">قريباً</h3>
          <p className="text-gray-600">وحدة التقارير قيد التطوير</p>
        </div>
      </div>
    </div>
  )
}
