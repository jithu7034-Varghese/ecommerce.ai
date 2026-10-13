'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { ExecutiveMorningBriefing } from '@/components/merchant/ExecutiveMorningBriefing';
import { ExecutiveKpisAndRadar } from '@/components/merchant/ExecutiveKpisAndRadar';
import { AttentionFeed } from '@/components/merchant/AttentionFeed';
import { OrderManagement } from '@/components/merchant/OrderManagement';
import { AIExplainabilityModal } from '@/components/merchant/AIExplainabilityModal';

export default function MerchantOverviewPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Merchant Executive Command Centre"
          subtitle="Enterprise operational telemetry, morning intelligence briefing, and decision priorities"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          {/* Flagship: AI Executive Morning Briefing */}
          <ExecutiveMorningBriefing />

          {/* Flagship: 10 Core Health KPIs & Opportunity Radar */}
          <ExecutiveKpisAndRadar />

          {/* Attention & Decision Queue Triage */}
          <AttentionFeed />

          {/* Orders & Operational Stream */}
          <OrderManagement />
        </main>
      </div>
      <AIExplainabilityModal />
    </div>
  );
}
