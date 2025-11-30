'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Customer, CustomerFormData } from '@/types/customer';
import { customerService } from '@/services/customerService';
import CustomerTable from './components/CustomerTable';
import CustomerForm from './components/CustomerForm';
import { PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const router = useRouter();

  // Fetch customers from API
  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
      alert('Error loading data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Add new customer
  const handleAddCustomer = async (formData: CustomerFormData) => {
    try {
      const newCustomer = await customerService.createCustomer(formData);
      setCustomers(prev => [newCustomer, ...prev]);
      setShowForm(false);
      alert('Customer added successfully!');
    } catch (error: any) {
      console.error('Error adding customer:', error);
      alert(error.message || 'Error adding customer');
    }
  };

  // Update customer
  const handleEditCustomer = async (formData: CustomerFormData) => {
    if (!editingCustomer) return;
    
    try {
      const updatedCustomer = await customerService.updateCustomer(editingCustomer.id, formData);
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? updatedCustomer : c));
      setEditingCustomer(null);
      setShowForm(false);
      alert('Customer updated successfully!');
    } catch (error: any) {
      console.error('Error updating customer:', error);
      alert(error.message || 'Error updating customer');
    }
  };

  // Delete customer
  const handleDeleteCustomer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    
    try {
      await customerService.deleteCustomer(id);
      setCustomers(prev => prev.filter(c => c.id !== id));
      alert('Customer deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting customer:', error);
      alert(error.message || 'Error deleting customer');
    }
  };

  // Back to dashboard
  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  // Filter customers by search and type
  const filteredCustomers = customers.filter(customer =>
    (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)) &&
    (typeFilter === '' || customer.type === typeFilter)
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
            <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-600 mt-2">Manage your customer base and basic data</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Customer
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by customer name, email or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="hospital">Hospital</option>
            <option value="wholesale">Wholesale</option>
            <option value="retail">Retail</option>
            <option value="individual">Individual</option>
          </select>
        </div>
      </div>

      {/* Customer Table */}
      {isLoading ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customer data...</p>
        </div>
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          onEdit={setEditingCustomer}
          onDelete={handleDeleteCustomer}
          onView={(customer) => {
            alert(`View details: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nCode: ${customer.code}`);
          }}
        />
      )}

      {/* Customer Form Modal */}
      {(showForm || editingCustomer) && (
        <CustomerForm
          customer={editingCustomer}
          onSubmit={editingCustomer ? handleEditCustomer : handleAddCustomer}
          onCancel={() => {
            setShowForm(false);
            setEditingCustomer(null);
          }}
        />
      )}
    </div>
  );
}