import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      companyName,
      phone,
      message,
      selectedModules,
      userCount,
      estimatedPrice,
    } = body;

    if (!fullName || !email || !selectedModules || !userCount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await db.offerRequests.create({
      email,
      full_name: fullName,
      company_name: companyName,
      phone: phone,
      selected_modules: selectedModules,
      user_count: userCount,
      estimated_price: estimatedPrice,
      message: message,
      status: 'pending',
    });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save offer request' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
