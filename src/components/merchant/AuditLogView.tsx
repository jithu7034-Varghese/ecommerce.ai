'use client';

import React from 'react';
import { History, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function AuditLogView() {
  const { auditLogs, undoAction } = useStore();

  return (
    <section style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--merchant-card-border)', boxShadow: 'var(--merchant-card-shadow)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <History size={18} style={{ color: 'var(--store-accent-primary)' }} />
        <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A' }}>
          Human Governance Audit Ledger & Activity Log
        </h2>
      </div>

      {auditLogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '36px', color: 'var(--store-text-muted)', fontSize: '0.875rem' }}>
          No governance mutations recorded in this session. Approving an AI proposal or editing inventory will log an immutable audit event here.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {auditLogs.map((log) => (
            <div
              key={log.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: log.status === 'reverted' ? '#F4F4F5' : '#F8FAFC',
                border: '1px solid var(--merchant-card-border)',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  {log.status === 'approved' ? (
                    <CheckCircle size={15} style={{ color: '#059669' }} />
                  ) : log.status === 'rejected' ? (
                    <XCircle size={15} style={{ color: '#DC2626' }} />
                  ) : (
                    <RotateCcw size={15} style={{ color: '#64748B' }} />
                  )}
                  <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>{log.action}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>by {log.userId}</span>
                  <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-secondary)' }}>
                  Target: <strong>{log.target}</strong> • Result: <em>{log.newValue}</em>
                </div>
              </div>

              {log.status !== 'reverted' && (
                <button
                  type="button"
                  onClick={() => undoAction(log.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--merchant-card-border)',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--store-text-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  title="Revert this action within 60-second window"
                >
                  <RotateCcw size={12} />
                  <span>Undo</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
