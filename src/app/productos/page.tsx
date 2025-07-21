
import ProductCatalog from '@/components/product-catalog';
import type { Product } from '@/lib/types';

import { getDataConnect } from 'firebase/data-connect';
import {
  connectorConfig,
  listProducts,
} from '@/dataconnect/sdk';

const getProducts = async (): Promise<Product[]> => {
  try {
    const dataConnect = getDataConnect(connectorConfig);
    const { data } = await listProducts(dataConnect);

    if (!data || !data.productss) {
      return [];
    }

    return data.productss.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description || '',
      price: p.price,
      image: p.image || 'https://placehold.co/600x400.png',
      data_ai_hint: p.name.split(' ').slice(0, 2).join(' ').toLowerCase() || 'product',
      category: p.category || 'Sin categoría',
      rating: 4, // Placeholder
      reviews: 0, // Placeholder
    }));
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
