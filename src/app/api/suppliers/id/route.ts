// src/app/api/suppliers/id/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { suppliers } from '@/data/suppliersData';

// PUT - تحديث مورد
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'معرف المورد مطلوب' },
        { status: 400 }
      );
    }

    const body = await request.json();

    console.log('PUT /api/suppliers/id - Updating supplier ID:', id);
    console.log('Available suppliers:', suppliers.map(s => s.id));

    const supplierIndex = suppliers.findIndex(s => s.id === id);
    if (supplierIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'المورد غير موجود' },
        { status: 404 }
      );
    }

    // تحديث البيانات مع الحفاظ على بعض القيم
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
    console.error('Error updating supplier:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء تحديث المورد' },
      { status: 500 }
    );
  }
}

// DELETE - حذف مورد
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'معرف المورد مطلوب' },
        { status: 400 }
      );
    }

    console.log('DELETE /api/suppliers/id - Deleting supplier ID:', id);
    console.log('Available suppliers before delete:', suppliers.map(s => s.id));

    const supplierIndex = suppliers.findIndex(s => s.id === id);
    if (supplierIndex === -1) {
      console.log('Supplier not found with ID:', id);
      return NextResponse.json(
        { success: false, message: 'المورد غير موجود' },
        { status: 404 }
      );
    }

    const deletedSupplier = suppliers[supplierIndex];
    suppliers.splice(supplierIndex, 1);

    console.log('Supplier deleted successfully:', deletedSupplier.code);
    console.log('Available suppliers after delete:', suppliers.map(s => s.id));

    return NextResponse.json({ 
      success: true, 
      message: 'تم حذف المورد بنجاح',
      data: deletedSupplier 
    });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء حذف المورد' },
      { status: 500 }
    );
  }
}

// GET - جلب مورد محدد
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'معرف المورد مطلوب' },
        { status: 400 }
      );
    }

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
    console.error('Error getting supplier:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء جلب بيانات المورد' },
      { status: 500 }
    );
  }
}