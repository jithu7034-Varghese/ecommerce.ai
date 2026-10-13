'use client';

import React, { useState } from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { AIExplainabilityModal } from '@/components/merchant/AIExplainabilityModal';
import { AuditLogView } from '@/components/merchant/AuditLogView';
import { useStore } from '@/context/StoreContext';
import {
  CheckSquare,
  Sparkles,
  Check,
  X,
  Edit2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Tag,
  Truck,
  RotateCcw,
  Sliders
} from 'lucide-react';
import { AIProposal } from '@/types';

interface DecisionProposalItem {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  supplier: string;
  financialImpact: string;
  status: 'pending' | 'approved' | 'rejected' | 'modified';
  urgency: 'high' | 'medium' | 'low';
  evidence: string;
  proposalRef?: AIProposal;
}

export default function MerchantDecisionsPage() {
  const { proposals, approveProposal, rejectProposal, setActiveProposal, auditLogs } = useStore();
  const [filterCategory, setFilterCategory] = useState<'all' | 'procurement' | 'pricing' | 'marketing'>('all');

  // Synthetic multi-category proposals for demonstration
  const allDecisions: DecisionProposalItem[] = [
    ...proposals.map((p) => ({
      id: p.id,
      category: 'procurement',
      categoryLabel: 'Procurement PO',
      title: `Reorder ${p.proposedQuantity} units of ${p.productTitle} (${p.size}, ${p.color})`,
      supplier: p.supplier,
      financialImpact: `£${p.totalCost.toFixed(2)} cost (Est. £${(p.proposedQuantity * 95).toFixed(2)} GMV)`,
      status: p.status,
      urgency: p.urgency,
      evidence: p.why,
      proposalRef: p
    })),
    {
      id: 'DEC-PRC-01',
      category: 'pricing',
      categoryLabel: 'Dynamic Pricing',
      title: 'Adjust Ivory Crepe Blazer retail price from £165 to £175 (+£10)',
      supplier: 'Internal Merchandising',
      financialImpact: '+£1,450 Monthly Gross Profit at 73.2% Margin',
      status: 'pending',
      urgency: 'medium',
      evidence: 'Price elasticity analysis confirms demand remains inelastic across UK 10–14 sizes.'
    },
    {
      id: 'DEC-MKT-01',
      category: 'marketing',
      categoryLabel: 'Campaign Launch',
      title: 'Launch VIP Early Access: Velvet Evening Capsule to 42 Repeat Shoppers',
      supplier: 'AI Marketing Agent',
      financialImpact: 'Est. £2,840 Revenue at 14.2% Conversion Lift',
      status: 'pending',
      urgency: 'low',
      evidence: 'High customer affinity for cocktail evening wear detected among 42 past buyers.'
    }
  ];

  const filtered = allDecisions.filter(
    (d) => filterCategory === 'all' || d.category === filterCategory
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="AI Decision Centre & Governance Queue"
          subtitle="Human-in-the-loop authorization gates across procurement, pricing, and merchandising"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          {/* Header Banner */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--merchant-card-border)',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: 'var(--merchant-card-shadow)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <CheckSquare size={20} style={{ color: 'var(--store-accent-primary)' }} />
                <span>Pending Decision Queue ({allDecisions.filter((d) => d.status === 'pending').length})</span>
              </h2>
              <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)', marginTop: '4px' }}>
                All sensitive commercial actions require explicit merchant authorization. Click "Inspect 5-W Rationale" to review evidence.
              </div>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: '#F8FAFC', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
              {(['all', 'procurement', 'pricing', 'marketing'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: filterCategory === cat ? '#FFFFFF' : 'transparent',
                    color: filterCategory === cat ? 'var(--store-accent-primary)' : '#64748B',
                    boxShadow: filterCategory === cat ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  {cat === 'all' ? 'All Proposals' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Decision Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: `1px solid ${item.status === 'pending' ? 'var(--merchant-card-border)' : '#E2E8F0'}`,
                  padding: '20px 24px',
                  boxShadow: 'var(--merchant-card-shadow)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '20px',
                  opacity: item.status === 'approved' ? 0.75 : 1
                }}
              >
                <div style={{ maxWidth: '640px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        backgroundColor: '#EDE9FE',
                        color: 'var(--store-accent-primary)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.categoryLabel}
                    </span>

                    {item.urgency === 'high' && (
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626'
                        }}
                      >
                        Urgent Action
                      </span>
                    )}

                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Source: {item.supplier}
                    </span>
                  </div>

                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.45, marginBottom: '8px' }}>
                    <strong>Evidence: </strong> {item.evidence}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                    Commercial Impact: {item.financialImpact}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {item.proposalRef && (
                    <button
                      onClick={() => setActiveProposal(item.proposalRef!)}
                      className="btn btn-secondary"
                      style={{ height: '36px', fontSize: '0.75rem' }}
                    >
                      <Sparkles size={14} />
                      <span>Inspect 5-W Rationale</span>
                    </button>
                  )}

                  {item.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => {
                          if (item.proposalRef) {
                            approveProposal(item.id);
                          } else {
                            alert(`Approved: ${item.title}`);
                          }
                        }}
                        className="btn btn-primary"
                        style={{ height: '36px', fontSize: '0.75rem', backgroundColor: '#059669' }}
                      >
                        <Check size={14} />
                        <span>Authorize</span>
                      </button>

                      <button
                        onClick={() => {
                          if (item.proposalRef) {
                            rejectProposal(item.id, 'Declined in Decision Centre');
                          } else {
                            alert(`Declined: ${item.title}`);
                          }
                        }}
                        className="btn btn-secondary"
                        style={{ height: '36px', fontSize: '0.75rem', color: '#DC2626' }}
                      >
                        <X size={14} />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Check size={14} />
                      <span>Authorized</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Audit Ledger */}
          <AuditLogView />
        </main>
      </div>
      <AIExplainabilityModal />
    </div>
  );
}
