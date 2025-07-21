
"use client";

import React, { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import type { Product, CartItem } from '@/lib/types';

// DataConnect generated hooks
import {
    useGetCartByUserId,
    useAddItemToCart,
    useUpdateCartItemQuantity,
    useDeleteCartItem,
    useCreateCart,
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

  const { mutate: addItem } = useAddItemToCart({
      onSuccess: () => refetchCart(),
      onError: (error) => toast({ variant: 'destructive', title: 'Error al añadir item', description: error.message }),
  });
  
  const { mutate: updateItem } = useUpdateCartItemQuantity({
    onSuccess: () => refetchCart(),
    onError: (error) => toast({ variant: 'destructive', title: 'Error al actualizar item', description: error.message }),
  });

  const { mutate: removeItem } = useDeleteCartItem({
      onSuccess: () => refetchCart(),
      onError: (error) => toast({ variant: 'destructive', title: 'Error al eliminar item', description: error.message }),
  });

  const { mutate: createCart } = useCreateCart({
      onSuccess: () => refetchCart(),
      onError: (error) => toast({ variant: 'destructive', title: 'Error al crear carrito', description: error.message }),
  });

  const cart = useMemo(() => {
    if (!cartData?.shoppingCartsCollection || cartData.shoppingCartsCollection.length === 0) {
      return null;
    }
    return cartData.shoppingCartsCollection[0];
  }, [cartData]);

  const cartItems = useMemo((): CartItem[] => {
    if (!cart?.items) return [];
    
    // The schema implies 'items' might not be an array, but the SDK often returns collections.
    const itemsArray = Array.isArray(cart.items) ? cart.items : [cart.items];

    return itemsArray.map((item: any) => ({
        id: item.id,
        product: {
            ...item.product,
            description: item.product.description || '',
            image: item.product.image && !item.product.image.startsWith('/') && !item.product.image.startsWith('http') ? `/${item.product.image}` : (item.product.image || 'https://placehold.co/600x400.png'),
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

    const actionAfterCartExists = (cartId: string) => {
        const existingItem = cartItems.find(item => item.product.id === product.id);
        if (existingItem) {
            // If item exists, update quantity
            updateItem({
                itemId: existingItem.id!,
                quantity: existingItem.quantity + quantity
            });
        } else {
            // If item doesn't exist, add it
            addItem({ cartId: cartId, productId: product.id, quantity });
        }
        toast({ title: "Actualizado", description: `${product.name} ha sido agregado/actualizado en tu carrito.` });
    };

    if (!cart) {
        createCart({ userId: user.uid }, {
            onSuccess: (data) => {
                const newCartId = data?.shoppingCarts_insert?.id;
                if (newCartId) {
                    actionAfterCartExists(newCartId);
                } else {
                    toast({ variant: 'destructive', title: 'Error', description: 'No se pudo crear el carrito.' });
                }
            }
        });
    } else {
        actionAfterCartExists(cart.id);
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
      updateItem({ itemId, quantity });
    }
  };
  
  const clearCart = () => {
    if (!user) return;
    cartItems.forEach(item => removeItem({ itemId: item.id! }));
  };

  const cartCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0), [cartItems]);

  const isLoading = authLoading || (!!user && cartLoading);
  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, isLoading }}>
      {isLoading && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
         </div>
      )}
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
