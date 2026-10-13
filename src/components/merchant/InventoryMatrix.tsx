'use client';

import React, { useState } from 'react';
import { Layers, AlertTriangle, Check, RefreshCw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Size } from '@/types';

export function InventoryMatrix() {
  const { products, updateVariantStock } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const sizesHeader: Size[] = ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'];

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockChange = (variantId: string, currentStock: number, delta: number) => {
    const nextStock = Math.max(0, currentStock + delta);
    updateVariantStock(variantId, nextStock);
    setToastMessage(`Updated stock for ${variantId}: ${nextStock} units`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <section style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--merchant-card-border)', boxShadow: 'var(--merchant-card-shadow)', padding: '24px' }}>
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#18181B',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: 1000,
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Check size={16} style={{ color: '#10B981' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
            Variant-Level Stock Matrix
          </h2>
          <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>
            Granular SKU counts synchronized live across storefront selection buttons
          </div>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by product name..."
          style={{
            height: '38px',
            padding: '0 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--merchant-card-border)',
            fontSize: '0.8125rem',
            width: '240px'
          }}
        />
      </div>

      {/* Matrix Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid var(--merchant-card-border)', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px' }}>Garment & Colourway</th>
              {sizesHeader.map((sz) => (
                <th key={sz} style={{ padding: '12px 16px', textAlign: 'center' }}>
                  {sz}
                </th>
              ))}
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Total Units</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              return product.colorways.map((cw) => {
                const colorVariants = product.variants.filter(
                  (v) => v.color.toLowerCase() === cw.name.toLowerCase()
                );
                const totalStock = colorVariants.reduce((sum, v) => sum + v.stock, 0);

                return (
                  <tr
                    key={`${product.id}-${cw.name}`}
                    style={{ borderBottom: '1px solid var(--merchant-card-border)' }}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: cw.hex,
                            border: '1px solid #CBD5E1',
                            flexShrink: 0
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: '#0F172A' }}>{product.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>
                            {cw.name} • £{product.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {sizesHeader.map((sz) => {
                      const variant = colorVariants.find((v) => v.size === sz);
                      if (!variant) {
                        return (
                          <td key={sz} style={{ textAlign: 'center', color: '#CBD5E1', fontSize: '0.75rem' }}>
                            —
                          </td>
                        );
                      }

                      const isOut = variant.stock === 0;
                      const isLow = variant.stock > 0 && variant.stock <= variant.lowStockThreshold;

                      return (
                        <td key={sz} style={{ textAlign: 'center', padding: '10px 8px' }}>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              padding: '4px 8px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: isOut ? '#FEE2E2' : isLow ? '#FEF3C7' : '#F1F5F9',
                              border: isOut ? '1px solid #FECACA' : isLow ? '1px solid #FDE68A' : '1px solid transparent'
                            }}
                          >
                            <button
                              onClick={() => handleStockChange(variant.id, variant.stock, -1)}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '0.8125rem', color: '#64748B' }}
                              title="Decrease stock"
                            >
                              -
                            </button>

                            <span
                              style={{
                                fontWeight: 800,
                                fontSize: '0.8125rem',
                                color: isOut ? '#DC2626' : isLow ? '#D97706' : '#0F172A',
                                minWidth: '20px',
                                display: 'inline-block'
                              }}
                            >
                              {variant.stock}
                            </span>

                            <button
                              onClick={() => handleStockChange(variant.id, variant.stock, 1)}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '0.8125rem', color: '#64748B' }}
                              title="Increase stock"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      );
                    })}

                    <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 800, color: '#0F172A' }}>
                      {totalStock} units
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
