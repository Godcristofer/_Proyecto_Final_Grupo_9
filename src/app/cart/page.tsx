
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Minus, Trash2, ShoppingCart, Loader2 } from "lucide-react";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount, isLoading } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-14rem)] items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  if (cartCount === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Tu carrito está vacío</h1>
        <p className="mt-2 text-lg text-muted-foreground">Parece que aún no has añadido nada a tu carrito.</p>
        <Button asChild className="mt-6">
          <Link href="/">Comenzar a Comprar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Tu Carrito de Compras</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
             <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Producto</TableHead>
                    <TableHead></TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map(({ product, quantity }) => (
                    <TableRow key={product.id}>
                      <TableCell>
                         <Image
                          src={product.image || 'https://placehold.co/600x400.png'}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                          data-ai-hint={product.data_ai_hint}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link href={`/product/${product.id}`} className="hover:text-primary">{product.name}</Link>
                      </TableCell>
                      <TableCell>S/ {product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            className="h-8 w-12 text-center"
                            value={quantity}
                            readOnly
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        S/ {(product.price * quantity).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                         <Button variant="ghost" size="icon" onClick={() => removeFromCart(product.id)}>
                           <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive"/>
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
             </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>S/ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>S/ {cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">Proceder al Pago</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
