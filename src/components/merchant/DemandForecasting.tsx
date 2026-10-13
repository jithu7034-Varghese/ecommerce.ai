'use client';

import React, { useState } from 'react';
import { TrendingUp, Info, AlertTriangle, ShieldCheck } from 'lucide-react';

export function DemandForecasting() {
  const [selectedCategory, setSelectedCategory] = useState<'evening' | 'cocktail' | 'workwear'>('evening');

  const riskData = [
    { title: 'Sapphire Satin Bias Midi Dress (UK 10)', category: 'evening', coverDays: 1, runRate: '3.8 units/day', risk: 'Critical Stockout' },
    { title: 'Azure Pleated Wrap Maxi Dress (UK 10)', category: 'evening', coverDays: 0, runRate: '4.2 units/day', risk: 'Sold Out' },
    { title: 'Emerald Velvet Cowl Slip Dress (UK 14)', category: 'cocktail', coverDays: 3, runRate: '1.9 units/day', risk: 'Low Stock' },
    { title: 'Tailored Ivory Crepe Tuxedo Blazer (UK 14)', category: 'workwear', coverDays: 6, runRate: '0.8 units/day', risk: 'Adequate' }
  ];

  return (
    <section style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--merchant-card-border)', boxShadow: 'var(--merchant-card-shadow)', padding: '24px', marginBottom: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <TrendingUp size={20} style={{ color: 'var(--store-accent-primary)' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
              Predictive Demand Forecasting & Inventory Run-Rate
            </h2>
            <span
              style={{
                backgroundColor: '#F5F3FF',
                color: 'var(--store-accent-primary)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px'
              }}
            >
              ILLUSTRATIVE FORECAST
            </span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>
            30-day projection modeling seasonal demand surge and stock replenishment timelines
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['evening', 'cocktail', 'workwear'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                border: selectedCategory === cat ? '1px solid var(--store-accent-primary)' : '1px solid var(--merchant-card-border)',
                backgroundColor: selectedCategory === cat ? 'var(--merchant-sidebar-active-bg)' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--store-text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {cat} Collection
            </button>
          ))}
        </div>
      </div>

      {/* SVG Forecast Graph with Confidence Ribbons */}
      <div style={{ backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--merchant-card-border)', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '0.8125rem' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '3px', backgroundColor: '#1E293B' }} />
              <span>Historical Baseline Sales</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '3px', backgroundColor: 'var(--store-accent-primary)', borderStyle: 'dashed' }} />
              <span>Projected Surge Trend (+22%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '8px', backgroundColor: '#EDE9FE', opacity: 0.6 }} />
              <span>80% Confidence Interval Ribbon</span>
            </div>
          </div>

          <span style={{ color: 'var(--store-text-muted)' }}>Simulation: Holt-Winters Additive Smoothing</span>
        </div>

        <svg viewBox="0 0 800 240" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Shaded Confidence Ribbon */}
          <polygon
            points="300,160 400,140 500,110 600,90 700,70 780,50 780,120 700,140 600,160 500,175 400,190 300,200"
            fill="#DDD6FE"
            opacity="0.45"
          />

          {/* Grid lines */}
          <line x1="40" y1="40" x2="780" y2="40" stroke="#E2E8F0" strokeDasharray="4 4" />
          <line x1="40" y1="100" x2="780" y2="100" stroke="#E2E8F0" strokeDasharray="4 4" />
          <line x1="40" y1="160" x2="780" y2="160" stroke="#E2E8F0" strokeDasharray="4 4" />
          <line x1="40" y1="210" x2="780" y2="210" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Historical Solid Line (Days 1 to 14) */}
          <polyline
            points="40,190 100,185 160,175 220,180 280,165 300,160"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Projected Dashed Line (Days 15 to 30) */}
          <polyline
            points="300,160 380,150 460,135 540,115 620,95 700,80 780,65"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="3"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />

          {/* Active Today Marker */}
          <line x1="300" y1="20" x2="300" y2="210" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="300" cy="160" r="5" fill="#7C3AED" />
          <text x="305" y="32" fill="#7C3AED" fontSize="11" fontWeight="700">Today</text>

          {/* X Axis Day Labels */}
          <text x="40" y="228" fill="#94A3B8" fontSize="10">Day -14</text>
          <text x="160" y="228" fill="#94A3B8" fontSize="10">Day -7</text>
          <text x="300" y="228" fill="#7C3AED" fontSize="10" fontWeight="700">Today</text>
          <text x="460" y="228" fill="#94A3B8" fontSize="10">+7 Days</text>
          <text x="620" y="228" fill="#94A3B8" fontSize="10">+14 Days</text>
          <text x="760" y="228" fill="#94A3B8" fontSize="10">+21 Days</text>
        </svg>
      </div>

      {/* Stockout Risk Matrix */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: '#0F172A' }}>
          Stockout Risk Ranking & Days of Inventory Cover
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {riskData.map((item) => (
            <div
              key={item.title}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--merchant-card-border)',
                backgroundColor: item.coverDays <= 1 ? '#FEF2F2' : '#F8FAFC'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--store-text-muted)' }}>
                  {item.category}
                </span>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: item.coverDays <= 1 ? '#DC2626' : '#D97706',
                    color: '#FFFFFF'
                  }}
                >
                  {item.risk}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A', marginBottom: '4px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--store-text-secondary)' }}>
                Cover: <strong>{item.coverDays} {item.coverDays === 1 ? 'day' : 'days'} remaining</strong> (Run-rate: {item.runRate})
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
