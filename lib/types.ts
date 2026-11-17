// User & Authentication
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'customer' | 'admin' | 'staff';

export interface UserRoleRecord {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

// Categories & Collections
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// Products
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  category_id: string;
  collection_id: string | null;
  price: number;
  discount_price: number | null;
  fabric: string | null;
  color: string | null;
  care_instructions: string | null;
  is_active: boolean;
  is_featured: boolean;
  is_bestseller: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface ProductMeasurement {
  id: string;
  product_id: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  length: number | null;
  width: number | null;
  chest: number | null;
  shoulder: number | null;
  sleeve: number | null;
  created_at: string;
}

export interface ProductInventory {
  id: string;
  product_id: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  stock: number;
  reserved: number;
  available: number;
  created_at: string;
  updated_at: string;
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

// Shopping Cart
export interface Cart {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  selected_size: ProductSize;
  price_at_add: number;
  created_at: string;
  updated_at: string;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
  images: ProductImage[];
}

// Address
export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  street_address: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  is_billing: boolean;
  is_shipping: boolean;
  created_at: string;
  updated_at: string;
}

// Orders
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'dispatched'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'cod' | 'online';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;

  delivery_address_id: string | null;
  delivery_street: string;
  delivery_city: string;
  delivery_province: string;
  delivery_postal_code: string;

  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;

  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total_amount: number;

  order_notes: string | null;
  admin_notes: string | null;

  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image_url: string | null;
  quantity: number;
  selected_size: ProductSize;
  created_at: string;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

// Payments
export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  gateway_reference_id: string | null;
  gateway_transaction_id: string | null;
  gateway_response: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

// Shipments
export type ShipmentStatus =
  | 'pending'
  | 'booked'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'cancelled';

export interface Shipment {
  id: string;
  order_id: string;
  tracking_number: string | null;
  postex_shipment_id: string | null;
  status: ShipmentStatus;
  estimated_delivery_date: string | null;
  actual_delivery_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ShipmentTrackingLog {
  id: string;
  shipment_id: string;
  status: string;
  location: string | null;
  description: string | null;
  created_at: string;
}

// Coupons
export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_order_value: number | null;
  maximum_uses: number | null;
  current_uses: number;
  expiry_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Newsletter
export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_subscribed: boolean;
  created_at: string;
  updated_at: string;
}

// Email
export interface EmailLog {
  id: string;
  to_email: string;
  subject: string;
  email_type: string;
  status: 'pending' | 'sent' | 'failed';
  error_message: string | null;
  resend_message_id: string | null;
  created_at: string;
  updated_at: string;
}

// Hero Slides
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  cta_text: string | null;
  cta_link: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Store Settings
export interface StoreSetting {
  id: string;
  key: string;
  value: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
