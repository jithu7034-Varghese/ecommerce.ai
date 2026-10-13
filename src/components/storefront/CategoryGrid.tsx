'use client';

import React from 'react';
import Link from 'next/link';

interface CategoryItem {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    slug: 'evening',
    title: 'Evening & Gala Gowns',
    subtitle: 'Sculpted silhouettes and fluid satin pleats',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
  },
  {
    slug: 'cocktail',
    title: 'Cocktail & Party Dresses',
    subtitle: 'Plush jewel-tone velvets and halter midis',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    slug: 'workwear',
    title: 'Tailored Suiting & Crepe',
    subtitle: 'Double-breasted blazers and architectural cuts',
    image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=800&q=80'
  },
  {
    slug: 'casual',
    title: 'Everyday Silk Luxury',
    subtitle: 'Sandwashed French cuffs and effortless drapes',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80'
  }
];

export function CategoryGrid() {
  return (
    <section style={{ padding: '64px 0', borderBottom: '1px solid var(--store-border)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--store-accent-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Wardrobe Categories
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Curated by Occasion</h2>
          </div>
          <Link href="/shop" style={{ color: 'var(--store-accent-primary)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
            View All Categories &rarr;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?cat=${cat.slug}`}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                aspectRatio: '4 / 5',
                textDecoration: 'none',
                display: 'block',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 200ms ease, box-shadow 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              {/* Background Image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 300ms ease'
                }}
              />
              {/* Dark Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)'
                }}
              />
              {/* Text Card Content */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px',
                  color: '#FFFFFF'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#E2E8F0', opacity: 0.9 }}>
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
