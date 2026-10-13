'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--store-border)', marginTop: 'auto' }}>
      {/* Trust & Confidence Value Bar */}
      <div style={{ borderBottom: '1px solid var(--store-border)', padding: '36px 0', backgroundColor: '#FAFAF8' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ padding: '10px', backgroundColor: '#EDE9FE', color: 'var(--store-accent-primary)', borderRadius: '10px' }}>
              <Truck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '2px' }}>Complimentary UK Delivery</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>On all simulated orders over £50. Delivered in 2–3 business days.</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ padding: '10px', backgroundColor: '#EDE9FE', color: 'var(--store-accent-primary)', borderRadius: '10px' }}>
              <RotateCcw size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '2px' }}>30-Day Hassle-Free Returns</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>Prepaid return slips included with every garment. Zero hidden fees.</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ padding: '10px', backgroundColor: '#EDE9FE', color: 'var(--store-accent-primary)', borderRadius: '10px' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '2px' }}>AI Personal Stylist</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>Ask naturally for styles, occasions, and sizing advice anytime.</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ padding: '10px', backgroundColor: '#EDE9FE', color: 'var(--store-accent-primary)', borderRadius: '10px' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '2px' }}>Simulated Guest Checkout</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>No password required. Fictional demo payment with instant confirmation.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '48px 16px 36px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '32px', marginBottom: '36px' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>BERACHTECH</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--store-text-muted)', maxWidth: '320px', lineHeight: 1.6 }}>
              Human-Centred Fashion Operating System. Crafting intuitive, beautiful shopping experiences powered by thoughtful intelligence.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Shop</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                <li><Link href="/shop" style={{ color: 'var(--store-text-secondary)', textDecoration: 'none' }}>All Collections</Link></li>
                <li><Link href="/shop?cat=evening" style={{ color: 'var(--store-text-secondary)', textDecoration: 'none' }}>Evening Dresses</Link></li>
                <li><Link href="/shop?cat=cocktail" style={{ color: 'var(--store-text-secondary)', textDecoration: 'none' }}>Cocktail Wear</Link></li>
                <li><Link href="/shop?cat=workwear" style={{ color: 'var(--store-text-secondary)', textDecoration: 'none' }}>Tailored Workwear</Link></li>
              </ul>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Platform</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                <li><Link href="/merchant" style={{ color: 'var(--store-accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Merchant Dashboard &rarr;</Link></li>
                <li><Link href="/merchant/orders" style={{ color: 'var(--store-text-secondary)', textDecoration: 'none' }}>Order Fulfillment</Link></li>
                <li><Link href="/merchant/inventory" style={{ color: 'var(--store-text-secondary)', textDecoration: 'none' }}>Inventory Matrix</Link></li>
                <li><Link href="/merchant/intelligence" style={{ color: 'var(--store-text-secondary)', textDecoration: 'none' }}>AI Intelligence Hub</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--store-border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>
          <div>© 2026 Berachtech. Standalone Interactive Master Demo. All rights reserved.</div>
          <div>Strict WCAG 2.2 Level AA Accessibility Architecture.</div>
        </div>
      </div>
    </footer>
  );
}
