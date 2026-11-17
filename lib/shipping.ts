import { supabase } from './supabase';

export interface ShippingRequest {
  orderId: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  recipientProvince: string;
  recipientPostalCode: string;
  weight: number; // in kg
  value: number; // order value in PKR
}

export interface ShippingResponse {
  trackingNumber: string;
  estimatedDelivery: string;
  carrier: string;
  cost: number;
}

export async function initiateShipment(request: ShippingRequest): Promise<ShippingResponse> {
  try {
    // Create shipment record in database
    const { data: shipment, error: shipmentError } = await supabase
      .from('shipments')
      .insert([
        {
          order_id: request.orderId,
          tracking_number: `PKX-${Date.now()}`, // Placeholder
          carrier: 'PostEx',
          status: 'pending',
          estimated_delivery_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ])
      .select()
      .single();

    if (shipmentError) throw shipmentError;

    // Log tracking
    await supabase.from('shipment_tracking_logs').insert([
      {
        shipment_id: shipment.id,
        status: 'pending',
        location: 'Warehouse',
        notes: 'Shipment initiated',
      },
    ]);

    return {
      trackingNumber: shipment.tracking_number,
      estimatedDelivery: shipment.estimated_delivery_date,
      carrier: 'PostEx',
      cost: 0,
    };
  } catch (error) {
    console.error('Initiate shipment error:', error);
    throw error;
  }
}

export async function getShipmentStatus(trackingNumber: string) {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .select('*, shipment_tracking_logs(*)')
      .eq('tracking_number', trackingNumber)
      .single();

    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

export async function updateShipmentStatus(shipmentId: string, status: string, location: string, notes: string) {
  try {
    // Update shipment
    await supabase
      .from('shipments')
      .update({ status })
      .eq('id', shipmentId);

    // Add tracking log
    await supabase.from('shipment_tracking_logs').insert([
      {
        shipment_id: shipmentId,
        status,
        location,
        notes,
      },
    ]);

    return true;
  } catch (error) {
    console.error('Update shipment status error:', error);
    throw error;
  }
}

export async function getOrderShipments(orderId: string) {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .select('*, shipment_tracking_logs(*)')
      .eq('order_id', orderId);

    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}
