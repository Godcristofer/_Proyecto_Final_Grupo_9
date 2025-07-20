'use server';

import type { Product } from '@/lib/types';

const allProducts: Product[] = [
    {
        "id": "1",
        "name": "Monitor Samsung",
        "description": "Monitor Samsung de alta calidad para imágenes nítidas y vibrantes, perfecto para trabajar y jugar.",
        "price": 1000,
        "image": "/img/MONITOR01.jpg",
        "data_ai_hint": "samsung monitor",
        "rating": 5,
        "category": "Monitores",
        "reviews": 152
    },
    {
        "id": "2",
        "name": "Teclado T#01",
        "description": "Un teclado confiable y cómodo para el uso diario, con una construcción duradera.",
        "price": 7.5,
        "image": "/img/teclado01.jpg",
        "data_ai_hint": "keyboard",
        "rating": 4,
        "category": "Teclados",
        "reviews": 89
    },
    {
        "id": "3",
        "name": "Auriculares A#01",
        "description": "Auriculares cómodos con una calidad de sonido clara para una experiencia de audio inmersiva.",
        "price": 3.5,
        "image": "/img/Audifonos_01.jpg",
        "data_ai_hint": "headphones",
        "rating": 4,
        "category": "Auriculares",
        "reviews": 124
    },
    {
        "id": "4",
        "name": "Parlantes P#01",
        "description": "Parlantes potentes con sonido envolvente para una experiencia de audio completa.",
        "price": 12,
        "image": "/img/Parlantes.jpg",
        "data_ai_hint": "speakers",
        "rating": 4,
        "category": "Parlantes",
        "reviews": 78
    },
    {
        "id": "5",
        "name": "Mouse#01",
        "description": "Mouse ergonómico y preciso para una navegación suave y eficiente.",
        "price": 46,
        "image": "/img/mouselogi.jpg",
        "data_ai_hint": "computer mouse",
        "rating": 5,
        "category": "Mouse",
        "reviews": 210
    },
    {
        "id": "6",
        "name": "Cámara Web C#01",
        "description": "Cámara web de alta definición para videollamadas nítidas y claras.",
        "price": 11,
        "image": "/img/camarawb.jpg",
        "data_ai_hint": "web camera",
        "rating": 4,
        "category": "Cámaras Web",
        "reviews": 95
    },
    {
        "id": "7",
        "name": "Mouse#02",
        "description": "Mouse para juegos de alto rendimiento con botones programables y respuesta rápida.",
        "price": 22,
        "image": "/img/Razer.jpg",
        "data_ai_hint": "gaming mouse",
        "rating": 5,
        "category": "Mouse",
        "reviews": 180
    },
    {
        "id": "8",
        "name": "Micrófono#01",
        "description": "Micrófono de calidad de estudio para grabaciones de voz claras y profesionales.",
        "price": 12,
        "image": "/img/razerseiren.jpg",
        "data_ai_hint": "microphone",
        "rating": 4,
        "category": "Microfono",
        "reviews": 65
    }
];

export const getProducts = async (): Promise<Product[]> => {
  return allProducts;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return allProducts.find(p => p.id === id);
};

export const getProductCategories = async (): Promise<string[]> => {
  const products = await getProducts();
  return [...new Set(products.map(p => p.category))];
};
