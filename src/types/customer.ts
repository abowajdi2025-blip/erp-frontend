export interface Customer {
  id: string;
  code: string;
  name: string;
  type: 'hospital' | 'wholesale' | 'retail' | 'individual';
  email?: string;
  phone: string;
  address?: string;
  taxNumber?: string;
  creditLimit: number;
  currentBalance: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerFormData {
  name: string;
  type: string;
  email: string;
  phone: string;
  address: string;
  taxNumber: string;
  creditLimit: number;
}
