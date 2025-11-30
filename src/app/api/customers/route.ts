import { NextRequest, NextResponse } from 'next/server';

// بيانات تجريبية
let customers: any[] = [
  {
    id: '1',
    code: 'CUST-2024-001',
    name: 'مستشفى الملك فهد',
    type: 'hospital',
    email: 'info@kfhh.com',
    phone: '+966112345678',
    address: 'الرياض، المملكة العربية السعودية',
    taxNumber: '310123456700003',
    creditLimit: 100000,
    currentBalance: 25000,
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20')
  },
  {
    id: '2', 
    code: 'CUST-2024-002',
    name: 'شركة الأدوية المتحدة',
    type: 'wholesale',
    email: 'sales@unitedmed.com',
    phone: '+966112345679',
    address: 'جدة، المملكة العربية السعودية',
    taxNumber: '310123456700004',
    creditLimit: 50000,
    currentBalance: 15000,
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-15')
  }
];

export async function GET() {
  console.log('GET /api/customers - Returning', customers.length, 'customers');
  return NextResponse.json({ 
    success: true, 
    data: customers 
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newCustomer = {
      id: Date.now().toString(),
      code: body.code,
      ...body,
      currentBalance: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    customers.push(newCustomer);
    
    console.log('POST /api/customers - Added new customer:', newCustomer.code);
    
    return NextResponse.json({ 
      success: true, 
      message: 'تم إضافة العميل بنجاح',
      data: newCustomer 
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء إضافة العميل' },
      { status: 500 }
    );
  }
}
