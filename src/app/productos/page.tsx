import ProductCatalog from '@/components/product-catalog';
import { getProducts } from '@/lib/products';

export default function ProductosPage() {
  const products = getProducts();
  return <ProductCatalog products={products} />;
}
