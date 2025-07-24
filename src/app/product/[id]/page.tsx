
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AddToCartSection } from './_components/add-to-cart-section';
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
        rating: 4, 
        reviews: 0, 
      };
    });
  } catch (error) {
    console.error('Error fetching products from Data Connect:', error);
    return [];
  }
};

const getProductById = async (id: string): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find(p => p.id === id);
};


export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-card overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={600}
            className="w-full h-full object-cover"
            data-ai-hint={product.data_ai_hint}
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-3xl font-bold text-primary">S/ {product.price.toFixed(2)}</p>
          
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <p className="ml-3 text-sm text-muted-foreground">{product.reviews} reseñas</p>
          </div>
          
          <Separator className="my-6" />

          <p className="text-base text-muted-foreground leading-relaxed">{product.description}</p>
          
          <Separator className="my-6" />

          <AddToCartSection product={product} />
        </div>
      </div>
    </div>
  );
}
