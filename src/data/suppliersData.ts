// src/data/suppliersData.ts
export let suppliers: any[] = [
  {
    id: '1',
    code: 'SUPP-2024-001',
    name: 'شركة الأدوية العربية',
    type: 'local',
    contactPerson: 'أحمد محمد',
    email: 'purchasing@arabicmed.com',
    phone: '+966112345670',
    address: 'الرياض، المملكة العربية السعودية',
    taxNumber: '310123456700001',
    paymentTerms: 'net-30',
    bankAccount: 'SA0380000000608010167519',
    notes: 'مورد رئيسي للأدوية',
    status: 'active',
    totalPurchases: 500000,
    currentBalance: 75000,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-18')
  },
  {
    id: '2',
    code: 'SUPP-2024-002',
    name: 'شركة المستلزمات الطبية العالمية',
    type: 'international',
    contactPerson: 'John Smith',
    email: 'sales@globalmed.com',
    phone: '+441234567890',
    address: 'لندن، المملكة المتحدة',
    taxNumber: 'GB123456789',
    paymentTerms: 'net-60',
    bankAccount: 'GB29NWBK60161331926819',
    notes: 'مورد للمستلزمات الطبية المتخصصة',
    status: 'active',
    totalPurchases: 300000,
    currentBalance: 45000,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-20')
  }
];

export default suppliers;