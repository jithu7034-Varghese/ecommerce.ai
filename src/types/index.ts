export type Size = 'UK 8' | 'UK 10' | 'UK 12' | 'UK 14' | 'UK 16' | 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface ProductColorway {
  name: string;
  hex: string;
  previewImage: string;
  galleryImages: string[];
}

export interface ProductVariant {
  id: string; // e.g. SKU-SAP-10
  productId: string;
  color: string;
  size: Size;
  stock: number;
  lowStockThreshold: number;
  price: number;
  sku: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'evening' | 'workwear' | 'cocktail' | 'casual';
  occasion: string[];
  fabric: string;
  care: string;
  fitAdvice: string;
  modelMeasurements: string;
  rating: number;
  reviewsCount: number;
  colorways: ProductColorway[];
  availableSizes: Size[];
  variants: ProductVariant[];
  featured?: boolean;
  newArrival?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  color: string;
  size: Size;
  price: number;
  image: string;
  quantity: number;
}

export type OrderStatus = 'pending' | 'packed' | 'dispatched' | 'delivered' | 'cancelled';

export interface Order {
  id: string; // #BER-XXXXX
  customerName: string;
  email: string;
  shippingAddress: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  deliveryMethod: 'standard' | 'priority';
  deliveryFee: number;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  createdAt: string;
  paymentMethod: 'Simulated Card (Demo)';
}

export interface AIProposal {
  id: string;
  variantId: string;
  productTitle: string;
  color: string;
  size: Size;
  supplier: string;
  proposedQuantity: number;
  unitCost: number;
  totalCost: number;
  what: string;
  why: string;
  impact: string;
  limitations: string;
  status: 'pending' | 'approved' | 'rejected' | 'modified';
  timestamp: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface AuditLogEntry {
  id: string;
  action: string;
  target: string;
  previousValue?: string;
  newValue: string;
  userId: string;
  timestamp: string;
  status: 'approved' | 'rejected' | 'reverted';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  matchingProducts?: Product[];
  actionChips?: string[];
  intentSlots?: {
    category?: string;
    occasion?: string;
    color?: string;
    size?: string;
    maxPrice?: number;
  };
}
