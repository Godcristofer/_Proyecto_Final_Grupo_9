import type { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Monitor Samsung',
    description: 'High-quality Samsung monitor for crisp and vibrant visuals, perfect for work and gaming.',
    price: 1000.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'samsung monitor',
    rating: 5,
    category: 'Monitors',
    reviews: 152
  },
  {
    id: '2',
    name: 'Teclado T#01',
    description: 'A reliable and comfortable keyboard for everyday use, with a durable build.',
    price: 7.50,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'keyboard',
    rating: 4,
    category: 'Keyboards',
    reviews: 89
  },
  {
    id: '3',
    name: 'Auriculares A#01',
    description: 'Comfortable headphones with clear sound quality for an immersive audio experience.',
    price: 3.50,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'headphones',
    rating: 4,
    category: 'Headsets',
    reviews: 124
  },
  {
    id: '4',
    name: 'Parlantes P#01',
    description: 'Compact speakers that deliver powerful sound, perfect for any desk setup.',
    price: 12.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'speakers',
    rating: 4,
    category: 'Speakers',
    reviews: 98
  },
  {
    id: '5',
    name: 'Mouse Mouse#01',
    description: 'Ergonomic and precise mouse, designed for comfort and productivity.',
    price: 46.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'computer mouse',
    rating: 5,
    category: 'Mice',
    reviews: 210
  },
  {
    id: '6',
    name: 'Cámara Web C#01',
    description: 'HD webcam for clear video calls and streaming, with easy plug-and-play setup.',
    price: 11.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'webcam',
    rating: 4,
    category: 'Webcams',
    reviews: 176
  },
  {
    id: '7',
    name: 'Mouse Mouse#02',
    description: 'A sleek and responsive mouse, perfect for gaming and professional use.',
    price: 22.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'gaming mouse',
    rating: 4,
    category: 'Mice',
    reviews: 135
  },
  {
    id: '8',
    name: 'Micrófono Microfono#01',
    description: 'Studio-quality microphone for clear audio recording, ideal for podcasting and streaming.',
    price: 12.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'microphone',
    rating: 5,
    category: 'Microphones',
    reviews: 198
  }
];

export const getProducts = (): Product[] => products;

export const getProductById = (id: string): Product | undefined => products.find(p => p.id === id);

export const getProductCategories = (): string[] => [...new Set(products.map(p => p.category))];
