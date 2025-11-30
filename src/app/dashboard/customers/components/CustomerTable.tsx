// src/app/dashboard/customers/components/CustomerTable.tsx
'use client';

import { Customer } from '@/types/customer';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onView: (customer: Customer) => void;
}

const CustomerTable = ({ customers, onEdit, onDelete, onView }: CustomerTableProps) => {
  const getTypeBadge = (type: string) => {
    const typeConfig = {
      hospital: { label: 'مستشفى', color: 'bg-blue-100 text-blue-800' },
      wholesale: { label: 'جملة', color: 'bg-green-100 text-green-800' },
      retail: { label: 'تجزئة', color: 'bg-purple-100 text-purple-800' },
      individual: { label: 'فردي', color: 'bg-orange-100 text-orange-800' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || { label: type, color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">نشط</span>
      : <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">غير نشط</span>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الكود</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الاسم</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">النوع</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الهاتف</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الرصيد</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الحالة</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-gray-600">{customer.code}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{customer.name}</div>
                    {customer.email && (
                      <div className="text-xs text-gray-500 mt-1">{customer.email}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">{getTypeBadge(customer.type)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-800">
                    {customer.currentBalance.toLocaleString()} ر.س
                  </div>
                  <div className="text-xs text-gray-500">
                    حد: {customer.creditLimit.toLocaleString()} ر.س
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(customer.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => onView(customer)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      title="عرض"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(customer)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                      title="تعديل"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(customer.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="حذف"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {customers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">لا توجد عملاء</div>
            <div className="text-gray-500 text-sm mt-2">إضغط على زر "إضافة عميل" لبدء الإضافة</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerTable;