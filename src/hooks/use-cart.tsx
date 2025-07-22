
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import type { Product, CartItem } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      const storedCart = localStorage.getItem(`cart_${user.uid}`);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (user && !isLoading) {
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user, isLoading]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
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

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { id: product.id, product, quantity }];
    });

    toast({ title: "Producto añadido", description: `${product.name} ha sido agregado a tu carrito.` });

  }, [user, toast, router]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0), [cartItems]);

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
