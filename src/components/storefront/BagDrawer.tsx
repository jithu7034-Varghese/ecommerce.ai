'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Clock, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function BagDrawer() {
  const {
    cart,
    isBagOpen,
    setIsBagOpen,
    updateCartQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    holdSecondsRemaining
  } = useStore();

  if (!isBagOpen) return null;

  const minutes = Math.floor(holdSecondsRemaining / 60);
  const seconds = holdSecondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      className="drawer-backdrop"
      onClick={() => setIsBagOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-heading"
    >
      <div
        className="drawer-panel"
        style={{
          maxWidth: '480px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--store-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} style={{ color: 'var(--store-accent-primary)' }} />
            <h2 id="bag-drawer-heading" style={{ fontSize: '1.125rem', fontWeight: 800 }}>
              Shopping Bag ({cartCount})
            </h2>
          </div>
          <button
            onClick={() => setIsBagOpen(false)}
            style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', color: 'var(--store-text-muted)' }}
            aria-label="Close Shopping Bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stock Hold Reservation Timer Banner */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '10px 20px',
              backgroundColor: '#FEF3C7',
              borderBottom: '1px solid #FDE68A',
              color: '#92400E',
              fontSize: '0.8125rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Clock size={16} />
            <span>
              Temporary Stock Hold: Items reserved for <strong>{formattedTime}</strong>
            </span>
          </div>
        )}

        {/* Bag Items List or Empty State */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#F4F4F5',
                  color: 'var(--store-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '8px' }}>
                Your shopping bag is empty
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--store-text-muted)', marginBottom: '24px' }}>
                Explore our curated atelier pieces or ask our AI stylist for personalized recommendations.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsBagOpen(false)}
                className="btn btn-primary"
                style={{ borderRadius: 'var(--radius-full)', padding: '0 24px' }}
              >
                Explore New Arrivals
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid var(--store-border)'
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: '76px',
                      height: '96px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      backgroundColor: '#F4F4F5',
                      flexShrink: 0
                    }}
                  >
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '4px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)', marginBottom: '8px' }}>
                      Colour: <strong>{item.color}</strong> • Size: <strong>{item.size}</strong>
                    </div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--store-text-primary)', marginBottom: 'auto' }}>
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--store-border)', borderRadius: 'var(--radius-sm)' }}>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, -1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 700
                          }}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span style={{ padding: '0 8px', fontSize: '0.8125rem', fontWeight: 700 }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 700
                          }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#DC2626',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        <Trash2 size={13} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              backgroundColor: '#F8FAFC',
              borderTop: '1px solid var(--store-border)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--store-text-muted)' }}>Subtotal</span>
              <span style={{ fontWeight: 700 }}>£{cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '14px' }}>
              <span style={{ color: 'var(--store-text-muted)' }}>Estimated UK Shipping</span>
              <span style={{ fontWeight: 700, color: '#059669' }}>FREE</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.125rem',
                fontWeight: 800,
                borderTop: '1px solid var(--store-border)',
                paddingTop: '12px',
                marginBottom: '18px'
              }}
            >
              <span>Total</span>
              <span style={{ color: 'var(--store-accent-primary)' }}>£{cartTotal.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsBagOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', height: '50px', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
            >
              <span>Proceed to Guest Checkout</span>
              <ArrowRight size={18} />
            </Link>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--store-text-muted)', marginTop: '10px' }}>
              Simulated Guest Checkout • No Account or Password Required
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
