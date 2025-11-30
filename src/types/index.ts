export interface Account {
  id: string
  code: string
  name: string
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'
  parentId?: string
  balance: number
  isActive: boolean
  createdAt: string
}

export interface Customer {
  id: string
  name: string
  type: 'wholesaler' | 'pharmacy' | 'hospital' | 'distributor' | 'clinic'
  contactPerson: string
  phone: string
  email: string
  address: string
  taxNumber: string
  commercialRecord: string
  creditLimit: number
  paymentTerms: number
  priceLevel: 'wholesale' | 'retail' | 'contract' | 'distributor'
  status: 'active' | 'inactive'
  createdAt: string
}

export interface Supplier {
  id: string
  name: string
  country: string
  contactPerson: string
  phone: string
  email: string
  address: string
  paymentTerms: number
  currency: 'SAR' | 'USD' | 'EUR'
  status: 'active' | 'inactive'
  createdAt: string
}

export interface Transaction {
  id: string
  type: 'sale' | 'purchase' | 'expense' | 'payment' | 'receipt' | 'adjustment'
  amount: number
  currency: string
  date: string
  description: string
  accountId: string
  customerId?: string
  supplierId?: string
  referenceNumber: string
  status: 'pending' | 'completed' | 'cancelled'
  paymentMethod: 'cash' | 'bank_transfer' | 'check' | 'credit'
  createdAt: string
}

export interface DashboardStats {
  totalCustomers: number
  totalSuppliers: number
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  cashFlow: number
  pendingTransactions: number
  activeAccounts: number
}

export interface NavItem {
  id: string
  title: string
  subtitle?: string
  href: string
  icon?: string
  badge?: string | number
}
