"use client";

import Link from 'next/link';
import { ShoppingCart, User, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from '@/hooks/use-cart';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';

export default function Header() {
  const { cartCount } = useCart();
  const isMobile = useIsMobile();

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/', label: 'Productos' },
    { href: '#', label: 'Contactanos' },
  ];

  const DesktopNav = () => (
     <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
      {navLinks.map((link) => (
        <Link key={`${link.href}-${link.label}`} href={link.href} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          {link.label}
        </Link>
      ))}
    </nav>
  );

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground hover:text-primary-foreground hover:bg-white/10">
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
    <div className="hidden sm:flex items-center gap-2 w-full max-w-sm">
        <Input type="search" placeholder="Buscar productos..." className="bg-background/80 border-none focus-visible:ring-0" />
        <Button className="bg-background text-primary-foreground hover:bg-background/90">Buscar</Button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        <div className="flex items-center gap-6">
          {isMobile && <MobileNav />}
          <Link href="/" className="text-2xl font-bold text-primary-foreground">
            ComCorp
          </Link>
        </div>
        
        {!isMobile && <DesktopNav />}

        {!isMobile && <div className="flex-1 flex justify-center px-4"><SearchBar /></div>}

        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Carrito ({cartCount})
            </Link>
          </Button>
          <Button variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground" asChild>
            <Link href="/login">INICIAR SESIÓN</Link>
          </Button>
        </div>
      </div>
       {isMobile && <div className="container mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8"><SearchBar /></div>}
    </header>
  );
}
