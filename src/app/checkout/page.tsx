'use client';

import React from 'react';
import { Header } from '@/components/storefront/Header';
import { CheckoutFlow } from '@/components/storefront/CheckoutFlow';
import { Footer } from '@/components/storefront/Footer';

export default function CheckoutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      <Header />
      <main id="main-content">
        <CheckoutFlow />
      </main>
      <Footer />
    </div>
  );
}
