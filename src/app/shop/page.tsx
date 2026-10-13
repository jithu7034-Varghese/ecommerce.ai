'use client';

import React, { useState } from 'react';
import { Header } from '@/components/storefront/Header';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import { Footer } from '@/components/storefront/Footer';
import { MobileBottomBar } from '@/components/storefront/MobileBottomBar';
import { useStore } from '@/context/StoreContext';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const { products, setIsAssistantOpen } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSort, setActiveSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  let filtered = activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory);

  if (activeSort === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--store-bg)' }}>
      <Header />
      <main id="main-content" style={{ padding: '40px 0 60px' }}>
        <div className="container">
          {/* Shop Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--store-accent-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Complete Collection
              </div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                All Luxury Garments
              </h1>
            </div>

            <button
              onClick={() => setIsAssistantOpen(true)}
              className="btn btn-secondary"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0 20px',
                borderColor: 'var(--store-accent-border)',
                color: 'var(--store-accent-primary)',
                fontWeight: 700
              }}
            >
              <Sparkles size={16} />
              <span>Ask AI to Filter & Style</span>
            </button>
          </div>

          {/* Facet Filter & Sort Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--store-border)',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { label: 'All Garments', value: 'all' },
                { label: 'Evening Gowns', value: 'evening' },
                { label: 'Cocktail Dresses', value: 'cocktail' },
                { label: 'Tailored Workwear', value: 'workwear' },
                { label: 'Everyday Silk', value: 'casual' }
              ].map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setActiveCategory(c.value)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: activeCategory === c.value ? '1px solid var(--store-accent-primary)' : '1px solid var(--store-border)',
                    backgroundColor: activeCategory === c.value ? 'var(--store-accent-primary)' : '#FAFAF8',
                    color: activeCategory === c.value ? '#FFFFFF' : 'var(--store-text-secondary)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={15} style={{ color: 'var(--store-text-muted)' }} />
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value as unknown as 'featured')}
                style={{
                  height: '36px',
                  padding: '0 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--store-border)',
                  fontSize: '0.8125rem',
                  backgroundColor: '#FAFAF8',
                  color: 'var(--store-text-primary)',
                  fontWeight: 600
                }}
              >
                <option value="featured">Sort by: Curated Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <ProductGrid products={filtered} title="" subtitle="" />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
