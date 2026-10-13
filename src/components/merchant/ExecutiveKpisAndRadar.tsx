'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Compass,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Users,
  Target,
  DollarSign,
  ShoppingBag,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function ExecutiveKpisAndRadar() {
  const { orders, products, proposals, setActiveProposal } = useStore();

  const [activeRadarTab, setActiveRadarTab] = useState<'all' | 'revenue' | 'inventory' | 'customer'>('all');

  // Live order calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const aov = totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount).toFixed(2) : '95.00';

  // 10 Core Health KPIs
  const kpis = [
    {
      label: 'Monthly Gross Revenue',
      value: `£${(42850 + totalRevenue).toLocaleString()}`,
      delta: '+12.4%',
      trend: 'up',
      detail: 'Target: £38,000 (+£4.8k surplus)',
      category: 'financial'
    },
    {
      label: 'Net Contribution Margin',
      value: '£13,620',
      percentage: '31.8%',
      delta: '+2.4%',
      trend: 'up',
      detail: 'After ad spend, packaging & shipping',
      category: 'financial'
    },
    {
      label: 'Completed Orders',
      value: `${418 + totalOrdersCount}`,
      delta: '+9.1%',
      trend: 'up',
      detail: `${orders.filter((o) => o.status === 'pending').length} pending fulfillment`,
      category: 'operations'
    },
    {
      label: 'Average Order Value (AOV)',
      value: `£${aov}`,
      delta: '+3.2%',
      trend: 'up',
      detail: 'Multi-item baskets up 14%',
      category: 'sales'
    },
    {
      label: 'Sales Conversion Rate',
      value: '3.42%',
      delta: '+0.38%',
      trend: 'up',
      detail: 'AI Stylist sessions convert at 14.2%',
      category: 'conversion'
    },
    {
      label: 'Customer Acquisition Cost (CAC)',
      value: '£18.20',
      delta: '-4.5%',
      trend: 'up', // lower CAC is good
      detail: 'Organic social + SEO lowering blended CAC',
      category: 'marketing'
    },
    {
      label: 'Customer Lifetime Value (LTV)',
      value: '£285.00',
      delta: '+8.1%',
      trend: 'up',
      detail: 'LTV:CAC ratio healthy at 15.6x',
      category: 'customer'
    },
    {
      label: 'Returning Customer Rate',
      value: '42.6%',
      delta: '+3.8%',
      trend: 'up',
      detail: 'Repeat shoppers account for 58% of gross profit',
      category: 'customer'
    },
    {
      label: 'Inventory Health Index',
      value: '88/100',
      delta: '-2 pts',
      trend: 'down',
      detail: '2 critical low-stock SKUs detected',
      category: 'supply'
    },
    {
      label: 'Predicted Stockouts',
      value: '2 SKUs',
      delta: 'Action Needed',
      trend: 'down',
      detail: 'UK 10 & 12 Azure Wrap Maxi < 4 days',
      category: 'supply'
    }
  ];

  // Opportunity & Risk Radar items
  const radarItems = [
    {
      id: 'OPP-01',
      type: 'opportunity',
      category: 'revenue',
      title: 'Velvet Evening Slip Capsule Surge',
      description: 'Search intent for velvet party dresses is up 38%. Competitor stock is constrained on emerald colorways.',
      commercialUpside: '+£3,400.00',
      confidence: 94,
      actionLabel: 'Boost Merchandising Spotlight',
      href: '/merchant/marketing'
    },
    {
      id: 'OPP-02',
      type: 'risk',
      category: 'inventory',
      title: 'Azure Maxi UK 10 Depletion Imminent',
      description: 'At current run rate of 4.2 units/day, stock reaches zero by Thursday. Harrington Mill requires 5 days lead time.',
      commercialUpside: '-£2,850.00 (Risk)',
      confidence: 96,
      actionLabel: 'Review Replenishment PO',
      actionProposalId: proposals[0]?.id
    },
    {
      id: 'OPP-03',
      type: 'opportunity',
      category: 'customer',
      title: 'Cart Recovery for Cocktail Shoppers',
      description: '14 shoppers abandoned carts containing halter cocktail dresses in the last 48h. Estimated recoverable GMV: £1,240.',
      commercialUpside: '+£820.00',
      confidence: 88,
      actionLabel: 'Launch Concierge Recovery',
      href: '/merchant/customers'
    },
    {
      id: 'OPP-04',
      type: 'opportunity',
      category: 'revenue',
      title: 'Dynamic Pricing Elasticity on Suiting',
      description: 'Ivory Crepe Blazer conversion shows inelastic demand up to £175. Proposed +£10 price adjustment generates pure margin.',
      commercialUpside: '+£1,450.00',
      confidence: 91,
      actionLabel: 'View Pricing Simulation',
      href: '/merchant/digital-twin'
    }
  ];

  const filteredRadar = radarItems.filter((item) => activeRadarTab === 'all' || item.category === activeRadarTab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '32px' }}>
      {/* SECTION 1: 10 Core Health KPIs Grid */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
              Executive Health & Operational Velocity
            </h3>
            <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>
              10-point commerce telemetry synthesized in real time
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
            Trailing 30-Day Velocity vs Prior Period
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--merchant-card-border)',
                padding: '18px 20px',
                boxShadow: 'var(--merchant-card-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 120ms ease, box-shadow 120ms ease'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {kpi.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>
                    {kpi.value}
                  </span>
                  {kpi.percentage && (
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--store-accent-primary)' }}>
                      ({kpi.percentage})
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '12px', borderTop: '1px solid #F1F5F9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: kpi.trend === 'up' ? '#059669' : '#DC2626'
                  }}
                >
                  {kpi.trend === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  <span>{kpi.delta}</span>
                </span>
                <span style={{ fontSize: '0.6875rem', color: '#94A3B8', textAlign: 'right', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={kpi.detail}>
                  {kpi.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Commerce Opportunity & Risk Radar */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--merchant-card-border)',
          boxShadow: 'var(--merchant-card-shadow)',
          padding: '24px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Compass size={18} style={{ color: 'var(--store-accent-primary)' }} />
              <span>Commerce Opportunity & Risk Radar</span>
            </h3>
            <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>
              Proactively scored revenue accelerations, margin expanders, and inventory risk mitigations
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '6px', backgroundColor: '#F8FAFC', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
            {(['all', 'revenue', 'inventory', 'customer'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveRadarTab(tab)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeRadarTab === tab ? '#FFFFFF' : 'transparent',
                  color: activeRadarTab === tab ? 'var(--store-accent-primary)' : '#64748B',
                  boxShadow: activeRadarTab === tab ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 120ms ease'
                }}
              >
                {tab === 'all' ? 'All Radar Signals' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Radar Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {filteredRadar.map((radar) => (
            <div
              key={radar.id}
              style={{
                backgroundColor: radar.type === 'risk' ? '#FFF5F5' : '#F8FAFC',
                border: `1px solid ${radar.type === 'risk' ? '#FECACA' : '#E2E8F0'}`,
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: radar.type === 'risk' ? '#FEE2E2' : '#EDE9FE',
                      color: radar.type === 'risk' ? '#DC2626' : 'var(--store-accent-primary)'
                    }}
                  >
                    {radar.type === 'risk' ? 'Critical Risk' : 'High-Yield Opportunity'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                    {radar.confidence}% Confidence
                  </span>
                </div>

                <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#0F172A', marginBottom: '6px' }}>
                  {radar.title}
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                  {radar.description}
                </p>
              </div>

              <div style={{ borderTop: `1px solid ${radar.type === 'risk' ? '#FED7D7' : '#E2E8F0'}`, paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--store-text-muted)', textTransform: 'uppercase' }}>Commercial Impact</div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: radar.type === 'risk' ? '#DC2626' : '#059669' }}>
                    {radar.commercialUpside}
                  </div>
                </div>

                {radar.actionProposalId ? (
                  <button
                    onClick={() => {
                      const prop = proposals.find((p) => p.id === radar.actionProposalId) || proposals[0];
                      if (prop) setActiveProposal(prop);
                    }}
                    className="btn btn-primary"
                    style={{ height: '32px', fontSize: '0.75rem', padding: '0 12px' }}
                  >
                    <span>{radar.actionLabel}</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <Link
                    href={radar.href || '/merchant'}
                    className="btn btn-secondary"
                    style={{ height: '32px', fontSize: '0.75rem', padding: '0 12px' }}
                  >
                    <span>{radar.actionLabel}</span>
                    <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
