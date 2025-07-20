"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, Search } from 'lucide-react';
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
    { href: '#', label: 'Contactanos' },
  ];

  const DesktopNav = () => (
     <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
      {navLinks.map((link) => (
        <Link key={`${link.href}-${link.label}`} href={link.href} className="text-foreground/80 hover:text-foreground transition-colors">
          {link.label}
        </Link>
      ))}
    </nav>
  );

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:text-foreground hover:bg-background/10">
          <Menu />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-6 p-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            ComCorp
          </Link>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={`${link.href}-${link.label}`} href={link.href} className="text-lg text-foreground/80 hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
  
  const SearchBar = () => (
    <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input type="search" placeholder="Buscar productos..." className="w-full rounded-full bg-background pl-10 pr-4 py-2 text-sm" />
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card text-card-foreground shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        <div className="flex items-center gap-2">
          {isMobile && <MobileNav />}
          <Link href="/" className="text-2xl font-bold text-primary">
            ComCorp
          </Link>
        </div>
        
        {!isMobile && <DesktopNav />}

        <div className="flex-1 flex justify-center px-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Carrito de compras</span>
            </Link>
          </Button>
          <Button asChild>
            <Link href="/login">INICIAR SESIÓN</Link>
          </Button>
        </div>
      </div>
       {isMobile && <div className="container mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8 border-t"><SearchBar /></div>}
    </header>
  );
}
