'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Star, ShoppingBag, Check } from 'lucide-react';
import { Product, Size } from '@/types';
import { useStore } from '@/context/StoreContext';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
}

export function ProductGrid({
  products,
  title = 'New Arrivals & Curated Bestsellers',
  subtitle = 'Exquisite tailoring and luxurious textiles crafted for enduring elegance'
}: ProductGridProps) {
  const { addToCart } = useStore();
  const [selectedColorByProduct, setSelectedColorByProduct] = useState<Record<string, string>>({});
  const [selectedSizeByProduct, setSelectedSizeByProduct] = useState<Record<string, Size>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectColor = (productId: string, colorName: string) => {
    setSelectedColorByProduct((prev) => ({ ...prev, [productId]: colorName }));
  };

  const handleSelectSize = (productId: string, size: Size) => {
    setSelectedSizeByProduct((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuickAdd = (product: Product) => {
    const color = selectedColorByProduct[product.id] || product.colorways[0].name;
    const size = selectedSizeByProduct[product.id] || product.availableSizes[0];

    const result = addToCart(product.id, color, size, 1);
    if (result.success) {
      setToastMessage(`Added ${product.title} (${size}, ${color}) to your bag`);
      setTimeout(() => setToastMessage(null), 3500);
    } else {
      setToastMessage(result.error || 'Failed to add item');
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <section style={{ padding: '64px 0', borderBottom: '1px solid var(--store-border)' }}>
      <div className="container">
        {/* Toast Alert */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              top: '84px',
              right: '24px',
              backgroundColor: '#18181B',
              color: '#FFFFFF',
              padding: '12px 20px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 1000,
              fontSize: '0.875rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Check size={16} style={{ color: '#10B981' }} />
            <span>{toastMessage}</span>
          </div>
        )}

        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--store-accent-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Featured Garments
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '6px' }}>
            {title}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--store-text-muted)' }}>
            {subtitle}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px'
          }}
        >
          {products.map((product) => {
            const activeColorName = selectedColorByProduct[product.id] || product.colorways[0].name;
            const activeColorway =
              product.colorways.find((c) => c.name.toLowerCase() === activeColorName.toLowerCase()) ||
              product.colorways[0];
            const activeSize = selectedSizeByProduct[product.id] || product.availableSizes[0];

            // Check variant stock
            const variant = product.variants.find(
              (v) => v.color.toLowerCase() === activeColorName.toLowerCase() && v.size === activeSize
            );
            const isOutOfStock = variant ? variant.stock <= 0 : false;
            const isLowStock = variant ? variant.stock > 0 && variant.stock <= 3 : false;

            return (
              <article
                key={product.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--store-border)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 200ms ease, box-shadow 200ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                {/* Product Image Link */}
                <Link
                  href={`/product/${product.id}`}
                  style={{
                    position: 'relative',
                    aspectRatio: '3 / 4',
                    overflow: 'hidden',
                    display: 'block',
                    backgroundColor: '#F4F4F5'
                  }}
                >
                  <img
                    src={activeColorway.previewImage}
                    alt={`${product.title} in ${activeColorway.name}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 400ms ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                  />

                  {/* Stock Pill Badge */}
                  {isOutOfStock ? (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#DC2626',
                        color: '#FFFFFF',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      Sold Out
                    </span>
                  ) : isLowStock ? (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#D97706',
                        color: '#FFFFFF',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      Only {variant?.stock} Left
                    </span>
                  ) : (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#059669',
                        color: '#FFFFFF',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      In Stock
                    </span>
                  )}
                </Link>

                {/* Product Info Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Reviews & Category */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {product.category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      <Star size={12} fill="#F59E0B" color="#F59E0B" />
                      <span>{product.rating}</span>
                      <span style={{ color: 'var(--store-text-muted)' }}>({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title & Price */}
                  <Link
                    href={`/product/${product.id}`}
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      color: 'var(--store-text-primary)',
                      textDecoration: 'none',
                      marginBottom: '6px',
                      lineHeight: 1.3
                    }}
                  >
                    {product.title}
                  </Link>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--store-text-primary)' }}>
                      £{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span style={{ fontSize: '0.875rem', color: 'var(--store-text-muted)', textDecoration: 'line-through' }}>
                        £{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Colour Swatches with explicit text names */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--store-text-muted)', fontWeight: 600, marginBottom: '6px' }}>
                      Colour: <strong style={{ color: 'var(--store-text-primary)' }}>{activeColorName}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {product.colorways.map((c) => {
                        const isSelected = c.name.toLowerCase() === activeColorName.toLowerCase();
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => handleSelectColor(product.id, c.name)}
                            className={`swatch-circle ${isSelected ? 'selected' : ''}`}
                            style={{
                              backgroundColor: c.hex,
                              width: '28px',
                              height: '28px',
                              minWidth: '28px',
                              minHeight: '28px'
                            }}
                            aria-label={`Select colour ${c.name} for ${product.title}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Visible Size Pills */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--store-text-muted)', fontWeight: 600, marginBottom: '6px' }}>
                      Size: <strong style={{ color: 'var(--store-text-primary)' }}>{activeSize}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {product.availableSizes.map((sz) => {
                        const isSelected = sz === activeSize;
                        const vObj = product.variants.find(
                          (v) => v.color.toLowerCase() === activeColorName.toLowerCase() && v.size === sz
                        );
                        const isSoldOut = vObj ? vObj.stock <= 0 : false;

                        return (
                          <button
                            key={sz}
                            type="button"
                            disabled={isSoldOut}
                            onClick={() => handleSelectSize(product.id, sz)}
                            className={`size-pill ${isSelected ? 'selected' : ''} ${isSoldOut ? 'disabled-cross' : ''}`}
                            style={{
                              padding: '2px 8px',
                              fontSize: '0.75rem',
                              minWidth: '40px',
                              height: '32px'
                            }}
                            title={isSoldOut ? `${sz} Sold Out in this colour` : `Select size ${sz}`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                    <Link
                      href={`/product/${product.id}`}
                      className="btn btn-secondary"
                      style={{ flex: 1, fontSize: '0.8125rem', padding: '0 12px' }}
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(product)}
                      disabled={isOutOfStock}
                      className="btn btn-primary"
                      style={{
                        padding: '0 14px',
                        backgroundColor: isOutOfStock ? '#A1A1AA' : 'var(--store-accent-primary)',
                        borderColor: isOutOfStock ? '#A1A1AA' : 'var(--store-accent-primary)'
                      }}
                      title={isOutOfStock ? 'Sold out in this selection' : 'Add to Bag'}
                    >
                      <ShoppingBag size={15} />
                      <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
