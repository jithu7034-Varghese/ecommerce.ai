'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  Megaphone,
  Sparkles,
  BarChart3,
  TrendingUp,
  Bot,
  Sliders,
  Truck,
  RotateCcw,
  Settings,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function MerchantSidebar() {
  const pathname = usePathname();
  const { orders } = useStore();
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

  const primaryNav = [
    { label: 'Overview', href: '/merchant', icon: LayoutDashboard },
    { label: 'Orders', href: '/merchant/orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined },
    { label: 'Products', href: '/merchant/products', icon: Package },
    { label: 'Inventory', href: '/merchant/inventory', icon: Layers },
    { label: 'Customers', href: '/merchant/customers', icon: Users },
    { label: 'Marketing', href: '/merchant/marketing', icon: Megaphone },
    { label: 'AI Intelligence', href: '/merchant/intelligence', icon: Sparkles },
    { label: 'Reports', href: '/merchant/reports', icon: BarChart3 }
  ];

  const advancedNav = [
    { label: 'Demand Forecasting', href: '/merchant/intelligence#forecasting', icon: TrendingUp },
    { label: 'AI Agents Studio', href: '/merchant/intelligence#agents', icon: Bot },
    { label: 'Automation Rules', href: '/merchant/intelligence#automation', icon: Sliders },
    { label: 'Suppliers & POs', href: '/merchant/inventory#suppliers', icon: Truck },
    { label: 'Returns & Claims', href: '/merchant/orders#returns', icon: RotateCcw },
    { label: 'Store Settings', href: '/merchant/settings', icon: Settings }
  ];

  return (
    <aside
      aria-label="Merchant Operations Navigation"
      style={{
        width: '260px',
        backgroundColor: 'var(--merchant-sidebar-bg)',
        borderRight: '1px solid var(--merchant-sidebar-border)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        color: 'var(--merchant-sidebar-text)',
        flexShrink: 0
      }}
    >
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', paddingLeft: '8px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'var(--merchant-sidebar-active-bg)',
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
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            BERACHTECH
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--merchant-sidebar-muted)', fontWeight: 600, letterSpacing: '0.08em' }}>
            MERCHANT AI OS
          </div>
        </div>
      </div>

      {/* Primary Navigation Rail */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--merchant-sidebar-muted)', letterSpacing: '0.08em', padding: '0 12px 8px' }}>
          Operations
        </div>
        {primaryNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--merchant-sidebar-active-text)' : 'var(--merchant-sidebar-text)',
                backgroundColor: isActive ? 'var(--merchant-sidebar-active-bg)' : 'transparent',
                transition: 'all 120ms ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'var(--merchant-sidebar-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={18} style={{ opacity: isActive ? 1 : 0.8 }} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  style={{
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '10px'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Progressive Disclosure: Advanced Navigation */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--merchant-sidebar-border)', paddingTop: '16px' }}>
        <button
          type="button"
          onClick={() => setIsAdvancedExpanded(!isAdvancedExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'none',
            border: 'none',
            color: 'var(--merchant-sidebar-muted)',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            cursor: 'pointer'
          }}
        >
          <span>Advanced Modules</span>
          {isAdvancedExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {isAdvancedExpanded && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px' }}>
            {advancedNav.map((adv) => {
              const Icon = adv.icon;
              return (
                <Link
                  key={adv.label}
                  href={adv.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    fontSize: '0.8125rem',
                    color: 'var(--merchant-sidebar-text)',
                    transition: 'background-color 120ms ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--merchant-sidebar-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Icon size={16} opacity={0.7} />
                  <span>{adv.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Back to Customer Storefront Shortcut */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '16px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#26143D',
            color: '#FFFFFF',
            fontSize: '0.8125rem',
            fontWeight: 600,
            textDecoration: 'none',
            border: '1px solid #3B1F5E',
            transition: 'background-color 150ms ease'
          }}
        >
          <span>View Customer Storefront</span>
          <ExternalLink size={14} />
        </Link>
      </div>
    </aside>
  );
}
