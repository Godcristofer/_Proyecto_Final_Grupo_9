
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

import { getFirebaseApp } from '@/lib/firebase';
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSale, createSaleDetail, createShipment } from '@firebasegen/default-2-connector';

const formSchema = z.object({
  address: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres." }),
  city: z.string().min(2, { message: "La ciudad debe tener al menos 2 caracteres." }),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, isLoading: isCartLoading } = useCart();
  const { user, loading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { address: "", city: "" },
  });

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
    if (!isCartLoading && cartItems.length === 0) {
      router.push('/cart');
    }
  }, [user, isAuthLoading, cartItems, isCartLoading, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || cartItems.length === 0) return;

    setIsProcessing(true);
    try {
      const app = getFirebaseApp();
      const dataConnect = getDataConnect(connectorConfig, { app });
      
      const saleResponse = await createSale(dataConnect, {
        userId: user.uid,
        saleDate: new Date().toISOString().split('T')[0],
        total: cartTotal,
      });

      const saleId = saleResponse.data?.sales_insert?.id;

      if (!saleId) {
        throw new Error("No se pudo obtener el ID de la venta.");
      }

      for (const item of cartItems) {
        await createSaleDetail(dataConnect, {
          saleId: saleId,
          productId: item.product.id,
          quantity: item.quantity,
          subtotal: item.product.price * item.quantity,
        });
      }

      await createShipment(dataConnect, {
        saleId: saleId,
        address: values.address,
        city: values.city,
      });

      clearCart();
      toast({
        title: "¡Compra exitosa!",
        description: "Tu pedido ha sido realizado correctamente.",
      });
      router.push('/');
    } catch (error) {
      console.error("Error creating sale:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo procesar tu pedido. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsProcessing(false);
    }
  }

  if (isAuthLoading || isCartLoading) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-14rem)] items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Finalizar Compra</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Dirección de Envío</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input placeholder="Av. Siempre Viva 123" {...field} disabled={isProcessing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder="Springfield" {...field} disabled={isProcessing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span className="font-medium">S/ {(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>S/ {cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" form="checkout-form" className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isProcessing ? 'Procesando...' : 'Realizar Pedido'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
