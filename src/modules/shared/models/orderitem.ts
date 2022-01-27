export interface OrderItem {
  id: number;
  quantity: number;
  note: string;
  status: string;
  priority: number;
  orderId: number;
  dateOfOrder: string;
  menuItemId: string;
}

export interface CreateOrderItem {
  quantity: number;
  note: string;
  status: string;
  priority: number;
  orderId: number;
  menuItemId: string;
}

export interface AcceptOrderItem {
  quantity: number;
  note: string;
  status: string;
  priority: number;
  menuItemId: string;
  bartenderId: number;
  cookId: number;
  orderId: number;
}