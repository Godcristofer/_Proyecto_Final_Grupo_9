
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from '@/hooks/use-cart';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleSignOut = async () => {
    const auth = getFirebaseAuth();
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

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

  const UserMenu = () => {
    if (!user) {
      return (
        <Button variant="default" asChild>
          <Link href="/login">INICIAR SESIÓN</Link>
        </Button>
      );
    }

    const userInitial = user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="h-5 w-5" />;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

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
              <UserMenu />
            </>
          )}
           <Link href="/cart" className="md:hidden relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-6 w-6" />
                 {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
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
