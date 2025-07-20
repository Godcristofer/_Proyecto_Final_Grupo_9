import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProducts, getProductCategories } from '@/lib/products';
import ProductCard from '@/components/product-card';
import { Monitor, Mouse, Keyboard } from 'lucide-react';

const categoryDetails: { [key: string]: { icon: React.ElementType, image: string, hint: string, description: string } } = {
  'Mouses': { icon: Mouse, image: 'https://placehold.co/600x400.png', hint: 'computer mouse', description: 'Descripción del artículo' },
  'Monitores': { icon: Monitor, image: 'https://placehold.co/600x400.png', hint: 'computer monitor', description: 'Descripción del artículo' },
  'Teclados': { icon: Keyboard, image: 'https://placehold.co/600x400.png', hint: 'computer keyboard', description: 'Descripción del artículo' },
};

export default function HomePage() {
  const allProducts = getProducts();
  const featuredProducts = allProducts.slice(0, 3);
  const categories = ['Mouses', 'Monitores', 'Teclados'];

  return (
    <div className="flex flex-col bg-gray-50">
      <section className="w-full bg-primary text-primary-foreground py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[40vh]">
          <div className="flex items-center gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg">
                <Monitor className="h-10 w-10 text-primary" />
              </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
            ComCorp
          </h1>
          <p className="mt-2 text-lg md:text-xl">
            Tu Aliado En Tecnología
          </p>
        </div>
      </section>
      
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Lo más vendido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const details = categoryDetails[category];
              if (!details) return null;
              return (
                <Card key={category} className="overflow-hidden">
                   <div className="relative h-48 w-full">
                    <Image
                        src={details.image}
                        alt={category}
                        fill
                        className="object-cover"
                        data-ai-hint={details.hint}
                      />
                   </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">{category}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{details.description}</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link href="/productos">Ver más</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
