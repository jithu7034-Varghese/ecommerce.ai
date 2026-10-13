'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function Hero() {
  const { setIsAssistantOpen } = useStore();

  return (
    <section
      style={{
        padding: '72px 0 56px',
        backgroundColor: '#FAFAF8',
        borderBottom: '1px solid var(--store-border)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
        {/* Subtle Pill Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#EDE9FE',
            color: 'var(--store-accent-primary)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            marginBottom: '24px',
            boxShadow: '0 2px 6px rgba(124, 58, 237, 0.1)'
          }}
        >
          <Sparkles size={14} />
          <span>AUTUMN / WINTER 2026 ATELIER COLLECTION</span>
        </div>

        {/* Hero Title Required by Master Amendment */}
        <h1
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            color: 'var(--store-text-primary)',
            lineHeight: 1.15
          }}
        >
          Find what you love. Just ask.
        </h1>

        {/* Supporting Copy Required by Master Amendment */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--store-text-secondary)',
            marginBottom: '36px',
            lineHeight: 1.6,
            maxWidth: '640px',
            margin: '0 auto 36px'
          }}
        >
          Tell our shopping assistant what you&apos;re looking for, or explore the collection yourself.
        </p>

        {/* Dual CTAs Required by Master Amendment */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}
        >
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="btn btn-primary"
            style={{
              padding: '0 28px',
              height: '52px',
              fontSize: '1rem',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)'
            }}
          >
            <Sparkles size={18} />
            <span>Shop with AI</span>
          </button>

          <Link
            href="/shop"
            className="btn btn-secondary"
            style={{
              padding: '0 28px',
              height: '52px',
              fontSize: '1rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span>Browse Collection</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Confidence Assurance Badges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            fontSize: '0.8125rem',
            color: 'var(--store-text-muted)',
            fontWeight: 500
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Truck size={16} style={{ color: 'var(--store-accent-primary)' }} />
            <span>Free UK Delivery over £50</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RotateCcw size={16} style={{ color: 'var(--store-accent-primary)' }} />
            <span>30-Day Hassle-Free Returns</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} style={{ color: 'var(--store-accent-primary)' }} />
            <span>100% Simulated Safe Checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
}
