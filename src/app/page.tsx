
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/product-card';
import { Monitor } from 'lucide-react';
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


export default async function HomePage() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 3);
  const topCategories = [
    {
      name: 'Mouses',
      description: 'descripcion del articulo',
      image: '/img/mouses.jpg',
      data_ai_hint: 'computer mouse'
    },
    {
      name: 'Monitores',
      description: 'descripcion del articulo',
      image: '/img/monitor-all-series-kv-m.jpg',
      data_ai_hint: 'samsung monitor'
    },
    {
      name: 'Teclados',
      description: 'descripcion del articulo',
      image: '/img/teclados.jpg',
      data_ai_hint: 'keyboard'
    }
  ];

  return (
    <div className="flex flex-col bg-background">
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-24">
        <div className="container mx-auto flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white p-2 rounded-md">
              <Monitor className="h-8 w-8 text-primary" />
            </div>
            <span className="text-3xl font-bold">CompCorp</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            ComCorp
          </h1>
          <p className="mt-2 text-lg md:text-xl">
            Tu Aliado En Tecnología
          </p>
        </div>
      </section>
      
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Lo más vendido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topCategories.map((category) => (
              <Card key={category.name} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    data-ai-hint={category.data_ai_hint}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="/productos">Ver más</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
