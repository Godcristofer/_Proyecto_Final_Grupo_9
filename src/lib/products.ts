
'use server';

import { getConnector } from '../dataconnect/sdk';
import type { Product } from '@/lib/types';
import { ListProductsResponse, GetProductByIdResponse } from '../dataconnect/sdk/queries/dataconnect.queries.graphql';

function mapProduct(productData: ListProductsResponse['productss'][0] | (GetProductByIdResponse['products'] extends { nodes: Array<any> } ? GetProductByIdResponse['products']['nodes'][0] : never)): Product {
  if (!productData) {
    throw new Error("Product data is null or undefined");
  }

  const p = productData;

  return {
    id: p.id,
    name: p.name,
    description: p.description || `Descripción para ${p.name}.`,
    price: p.price,
    image: `/${p.image}`,
    category: p.category,
    rating: 4, // Default value
    reviews: 0, // Default value
    data_ai_hint: p.category.toLowerCase(),
  };
}


export const getProducts = async (): Promise<Product[]> => {
  const connector = getConnector();
  const { data } = await connector.ListProducts();
  if (!data.productss) {
    return [];
  }
  return data.productss.map(p => mapProduct(p));
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const connector = getConnector();
  const { data } = await connector.GetProductById({ id });

  if (data.products?.nodes?.length > 0) {
    return mapProduct(data.products.nodes[0]);
  }
  return undefined;
};

export const getProductCategories = async (): Promise<string[]> => {
  const products = await getProducts();
  return [...new Set(products.map(p => p.category))];
};
