export interface Supplier {
  id: string;
  code: string;
  name: string;
  type: 'local' | 'international';
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxNumber: string;
  paymentTerms: 'net-30' | 'net-60' | 'net-90' | 'immediate';
  bankAccount?: string;
  notes?: string;
  status: 'active' | 'inactive';
  totalPurchases: number;
  currentBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupplierFormData {
  name: string;
  type: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxNumber: string;
  paymentTerms: string;
  bankAccount: string;
  notes: string;
}
