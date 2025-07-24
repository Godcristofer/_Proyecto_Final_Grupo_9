
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onIdTokenChanged, User } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { getUserById } from '@/lib/users';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const setSessionCookie = (token: string | null) => {
  if (token) {
    document.cookie = `session=${token}; path=/; max-age=${60 * 60 * 24 * 5}`;
  } else {
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const idToken = await user.getIdToken();
          setSessionCookie(idToken);
          
          const dbUser = await getUserById(user.uid);
          setIsAdmin(dbUser?.role === 'admin');

        } catch (error) {
            console.error("Error durante el proceso de autenticación:", error);
            setIsAdmin(false);
            setSessionCookie(null);
        }
      } else {
        setIsAdmin(false);
        setSessionCookie(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Skeleton className="h-8 w-24" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>
            </header>
            <main className="flex-grow container mx-auto p-4">
                <Skeleton className="h-screen w-full" />
            </main>
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
