'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, PackageCheck, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function AttentionFeed() {
  const { orders, proposals, setActiveProposal } = useStore();

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const pendingProposals = proposals.filter((p) => p.status === 'pending');

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--merchant-card-border)',
        boxShadow: 'var(--merchant-card-shadow)',
        padding: '24px',
        marginBottom: '32px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
        <h2 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#0F172A' }}>
          WHAT NEEDS YOUR ATTENTION?
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>
          • Real-time operational triage feed
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {/* Alert 1: Low-Stock Urgent Warning (Links to 5-W Explainability) */}
        {pendingProposals.length > 0 && (
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991B1B', fontWeight: 700, fontSize: '0.8125rem', marginBottom: '4px' }}>
                <AlertTriangle size={15} />
                <span>Urgent Inventory Alert</span>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18181B', marginBottom: '4px' }}>
                {pendingProposals[0].productTitle} ({pendingProposals[0].size}) is running critically low.
              </div>
              <div style={{ fontSize: '0.75rem', color: '#7F1D1D', marginBottom: '14px' }}>
                Only 2 units remain. Simulated stockout expected in ~12 hours.
              </div>
            </div>

            <button
              onClick={() => setActiveProposal(pendingProposals[0])}
              className="btn btn-primary"
              style={{
                backgroundColor: '#DC2626',
                borderColor: '#DC2626',
                height: '38px',
                fontSize: '0.8125rem',
                justifyContent: 'space-between'
              }}
            >
              <span>Review 5-W Reorder Proposal</span>
              <Sparkles size={14} />
            </button>
          </div>
        )}

        {/* Alert 2: Orders Pending Packing */}
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#92400E', fontWeight: 700, fontSize: '0.8125rem', marginBottom: '4px' }}>
              <PackageCheck size={15} />
              <span>Fulfillment Queue</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18181B', marginBottom: '4px' }}>
              {pendingOrders.length} customer {pendingOrders.length === 1 ? 'order is' : 'orders are'} waiting to be packed.
            </div>
            <div style={{ fontSize: '0.75rem', color: '#78350F', marginBottom: '14px' }}>
              Standard Royal Mail & DPD dispatch deadline is 2:00 PM today.
            </div>
          </div>

          <Link
            href="/merchant/orders"
            className="btn btn-primary"
            style={{
              backgroundColor: '#D97706',
              borderColor: '#D97706',
              height: '38px',
              fontSize: '0.8125rem',
              justifyContent: 'space-between',
              textDecoration: 'none'
            }}
          >
            <span>Open Packing Queue</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Alert 3: Demand Surge Forecast Alert */}
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#F5F3FF',
            border: '1px solid #DDD6FE',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6D28D9', fontWeight: 700, fontSize: '0.8125rem', marginBottom: '4px' }}>
              <TrendingUp size={15} />
              <span>Predictive Demand Signal</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18181B', marginBottom: '4px' }}>
              Demand for evening cocktail dresses may increase ~22% next week.
            </div>
            <div style={{ fontSize: '0.75rem', color: '#5B21B6', marginBottom: '14px' }}>
              Illustrative seasonal baseline: Autumn weddings and black-tie calendar.
            </div>
          </div>

          <Link
            href="/merchant/intelligence"
            className="btn btn-primary"
            style={{
              backgroundColor: 'var(--store-accent-primary)',
              borderColor: 'var(--store-accent-primary)',
              height: '38px',
              fontSize: '0.8125rem',
              justifyContent: 'space-between',
              textDecoration: 'none'
            }}
          >
            <span>View Predictive Curve</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
