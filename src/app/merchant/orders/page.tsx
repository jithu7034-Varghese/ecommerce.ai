'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { OrderManagement } from '@/components/merchant/OrderManagement';
import { AIExplainabilityModal } from '@/components/merchant/AIExplainabilityModal';

export default function MerchantOrdersPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Orders & Fulfillment Pipeline"
          subtitle="Pack orders, generate shipping tracking, and manage dispatches"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          <OrderManagement />
        </main>
      </div>
      <AIExplainabilityModal />
    </div>
  );
}
