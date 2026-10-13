'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { KpiGrid } from '@/components/merchant/KpiGrid';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

export default function MerchantReportsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Financial & Operational Analytics"
          subtitle="Revenue velocity, gross margin breakdown, and category sales volumes"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          <KpiGrid />

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--merchant-card-border)', boxShadow: 'var(--merchant-card-shadow)', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>Category Revenue Share</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase' }}>Evening Dresses</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--store-accent-primary)' }}>54.2%</div>
                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>£18,420 simulated monthly</div>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase' }}>Cocktail & Party</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#D97706' }}>24.6%</div>
                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>£8,360 simulated monthly</div>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase' }}>Tailored Suiting</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563EB' }}>14.8%</div>
                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>£5,030 simulated monthly</div>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase' }}>Everyday Silk</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>6.4%</div>
                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>£2,170 simulated monthly</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
