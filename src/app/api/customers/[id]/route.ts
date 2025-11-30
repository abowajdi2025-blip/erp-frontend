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
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const customer = customers.find(c => c.id === id);
    
    if (!customer) {
      return NextResponse.json(
        { success: false, message: 'العميل غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: customer 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء جلب بيانات العميل' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const customerIndex = customers.findIndex(c => c.id === id);
    if (customerIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'العميل غير موجود' },
        { status: 404 }
      );
    }

    customers[customerIndex] = {
      ...customers[customerIndex],
      ...body,
      updatedAt: new Date()
    };

    return NextResponse.json({ 
      success: true, 
      message: 'تم تحديث العميل بنجاح',
      data: customers[customerIndex] 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء تحديث العميل' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const customerIndex = customers.findIndex(c => c.id === id);
    if (customerIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'العميل غير موجود' },
        { status: 404 }
      );
    }

    const deletedCustomer = customers[customerIndex];
    customers.splice(customerIndex, 1);

    return NextResponse.json({ 
      success: true, 
      message: 'تم حذف العميل بنجاح',
      data: deletedCustomer 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء حذف العميل' },
      { status: 500 }
    );
  }
}
