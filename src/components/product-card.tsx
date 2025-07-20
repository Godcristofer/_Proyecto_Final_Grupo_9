"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg border shadow-none transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={product.data_ai_hint}
          />
        </Link>
      </div>
      <CardContent className="flex flex-grow flex-col p-4">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="mt-1 text-lg font-bold">S/ {product.price.toFixed(2)}</p>
          <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
        </div>
        <Button 
          className="mt-4 w-full bg-primary hover:bg-primary/90" 
          onClick={() => addToCart(product)} 
          aria-label={`Agregar ${product.name} al carrito`}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
}
