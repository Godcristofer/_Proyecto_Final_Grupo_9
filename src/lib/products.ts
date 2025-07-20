import type { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Monitor Samsung',
    description: 'Monitor Samsung de alta calidad para imágenes nítidas y vibrantes, perfecto para trabajar y jugar.',
    price: 1000.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'samsung monitor',
    rating: 5,
    category: 'Monitores',
    reviews: 152
  },
  {
    id: '2',
    name: 'Teclado T#01',
    description: 'Un teclado confiable y cómodo para el uso diario, con una construcción duradera.',
    price: 7.50,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'keyboard',
    rating: 4,
    category: 'Teclados',
    reviews: 89
  },
  {
    id: '3',
    name: 'Auriculares A#01',
    description: 'Auriculares cómodos con una calidad de sonido clara para una experiencia de audio inmersiva.',
    price: 3.50,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'headphones',
    rating: 4,
    category: 'Auriculares',
    reviews: 124
  },
  {
    id: '4',
    name: 'Parlantes P#01',
    description: 'Parlantes compactos que ofrecen un sonido potente, perfectos para cualquier configuración de escritorio.',
    price: 12.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'speakers',
    rating: 4,
    category: 'Parlantes',
    reviews: 98
  },
  {
    id: '5',
    name: 'Mouse Mouse#01',
    description: 'Mouse ergonómico y preciso, diseñado para la comodidad y la productividad.',
    price: 46.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'computer mouse',
    rating: 5,
    category: 'Mouse',
    reviews: 210
  },
  {
    id: '6',
    name: 'Cámara Web C#01',
    description: 'Cámara web HD para videollamadas y streaming nítidos, con fácil configuración plug-and-play.',
    price: 11.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'webcam',
    rating: 4,
    category: 'Cámaras Web',
    reviews: 176
  },
  {
    id: '7',
    name: 'Mouse Mouse#02',
    description: 'Un mouse elegante y sensible, perfecto para juegos y uso profesional.',
    price: 22.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'gaming mouse',
    rating: 4,
    category: 'Mouse',
    reviews: 135
  },
  {
    id: '8',
    name: 'Micrófono Microfono#01',
    description: 'Micrófono con calidad de estudio para una grabación de audio clara, ideal para podcasting y streaming.',
    price: 12.00,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'microphone',
    rating: 5,
    category: 'Microfonos',
    reviews: 198
  }
];

export const getProducts = (): Product[] => products;

export const getProductById = (id: string): Product | undefined => products.find(p => p.id === id);

export const getProductCategories = (): string[] => [...new Set(products.map(p => p.category))];
