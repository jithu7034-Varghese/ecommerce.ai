'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { InventoryMatrix } from '@/components/merchant/InventoryMatrix';
import { AIExplainabilityModal } from '@/components/merchant/AIExplainabilityModal';

export default function MerchantInventoryPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Inventory Management & Stock Matrix"
          subtitle="Real-time SKU quantities, low stock thresholds, and reorder levels"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          <InventoryMatrix />
        </main>
      </div>
      <AIExplainabilityModal />
    </div>
  );
}
