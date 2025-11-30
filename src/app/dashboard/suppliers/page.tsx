'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Supplier, SupplierFormData } from '@/types/supplier';
import { supplierService } from '@/services/supplierService';
import SupplierTable from './components/SupplierTable';
import SupplierForm from './components/SupplierForm';
import { PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const router = useRouter();

  // Fetch suppliers from API
  const loadSuppliers = async () => {
    try {
      setIsLoading(true);
      const data = await supplierService.getSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error('Error loading suppliers:', error);
      alert('Error loading data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  // Add new supplier
  const handleAddSupplier = async (formData: SupplierFormData) => {
    try {
      const newSupplier = await supplierService.createSupplier(formData);
      setSuppliers(prev => [newSupplier, ...prev]);
      setShowForm(false);
      alert('Supplier added successfully!');
    } catch (error: any) {
      console.error('Error adding supplier:', error);
      alert(error.message || 'Error adding supplier');
    }
  };

  // Update supplier
  const handleEditSupplier = async (formData: SupplierFormData) => {
    if (!editingSupplier) return;
    
    try {
      const updatedSupplier = await supplierService.updateSupplier(editingSupplier.id, formData);
      setSuppliers(prev => prev.map(s => s.id === editingSupplier.id ? updatedSupplier : s));
      setEditingSupplier(null);
      setShowForm(false);
      alert('Supplier updated successfully!');
    } catch (error: any) {
      console.error('Error updating supplier:', error);
      alert(error.message || 'Error updating supplier');
    }
  };

  // Delete supplier
  const handleDeleteSupplier = async (id: string) => {
    if (!confirm('Are you sure you want to delete this supplier?')) return;
    
    try {
      await supplierService.deleteSupplier(id);
      setSuppliers(prev => prev.filter(s => s.id !== id));
      alert('Supplier deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting supplier:', error);
      alert(error.message || 'Error deleting supplier');
    }
  };

  // Back to dashboard
  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  // Filter suppliers by search and type
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) || // This line is important!
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.phone.includes(searchTerm)
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          {/* Back to dashboard button */}
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Suppliers Management</h1>
            <p className="text-gray-600 mt-2">Manage your suppliers and business partners</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Supplier
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by supplier name, contact person or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="local">Local</option>
            <option value="international">International</option>
          </select>
        </div>
      </div>

      {/* Supplier Table */}
      {isLoading ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading suppliers data...</p>
        </div>
      ) : (
        <SupplierTable
          suppliers={filteredSuppliers}
          onEdit={setEditingSupplier}
          onDelete={handleDeleteSupplier}
          onView={(supplier) => {
            alert(`View details: ${supplier.name}\nContact Person: ${supplier.contactPerson}\nEmail: ${supplier.email}\nPhone: ${supplier.phone}\nCode: ${supplier.code}`);
          }}
        />
      )}

      {/* Supplier Form Modal */}
      {(showForm || editingSupplier) && (
        <SupplierForm
          supplier={editingSupplier}
          onSubmit={editingSupplier ? handleEditSupplier : handleAddSupplier}
          onCancel={() => {
            setShowForm(false);
            setEditingSupplier(null);
          }}
        />
      )}
    </div>
  );
}