'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { AttentionFeed } from '@/components/merchant/AttentionFeed';
import { KpiGrid } from '@/components/merchant/KpiGrid';
import { OrderManagement } from '@/components/merchant/OrderManagement';
import { AIExplainabilityModal } from '@/components/merchant/AIExplainabilityModal';

export default function MerchantOverviewPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Merchant Executive Overview"
          subtitle="Real-time operational health & AI-guided decision priorities"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          <AttentionFeed />
          <KpiGrid />
          <OrderManagement />
        </main>
      </div>
      <AIExplainabilityModal />
    </div>
  );
}
