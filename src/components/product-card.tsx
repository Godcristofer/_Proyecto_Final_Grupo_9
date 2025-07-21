
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Loader2 } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);


  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Inicia Sesión',
        description: 'Debes iniciar sesión para agregar productos al carrito.',
        variant: 'destructive',
        action: (
            <Button onClick={() => router.push('/login')}>Iniciar Sesión</Button>
        )
      });
      return;
    }
    setIsAdding(true);
    try {
        await addToCart(product);
    } catch(err) {
        console.error(err);
    } finally {
        setIsAdding(false);
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="block relative h-60 w-full bg-white p-4">
        <Image
          src={product.image || 'https://placehold.co/600x400.png'}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={product.data_ai_hint}
        />
      </Link>
      <CardContent className="flex flex-grow flex-col p-4 bg-white">
        <div className="flex-grow">
          <Link href={`/product/${product.id}`}><h3 className="text-lg font-semibold hover:text-primary">{product.name}</h3></Link>
          <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
          <p className="mt-2 text-lg font-bold">S/ {product.price.toFixed(2)}</p>
        </div>
        <Button 
          className="mt-4 w-full" 
          onClick={handleAddToCart} 
          disabled={isAdding}
          aria-label={`Agregar ${product.name} al carrito`}>
          {isAdding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
          {isAdding ? 'Agregando...' : 'Agregar al carrito'}
        </Button>
      </CardContent>
    </Card>
  );
}
