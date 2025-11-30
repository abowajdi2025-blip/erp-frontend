'use client';

import { Supplier } from '@/types/supplier';
import { PencilIcon, TrashIcon, EyeIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
  onView: (supplier: Supplier) => void;
}

const SupplierTable = ({ suppliers, onEdit, onDelete, onView }: SupplierTableProps) => {
  const getTypeBadge = (type: string) => {
    return type === 'local' 
      ? <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Local</span>
      : <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">International</span>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
      : <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Inactive</span>;
  };

  const getPaymentTerms = (terms: string) => {
    const termsMap: { [key: string]: string } = {
      'immediate': 'Immediate',
      'net-30': '30 Days',
      'net-60': '60 Days',
      'net-90': '90 Days'
    };
    return termsMap[terms] || terms;
  };

  // Safe function to display numbers
  const safeToLocaleString = (value: any): string => {
    if (value === undefined || value === null) return '0';
    const num = Number(value);
    return isNaN(num) ? '0' : num.toLocaleString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Code</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Supplier Name</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Contact Person</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Type</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Purchases</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-gray-600">{supplier.code}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{supplier.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{supplier.email}</div>
                    <div className="text-xs text-gray-500">{supplier.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{supplier.contactPerson}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {getTypeBadge(supplier.type)}
                    <div className="text-xs text-gray-500">
                      {getPaymentTerms(supplier.paymentTerms)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-800">
                    {safeToLocaleString(supplier.totalPurchases)} SAR
                  </div>
                  <div className="text-xs text-gray-500">
                    Balance: {safeToLocaleString(supplier.currentBalance)} SAR
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(supplier.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => onView(supplier)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      title="View"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(supplier)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(supplier.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {suppliers.length === 0 && (
          <div className="text-center py-12">
            <BuildingStorefrontIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-400 text-lg">No suppliers found</div>
            <div className="text-gray-500 text-sm mt-2">Click "Add Supplier" button to start adding</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierTable;