'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/storefront/Header';
import { ProductDetail } from '@/components/storefront/ProductDetail';
import { Footer } from '@/components/storefront/Footer';
import { MobileBottomBar } from '@/components/storefront/MobileBottomBar';
import { useStore } from '@/context/StoreContext';

export default function ProductDetailPage() {
  const params = useParams();
  const { products } = useStore();

  const productId = params?.id as string;
  const product = products.find((p) => p.id === productId) || products[0];

  if (!product) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--store-bg)' }}>
        <Header />
        <main id="main-content" className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px' }}>Garment Not Found</h1>
          <p style={{ color: 'var(--store-text-muted)', marginBottom: '24px' }}>
            The requested atelier piece does not exist or has been archived.
          </p>
          <Link href="/shop" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>
            Browse Collection
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--store-bg)' }}>
      <Header />
      <main id="main-content">
        <ProductDetail product={product} />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
