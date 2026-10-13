'use client';

import React, { useState } from 'react';
import { Package, Truck, Check, Eye, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order, OrderStatus } from '@/types';

export function OrderManagement() {
  const { orders, updateOrderStatus } = useStore();
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [inspectOrder, setInspectOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredOrders = filterStatus === 'all' ? orders : orders.filter((o) => o.status === filterStatus);

  const handlePack = (orderId: string) => {
    updateOrderStatus(orderId, 'packed');
    setToastMessage(`Order ${orderId} marked as Packed & ready for courier`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDispatch = (orderId: string) => {
    const tracking = `GB-ROYAL-${Math.floor(10000 + Math.random() * 90000)}`;
    updateOrderStatus(orderId, 'dispatched', tracking);
    setToastMessage(`Order ${orderId} marked as Dispatched (Tracking: ${tracking})`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--merchant-card-border)', boxShadow: 'var(--merchant-card-shadow)', padding: '24px' }}>
      {/* Toast Alert */}
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

      {/* Header & Status Filter Pills */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
            Customer Orders & Fulfillment Queue
          </h2>
          <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>
            Real-time order intake and fulfillment dispatch stream
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {(['all', 'pending', 'packed', 'dispatched'] as const).map((st) => {
            const count = st === 'all' ? orders.length : orders.filter((o) => o.status === st).length;
            const isSelected = filterStatus === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '1px solid var(--store-accent-primary)' : '1px solid var(--merchant-card-border)',
                  backgroundColor: isSelected ? 'var(--merchant-sidebar-active-bg)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--store-text-secondary)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid var(--merchant-card-border)', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px' }}>Order ID</th>
              <th style={{ padding: '12px 16px' }}>Customer</th>
              <th style={{ padding: '12px 16px' }}>Items</th>
              <th style={{ padding: '12px 16px' }}>Total</th>
              <th style={{ padding: '12px 16px' }}>Delivery</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: 'var(--store-text-muted)' }}>
                  No orders found matching status &quot;{filterStatus}&quot;.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const totalUnits = order.items.reduce((s, i) => s + i.quantity, 0);

                let badgeColor = '#D97706';
                let badgeBg = '#FEF3C7';
                if (order.status === 'packed') {
                  badgeColor = '#2563EB';
                  badgeBg = '#DBEAFE';
                } else if (order.status === 'dispatched') {
                  badgeColor = '#059669';
                  badgeBg = '#D1FAE5';
                }

                return (
                  <tr
                    key={order.id}
                    style={{ borderBottom: '1px solid var(--merchant-card-border)', transition: 'background-color 120ms ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                      {order.id}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#1E293B' }}>{order.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>{order.email}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontWeight: 600 }}>{totalUnits} {totalUnits === 1 ? 'item' : 'items'}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {order.items.map((i) => i.title).join(', ')}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0F172A' }}>
                      £{order.total.toFixed(2)}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.8125rem' }}>
                      <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{order.deliveryMethod}</span>
                      {order.trackingNumber && (
                        <div style={{ fontSize: '0.6875rem', color: 'var(--store-text-muted)', fontFamily: 'monospace' }}>
                          {order.trackingNumber}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          backgroundColor: badgeBg,
                          color: badgeColor,
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'capitalize'
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setInspectOrder(order)}
                          className="btn btn-secondary"
                          style={{ height: '32px', padding: '0 10px', fontSize: '0.75rem' }}
                          title="Inspect Order Details"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>

                        {order.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => handlePack(order.id)}
                            className="btn btn-primary"
                            style={{ height: '32px', padding: '0 10px', fontSize: '0.75rem', backgroundColor: '#D97706', borderColor: '#D97706' }}
                          >
                            <Package size={13} />
                            <span>Pack</span>
                          </button>
                        )}

                        {order.status === 'packed' && (
                          <button
                            type="button"
                            onClick={() => handleDispatch(order.id)}
                            className="btn btn-primary"
                            style={{ height: '32px', padding: '0 10px', fontSize: '0.75rem', backgroundColor: '#059669', borderColor: '#059669' }}
                          >
                            <Truck size={13} />
                            <span>Dispatch</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Inspect Order Modal Drawer */}
      {inspectOrder && (
        <div className="drawer-backdrop" onClick={() => setInspectOrder(null)} role="dialog" aria-modal="true">
          <div className="drawer-panel" style={{ padding: '28px', maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Order {inspectOrder.id}</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>Created {new Date(inspectOrder.createdAt).toLocaleString()}</div>
              </div>
              <button onClick={() => setInspectOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '20px', padding: '14px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)' }}>
              <strong style={{ fontSize: '0.8125rem' }}>Shipping Address:</strong>
              <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                {inspectOrder.customerName}<br />
                {inspectOrder.shippingAddress.street}<br />
                {inspectOrder.shippingAddress.city}, {inspectOrder.shippingAddress.postcode}
              </div>
            </div>

            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '12px' }}>Line Items:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', flex: 1, overflowY: 'auto' }}>
              {inspectOrder.items.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.title} style={{ width: '48px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>Size {item.size} • {item.color}</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700 }}>{item.quantity} × £{item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--merchant-card-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 800 }}>
              <span>Total Paid:</span>
              <span style={{ color: 'var(--store-accent-primary)' }}>£{inspectOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
