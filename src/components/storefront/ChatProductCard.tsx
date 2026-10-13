'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { Product, Size } from '@/types';
import { useStore } from '@/context/StoreContext';

interface ChatProductCardProps {
  product: Product;
}

export function ChatProductCard({ product }: ChatProductCardProps) {
  const { addToCart, setIsAssistantOpen } = useStore();
  const [selectedColor, setSelectedColor] = useState<string>(product.colorways[0].name);
  const activeColorway =
    product.colorways.find((c) => c.name.toLowerCase() === selectedColor.toLowerCase()) || product.colorways[0];
  const [selectedSize, setSelectedSize] = useState<Size>(product.availableSizes[0]);
  const [isAdded, setIsAdded] = useState(false);

  // Check variant stock
  const currentVariant = product.variants.find(
    (v) => v.color.toLowerCase() === selectedColor.toLowerCase() && v.size === selectedSize
  );
  const isOutOfStock = currentVariant ? currentVariant.stock <= 0 : false;

  const handleAdd = () => {
    if (isOutOfStock) return;
    const res = addToCart(product.id, selectedColor, selectedSize, 1);
    if (res.success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--store-border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        width: '260px',
        flexShrink: 0
      }}
    >
      {/* Garment Image */}
      <div style={{ position: 'relative', aspectRatio: '4 / 5', backgroundColor: '#F4F4F5' }}>
        <img
          src={activeColorway.previewImage}
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <span
            style={{
              backgroundColor: isOutOfStock ? '#DC2626' : '#059669',
              color: '#FFFFFF',
              fontSize: '0.625rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '4px'
            }}
          >
            {isOutOfStock ? 'Sold Out' : 'In Stock'}
          </span>
        </div>
      </div>

      {/* Info Body */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '2px', lineHeight: 1.3 }}>
          {product.title}
        </div>
        <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--store-accent-primary)', marginBottom: '8px' }}>
          £{product.price.toFixed(2)}
        </div>

        {/* Color Dots */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px' }}>
          {product.colorways.map((cw) => {
            const isSelected = cw.name.toLowerCase() === selectedColor.toLowerCase();
            return (
              <button
                key={cw.name}
                type="button"
                onClick={() => setSelectedColor(cw.name)}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: cw.hex,
                  border: isSelected ? '2px solid var(--store-accent-primary)' : '1px solid #D4D4D8',
                  padding: 0,
                  cursor: 'pointer'
                }}
                aria-label={cw.name}
                title={cw.name}
              />
            );
          })}
          <span style={{ fontSize: '0.6875rem', color: 'var(--store-text-muted)' }}>{selectedColor}</span>
        </div>

        {/* Size Pills */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {product.availableSizes.map((sz) => {
            const isSelected = sz === selectedSize;
            const vObj = product.variants.find(
              (v) => v.color.toLowerCase() === selectedColor.toLowerCase() && v.size === sz
            );
            const isSold = vObj ? vObj.stock <= 0 : false;

            return (
              <button
                key={sz}
                type="button"
                disabled={isSold}
                onClick={() => setSelectedSize(sz)}
                style={{
                  padding: '1px 6px',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: isSelected ? '1px solid var(--store-accent-primary)' : '1px solid #E4E4E7',
                  backgroundColor: isSelected ? 'var(--store-accent-subtle)' : isSold ? '#F4F4F5' : '#FFFFFF',
                  color: isSelected ? 'var(--store-accent-primary)' : isSold ? '#A1A1AA' : '#18181B',
                  cursor: isSold ? 'not-allowed' : 'pointer'
                }}
              >
                {sz}
              </button>
            );
          })}
        </div>

        {/* In-Chat Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '6px' }}>
          <Link
            href={`/product/${product.id}`}
            onClick={() => setIsAssistantOpen(false)}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '6px 0',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--store-text-primary)',
              backgroundColor: '#F4F4F5',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none'
            }}
          >
            Details
          </Link>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isOutOfStock}
            style={{
              flex: 1.2,
              padding: '6px 0',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#FFFFFF',
              backgroundColor: isAdded ? '#059669' : isOutOfStock ? '#A1A1AA' : 'var(--store-accent-primary)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              cursor: isOutOfStock ? 'not-allowed' : 'pointer'
            }}
          >
            {isAdded ? <Check size={12} /> : <ShoppingBag size={12} />}
            <span>{isAdded ? 'Added' : isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
