import ProductCatalog from '@/components/product-catalog';
import { getProducts, getProductCategories } from '@/lib/products';

export default async function ProductosPage() {
  const products = await getProducts();
  const categories = await getProductCategories();
  
  return <ProductCatalog products={products} categories={categories} />;
}
