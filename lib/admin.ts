import { supabase } from './supabase';

// Check if user is admin
export async function checkIsAdmin(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single();

    if (error) return false;
    return !!data;
  } catch {
    return false;
  }
}

// Get dashboard metrics
export async function getDashboardMetrics() {
  try {
    const { data: orders } = await supabase.from('orders').select('*');
    const { data: customers } = await supabase.from('profiles').select('*');
    const { data: products } = await supabase.from('products').select('*');

    const totalOrders = orders?.length || 0;
    const totalSales = (orders || []).reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0);
    const totalCustomers = customers?.length || 0;
    const totalProducts = products?.length || 0;

    return {
      totalOrders,
      totalSales,
      totalCustomers,
      totalProducts,
      pendingOrders: (orders || []).filter((o: any) => o.status === 'pending').length,
      completedOrders: (orders || []).filter((o: any) => o.status === 'delivered').length,
    };
  } catch (error) {
    console.error('Get metrics error:', error);
    throw error;
  }
}

// Get all products
export async function getAllProducts(limit = 50, offset = 0) {
  try {
    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { products: data || [], total: count || 0 };
  } catch (error) {
    console.error('Get products error:', error);
    throw error;
  }
}

// Create product
export async function createProduct(productData: {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: string;
  collection_id?: string;
  price: number;
  discount_price?: number;
  fabric: string;
  color: string;
  care_instructions: string;
}) {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Create product error:', error);
    throw error;
  }
}

// Update product
export async function updateProduct(productId: string, updates: Record<string, unknown>) {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Update product error:', error);
    throw error;
  }
}

// Delete product
export async function deleteProduct(productId: string) {
  try {
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) throw error;
  } catch (error) {
    console.error('Delete product error:', error);
    throw error;
  }
}

// Get categories
export async function getCategories() {
  try {
    const { data, error } = await supabase.from('categories').select('*').order('display_order');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Get categories error:', error);
    throw error;
  }
}

// Create category
export async function createCategory(categoryData: {
  name: string;
  slug: string;
  description: string;
}) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Create category error:', error);
    throw error;
  }
}

// Get product inventory
export async function getProductInventory(productId: string) {
  try {
    const { data, error } = await supabase
      .from('product_inventory')
      .select('*')
      .eq('product_id', productId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Get inventory error:', error);
    throw error;
  }
}

// Update inventory
export async function updateInventory(inventoryId: string, stock: number) {
  try {
    const { data, error } = await supabase
      .from('product_inventory')
      .update({ stock })
      .eq('id', inventoryId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Update inventory error:', error);
    throw error;
  }
}

// Get all orders
export async function getAllOrders(limit = 50, offset = 0) {
  try {
    const { data, error, count } = await supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { orders: data || [], total: count || 0 };
  } catch (error) {
    console.error('Get orders error:', error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Update order status error:', error);
    throw error;
  }
}

// Get customers
export async function getCustomers(limit = 50, offset = 0) {
  try {
    const { data, error, count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { customers: data || [], total: count || 0 };
  } catch (error) {
    console.error('Get customers error:', error);
    throw error;
  }
}

// Get coupons
export async function getCoupons() {
  try {
    const { data, error } = await supabase.from('coupons').select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Get coupons error:', error);
    throw error;
  }
}

// Create coupon
export async function createCoupon(couponData: {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_order_value?: number;
  maximum_uses?: number;
  expiry_date?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .insert([couponData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Create coupon error:', error);
    throw error;
  }
}

// Update coupon
export async function updateCoupon(couponId: string, updates: Record<string, unknown>) {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .update(updates)
      .eq('id', couponId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Update coupon error:', error);
    throw error;
  }
}
