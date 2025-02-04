import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
}

export function generateWhatsAppLink(product: any): string {
  const message = `Hi! I'm interested in purchasing ${product.name} (${formatPrice(product.price)})`;
  return `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
}