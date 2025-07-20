"use client";

import React, { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/product-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
}

export default function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [priceRange, setPriceRange] = useState([2000]);

  const allCategories = useMemo(() => ["Todos", ...categories], [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const categoryMatch = selectedCategory === 'Todos' || p.category === selectedCategory;
      const priceMatch = p.price <= priceRange[0];
      return categoryMatch && priceMatch;
    });
  }, [products, selectedCategory, priceRange]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <Label htmlFor="category-select" className="text-lg font-semibold">Categorías</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category-select" className="w-full mt-2">
                    <SelectValue placeholder="Seleccione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price-slider" className="text-lg font-semibold">Filtrar Por Precio</Label>
                <Slider
                  id="price-slider"
                  className='mt-4'
                  defaultValue={[2000]}
                  max={2000}
                  step={50}
                  onValueChange={(value) => setPriceRange(value)}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>S/0</span>
                  <span>S/{priceRange[0]}</span>
                </div>
              </div>
            </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
               <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No se encontraron productos que coincidan con los filtros seleccionados.</p>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
