'use client';

import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface MerchantHeaderProps {
  title: string;
  subtitle?: string;
}

export function MerchantHeader({ title, subtitle }: MerchantHeaderProps) {
  const { proposals, setActiveProposal } = useStore();
  const pendingProposalsCount = proposals.filter((p) => p.status === 'pending').length;

  return (
    <header
      style={{
        height: '70px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--merchant-card-border)',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          {title}
        </h1>
        {subtitle && (
          <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>
            {subtitle}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Search bar */}
        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search orders, SKUs..."
            style={{
              width: '100%',
              height: '38px',
              paddingLeft: '36px',
              paddingRight: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--merchant-card-border)',
              backgroundColor: '#F8FAFC',
              fontSize: '0.8125rem'
            }}
          />
        </div>

        {/* AI Proposals Notification Trigger */}
        <button
          onClick={() => {
            const firstPending = proposals.find((p) => p.status === 'pending');
            if (firstPending) setActiveProposal(firstPending);
          }}
          style={{
            position: 'relative',
            backgroundColor: '#F5F3FF',
            border: '1px solid #DDD6FE',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--store-accent-primary)',
            fontSize: '0.8125rem',
            fontWeight: 700
          }}
          aria-label="View AI Proposals"
        >
          <Sparkles size={16} />
          <span>AI Approvals</span>
          {pendingProposalsCount > 0 && (
            <span
              style={{
                backgroundColor: '#7C3AED',
                color: '#FFFFFF',
                borderRadius: '10px',
                padding: '1px 6px',
                fontSize: '0.6875rem',
                fontWeight: 800
              }}
            >
              {pendingProposalsCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid var(--merchant-card-border)', paddingLeft: '16px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#1E293B',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            M
          </div>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A' }}>Marcus Vance</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--store-text-muted)' }}>Boutique Owner</div>
          </div>
        </div>
      </div>
    </header>
  );
}
