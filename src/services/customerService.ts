import { Customer, CustomerFormData } from '@/types/customer';

const API_URL = '/api/customers';

// دالة لتوليد رمز عميل تلقائي
const generateCustomerCode = (existingCustomers: Customer[]): string => {
  const currentYear = new Date().getFullYear();
  
  const currentYearCodes = existingCustomers
    .filter(customer => customer.code.startsWith(`CUST-${currentYear}-`))
    .map(customer => {
      const parts = customer.code.split('-');
      return parseInt(parts[2]) || 0;
    });

  const nextSequence = currentYearCodes.length > 0 
    ? Math.max(...currentYearCodes) + 1 
    : 1;

  return `CUST-${currentYear}-${String(nextSequence).padStart(3, '0')}`;
};

export const customerService = {
  // جلب جميع العملاء
  async getCustomers(): Promise<Customer[]> {
    try {
      const response = await fetch(API_URL, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error('فشل في جلب البيانات');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      return result.data;
    } catch (error) {
      console.error('Error in getCustomers:', error);
      throw error;
    }
  },

  // إضافة عميل جديد
  async createCustomer(data: CustomerFormData): Promise<Customer> {
    try {
      const existingCustomers = await this.getCustomers();
      const customerCode = generateCustomerCode(existingCustomers);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          code: customerCode
        }),
      });

      if (!response.ok) {
        throw new Error('فشل في إضافة العميل');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      return result.data;
    } catch (error) {
      console.error('Error in createCustomer:', error);
      throw error;
    }
  },

  // تحديث عميل - استخدام query parameter
  async updateCustomer(id: string, data: CustomerFormData): Promise<Customer> {
    try {
      const response = await fetch(`/api/customers/id?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('فشل في تحديث العميل');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      return result.data;
    } catch (error) {
      console.error('Error in updateCustomer:', error);
      throw error;
    }
  },

  // حذف عميل - استخدام query parameter
  async deleteCustomer(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/customers/id?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('فشل في حذف العميل');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error in deleteCustomer:', error);
      throw error;
    }
  }
};
