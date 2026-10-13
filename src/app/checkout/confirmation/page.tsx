'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Truck, Package, ArrowRight, LayoutDashboard } from 'lucide-react';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { useStore } from '@/context/StoreContext';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '#BER-84219';
  const { orders } = useStore();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="container" style={{ maxWidth: '720px', padding: '60px 16px 80px' }}>
      {/* Success Badge */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#ECFDF5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 4px 16px rgba(5, 150, 105, 0.2)'
          }}
        >
          <CheckCircle size={36} />
        </div>
        <span
          style={{
            backgroundColor: 'var(--store-accent-primary)',
            color: '#FFFFFF',
            fontSize: '0.6875rem',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            letterSpacing: '0.04em'
          }}
        >
          SIMULATED PURCHASE CONFIRMED
        </span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '12px', marginBottom: '8px' }}>
          Thank you for your order!
        </h1>
        <p style={{ color: 'var(--store-text-muted)', fontSize: '0.9375rem' }}>
          A simulated receipt has been dispatched to <strong>{order?.email || 'your email'}</strong>.
        </p>
      </div>

      {/* Order Summary Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--store-border)',
          boxShadow: 'var(--shadow-sm)',
          padding: '28px',
          marginBottom: '32px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--store-border)', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Order Reference
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--store-accent-primary)' }}>
              {order?.id || orderId}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Estimated Delivery
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={16} />
              <span>Thursday, Oct 16</span>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--store-text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
            Ordered Items
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {order?.items.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={item.image} alt={item.title} style={{ width: '48px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>
                    Colour: {item.color} • Size: {item.size} • Qty: {item.quantity}
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                  £{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Breakdown */}
        <div style={{ borderTop: '1px solid var(--store-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--store-text-muted)' }}>Subtotal</span>
            <span>£{order?.subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--store-text-muted)' }}>Shipping ({order?.deliveryMethod} delivery)</span>
            <span style={{ color: '#059669', fontWeight: 600 }}>
              {order?.deliveryFee === 0 ? 'FREE' : `£${order?.deliveryFee.toFixed(2)}`}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--store-border)', paddingTop: '12px', fontSize: '1.125rem', fontWeight: 800 }}>
            <span>Total Paid</span>
            <span style={{ color: 'var(--store-accent-primary)' }}>£{order?.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Dual Next Actions: Test F shortcut & Back to Shopping */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Link
          href="/merchant/orders"
          className="btn btn-primary"
          style={{ flex: 1, height: '50px', fontSize: '0.9375rem', borderRadius: 'var(--radius-md)', backgroundColor: '#18181B', borderColor: '#18181B' }}
        >
          <LayoutDashboard size={18} />
          <span>View in Merchant Dashboard &rarr;</span>
        </Link>

        <Link
          href="/shop"
          className="btn btn-secondary"
          style={{ flex: 1, height: '50px', fontSize: '0.9375rem', borderRadius: 'var(--radius-md)' }}
        >
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      <Header />
      <main id="main-content">
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px' }}>Loading order details...</div>}>
          <ConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
