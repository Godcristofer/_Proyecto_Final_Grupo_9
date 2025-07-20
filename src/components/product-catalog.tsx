"use client";

import React, { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { getProductCategories } from '@/lib/products';
import ProductCard from '@/components/product-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface ProductCatalogProps {
  products: Product[];
}

const allCategories = ["Todos", ...getProductCategories()];

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [priceRange, setPriceRange] = useState([1000]);

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
                <h3 className="text-lg font-semibold mb-2">Categorías</h3>
                <Label htmlFor="category-select" className="text-sm font-normal text-muted-foreground">Elija una categoría:</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category-select" className="w-full mt-1">
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
                <h4 className="text-lg font-semibold mb-3">Filtrar Por Precio</h4>
                <Slider
                  defaultValue={[1000]}
                  max={2000}
                  step={50}
                  onValueChange={(value) => setPriceRange(value)}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Precio: S/ {priceRange[0]}</span>
                </div>
              </div>
            </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
