import { NextRequest, NextResponse } from 'next/server';
import { initiateShipment, getOrderShipments } from '@/lib/shipping';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const shippingRequest = {
      orderId: body.orderId,
      recipientName: body.recipientName,
      recipientPhone: body.recipientPhone,
      recipientAddress: body.recipientAddress,
      recipientCity: body.recipientCity,
      recipientProvince: body.recipientProvince,
      recipientPostalCode: body.recipientPostalCode,
      weight: body.weight || 0.5,
      value: body.value || 0,
    };

    const result = await initiateShipment(shippingRequest);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Initiate shipping error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate shipment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const orderId = request.nextUrl.searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const shipments = await getOrderShipments(orderId);

    return NextResponse.json(
      { shipments },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get shipments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipments' },
      { status: 500 }
    );
  }
}
