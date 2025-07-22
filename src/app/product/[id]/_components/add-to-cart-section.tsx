
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { Plus, Minus, ShoppingCart, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AddToCartSection({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
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
        addToCart(product, quantity);
    } catch (error) {
        console.error(error);
    } finally {
        setIsAdding(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={isAdding}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input 
          type="number" 
          className="w-16 text-center" 
          value={quantity} 
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          min="1"
          disabled={isAdding}
        />
        <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)} disabled={isAdding}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button size="lg" onClick={handleAddToCart} className="flex-grow" disabled={isAdding}>
        {isAdding ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ShoppingCart className="mr-2 h-5 w-5" />}
        {isAdding ? 'Agregando...' : 'Agregar al Carrito'}
      </Button>
    </div>
  );
}
