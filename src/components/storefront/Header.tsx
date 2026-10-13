'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, ShoppingBag, Store, LayoutDashboard } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function Header() {
  const pathname = usePathname();
  const { cartCount, setIsBagOpen, setIsAssistantOpen } = useStore();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Categories', href: '/shop?cat=evening' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
  ];

  return (
    <header style={{ borderBottom: '1px solid var(--store-border)', backgroundColor: '#FFFFFF', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top Simulation Disclosure Banner */}
      <div
        style={{
          backgroundColor: '#18181B',
          color: '#F4F4F5',
          fontSize: '0.75rem',
          padding: '6px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 500,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              backgroundColor: 'var(--store-accent-primary)',
              color: '#FFFFFF',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.04em'
            }}
          >
            SIMULATED DATA
          </span>
          <span>Berachtech E-Commerce AI OS • Interactive Fashion Demo</span>
        </div>
        <Link
          href="/merchant"
          style={{
            color: '#A1A1AA',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: '#27272A',
            transition: 'color 150ms ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
        >
          <LayoutDashboard size={13} />
          <span>Switch to Merchant Portal &rarr;</span>
        </Link>
      </div>

      {/* Main Storefront Navigation */}
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--store-text-primary)'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'var(--store-accent-primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.125rem'
            }}
          >
            B
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1 }}>
              BERACHTECH
            </div>
            <div style={{ fontSize: '0.6875rem', letterSpacing: '0.12em', color: 'var(--store-text-muted)', fontWeight: 600 }}>
              HAUTE ATELIER
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Main Navigation"
          style={{
            display: 'none',
            gap: '28px',
            alignItems: 'center'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--store-accent-primary)' : 'var(--store-text-secondary)',
                  transition: 'color 150ms ease'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Shop with AI Signature CTA */}
          <button
            onClick={() => setIsAssistantOpen(true)}
            id="ai-assistant-trigger"
            className="btn btn-primary"
            style={{
              backgroundColor: 'var(--store-accent-primary)',
              borderRadius: 'var(--radius-full)',
              padding: '0 18px',
              boxShadow: '0 2px 10px rgba(124, 58, 237, 0.25)'
            }}
          >
            <Sparkles size={16} />
            <span>Shop with AI</span>
          </button>

          {/* Bag Drawer Trigger */}
          <button
            onClick={() => setIsBagOpen(true)}
            id="bag-drawer-trigger"
            className="btn btn-secondary"
            aria-label={`Shopping bag containing ${cartCount} items`}
            style={{
              borderRadius: 'var(--radius-full)',
              position: 'relative',
              padding: '0 16px'
            }}
          >
            <ShoppingBag size={18} />
            <span style={{ fontWeight: 600 }}>Bag</span>
            <span
              style={{
                backgroundColor: cartCount > 0 ? 'var(--store-accent-primary)' : '#E4E4E7',
                color: cartCount > 0 ? '#FFFFFF' : '#71717A',
                fontSize: '0.75rem',
                fontWeight: 700,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '4px'
              }}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
