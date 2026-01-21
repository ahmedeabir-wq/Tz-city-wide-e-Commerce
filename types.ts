export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  unit: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  address?: string;
  phone?: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
  items: CartItem[];
  delivery_fee: number;
  address: string;
}

export enum DeliveryZone {
  DOWNTOWN = 'Downtown',
  UPTOWN = 'Uptown',
  SUBURBS = 'Suburbs',
  OUTSKIRTS = 'Outskirts',
}

export const DELIVERY_FEES: Record<DeliveryZone, number> = {
  [DeliveryZone.DOWNTOWN]: 2.00,
  [DeliveryZone.UPTOWN]: 5.00,
  [DeliveryZone.SUBURBS]: 8.00,
  [DeliveryZone.OUTSKIRTS]: 15.00,
};