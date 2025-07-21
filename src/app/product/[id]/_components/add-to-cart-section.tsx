
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

export function AddToCartSection({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: 'Inicia Sesión',
        description: 'Debes iniciar sesión para agregar productos al carrito.',
        variant: 'destructive',
      });
      return;
    }
    addToCart(product, quantity);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input 
          type="number" 
          className="w-16 text-center" 
          value={quantity} 
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          min="1"
        />
        <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button size="lg" onClick={handleAddToCart} className="flex-grow">
        <ShoppingCart className="mr-2 h-5 w-5" /> Agregar al Carrito
      </Button>
    </div>
  );
}
