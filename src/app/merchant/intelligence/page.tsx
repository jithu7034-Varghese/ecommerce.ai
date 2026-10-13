'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { DemandForecasting } from '@/components/merchant/DemandForecasting';
import { AuditLogView } from '@/components/merchant/AuditLogView';
import { AIExplainabilityModal } from '@/components/merchant/AIExplainabilityModal';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

function AIIntelligenceHub() {
  const { proposals, setActiveProposal } = useStore();
  const pendingProposals = proposals.filter((p) => p.status === 'pending');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="AI Intelligence & Autonomous Merchandising"
          subtitle="Explainable predictive modeling, replenishment proposals, and governance ledger"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          {/* Pending Proposals Queue */}
          <section style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--merchant-card-border)', boxShadow: 'var(--merchant-card-shadow)', padding: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} style={{ color: 'var(--store-accent-primary)' }} />
                  <span>Pending AI Decision Proposals ({pendingProposals.length})</span>
                </h2>
                <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>
                  Requires human authorization before purchase order execution
                </div>
              </div>
            </div>

            {pendingProposals.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', color: '#059669', fontWeight: 600, fontSize: '0.875rem' }}>
                All pending AI proposals have been reviewed and approved.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pendingProposals.map((prop) => (
                  <div
                    key={prop.id}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid var(--merchant-card-border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ backgroundColor: '#FEE2E2', color: '#DC2626', fontSize: '0.6875rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                          High Urgency
                        </span>
                        <strong style={{ fontSize: '0.9375rem', color: '#0F172A' }}>{prop.what}</strong>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-secondary)' }}>
                        Target: {prop.productTitle} • Reorder: {prop.proposedQuantity} units • Commitment: £{prop.totalCost.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveProposal(prop)}
                      className="btn btn-primary"
                      style={{ height: '38px', fontSize: '0.8125rem', padding: '0 16px' }}
                    >
                      <span>Inspect 5-W Rationale</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Forecasting */}
          <DemandForecasting />

          {/* Audit Trail */}
          <AuditLogView />
        </main>
      </div>
      <AIExplainabilityModal />
    </div>
  );
}

export default function MerchantIntelligencePage() {
  return <AIIntelligenceHub />;
}
