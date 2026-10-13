'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { Settings, Shield, RefreshCw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function MerchantSettingsPage() {
  const { resetConversation } = useStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Store Settings & AI OS Configuration"
          subtitle="Regional currency, VAT policies, delivery fees, and demo state controls"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--merchant-card-border)', boxShadow: 'var(--merchant-card-shadow)', padding: '24px', maxWidth: '640px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>Store Preferences</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>Store Currency</label>
                <input type="text" disabled value="GBP (£) — British Pound" style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--merchant-card-border)', backgroundColor: '#F8FAFC', fontSize: '0.875rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>UK VAT Rate</label>
                <input type="text" disabled value="20% (Included in Retail Display Prices)" style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--merchant-card-border)', backgroundColor: '#F8FAFC', fontSize: '0.875rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>Complimentary UK Delivery Threshold</label>
                <input type="text" disabled value="£50.00" style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--merchant-card-border)', backgroundColor: '#F8FAFC', fontSize: '0.875rem' }} />
              </div>

              <div style={{ borderTop: '1px solid var(--merchant-card-border)', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '8px' }}>Demo State Controls</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)', marginBottom: '14px' }}>
                  Reset simulated dialogue slots and reload original inventory demo baseline.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    resetConversation();
                    alert('Conversational memory reset successfully.');
                  }}
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '40px', fontSize: '0.8125rem' }}
                >
                  <RefreshCw size={14} />
                  <span>Reset Stylist Session</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
