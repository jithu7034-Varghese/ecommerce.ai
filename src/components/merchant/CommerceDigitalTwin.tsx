'use client';

import React, { useState } from 'react';
import {
  Sliders,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function CommerceDigitalTwin() {
  const { products, proposals, addProposal } = useStore();

  // Simulation Sliders State
  const [adSpendDelta, setAdSpendDelta] = useState<number>(0); // -50% to +50%
  const [supplierCostDelta, setSupplierCostDelta] = useState<number>(0); // -20% to +30%
  const [isStockoutSimulated, setIsStockoutSimulated] = useState<boolean>(false); // Best-seller stockout
  const [discountDelta, setDiscountDelta] = useState<number>(0); // 0% to 25%

  const [hasAppliedScenario, setHasAppliedScenario] = useState<boolean>(false);

  // Baseline Financials (Monthly)
  const baselineRevenue = 42850;
  const baselineCogs = 13540;
  const baselineAdSpend = 7200;
  const baselineShippingCost = 3100;
  const baselineGrossProfit = baselineRevenue - baselineCogs;
  const baselineContributionMargin = baselineGrossProfit - baselineAdSpend - baselineShippingCost;

  // Simulation Dynamic Calculation
  // 1. Ad Spend effect: Elasticity = 0.65 (a +20% ad spend generates ~+13% traffic/revenue, diminishing returns)
  const adMultiplier = 1 + adSpendDelta / 100;
  const simulatedAdSpend = baselineAdSpend * adMultiplier;
  const trafficMultiplier = Math.pow(Math.max(0.2, adMultiplier), 0.65);

  // 2. Discount effect: 10% discount gives +18% volume, but lowers average unit price
  const discountMultiplier = 1 - discountDelta / 100;
  const volumeLift = 1 + (discountDelta / 100) * 1.8;

  // 3. Stockout simulation: Top seller accounts for 28% of revenue. Deflection recovers 40% to other dresses.
  const stockoutPenalty = isStockoutSimulated ? 0.28 * (1 - 0.4) : 0; // Net 16.8% revenue loss

  // Net Simulated Revenue
  const simulatedVolume = trafficMultiplier * volumeLift * (1 - (isStockoutSimulated ? 0.168 : 0));
  const simulatedRevenue = Math.round(baselineRevenue * simulatedVolume * discountMultiplier);

  // Simulated COGS
  const unitCogsMultiplier = 1 + supplierCostDelta / 100;
  const simulatedCogs = Math.round(baselineCogs * simulatedVolume * unitCogsMultiplier);

  // Simulated Shipping & Operations
  const simulatedShipping = Math.round(baselineShippingCost * simulatedVolume);

  // Simulated Profits
  const simulatedGrossProfit = simulatedRevenue - simulatedCogs;
  const simulatedGrossMarginPct = ((simulatedGrossProfit / simulatedRevenue) * 100).toFixed(1);
  const simulatedContributionMargin = simulatedGrossProfit - simulatedAdSpend - simulatedShipping;
  const simulatedContributionMarginPct = ((simulatedContributionMargin / simulatedRevenue) * 100).toFixed(1);

  // Delta Comparisons
  const revenueDeltaGbp = simulatedRevenue - baselineRevenue;
  const revenueDeltaPct = (((simulatedRevenue - baselineRevenue) / baselineRevenue) * 100).toFixed(1);
  const contributionDeltaGbp = simulatedContributionMargin - baselineContributionMargin;
  const contributionDeltaPct = (((simulatedContributionMargin - baselineContributionMargin) / baselineContributionMargin) * 100).toFixed(1);

  // Uncertainty & Confidence Calibration
  const confidenceScore = Math.max(78, Math.round(94 - Math.abs(adSpendDelta) * 0.15 - Math.abs(supplierCostDelta) * 0.2 - discountDelta * 0.3));

  const resetSimulation = () => {
    setAdSpendDelta(0);
    setSupplierCostDelta(0);
    setIsStockoutSimulated(false);
    setDiscountDelta(0);
    setHasAppliedScenario(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner / Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E0E35 0%, #160B22 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #3B1F5E',
          padding: '24px 28px',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: 'var(--merchant-card-shadow)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
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
                <span>Flagship Enterprise Feature</span>
              </span>
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
                SIMULATED DATA MODEL
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Commerce Digital Twin — Scenario Simulator
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#C4B5FD', maxWidth: '750px', marginTop: '6px', lineHeight: 1.5 }}>
              Interactively model operational and financial decisions before execution. The Digital Twin synthesizes revenue, inventory elasticity, ad spend yield, and supplier cost changes into real-time contribution forecasts.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={resetSimulation}
              className="btn btn-secondary"
              style={{
                height: '38px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                fontSize: '0.8125rem'
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Baseline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls Left, Live Results Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Left Column: Interactive Scenario Sliders */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--merchant-card-border)',
            boxShadow: 'var(--merchant-card-shadow)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--merchant-card-border)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} style={{ color: 'var(--store-accent-primary)' }} />
              <span>Decision Levers</span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>Adjust variables to simulate</span>
          </div>

          {/* Lever 1: Advertising Spend */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>
                Advertising Spend Shift
              </label>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  color: adSpendDelta > 0 ? '#059669' : adSpendDelta < 0 ? '#DC2626' : '#64748B'
                }}
              >
                {adSpendDelta > 0 ? `+${adSpendDelta}%` : `${adSpendDelta}%`} (£{simulatedAdSpend.toLocaleString()}/mo)
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              step="5"
              value={adSpendDelta}
              onChange={(e) => setAdSpendDelta(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--store-accent-primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#94A3B8', marginTop: '4px' }}>
              <span>-50% (Conservative)</span>
              <span>Baseline (£7,200)</span>
              <span>+50% (Aggressive Scale)</span>
            </div>
          </div>

          {/* Lever 2: Supplier Cost Change */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>
                Supplier Surcharge / Price Inflation
              </label>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  color: supplierCostDelta > 0 ? '#DC2626' : supplierCostDelta < 0 ? '#059669' : '#64748B'
                }}
              >
                {supplierCostDelta > 0 ? `+${supplierCostDelta}%` : `${supplierCostDelta}%`} Unit Cost
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="30"
              step="5"
              value={supplierCostDelta}
              onChange={(e) => setSupplierCostDelta(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--store-accent-primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#94A3B8', marginTop: '4px' }}>
              <span>-20% (Bulk Discount)</span>
              <span>Baseline (£13,540)</span>
              <span>+30% (Inflationary Spike)</span>
            </div>
          </div>

          {/* Lever 3: Storewide Promotional Discount */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>
                Storewide Promotional Discount
              </label>
              <span style={{ fontWeight: 800, fontSize: '0.875rem', color: discountDelta > 0 ? '#D97706' : '#64748B' }}>
                {discountDelta}% Off
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="5"
              value={discountDelta}
              onChange={(e) => setDiscountDelta(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--store-accent-primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#94A3B8', marginTop: '4px' }}>
              <span>0% (Full Price)</span>
              <span>10% (Seasonal Promo)</span>
              <span>25% (Flash Sale)</span>
            </div>
          </div>

          {/* Lever 4: Best-Seller Stockout Toggle */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: isStockoutSimulated ? '#FEF2F2' : '#F8FAFC',
              border: `1px solid ${isStockoutSimulated ? '#FECACA' : '#E2E8F0'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: isStockoutSimulated ? '#991B1B' : '#1E293B' }}>
                Simulate 7-Day Bestseller Stockout
              </div>
              <div style={{ fontSize: '0.75rem', color: isStockoutSimulated ? '#B91C1C' : '#64748B', marginTop: '2px' }}>
                Simulates UK 10 Azure Maxi depletion with 40% customer deflection
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsStockoutSimulated(!isStockoutSimulated)}
              style={{
                height: '32px',
                padding: '0 14px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.75rem',
                backgroundColor: isStockoutSimulated ? '#DC2626' : '#E2E8F0',
                color: isStockoutSimulated ? '#FFFFFF' : '#475569',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 120ms ease'
              }}
            >
              {isStockoutSimulated ? 'Simulated Active' : 'Off'}
            </button>
          </div>
        </div>

        {/* Right Column: Live Simulated Financial Outcomes */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--merchant-card-border)',
            boxShadow: 'var(--merchant-card-shadow)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--merchant-card-border)', paddingBottom: '12px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A' }}>
                Simulated Financial Trajectory
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                <ShieldCheck size={14} />
                <span>Model Confidence: {confidenceScore}%</span>
              </div>
            </div>

            {/* Simulated Output Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
              {/* Card 1: Simulated Net Revenue */}
              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Simulated Monthly Revenue
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                  £{simulatedRevenue.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, marginTop: '4px', color: revenueDeltaGbp >= 0 ? '#059669' : '#DC2626' }}>
                  {revenueDeltaGbp >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span>{revenueDeltaGbp >= 0 ? `+£${revenueDeltaGbp.toLocaleString()} (+${revenueDeltaPct}%)` : `-£${Math.abs(revenueDeltaGbp).toLocaleString()} (${revenueDeltaPct}%)`}</span>
                </div>
              </div>

              {/* Card 2: Net Contribution Margin */}
              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Net Contribution Margin
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--store-accent-primary)', marginTop: '4px' }}>
                  £{simulatedContributionMargin.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, marginTop: '4px', color: contributionDeltaGbp >= 0 ? '#059669' : '#DC2626' }}>
                  {contributionDeltaGbp >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span>{contributionDeltaGbp >= 0 ? `+£${contributionDeltaGbp.toLocaleString()} (+${contributionDeltaPct}%)` : `-£${Math.abs(contributionDeltaGbp).toLocaleString()} (${contributionDeltaPct}%)`}</span>
                </div>
              </div>

              {/* Card 3: Gross Margin % */}
              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Simulated Gross Margin
                </div>
                <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                  {simulatedGrossMarginPct}%
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                  COGS: £{simulatedCogs.toLocaleString()}
                </div>
              </div>

              {/* Card 4: Operating Health / Risk Status */}
              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Model Risk Indicator
                </div>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, marginTop: '4px', color: isStockoutSimulated || simulatedContributionMargin < 12000 ? '#DC2626' : '#059669' }}>
                  {isStockoutSimulated ? 'Critical Stockout Drag' : simulatedContributionMargin < 12000 ? 'Margin Compression Alert' : 'Healthy Growth Trajectory'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                  Ad Spend: £{simulatedAdSpend.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Strategic Summary Box */}
            <div style={{ backgroundColor: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', gap: '12px' }}>
              <Info size={18} style={{ color: 'var(--store-accent-primary)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.8125rem', color: '#4C1D95', lineHeight: 1.5 }}>
                <strong>AI Twin Synthesis: </strong>
                {adSpendDelta > 0 && discountDelta === 0 && !isStockoutSimulated && (
                  <span>Increasing ad spend by {adSpendDelta}% generates an estimated £{revenueDeltaGbp.toLocaleString()} in incremental top-line, resulting in a net contribution delta of £{contributionDeltaGbp.toLocaleString()}.</span>
                )}
                {isStockoutSimulated && (
                  <span style={{ color: '#991B1B' }}>Warning: Allowing the bestseller to stock out costs approximately £{Math.abs(revenueDeltaGbp).toLocaleString()} in gross sales even with marketing deflection. Prioritize immediate replenishment.</span>
                )}
                {discountDelta > 0 && (
                  <span>A {discountDelta}% discount boosts unit throughput by {((volumeLift - 1) * 100).toFixed(0)}%, but compresses unit gross margin by {(68.4 - Number(simulatedGrossMarginPct)).toFixed(1)} percentage points.</span>
                )}
                {adSpendDelta === 0 && supplierCostDelta === 0 && discountDelta === 0 && !isStockoutSimulated && (
                  <span>System is currently reflecting the active baseline operations. Adjust the levers on the left to simulate alternative operational strategies.</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--merchant-card-border)', paddingTop: '16px' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Actions require human merchant approval before propagation.
            </div>

            <button
              onClick={() => {
                setHasAppliedScenario(true);
                addProposal({
                  id: `prop-twin-${Date.now()}`,
                  variantId: 'SKU-AZU-10',
                  productTitle: 'Digital Twin Strategy: Growth & Stockout Shield',
                  color: 'Azure Blue',
                  size: 'UK 10',
                  supplier: 'AI Digital Twin Strategy Engine',
                  proposedQuantity: 25,
                  unitCost: 90,
                  totalCost: 2250,
                  what: `Execute simulated scenario: Maintain ${adSpendDelta >= 0 ? `+${adSpendDelta}%` : `${adSpendDelta}%`} ad allocation and shield UK 10 stock with 25 unit replenishment.`,
                  why: `Digital Twin simulation indicates +£${Math.abs(revenueDeltaGbp).toLocaleString()} upside and prevents a critical 7-day stockout gap.`,
                  impact: `Simulated Net Contribution reaches £${simulatedContributionMargin.toLocaleString()} (${simulatedContributionMarginPct}%) with ${confidenceScore}% confidence.`,
                  limitations: 'Calculated using baseline historical elasticity; subject to supplier lead time stability.',
                  status: 'pending',
                  timestamp: new Date().toISOString(),
                  urgency: 'high'
                });
              }}
              className="btn btn-primary"
              style={{ height: '40px', fontSize: '0.8125rem' }}
            >
              {hasAppliedScenario ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}
              <span>{hasAppliedScenario ? 'Strategy Proposal Queued' : 'Stage as Strategy Proposal'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
