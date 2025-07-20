import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProducts, getProductCategories } from '@/lib/products';
import ProductCard from '@/components/product-card';
import { ArrowRight, Monitor, Keyboard, Headphones, Speaker, Mouse, Webcam, Mic } from 'lucide-react';

const categoryIcons: { [key: string]: React.ElementType } = {
  'Monitores': Monitor,
  'Teclados': Keyboard,
  'Auriculares': Headphones,
  'Parlantes': Speaker,
  'Mouse': Mouse,
  'Cámaras Web': Webcam,
  'Microfonos': Mic,
};

export default function HomePage() {
  const allProducts = getProducts();
  const featuredProducts = allProducts.slice(0, 4);
  const categories = getProductCategories();

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex items-center justify-center">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Encuentra los mejores productos
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Explora nuestra amplia gama de accesorios tecnológicos diseñados para mejorar tu productividad y entretenimiento.
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-gray-100">
            <Link href="/productos">
              Ver catálogo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Monitor;
              return (
                <Link href="/productos" key={category}>
                  <Card className="flex flex-col items-center justify-center p-4 aspect-square transition-all hover:shadow-lg hover:-translate-y-1">
                    <Icon className="h-10 w-10 text-primary" />
                    <p className="mt-2 text-sm font-semibold text-center">{category}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Productos Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
               <Link href="/productos">Ver todos los productos</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
