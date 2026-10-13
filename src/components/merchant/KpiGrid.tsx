'use client';

import React from 'react';
import { ArrowUpRight, TrendingUp, ShoppingBag, Layers, AlertTriangle, RotateCcw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function KpiGrid() {
  const { orders, products } = useStore();

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const lowStockCount = products
    .flatMap((p) => p.variants)
    .filter((v) => v.stock > 0 && v.stock <= v.lowStockThreshold).length;

  const totalSalesToday = orders.reduce((sum, o) => sum + o.total, 1842.5);
  const totalOrdersCount = orders.length + 22; // includes archived day orders
  const aov = totalSalesToday / totalOrdersCount;

  const kpis = [
    {
      label: 'SALES TODAY',
      value: `£${totalSalesToday.toFixed(2)}`,
      delta: '+12.4% vs last Tuesday',
      isPositive: true,
      icon: TrendingUp
    },
    {
      label: 'ORDERS TODAY',
      value: `${totalOrdersCount}`,
      delta: `${orders.length} real-time active`,
      isPositive: true,
      icon: ShoppingBag
    },
    {
      label: 'AVERAGE ORDER VALUE',
      value: `£${aov.toFixed(2)}`,
      delta: '+£4.20 vs weekly avg',
      isPositive: true,
      icon: ArrowUpRight
    },
    {
      label: 'PENDING FULFILLMENT',
      value: `${pendingCount} orders`,
      delta: 'Action needed by 2 PM',
      isAlert: pendingCount > 0,
      icon: AlertTriangle
    },
    {
      label: 'LOW-STOCK VARIANTS',
      value: `${lowStockCount} items`,
      delta: 'Below safety threshold',
      isAlert: lowStockCount > 0,
      icon: Layers
    },
    {
      label: 'SIMULATED RETURN RATE',
      value: '1.8%',
      delta: 'Healthy benchmark (< 4%)',
      isPositive: true,
      icon: RotateCcw
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}
    >
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              border: '1px solid var(--merchant-card-border)',
              boxShadow: 'var(--merchant-card-shadow)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--store-text-muted)' }}>
                {kpi.label}
              </span>
              <div
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  backgroundColor: kpi.isAlert ? '#FEF2F2' : '#F8FAFC',
                  color: kpi.isAlert ? '#DC2626' : 'var(--store-accent-primary)'
                }}
              >
                <Icon size={16} />
              </div>
            </div>

            <div
              style={{
                fontSize: '1.625rem',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                marginBottom: '6px',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {kpi.value}
            </div>

            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: kpi.isAlert ? '#DC2626' : kpi.isPositive ? '#059669' : 'var(--store-text-muted)'
              }}
            >
              {kpi.delta}
            </div>
          </div>
        );
      })}
    </div>
  );
}
