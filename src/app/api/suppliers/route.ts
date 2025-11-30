// src/app/api/suppliers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { suppliers } from '@/data/suppliersData';

export async function GET() {
  console.log('GET /api/suppliers - Returning', suppliers.length, 'suppliers');
  return NextResponse.json({ 
    success: true, 
    data: suppliers 
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newSupplier = {
      id: Date.now().toString(),
      code: body.code,
      ...body,
      totalPurchases: 0,
      currentBalance: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    suppliers.push(newSupplier);
    
    console.log('POST /api/suppliers - Added new supplier:', newSupplier.code);
    console.log('All suppliers now:', suppliers.map(s => ({ id: s.id, code: s.code })));
    
    return NextResponse.json({ 
      success: true, 
      message: 'تم إضافة المورد بنجاح',
      data: newSupplier 
    });
  } catch (error) {
    console.error('Error creating supplier:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء إضافة المورد' },
      { status: 500 }
    );
  }
}