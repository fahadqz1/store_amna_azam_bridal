import { supabase } from './supabase';

export interface CheckoutData {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    size: string;
    price: number;
  }>;
  shipping: {
    fullName: string;
    phone: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
  };
  paymentMethod: 'cod' | 'online';
  couponCode?: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

export async function validateProductAvailability(productId: string, size: string, quantity: number) {
  try {
    const { data, error } = await supabase
      .from('product_inventory')
      .select('stock')
      .eq('product_id', productId)
      .eq('size', size)
      .single();

    if (error) return { available: false, stock: 0 };
    return { available: (data?.stock || 0) >= quantity, stock: data?.stock || 0 };
  } catch {
    return { available: false, stock: 0 };
  }
}

export async function validateCoupon(couponCode: string) {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error) return null;

    if (data?.expiry_date && new Date(data.expiry_date) < new Date()) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export async function calculateOrderSummary(
  items: CheckoutData['items'],
  couponCode?: string,
  subtotal?: number
): Promise<OrderSummary> {
  const calculatedSubtotal = subtotal || items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (couponCode) {
    const coupon = await validateCoupon(couponCode);
    if (coupon) {
      discount = coupon.discount_type === 'percentage'
        ? calculatedSubtotal * (coupon.discount_value / 100)
        : coupon.discount_value;
    }
  }

  const shipping = calculatedSubtotal > 5000 ? 0 : 500;
  const tax = Math.round((calculatedSubtotal - discount) * 0.17);

  return {
    subtotal: calculatedSubtotal,
    shipping,
    discount,
    tax,
    total: calculatedSubtotal + shipping + tax - discount,
  };
}

export async function createOrder(checkoutData: CheckoutData, summary: OrderSummary) {
  try {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: checkoutData.userId,
          status: 'pending',
          total_amount: summary.total,
          tax_amount: summary.tax,
          shipping_cost: summary.shipping,
          discount_amount: summary.discount,
          payment_method: checkoutData.paymentMethod,
          customer_name: checkoutData.shipping.fullName,
          customer_email: '', // Will be populated from user profile
          customer_phone: checkoutData.shipping.phone,
          shipping_street: checkoutData.shipping.streetAddress,
          shipping_city: checkoutData.shipping.city,
          shipping_province: checkoutData.shipping.province,
          shipping_postal_code: checkoutData.shipping.postalCode,
        },
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // Add order items
    const orderItems = checkoutData.items.map((item) => ({
      order_id: orderData.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Reduce inventory
    for (const item of checkoutData.items) {
      const { error: inventoryError } = await supabase.rpc('reduce_inventory', {
        p_product_id: item.productId,
        p_size: item.size,
        p_quantity: item.quantity,
      });

      if (inventoryError) throw inventoryError;
    }

    // Apply coupon redemption
    if (checkoutData.couponCode) {
      const coupon = await validateCoupon(checkoutData.couponCode);
      if (coupon) {
        await supabase.from('coupon_redemptions').insert([
          {
            coupon_id: coupon.id,
            order_id: orderData.id,
            user_id: checkoutData.userId,
          },
        ]);
      }
    }

    return orderData;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
}

export async function getOrderByNumber(orderNumber: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderNumber)
      .single();

    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}
