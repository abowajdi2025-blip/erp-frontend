import { NextRequest, NextResponse } from 'next/server';

// بيانات تجريبية (نفس البيانات)
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

// PUT - تحديث عميل
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'معرف العميل مطلوب' },
        { status: 400 }
      );
    }

    const body = await request.json();

    console.log('PUT /api/customers/id - Updating customer ID:', id);
    console.log('Update data:', body);

    const customerIndex = customers.findIndex(c => c.id === id);
    if (customerIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'العميل غير موجود' },
        { status: 404 }
      );
    }

    // تحديث البيانات مع الحفاظ على بعض القيم
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
    console.error('Error updating customer:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء تحديث العميل' },
      { status: 500 }
    );
  }
}

// DELETE - حذف عميل
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'معرف العميل مطلوب' },
        { status: 400 }
      );
    }

    console.log('DELETE /api/customers/id - Deleting customer ID:', id);

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
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء حذف العميل' },
      { status: 500 }
    );
  }
}

// GET - جلب عميل محدد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'معرف العميل مطلوب' },
        { status: 400 }
      );
    }

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
    console.error('Error getting customer:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء جلب بيانات العميل' },
      { status: 500 }
    );
  }
}
