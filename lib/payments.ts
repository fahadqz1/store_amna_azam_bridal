import { supabase } from './supabase';

export interface PaymentData {
  orderId: string;
  amount: number;
  method: 'cod' | 'online';
  transactionId?: string;
}

export async function createPaymentRecord(paymentData: PaymentData) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          order_id: paymentData.orderId,
          amount: paymentData.amount,
          payment_method: paymentData.method,
          transaction_id: paymentData.transactionId || null,
          status: paymentData.method === 'cod' ? 'pending' : 'initiated',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Create payment record error:', error);
    throw error;
  }
}

export async function updatePaymentStatus(paymentId: string, status: 'pending' | 'completed' | 'failed' | 'refunded') {
  try {
    const { data, error } = await supabase
      .from('payments')
      .update({ status })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;

    // Update order status if payment completed
    if (status === 'completed') {
      const payment = await supabase
        .from('payments')
        .select('order_id')
        .eq('id', paymentId)
        .single();

      if (payment.data) {
        await supabase
          .from('orders')
          .update({ status: 'confirmed' })
          .eq('id', payment.data.order_id);
      }
    }

    return data;
  } catch (error) {
    console.error('Update payment status error:', error);
    throw error;
  }
}

export async function getOrderPayment(orderId: string) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

export async function initiateOnlinePayment(orderId: string, amount: number) {
  // Placeholder for payment gateway integration (e.g., JazzCash, EasyPaisa, Stripe)
  // This would call the actual payment gateway API
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          order_id: orderId,
          amount,
          payment_method: 'online',
          status: 'initiated',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Return payment gateway URL or redirect information
    return {
      paymentId: data.id,
      redirectUrl: `/payments/gateway?paymentId=${data.id}`,
      amount,
    };
  } catch (error) {
    console.error('Initiate online payment error:', error);
    throw error;
  }
}

export async function handlePaymentWebhook(webhookData: any) {
  // Placeholder for handling payment gateway webhooks
  try {
    const { paymentId, status, transactionId } = webhookData;

    if (!paymentId) {
      throw new Error('Payment ID required in webhook');
    }

    // Update payment status
    await updatePaymentStatus(
      paymentId,
      status === 'success' ? 'completed' : 'failed'
    );

    // Update transaction ID if provided
    if (transactionId) {
      await supabase
        .from('payments')
        .update({ transaction_id: transactionId })
        .eq('id', paymentId);
    }

    return true;
  } catch (error) {
    console.error('Handle payment webhook error:', error);
    throw error;
  }
}

export async function refundPayment(paymentId: string, refundAmount?: number) {
  try {
    const payment = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (!payment.data) {
      throw new Error('Payment not found');
    }

    const amount = refundAmount || payment.data.amount;

    // Update payment status
    await updatePaymentStatus(paymentId, 'refunded');

    // Log refund
    await supabase.from('email_logs').insert([
      {
        type: 'refund_notification',
        recipient_email: '',
        status: 'pending',
        content: JSON.stringify({
          paymentId,
          refundAmount: amount,
          originalAmount: payment.data.amount,
        }),
      },
    ]);

    return true;
  } catch (error) {
    console.error('Refund payment error:', error);
    throw error;
  }
}
