'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { CommerceDigitalTwin } from '@/components/merchant/CommerceDigitalTwin';
import { AIExplainabilityModal } from '@/components/merchant/AIExplainabilityModal';

export default function MerchantDigitalTwinPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Commerce Digital Twin & What-If Simulator"
          subtitle="Mathematical scenario modeling, ad spend elasticity, and supply shock impact"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          <CommerceDigitalTwin />
        </main>
      </div>
      <AIExplainabilityModal />
    </div>
  );
}
