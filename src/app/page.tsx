import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProducts, getProductCategories } from '@/lib/products';
import ProductCard from '@/components/product-card';
import { Headphones, Monitor, Mouse, Keyboard, Speaker, Webcam } from 'lucide-react';

const categoryDetails: { [key: string]: { icon: React.ElementType, description: string } } = {
  'Mouses': { icon: Mouse, description: 'Los mejores mouses para gaming y oficina' },
  'Monitores': { icon: Monitor, description: 'Monitores de alta resolución para una experiencia visual increíble' },
  'Teclados': { icon: Keyboard, description: 'Teclados mecánicos y de membrana para todo tipo de usuarios' },
  'Auriculares': { icon: Headphones, description: 'Sumérgete en el sonido con nuestra gama de auriculares' },
  'Parlantes': { icon: Speaker, description: 'Sonido potente y claro para tu setup' },
  'Cámaras Web': { icon: Webcam, description: 'Videollamadas nítidas y fluidas con nuestras cámaras web' },
};

export default function HomePage() {
  const allProducts = getProducts();
  const featuredProducts = allProducts.slice(0, 4);
  const categories = ['Mouses', 'Monitores', 'Teclados', 'Auriculares', 'Parlantes', 'Cámaras Web'];

  return (
    <div className="flex flex-col bg-background">
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              ComCorp
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
              Tu Aliado en Tecnología. Los mejores periféricos y accesorios para potenciar tu setup.
            </p>
            <Button asChild size="lg" className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/80">
              <Link href="/productos">Ver Productos</Link>
            </Button>
          </div>
          <div className="relative h-64 md:h-96">
             <Image
                src="/img/hero-image.png"
                alt="Gaming Setup"
                fill
                className="object-contain"
                data-ai-hint="gaming setup"
              />
          </div>
        </div>
      </section>
      
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">Categorías</h2>
          <p className="text-muted-foreground text-center mb-8">Encuentra lo que necesitas para tu espacio de trabajo o juego.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const details = categoryDetails[category];
              if (!details) return null;
              const CategoryIcon = details.icon;
              return (
                <Link key={category} href="/productos">
                  <Card className="group text-center p-4 hover:bg-primary hover:text-primary-foreground transition-colors">
                    <CategoryIcon className="h-10 w-10 mx-auto mb-2 text-primary group-hover:text-primary-foreground" />
                    <h3 className="text-md font-semibold">{category}</h3>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Productos Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/productos">Ver todos los productos</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
