import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createOrder, calculateOrderSummary, validateProductAvailability } from '@/lib/checkout';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, items, shipping, paymentMethod, couponCode } = body;

    // Validate required fields
    if (!userId || !items || !shipping || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate all products are in stock
    for (const item of items) {
      const availability = await validateProductAvailability(
        item.productId,
        item.size,
        item.quantity
      );

      if (!availability.available) {
        return NextResponse.json(
          { error: `${item.name} is out of stock in size ${item.size}` },
          { status: 400 }
        );
      }
    }

    // Calculate order summary
    const summary = await calculateOrderSummary(items, couponCode);

    // Create order
    const order = await createOrder(
      {
        userId,
        items,
        shipping,
        paymentMethod,
        couponCode,
      },
      summary
    );

    // Log successful checkout
    await supabase.from('email_logs').insert([
      {
        user_id: userId,
        type: 'order_confirmation',
        recipient_email: shipping.email || '',
        status: 'pending',
        content: JSON.stringify({ orderId: order.id, total: summary.total }),
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        orderNumber: order.id,
        total: summary.total,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}
