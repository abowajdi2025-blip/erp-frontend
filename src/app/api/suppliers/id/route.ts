import { NextRequest, NextResponse } from 'next/server';

// بيانات تجريبية للموردين
let suppliers: any[] = [
  {
    id: '1',
    code: 'SUPP-2024-001',
    name: 'شركة الأدوية المتقدمة',
    type: 'manufacturer',
    email: 'info@advancedmed.com',
    phone: '+966112345680',
    address: 'الرياض، المملكة العربية السعودية',
    taxNumber: '310123456700005',
    paymentTerms: '30 days',
    status: 'active',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-18')
  }
];

// GET - جلب مورد محدد
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const supplier = suppliers.find(s => s.id === id);
    if (!supplier) {
      return NextResponse.json(
        { success: false, message: 'المورد غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: supplier 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء جلب بيانات المورد' },
      { status: 500 }
    );
  }
}

// PUT - تحديث مورد
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const supplierIndex = suppliers.findIndex(s => s.id === id);
    if (supplierIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'المورد غير موجود' },
        { status: 404 }
      );
    }

    suppliers[supplierIndex] = {
      ...suppliers[supplierIndex],
      ...body,
      updatedAt: new Date()
    };

    return NextResponse.json({ 
      success: true, 
      message: 'تم تحديث المورد بنجاح',
      data: suppliers[supplierIndex] 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء تحديث المورد' },
      { status: 500 }
    );
  }
}

// DELETE - حذف مورد
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supplierIndex = suppliers.findIndex(s => s.id === id);
    if (supplierIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'المورد غير موجود' },
        { status: 404 }
      );
    }

    const deletedSupplier = suppliers[supplierIndex];
    suppliers.splice(supplierIndex, 1);

    return NextResponse.json({ 
      success: true, 
      message: 'تم حذف المورد بنجاح',
      data: deletedSupplier 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء حذف المورد' },
      { status: 500 }
    );
  }
}