'use client';

import React from 'react';
import { Header } from '@/components/storefront/Header';
import { Hero } from '@/components/storefront/Hero';
import { CategoryGrid } from '@/components/storefront/CategoryGrid';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import { Footer } from '@/components/storefront/Footer';
import { MobileBottomBar } from '@/components/storefront/MobileBottomBar';
import { useStore } from '@/context/StoreContext';

export default function StorefrontHomePage() {
  const { products } = useStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--store-bg)' }}>
      <Header />
      <main id="main-content">
        <Hero />
        <CategoryGrid />
        <ProductGrid products={products} />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
