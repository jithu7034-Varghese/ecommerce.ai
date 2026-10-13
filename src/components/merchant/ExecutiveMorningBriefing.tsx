'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function ExecutiveMorningBriefing() {
  const { proposals, setActiveProposal } = useStore();
  const pendingCount = proposals.filter((p) => p.status === 'pending').length;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1A0D2E 0%, #160B22 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid #331A52',
        padding: '28px 32px',
        color: '#FFFFFF',
        marginBottom: '32px',
        boxShadow: '0 8px 32px -4px rgba(22, 11, 34, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, rgba(124, 58, 237, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Top Meta Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(124, 58, 237, 0.25)',
              border: '1px solid rgba(124, 58, 237, 0.4)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.6875rem',
              fontWeight: 800,
              color: '#DDD6FE',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}
          >
            <Sparkles size={12} style={{ color: '#A78BFA' }} />
            <span>AI Executive Briefing Active</span>
          </span>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} />
            <span>Synthesized 12 mins ago</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              backgroundColor: 'rgba(5, 150, 105, 0.2)',
              color: '#6EE7B7',
              border: '1px solid rgba(5, 150, 105, 0.3)',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '0.6875rem',
              fontWeight: 700
            }}
          >
            SIMULATED TELEMETRY
          </span>
        </div>
      </div>

      {/* Greeting & Executive Headline */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.15 }}>
            Good morning, Marcus
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#D6D0E0', marginTop: '6px', maxWidth: '720px', lineHeight: 1.5 }}>
            Executive AI has synthesized telemetry across orders, supply chains, customer intent, and omnichannel margins. Here are today's three operational priorities:
          </p>
        </div>

        {/* Quick Executive CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/merchant/digital-twin"
            className="btn btn-secondary"
            style={{
              height: '42px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.16)',
              color: '#FFFFFF',
              fontSize: '0.8125rem'
            }}
          >
            <Zap size={15} style={{ color: '#C084FC' }} />
            <span>Open Digital Twin</span>
          </Link>

          <button
            onClick={() => {
              const pending = proposals.find((p) => p.status === 'pending');
              if (pending) setActiveProposal(pending);
            }}
            className="btn btn-primary"
            style={{ height: '42px', fontSize: '0.8125rem', padding: '0 18px' }}
          >
            <span>Review Decision Queue ({pendingCount})</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Three Loop / Priority Workflow Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {/* Loop A */}
        <div
          onClick={() => {
            const pending = proposals.find((p) => p.status === 'pending');
            if (pending) setActiveProposal(pending);
          }}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            cursor: 'pointer',
            transition: 'all 150ms ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.09)';
            e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#F87171', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              LOOP A: STOCKOUT RECOVERY
            </span>
            <AlertTriangle size={14} style={{ color: '#F87171' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#FFFFFF', marginBottom: '4px' }}>
            Azure Wrap Maxi UK 10 reorder proposal
          </div>
          <p style={{ fontSize: '0.75rem', color: '#D6D0E0', lineHeight: 1.4, margin: 0 }}>
            Depletion in 3.8 days at current sales velocity. Harrington Mill lead time is 5 days. Suggested PO: 30 units.
          </p>
        </div>

        {/* Loop B */}
        <Link
          href="/merchant/customers"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            textDecoration: 'none',
            display: 'block',
            transition: 'all 150ms ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.09)';
            e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#C084FC', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              LOOP B: VIP RETENTION INTERVENTION
            </span>
            <ChevronRight size={14} style={{ color: '#C084FC' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#FFFFFF', marginBottom: '4px' }}>
            Maya Lin churn risk elevated (+48%)
          </div>
          <p style={{ fontSize: '0.75rem', color: '#D6D0E0', lineHeight: 1.4, margin: 0 }}>
            Customer has spent £176 across 2 orders but has been inactive for 45 days. Prepared early velvet preview invite.
          </p>
        </Link>

        {/* Loop C */}
        <Link
          href="/merchant/marketing"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            textDecoration: 'none',
            display: 'block',
            transition: 'all 150ms ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.09)';
            e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#34D399', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              LOOP C: OPPORTUNITY RADAR
            </span>
            <TrendingUp size={14} style={{ color: '#34D399' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#FFFFFF', marginBottom: '4px' }}>
            Emerald Velvet Slip Capsule Surging (+38%)
          </div>
          <p style={{ fontSize: '0.75rem', color: '#D6D0E0', lineHeight: 1.4, margin: 0 }}>
            Social intent for autumn cocktail evening wear rising. Estimated commercial upside of +£3,400 with feature spotlight.
          </p>
        </Link>
      </div>
    </div>
  );
}
