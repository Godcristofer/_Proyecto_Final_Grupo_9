
"use client";

import React, { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import type { Product, CartItem } from '@/lib/types';

// DataConnect generated hooks
import {
    useGetCartByUserId,
    useAddOrUpdateCartItem,
    useRemoveCartItem,
    useCreateCartForUser,
} from '@firebasegen/default-2-connector/react';
import { Loader2 } from 'lucide-react';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: cartData, isLoading: cartLoading, refetch: refetchCart } = useGetCartByUserId(
    { userId: user?.uid! },
    { enabled: !!user }
  );

  const { mutate: addOrUpdateItem } = useAddOrUpdateCartItem({
      onSuccess: () => refetchCart(),
      onError: (error) => toast({ variant: 'destructive', title: 'Error', description: error.message }),
  });
  
  const { mutate: removeItem } = useRemoveCartItem({
      onSuccess: () => refetchCart(),
      onError: (error) => toast({ variant: 'destructive', title: 'Error', description: error.message }),
  });

  const { mutate: createCart } = useCreateCartForUser({
      onSuccess: () => refetchCart(),
      onError: (error) => toast({ variant: 'destructive', title: 'Error', description: error.message }),
  });

  const cart = useMemo(() => {
    if (!cartData?.shopping_carts || cartData.shopping_carts.length === 0) {
      return null;
    }
    return cartData.shopping_carts[0];
  }, [cartData]);

  const cartItems = useMemo((): CartItem[] => {
    if (!cart?.shopping_cart_itemsCollection) return [];
    return cart.shopping_cart_itemsCollection.map(item => ({
        id: item.id,
        product: {
            ...item.product,
            description: item.product.description || '',
            image: item.product.image || 'https://placehold.co/600x400.png',
            category: item.product.category || 'Sin categoría',
            data_ai_hint: item.product.name.split(' ').slice(0, 2).join(' ').toLowerCase() || 'product',
        },
        quantity: item.quantity,
    }));
  }, [cart]);


  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'Debes iniciar sesión para agregar productos al carrito.' });
      return;
    }

    if (!cart) {
        createCart({ userId: user.uid }, {
            onSuccess: (data) => {
                const newCartId = data?.shopping_carts_insert?.id;
                if (newCartId) {
                    addOrUpdateItem({ cart_id: newCartId, product_id: product.id, quantity });
                    toast({ title: "Agregado al carrito", description: `${product.name} ha sido agregado a tu carrito.` });
                }
            }
        });
    } else {
        const existingItem = cartItems.find(item => item.product.id === product.id);
        addOrUpdateItem({
            cart_id: cart.id,
            product_id: product.id,
            quantity: existingItem ? existingItem.quantity + quantity : quantity,
        });
        toast({ title: "Agregado al carrito", description: `${product.name} ha sido agregado a tu carrito.` });
    }
  };

  const removeFromCart = (itemId: string) => {
    if (!user) return;
    removeItem({ itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (!user || !cart) return;

    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      const itemToUpdate = cartItems.find(item => item.id === itemId);
      if (itemToUpdate) {
        addOrUpdateItem({
          cart_id: cart.id,
          product_id: itemToUpdate.product.id,
          quantity: quantity,
        });
      }
    }
  };
  
  const clearCart = () => {
    if (!user) return;
    cartItems.forEach(item => removeItem({ itemId: item.id! }));
  };

  const cartCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0), [cartItems]);

  const isLoading = authLoading || (!!user && cartLoading);

  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
