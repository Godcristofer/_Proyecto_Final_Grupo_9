"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, Search, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from '@/hooks/use-cart';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';

export default function Header() {
  const { cartCount } = useCart();
  const isMobile = useIsMobile();

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/productos', label: 'Productos' },
    { href: '#', label: 'Contáctanos' },
  ];
  
  const SearchBar = () => (
    <div className="relative w-full max-w-sm">
      <form className="flex w-full items-center space-x-2">
        <Input type="search" placeholder="Buscar productos..." className="flex-1 bg-white text-gray-900 placeholder:text-gray-500 rounded-md" />
        <Button type="submit" variant="outline">Buscar</Button>
      </form>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background text-foreground">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            ComCorp
          </Link>
          {!isMobile && (
            <nav className="flex items-center gap-4 text-sm font-medium">
              {navLinks.map((link) => (
                <Link key={`${link.href}-${link.label}`} href={link.href} className="text-foreground/80 hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {!isMobile && (
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>
        )}

        <div className="flex items-center gap-2">
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-primary text-primary-foreground">
                <div className="flex flex-col gap-6 p-6">
                  <Link href="/" className="text-2xl font-bold">ComCorp</Link>
                   <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link key={`${link.href}-${link.label}-mobile`} href={link.href} className="text-lg text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-4">
                    <SearchBar />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/cart">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Carrito ({cartCount})
                </Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/login">INICIAR SESIÓN</Link>
              </Button>
            </>
          )}
           <Link href="/cart" className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-6 w-6" />
                 {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
