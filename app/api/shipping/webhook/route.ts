import { NextRequest, NextResponse } from 'next/server';
import { updateShipmentStatus } from '@/lib/shipping';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trackingNumber, status, location, notes } = body;

    if (!trackingNumber || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get shipment by tracking number
    const { data: shipment } = await supabase
      .from('shipments')
      .select('*')
      .eq('tracking_number', trackingNumber)
      .single();

    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    // Update shipment status
    await updateShipmentStatus(
      shipment.id,
      status,
      location || 'In Transit',
      notes || ''
    );

    // If delivered, update order status
    if (status === 'delivered') {
      await supabase
        .from('orders')
        .update({ status: 'delivered' })
        .eq('id', shipment.order_id);
    }

    return NextResponse.json(
      { success: true, message: 'Shipment status updated' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Shipping webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
