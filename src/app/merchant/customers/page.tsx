'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { useStore } from '@/context/StoreContext';
import { Users, Mail, MapPin } from 'lucide-react';

export default function MerchantCustomersPage() {
  const { orders } = useStore();

  const customers = [
    { name: 'Clara Higgins', email: 'clara.higgins@example.co.uk', city: 'London', ordersCount: 1, totalSpent: 95.0, preferredStyle: 'Evening Maxi Dresses' },
    { name: 'Maya Lin', email: 'maya.lin@example.com', city: 'Manchester', ordersCount: 2, totalSpent: 176.0, preferredStyle: 'Cocktail Halter Midis' },
    { name: 'Liam Thorne', email: 'liam.thorne@example.com', city: 'Liverpool', ordersCount: 1, totalSpent: 96.99, preferredStyle: 'Velvet Slip Gowns' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Customer Profiles & Client Intel"
          subtitle="Simulated guest profiles, purchase histories, and style preferences"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--merchant-card-border)', boxShadow: 'var(--merchant-card-shadow)', padding: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>Active Shopper Directory</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {customers.map((c) => (
                <div key={c.email} style={{ padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--merchant-card-border)', backgroundColor: '#F8FAFC' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--store-accent-primary)', color: '#FFFFFF', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {c.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{c.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>{c.email}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>Location: <strong>{c.city}, UK</strong></div>
                    <div>Completed Orders: <strong>{c.ordersCount}</strong></div>
                    <div>Total Lifetime Value: <strong>£{c.totalSpent.toFixed(2)}</strong></div>
                    <div>Stylist Affinity: <em>{c.preferredStyle}</em></div>
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
