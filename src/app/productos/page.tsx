
import ProductCatalog from '@/components/product-catalog';
import type { Product } from '@/lib/types';
import { getFirebaseApp } from '@/lib/firebase';
import { getDataConnect } from 'firebase/data-connect';
import {
  connectorConfig,
  listProducts,
} from '@firebasegen/default-2-connector';

const getProducts = async (): Promise<Product[]> => {
  try {
    const app = getFirebaseApp();
    const dataConnect = getDataConnect(connectorConfig, { app });
    const { data } = await listProducts(dataConnect);

    if (!data || !data.productss) {
      return [];
    }

    return data.productss.map((p) => {
      let imagePath = p.image;
      if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('/')) {
        imagePath = `/${imagePath}`;
      }
      return {
        id: p.id,
        name: p.name,
        description: p.description || '',
        price: p.price,
        image: imagePath || 'https://placehold.co/600x400.png',
        data_ai_hint: p.name.split(' ').slice(0, 2).join(' ').toLowerCase() || 'product',
        category: p.category || 'Sin categoría',
        rating: 4, // Placeholder
        reviews: 0, // Placeholder
      };
    });
  } catch (error) {
    console.error('Error fetching products from Data Connect:', error);
    return [];
  }
};


async function getProductCategories(products: any[]) {
  return [...new Set(products.map(p => p.category))];
}

export default async function ProductosPage() {
  const products = await getProducts();
  const categories = await getProductCategories(products);
  
  return <ProductCatalog products={products} categories={categories} />;
}
