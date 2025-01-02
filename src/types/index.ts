export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'earrings' | 'bracelets' | 'chains';
  images: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage?: number;
  validUntil: Date;
  isActive: boolean;
  appliesTo: string[]; // Product IDs
}

export interface CartItem {
  product: Product;
  quantity: number;
}