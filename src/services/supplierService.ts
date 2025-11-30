// src/services/supplierService.ts
import { Supplier, SupplierFormData } from '@/types/supplier';

const API_BASE_URL = 'http://localhost:3001/suppliers';

export const supplierService = {
  // جلب جميع الموردين من Backend
  async getSuppliers(): Promise<Supplier[]> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('فشل في جلب بيانات الموردين');
      }

      const suppliers = await response.json();
      console.log('Loaded suppliers from backend:', suppliers.length);
      return suppliers;
    } catch (error) {
      console.error('Error in getSuppliers:', error);
      throw error;
    }
  },

  // إضافة مورد جديد عبر Backend
  async createSupplier(data: SupplierFormData): Promise<Supplier> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('فشل في إضافة المورد');
      }

      const newSupplier = await response.json();
      console.log('Created new supplier via backend:', newSupplier.code);
      return newSupplier;
    } catch (error) {
      console.error('Error in createSupplier:', error);
      throw error;
    }
  },

  // تحديث مورد عبر Backend
  async updateSupplier(id: string, data: SupplierFormData): Promise<Supplier> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('فشل في تحديث المورد');
      }

      const updatedSupplier = await response.json();
      console.log('Updated supplier via backend:', updatedSupplier.code);
      return updatedSupplier;
    } catch (error) {
      console.error('Error in updateSupplier:', error);
      throw error;
    }
  },

  // حذف مورد عبر Backend
  async deleteSupplier(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('فشل في حذف المورد');
      }

      console.log('Deleted supplier ID via backend:', id);
    } catch (error) {
      console.error('Error in deleteSupplier:', error);
      throw error;
    }
  }
};