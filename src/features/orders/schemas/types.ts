export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size: string;
  color: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productVariantId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  productVariant: ProductVariant;
}

export interface Order {
  id: string;
  userId: string;
  shippingAddressId: string;
  discountId: string | null;
  status: OrderStatus;
  totalAmount: number;
  notes: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  user: OrderUser;
  items: OrderItem[];
  payment: unknown | null;
}
