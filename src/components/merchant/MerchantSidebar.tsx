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
  ExternalLink,
  Cpu,
  Compass,
  CheckSquare,
  Globe,
  Database,
  ShieldCheck,
  Zap,
  Activity,
  DollarSign
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function MerchantSidebar() {
  const pathname = usePathname();
  const { orders, proposals } = useStore();

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const pendingProposalsCount = proposals.filter((p) => p.status === 'pending').length;

  // Collapsible Division States
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    executive: true,
    customer: true,
    supply: true,
    marketing: false,
    agents: false,
    governance: false
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navDivisions = [
    {
      id: 'executive',
      title: 'Executive Command',
      items: [
        { label: 'Command Centre', href: '/merchant', icon: LayoutDashboard },
        { label: 'Commerce Digital Twin', href: '/merchant/digital-twin', icon: Cpu, badge: 'Flagship', badgeColor: '#A855F7' },
        { label: 'Decision Centre', href: '/merchant/decisions', icon: CheckSquare, badge: pendingProposalsCount > 0 ? `${pendingProposalsCount}` : undefined, badgeColor: '#F59E0B' },
        { label: 'Revenue & Margins', href: '/merchant/reports', icon: BarChart3 }
      ]
    },
    {
      id: 'customer',
      title: 'Customer & Sales',
      items: [
        { label: 'Customer 360 AI', href: '/merchant/customers', icon: Users, badge: 'Profiles', badgeColor: '#3B82F6' },
        { label: 'Customer Retention', href: '/merchant/customers#retention', icon: Activity }
      ]
    },
    {
      id: 'supply',
      title: 'Inventory & Supply',
      items: [
        { label: 'Predictive Inventory', href: '/merchant/inventory', icon: Layers, badge: 'Stock Alert', badgeColor: '#EF4444' },
        { label: 'Product Catalogue', href: '/merchant/products', icon: Package },
        { label: 'Orders & Fulfilment', href: '/merchant/orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined, badgeColor: '#DC2626' }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing & Search',
      items: [
        { label: 'Marketing Command', href: '/merchant/marketing', icon: Megaphone },
        { label: 'Search (AEO/GEO)', href: '/merchant/marketing#search', icon: Globe, badge: '78% GEO', badgeColor: '#10B981' }
      ]
    },
    {
      id: 'agents',
      title: 'AI Workforce & Agents',
      items: [
        { label: 'AI Agents Mesh', href: '/merchant/agents', icon: Bot, badge: '24 Active', badgeColor: '#8B5CF6' },
        { label: 'AI Intelligence Hub', href: '/merchant/intelligence', icon: Sparkles }
      ]
    },
    {
      id: 'governance',
      title: 'Operations & Tech',
      items: [
        { label: 'Store OS Settings', href: '/merchant/settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside
      aria-label="Merchant Operations Navigation"
      style={{
        width: '270px',
        backgroundColor: 'var(--merchant-sidebar-bg)',
        borderRight: '1px solid var(--merchant-sidebar-border)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--merchant-sidebar-text)',
        flexShrink: 0
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          height: '70px',
          padding: '0 20px',
          borderBottom: '1px solid var(--merchant-sidebar-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.125rem',
            boxShadow: '0 2px 8px rgba(124, 58, 237, 0.4)'
          }}
        >
          B
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            BERACHTECH
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--merchant-sidebar-muted)', fontWeight: 600, letterSpacing: '0.08em', marginTop: '1px' }}>
            COMMERCE AI OS
          </div>
        </div>
      </div>

      {/* Instance Subheader / Status */}
      <div style={{ padding: '12px 18px 8px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.6875rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E2E8F0', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            <span>Maison Elegance</span>
          </div>
          <span style={{ color: '#A78BFA', fontWeight: 700, fontSize: '0.625rem', textTransform: 'uppercase' }}>
            DEMO
          </span>
        </div>
      </div>

      {/* Navigation Divisions Stream */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {navDivisions.map((division) => {
          const isOpen = openSections[division.id] ?? true;

          return (
            <div key={division.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <button
                type="button"
                onClick={() => toggleSection(division.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--merchant-sidebar-muted)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{division.title}</span>
                {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              </button>

              {isOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  {division.items.map((item) => {
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
                          padding: '9px 12px',
                          borderRadius: 'var(--radius-md)',
                          textDecoration: 'none',
                          fontSize: '0.8125rem',
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                          <Icon size={16} style={{ opacity: isActive ? 1 : 0.75 }} />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            style={{
                              backgroundColor: item.badgeColor ? `${item.badgeColor}22` : '#7C3AED22',
                              border: `1px solid ${item.badgeColor || '#7C3AED'}44`,
                              color: item.badgeColor || '#A78BFA',
                              fontSize: '0.625rem',
                              fontWeight: 700,
                              padding: '1px 6px',
                              borderRadius: '4px'
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Customer Storefront Switcher Footer */}
      <div
        style={{
          padding: '14px 16px',
          borderTop: '1px solid var(--merchant-sidebar-border)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#26143D',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: 700,
            textDecoration: 'none',
            border: '1px solid #3B1F5E',
            transition: 'background-color 150ms ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#331B52')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#26143D')}
        >
          <span>View Customer Storefront</span>
          <ExternalLink size={13} />
        </Link>
      </div>
    </aside>
  );
}
