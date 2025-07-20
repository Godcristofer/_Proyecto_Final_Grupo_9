import type { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'QuantumWave Pro Keyboard',
    description: 'A mechanical keyboard with customizable RGB backlighting and programmable macros. Built for performance and durability.',
    price: 129.99,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'mechanical keyboard',
    rating: 5,
    category: 'Keyboards',
    reviews: 210
  },
  {
    id: '2',
    name: 'Aether-Glide Mouse',
    description: 'Ergonomic wireless mouse with a high-precision sensor, 8 programmable buttons, and a long-lasting battery.',
    price: 79.99,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'gaming mouse',
    rating: 4,
    category: 'Mice',
    reviews: 158
  },
  {
    id: '3',
    name: 'SpectraView 27" Monitor',
    description: 'A 4K UHD monitor with HDR support, providing stunning visuals and vibrant colors for both work and play.',
    price: 499.99,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'computer monitor',
    rating: 5,
    category: 'Monitors',
    reviews: 98
  },
  {
    id: '4',
    name: 'EchoClear Pro Microphone',
    description: 'Studio-quality USB microphone perfect for streaming, podcasting, and recording crystal-clear audio.',
    price: 149.99,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'usb microphone',
    rating: 4,
    category: 'Microphones',
    reviews: 120
  },
  {
    id: '5',
    name: 'SonicPulse Headset',
    description: 'Immersive 7.1 surround sound gaming headset with a noise-canceling microphone and comfortable earcups.',
    price: 99.99,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'gaming headset',
    rating: 4,
    category: 'Headsets',
    reviews: 301
  },
  {
    id: '6',
    name: 'StreamLine Web Camera',
    description: '1080p Full HD webcam with autofocus and low-light correction, ensuring you look your best on every video call.',
    price: 69.99,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'webcam',
    rating: 4,
    category: 'Webcams',
    reviews: 189
  },
  {
    id: '7',
    name: 'HyperCore Gaming PC',
    description: 'A pre-built gaming desktop with the latest generation processor and graphics card for ultimate performance.',
    price: 1999.99,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'gaming pc',
    rating: 5,
    category: 'Computers',
    reviews: 45
  },
  {
    id: '8',
    name: 'DataDock NVMe Enclosure',
    description: 'A sleek, portable NVMe SSD enclosure for blazing-fast external storage. USB-C and Thunderbolt compatible.',
    price: 49.99,
    image: 'https://placehold.co/600x400.png',
    data_ai_hint: 'ssd enclosure',
    rating: 5,
    category: 'Accessories',
    reviews: 250
  }
];

export const getProducts = (): Product[] => products;

export const getProductById = (id: string): Product | undefined => products.find(p => p.id === id);

export const getProductCategories = (): string[] => [...new Set(products.map(p => p.category))];
