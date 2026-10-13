'use client';

import React from 'react';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { useStore } from '@/context/StoreContext';
import { Package, Plus } from 'lucide-react';
import Link from 'next/link';

export default function MerchantProductsPage() {
  const { products } = useStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--merchant-workspace-bg)' }}>
      <MerchantSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MerchantHeader
          title="Products & Catalogue Administration"
          subtitle="Manage apparel listings, pricing tiers, and garment attributes"
        />
        <main id="main-content" style={{ padding: '32px', flex: 1 }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--merchant-card-border)', boxShadow: 'var(--merchant-card-shadow)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Active Product Catalogue ({products.length})</h2>
              <button className="btn btn-primary" style={{ height: '38px', fontSize: '0.8125rem' }}>
                <Plus size={15} />
                <span>Add New Garment</span>
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid var(--merchant-card-border)', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 16px' }}>Product</th>
                    <th style={{ padding: '12px 16px' }}>Category</th>
                    <th style={{ padding: '12px 16px' }}>Retail Price</th>
                    <th style={{ padding: '12px 16px' }}>Colours</th>
                    <th style={{ padding: '12px 16px' }}>Sizes Available</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--merchant-card-border)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={p.colorways[0].previewImage} alt={p.title} style={{ width: '40px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
                          <div>
                            <div>{p.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', textTransform: 'capitalize' }}>{p.category}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 700 }}>£{p.price.toFixed(2)}</td>
                      <td style={{ padding: '14px 16px' }}>{p.colorways.map((c) => c.name).join(', ')}</td>
                      <td style={{ padding: '14px 16px' }}>{p.availableSizes.join(', ')}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <Link href={`/product/${p.id}`} className="btn btn-secondary" style={{ height: '30px', fontSize: '0.75rem', padding: '0 10px' }}>
                          View Storefront
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
