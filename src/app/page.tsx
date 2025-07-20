import ProductCatalog from '@/components/product-catalog';
import { getProducts } from '@/lib/products';

export default function HomePage() {
  const products = getProducts();
  return <ProductCatalog products={products} />;
}
