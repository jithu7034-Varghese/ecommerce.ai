'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Sparkles, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function MobileBottomBar() {
  const pathname = usePathname();
  const { cartCount, setIsBagOpen, setIsAssistantOpen } = useStore();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--store-border)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '64px',
        zIndex: 90,
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
      className="mobile-bottom-bar"
    >
      <Link
        href="/"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '56px',
          minHeight: '44px',
          textDecoration: 'none',
          color: pathname === '/' ? 'var(--store-accent-primary)' : 'var(--store-text-muted)',
          fontSize: '0.6875rem',
          fontWeight: 600,
          gap: '2px'
        }}
      >
        <Home size={20} />
        <span>Home</span>
      </Link>

      <Link
        href="/shop"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '56px',
          minHeight: '44px',
          textDecoration: 'none',
          color: pathname === '/shop' ? 'var(--store-accent-primary)' : 'var(--store-text-muted)',
          fontSize: '0.6875rem',
          fontWeight: 600,
          gap: '2px'
        }}
      >
        <Compass size={20} />
        <span>Browse</span>
      </Link>

      {/* Floating Center Stylist Button */}
      <button
        onClick={() => setIsAssistantOpen(true)}
        style={{
          backgroundColor: 'var(--store-accent-primary)',
          color: '#FFFFFF',
          borderRadius: '50%',
          width: '52px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid #FFFFFF',
          boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
          cursor: 'pointer',
          transform: 'translateY(-10px)'
        }}
        aria-label="Ask AI Shopping Stylist"
      >
        <Sparkles size={24} />
      </button>

      <button
        onClick={() => setIsBagOpen(true)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '56px',
          minHeight: '44px',
          background: 'none',
          border: 'none',
          color: cartCount > 0 ? 'var(--store-accent-primary)' : 'var(--store-text-muted)',
          fontSize: '0.6875rem',
          fontWeight: 600,
          gap: '2px',
          position: 'relative',
          cursor: 'pointer'
        }}
        aria-label={`Shopping bag containing ${cartCount} items`}
      >
        <ShoppingBag size={20} />
        <span>Bag</span>
        {cartCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '12px',
              backgroundColor: 'var(--store-accent-primary)',
              color: '#FFFFFF',
              fontSize: '0.625rem',
              fontWeight: 700,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {cartCount}
          </span>
        )}
      </button>

      <style jsx>{`
        @media (min-width: 768px) {
          .mobile-bottom-bar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
