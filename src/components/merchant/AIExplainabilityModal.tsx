'use client';

import React, { useState } from 'react';
import { X, Sparkles, Check, XCircle, Edit3, AlertCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function AIExplainabilityModal() {
  const { activeProposal, setActiveProposal, approveProposal, rejectProposal, editProposalQuantity } = useStore();
  const [isEditingQty, setIsEditingQty] = useState(false);
  const [editedQty, setEditedQty] = useState<number>(activeProposal ? activeProposal.proposedQuantity : 25);
  const [confirmToast, setConfirmToast] = useState<string | null>(null);

  if (!activeProposal) return null;

  const handleApprove = () => {
    approveProposal(activeProposal.id);
    setConfirmToast(`Approved purchase proposal: Reordered ${activeProposal.proposedQuantity} units of ${activeProposal.productTitle}`);
    setTimeout(() => {
      setConfirmToast(null);
      setActiveProposal(null);
    }, 1500);
  };

  const handleReject = () => {
    rejectProposal(activeProposal.id, 'Declined by merchant Marcus');
    setConfirmToast('Proposal declined and removed from attention feed');
    setTimeout(() => {
      setConfirmToast(null);
      setActiveProposal(null);
    }, 1500);
  };

  const handleSaveQuantity = () => {
    editProposalQuantity(activeProposal.id, editedQty);
    setIsEditingQty(false);
  };

  return (
    <div
      className="drawer-backdrop"
      onClick={() => setActiveProposal(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-heading"
    >
      <div
        className="drawer-panel"
        style={{
          maxWidth: '620px',
          height: 'fit-content',
          maxHeight: '90vh',
          overflowY: 'auto',
          margin: 'auto',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: '#FFFFFF',
          padding: '32px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast confirmation */}
        {confirmToast && (
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: '#18181B',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}
          >
            <Check size={16} style={{ color: '#10B981' }} />
            <span>{confirmToast}</span>
          </div>
        )}

        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#EDE9FE', color: 'var(--store-accent-primary)' }}>
                <Sparkles size={18} />
              </div>
              <h2 id="proposal-modal-heading" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                AI Inventory Replenishment Proposal
              </h2>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>
              Standard 5-W Explainability Framework with Human Control Gate
            </div>
          </div>
          <button
            onClick={() => setActiveProposal(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: 'var(--store-text-muted)' }}
            aria-label="Close Proposal"
          >
            <X size={20} />
          </button>
        </div>

        {/* THE 5-W EXPLAINABILITY SECTIONS (Master Amendment Section 15) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
          {/* 1. WHAT */}
          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--merchant-card-border)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--store-accent-primary)', letterSpacing: '0.06em', marginBottom: '4px' }}>
              1. WHAT IS RECOMMENDED?
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
              {activeProposal.what}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-secondary)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <span>Supplier: <strong>{activeProposal.supplier}</strong></span>
              <span>Unit Cost: <strong>£{activeProposal.unitCost.toFixed(2)}</strong></span>
              <span>Total Commitment: <strong>£{activeProposal.totalCost.toFixed(2)}</strong></span>
            </div>

            {/* Inline Quantity Editor */}
            {isEditingQty ? (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={editedQty}
                  onChange={(e) => setEditedQty(Number(e.target.value))}
                  style={{ width: '80px', height: '36px', padding: '0 8px', borderRadius: '4px', border: '1px solid var(--store-border)' }}
                />
                <button onClick={handleSaveQuantity} className="btn btn-primary" style={{ height: '36px', fontSize: '0.75rem' }}>
                  Save Quantity
                </button>
                <button onClick={() => setIsEditingQty(false)} className="btn btn-secondary" style={{ height: '36px', fontSize: '0.75rem' }}>
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingQty(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--store-accent-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '8px'
                }}
              >
                <Edit3 size={12} />
                <span>Adjust Proposed Units (Currently {activeProposal.proposedQuantity})</span>
              </button>
            )}
          </div>

          {/* 2. WHY */}
          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--merchant-card-border)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--store-accent-primary)', letterSpacing: '0.06em', marginBottom: '4px' }}>
              2. WHY? (EMPIRICAL EVIDENCE)
            </div>
            <div style={{ fontSize: '0.875rem', color: '#1E293B', lineHeight: 1.6 }}>
              {activeProposal.why}
            </div>
          </div>

          {/* 3. IMPACT */}
          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--merchant-card-border)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--store-accent-primary)', letterSpacing: '0.06em', marginBottom: '4px' }}>
              3. PROJECTED BUSINESS IMPACT
            </div>
            <div style={{ fontSize: '0.875rem', color: '#1E293B', lineHeight: 1.6 }}>
              {activeProposal.impact}
            </div>
          </div>

          {/* 4. LIMITATIONS */}
          <div style={{ padding: '14px', backgroundColor: '#FFFBEB', borderRadius: 'var(--radius-md)', border: '1px solid #FDE68A' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#92400E', textTransform: 'uppercase', marginBottom: '4px' }}>
              <AlertCircle size={14} />
              <span>4. MODEL LIMITATIONS & UNCERTAINTIES</span>
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#78350F', lineHeight: 1.5 }}>
              {activeProposal.limitations}
            </div>
          </div>
        </div>

        {/* 5. ACTION & HUMAN CONTROL (Master Amendment Section 16) */}
        <div style={{ borderTop: '1px solid var(--merchant-card-border)', paddingTop: '20px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--store-text-muted)', letterSpacing: '0.06em', marginBottom: '12px' }}>
            5. HUMAN DECISION GATE:
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleApprove}
              className="btn btn-primary"
              style={{
                flex: 2,
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#059669',
                borderColor: '#059669'
              }}
            >
              <Check size={18} />
              <span>Approve Simulated Purchase Order (£{activeProposal.totalCost.toFixed(2)})</span>
            </button>

            <button
              onClick={handleReject}
              className="btn btn-secondary"
              style={{
                flex: 1,
                height: '48px',
                borderRadius: 'var(--radius-md)',
                color: '#DC2626'
              }}
            >
              <XCircle size={18} />
              <span>Decline</span>
            </button>
          </div>
          <div style={{ textAlign: 'center', fontSize: '0.6875rem', color: 'var(--store-text-muted)', marginTop: '10px' }}>
            Approval logs an immutable audit event to the merchant activity ledger.
          </div>
        </div>
      </div>
    </div>
  );
}
