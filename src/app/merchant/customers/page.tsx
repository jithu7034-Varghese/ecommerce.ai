'use client';

import React, { useState } from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { useStore } from '@/context/StoreContext';
import {
  Users,
  Mail,
  MapPin,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ShoppingBag,
  ArrowRight,
  X,
  Send,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart
} from 'lucide-react';

interface Customer360Profile {
  id: string;
  name: string;
  email: string;
  city: string;
  segment: 'VIP Champion' | 'At-Risk Repeat Buyer' | 'Occasion Shopper' | 'First-Time Guest';
  ordersCount: number;
  totalSpent: number;
  predictedLtv: number;
  churnRiskPct: number;
  preferredStyle: string;
  preferredSize: string;
  lastPurchaseDate: string;
  browsingSignals: string[];
  recommendedAction: string;
  orderHistory: {
    orderId: string;
    date: string;
    items: string;
    total: number;
    status: string;
  }[];
}

export default function MerchantCustomersPage() {
  const { orders } = useStore();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer360Profile | null>(null);
  const [outreachSent, setOutreachSent] = useState(false);

  const customerProfiles: Customer360Profile[] = [
    {
      id: 'CUST-001',
      name: 'Maya Lin',
      email: 'maya.lin@example.com',
      city: 'Manchester',
      segment: 'At-Risk Repeat Buyer',
      ordersCount: 2,
      totalSpent: 176.0,
      predictedLtv: 485.0,
      churnRiskPct: 62,
      preferredStyle: 'Cocktail Halter Midis & Satin Silk',
      preferredSize: 'UK 10',
      lastPurchaseDate: '45 days ago',
      browsingSignals: [
        'Browsed Emerald Velvet Slip Gown 3 times in last 7 days',
        'Abandoned bag with Halter Midi UK 10 48 hours ago',
        'Interacted with AI Stylist requesting "Evening dresses under £100"'
      ],
      recommendedAction: 'Dispatch personalized VIP private drop preview with 10% complimentary styling incentive.',
      orderHistory: [
        {
          orderId: '#BER-88412',
          date: '45 days ago',
          items: 'Noir Pleated Halter Midi (UK 10, Noir Black)',
          total: 88.0,
          status: 'delivered'
        },
        {
          orderId: '#BER-88102',
          date: '72 days ago',
          items: 'Sapphire Satin Bias Midi Dress (UK 10, Sapphire)',
          total: 88.0,
          status: 'delivered'
        }
      ]
    },
    {
      id: 'CUST-002',
      name: 'Clara Higgins',
      email: 'clara.higgins@example.co.uk',
      city: 'London',
      segment: 'VIP Champion',
      ordersCount: 3,
      totalSpent: 285.0,
      predictedLtv: 720.0,
      churnRiskPct: 12,
      preferredStyle: 'Evening Maxi Gowns & Tailored Blazers',
      preferredSize: 'UK 12',
      lastPurchaseDate: '6 days ago',
      browsingSignals: [
        'Saved Champagne Silk Blouse to wishlist',
        'High conversion on AI Stylist recommendations (100% repeat)',
        'Consistently orders priority UK shipping'
      ],
      recommendedAction: 'Invite to exclusive preview of Winter Silk collection; recommend matching Ivory Crepe Blazer.',
      orderHistory: [
        {
          orderId: '#BER-99120',
          date: '6 days ago',
          items: 'Azure Wrap Maxi Dress (UK 12, Azure Blue)',
          total: 95.0,
          status: 'delivered'
        },
        {
          orderId: '#BER-92140',
          date: '28 days ago',
          items: 'Ivory Crepe Tailored Blazer (UK 12, Ivory)',
          total: 165.0,
          status: 'delivered'
        }
      ]
    },
    {
      id: 'CUST-003',
      name: 'Liam Thorne',
      email: 'liam.thorne@example.com',
      city: 'Liverpool',
      segment: 'Occasion Shopper',
      ordersCount: 1,
      totalSpent: 96.99,
      predictedLtv: 210.0,
      churnRiskPct: 34,
      preferredStyle: 'Velvet Slip Gowns & Evening Wear',
      preferredSize: 'UK 10',
      lastPurchaseDate: '14 days ago',
      browsingSignals: [
        'Single occasion purchase for wedding guest attire',
        'Viewed Size Guide drawer twice before checkout'
      ],
      recommendedAction: 'Send post-purchase garment care tips and seasonal holiday lookbook.',
      orderHistory: [
        {
          orderId: '#BER-77312',
          date: '14 days ago',
          items: 'Emerald Velvet Slip Dress (UK 10, Emerald Green)',
          total: 96.99,
          status: 'delivered'
        }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Customer 360 AI & Client Intelligence"
          subtitle="Predictive churn telemetry, lifetime value modeling, and VIP clienteling"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          {/* Header Summary */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--merchant-card-border)',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: 'var(--merchant-card-shadow)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: '#2563EB',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}
                >
                  Flagship Feature
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>SIMULATED PROFILES</span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Shopper Directory & Predictive LTV
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.6875rem', color: '#64748B', textTransform: 'uppercase' }}>Avg Predicted LTV</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A' }}>£471.60</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.6875rem', color: '#64748B', textTransform: 'uppercase' }}>Repeat Retention</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#059669' }}>42.6%</div>
              </div>
            </div>
          </div>

          {/* Customer Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {customerProfiles.map((cust) => (
              <div
                key={cust.id}
                onClick={() => {
                  setSelectedCustomer(cust);
                  setOutreachSent(false);
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--merchant-card-border)',
                  boxShadow: 'var(--merchant-card-shadow)',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--store-accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--merchant-card-border)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--store-accent-primary)',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {cust.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>{cust.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>{cust.email}</div>
                    </div>
                  </div>

                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      backgroundColor:
                        cust.segment === 'VIP Champion'
                          ? '#ECFDF5'
                          : cust.segment === 'At-Risk Repeat Buyer'
                          ? '#FEF2F2'
                          : '#EFF6FF',
                      color:
                        cust.segment === 'VIP Champion'
                          ? '#065F46'
                          : cust.segment === 'At-Risk Repeat Buyer'
                          ? '#991B1B'
                          : '#1E40AF'
                    }}
                  >
                    {cust.segment}
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', backgroundColor: '#F8FAFC', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B', textTransform: 'uppercase' }}>Historical Spend</div>
                    <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#0F172A' }}>£{cust.totalSpent.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B', textTransform: 'uppercase' }}>Predicted LTV</div>
                    <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--store-accent-primary)' }}>£{cust.predictedLtv.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B', textTransform: 'uppercase' }}>Orders Count</div>
                    <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0F172A' }}>{cust.ordersCount} orders</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B', textTransform: 'uppercase' }}>Churn Risk Score</div>
                    <div style={{ fontWeight: 800, fontSize: '0.875rem', color: cust.churnRiskPct > 50 ? '#DC2626' : '#059669' }}>
                      {cust.churnRiskPct}% Risk
                    </div>
                  </div>
                </div>

                {/* Affinity & Action */}
                <div style={{ fontSize: '0.8125rem', color: '#475569', marginBottom: '14px' }}>
                  <div><strong>Style Affinity:</strong> {cust.preferredStyle} ({cust.preferredSize})</div>
                  <div style={{ marginTop: '4px', color: '#64748B' }}><strong>Last Active:</strong> {cust.lastPurchaseDate}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '12px', fontSize: '0.75rem', color: 'var(--store-accent-primary)', fontWeight: 700 }}>
                  <span>Inspect Customer 360 AI</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>

          {/* Customer 360 Slide-Over Drawer */}
          {selectedCustomer && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 100,
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: '560px',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  boxShadow: 'var(--shadow-modal)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'auto'
                }}
              >
                {/* Drawer Header */}
                <div
                  style={{
                    padding: '24px',
                    backgroundColor: '#160B22',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #2D1445'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--store-accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.125rem'
                      }}
                    >
                      {selectedCustomer.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.125rem' }}>{selectedCustomer.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#D6D0E0' }}>{selectedCustomer.email} • {selectedCustomer.city}, UK</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCustomer(null)}
                    style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '6px' }}
                    aria-label="Close Drawer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Drawer Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
                  {/* Predictive Summary Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.6875rem', color: '#64748B', textTransform: 'uppercase' }}>Lifetime Value</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>£{selectedCustomer.totalSpent.toFixed(2)}</div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.6875rem', color: '#64748B', textTransform: 'uppercase' }}>Predicted LTV</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--store-accent-primary)', marginTop: '2px' }}>£{selectedCustomer.predictedLtv.toFixed(2)}</div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.6875rem', color: '#64748B', textTransform: 'uppercase' }}>Churn Risk</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: selectedCustomer.churnRiskPct > 50 ? '#DC2626' : '#059669', marginTop: '2px' }}>
                        {selectedCustomer.churnRiskPct}%
                      </div>
                    </div>
                  </div>

                  {/* Consented Browsing Signals */}
                  <div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={16} style={{ color: 'var(--store-accent-primary)' }} />
                      <span>Recent Browsing & Intent Signals</span>
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedCustomer.browsingSignals.map((sig, i) => (
                        <div key={i} style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: '#334155', border: '1px solid #E2E8F0' }}>
                          • {sig}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order History */}
                  <div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShoppingBag size={16} style={{ color: 'var(--store-accent-primary)' }} />
                      <span>Completed Purchase History</span>
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedCustomer.orderHistory.map((ord) => (
                        <div key={ord.orderId} style={{ padding: '12px 14px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{ord.items}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{ord.orderId} • {ord.date}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0F172A' }}>£{ord.total.toFixed(2)}</div>
                            <span style={{ fontSize: '0.6875rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>{ord.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Next Best Action Recommendation */}
                  <div style={{ backgroundColor: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Sparkles size={16} style={{ color: 'var(--store-accent-primary)' }} />
                      <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#4C1D95' }}>AI Next Best Action Recommendation</div>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#4C1D95', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                      {selectedCustomer.recommendedAction}
                    </p>

                    <button
                      onClick={() => {
                        setOutreachSent(true);
                      }}
                      className="btn btn-primary"
                      style={{ height: '36px', fontSize: '0.75rem', width: '100%' }}
                    >
                      {outreachSent ? <CheckCircle2 size={14} /> : <Send size={14} />}
                      <span>{outreachSent ? 'Concierge Outreach Dispatched (Simulated)' : 'Trigger Concierge Outreach'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
