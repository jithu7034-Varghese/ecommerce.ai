'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { Megaphone, Tag, Sparkles } from 'lucide-react';

function MarketingPage() {
  const campaigns = [
    { title: 'Autumn Wedding Guest Edit', channel: 'AI Stylist Recommendations', status: 'Active', conversion: '14.2%', revenue: '£2,840.00' },
    { title: 'Velvet Evening Capsule', channel: 'Storefront Hero Spotlight', status: 'Active', conversion: '11.8%', revenue: '£1,650.00' },
    { title: 'VIP Tailored Crepe Early Drop', channel: 'Direct Email Preview', status: 'Scheduled', conversion: '—', revenue: '—' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Marketing Campaigns & Merchandising"
          subtitle="Autonomous merchandising campaigns, promotion guardrails, and conversions"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--merchant-card-border)', boxShadow: 'var(--merchant-card-shadow)', padding: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>Active Seasonal Campaigns</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {campaigns.map((camp) => (
                <div key={camp.title} style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--merchant-card-border)', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A', marginBottom: '2px' }}>{camp.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>Channel: {camp.channel}</div>
                  </div>

                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--store-text-muted)', textTransform: 'uppercase' }}>Conversion</div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{camp.conversion}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--store-text-muted)', textTransform: 'uppercase' }}>Simulated Revenue</div>
                      <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--store-accent-primary)' }}>{camp.revenue}</div>
                    </div>

                    <span style={{ backgroundColor: camp.status === 'Active' ? '#ECFDF5' : '#F1F5F9', color: camp.status === 'Active' ? '#059669' : '#64748B', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {camp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function MerchantMarketingPage() {
  return <MarketingPage />;
}
