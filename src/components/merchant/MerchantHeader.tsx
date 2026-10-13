'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, Sparkles, HelpCircle, Bot, Compass, ShieldAlert } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { AskCommerceAICopilot } from './AskCommerceAICopilot';

interface MerchantHeaderProps {
  title: string;
  subtitle?: string;
}

export function MerchantHeader({ title, subtitle }: MerchantHeaderProps) {
  const { proposals, setActiveProposal } = useStore();
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  const pendingProposalsCount = proposals.filter((p) => p.status === 'pending').length;

  // Global ⌘K / Ctrl+K listener for Copilot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCopilotOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
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
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
            {title}
          </h1>
          {subtitle && (
            <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)', marginTop: '2px' }}>
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Demo Telemetry Badge */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #FDE68A',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.6875rem',
              fontWeight: 700
            }}
            className="header-demo-badge"
          >
            <ShieldAlert size={13} style={{ color: '#D97706' }} />
            <span>DEMO TELEMETRY • SIMULATED DATA</span>
          </div>

          {/* Quick Search with ⌘K shortcut */}
          <button
            onClick={() => setIsCopilotOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '240px',
              height: '38px',
              padding: '0 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--merchant-card-border)',
              backgroundColor: '#F8FAFC',
              fontSize: '0.8125rem',
              color: '#94A3B8',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={15} style={{ color: '#94A3B8' }} />
              <span>Ask AI or search...</span>
            </div>
            <kbd
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '4px',
                padding: '1px 6px',
                fontSize: '0.6875rem',
                fontFamily: 'monospace',
                color: '#64748B'
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* Ask Commerce AI Copilot Button */}
          <button
            onClick={() => setIsCopilotOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '38px',
              padding: '0 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--store-accent-primary)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 120ms ease'
            }}
          >
            <Sparkles size={15} />
            <span>Ask Commerce AI</span>
          </button>

          {/* AI Decision Approvals Trigger */}
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
              height: '38px',
              padding: '0 12px',
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
            <Bot size={16} />
            <span>Decision Queue</span>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid var(--merchant-card-border)', paddingLeft: '14px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              MV
            </div>
            <div style={{ display: 'none', flexDirection: 'column' }} className="header-user-text">
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A' }}>Marcus Vance</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--store-text-muted)' }}>Store Principal</div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Copilot Drawer / Modal */}
      <AskCommerceAICopilot isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
    </>
  );
}
