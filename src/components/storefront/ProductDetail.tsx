'use client';

import React, { useState } from 'react';
import { Star, Truck, RotateCcw, ShieldCheck, Sparkles, ShoppingBag, Ruler, Check, AlertCircle, ChevronDown } from 'lucide-react';
import { Product, Size } from '@/types';
import { useStore } from '@/context/StoreContext';
import { SizeGuideDrawer } from './SizeGuideDrawer';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart, setIsAssistantOpen, sendMessage } = useStore();

  // State for active variant
  const [selectedColorName, setSelectedColorName] = useState<string>(product.colorways[0].name);
  const activeColorway =
    product.colorways.find((c) => c.name.toLowerCase() === selectedColorName.toLowerCase()) || product.colorways[0];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<Size>(product.availableSizes[0]);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [outOfStockNote, setOutOfStockNote] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');

  // Find exact active variant
  const currentVariant = product.variants.find(
    (v) => v.color.toLowerCase() === selectedColorName.toLowerCase() && v.size === selectedSize
  );

  const isCurrentOutOfStock = currentVariant ? currentVariant.stock <= 0 : false;
  const isCurrentLowStock = currentVariant ? currentVariant.stock > 0 && currentVariant.stock <= 3 : false;

  const handleColorChange = (colorName: string) => {
    setSelectedColorName(colorName);
    setActiveImageIndex(0);
    setOutOfStockNote(null);
  };

  const handleSizeClick = (sz: Size, isSoldOut: boolean) => {
    setSelectedSize(sz);
    if (isSoldOut) {
      setOutOfStockNote(
        `Size ${sz} in ${selectedColorName} is currently out of stock. Consider size ${
          sz === 'UK 10' ? 'UK 12' : 'an adjacent size'
        } or ask our AI stylist for alternative in-stock styles.`
      );
    } else {
      setOutOfStockNote(null);
    }
  };

  const handleAddToCart = () => {
    if (isCurrentOutOfStock) return;
    const res = addToCart(product.id, selectedColorName, selectedSize, 1);
    if (res.success) {
      setSuccessToast(`Added ${product.title} (${selectedSize}, ${selectedColorName}) to your bag!`);
      setTimeout(() => setSuccessToast(null), 3500);
    } else {
      setOutOfStockNote(res.error || 'Variant unavailable');
    }
  };

  const handleAskAIAboutProduct = () => {
    setIsAssistantOpen(true);
    sendMessage(`Tell me about the fit and fabric of the ${product.title} in size ${selectedSize}.`);
  };

  return (
    <div style={{ padding: '40px 0 80px', backgroundColor: '#FFFFFF' }}>
      <SizeGuideDrawer isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      {/* Floating Success Toast */}
      {successToast && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            right: '24px',
            backgroundColor: '#18181B',
            color: '#FFFFFF',
            padding: '14px 24px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: 1000,
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Check size={18} style={{ color: '#10B981' }} />
          <span>{successToast}</span>
        </div>
      )}

      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)', marginBottom: '24px' }}>
          <span>Home</span> &gt; <span>Shop</span> &gt; <span style={{ textTransform: 'capitalize' }}>{product.category}</span> &gt;{' '}
          <strong style={{ color: 'var(--store-text-primary)' }}>{product.title}</strong>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'flex-start' }}>
          {/* LEFT: Multi-Angle Image Gallery */}
          <div>
            {/* Main Stage Image */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '3 / 4',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                backgroundColor: '#F4F4F5',
                marginBottom: '16px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <img
                src={activeColorway.galleryImages[activeImageIndex] || activeColorway.previewImage}
                alt={`${product.title} in ${selectedColorName} - Angle ${activeImageIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {/* Badge */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                {product.newArrival && (
                  <span style={{ backgroundColor: '#18181B', color: '#FFFFFF', fontSize: '0.6875rem', fontWeight: 700, padding: '4px 10px', borderRadius: '4px' }}>
                    New Season
                  </span>
                )}
                <span
                  style={{
                    backgroundColor: isCurrentOutOfStock ? '#DC2626' : isCurrentLowStock ? '#D97706' : '#059669',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '4px'
                  }}
                >
                  {isCurrentOutOfStock ? 'Sold Out' : isCurrentLowStock ? `Only ${currentVariant?.stock} Left` : 'In Stock'}
                </span>
              </div>
            </div>

            {/* Thumbnail Controls */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {activeColorway.galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '72px',
                    height: '96px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid var(--store-accent-primary)' : '1px solid var(--store-border)',
                    padding: 0,
                    cursor: 'pointer',
                    opacity: activeImageIndex === idx ? 1 : 0.7,
                    transition: 'opacity 150ms ease, border-color 150ms ease',
                    flexShrink: 0
                  }}
                  aria-label={`View photo angle ${idx + 1}`}
                >
                  <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Buy Box & Specifications */}
          <div>
            {/* Rating & Reviews */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700 }}>{product.rating}</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Title & Subtitle */}
            <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px', lineHeight: 1.2 }}>
              {product.title}
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--store-text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
              {product.subtitle}
            </p>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '28px', borderBottom: '1px solid var(--store-border)', paddingBottom: '20px' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--store-text-primary)' }}>
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.125rem', color: 'var(--store-text-muted)', textDecoration: 'line-through' }}>
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
              <span style={{ fontSize: '0.75rem', color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                Includes UK VAT
              </span>
            </div>

            {/* COLOUR SELECTION UX (Master Amendment Section 8) */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                  Colour: <span style={{ fontWeight: 500, color: 'var(--store-text-secondary)' }}>{selectedColorName}</span>
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {product.colorways.map((cw) => {
                  const isSelected = cw.name.toLowerCase() === selectedColorName.toLowerCase();
                  return (
                    <button
                      key={cw.name}
                      type="button"
                      onClick={() => handleColorChange(cw.name)}
                      className={`swatch-circle ${isSelected ? 'selected' : ''}`}
                      style={{ backgroundColor: cw.hex }}
                      aria-label={`Select colour ${cw.name} ${isSelected ? '(Selected)' : ''}`}
                      title={cw.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* SIZE SELECTION UX (Master Amendment Section 7) */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                  Select Size (UK Standards):
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--store-accent-primary)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    textDecoration: 'underline'
                  }}
                >
                  <Ruler size={14} />
                  <span>Size & Fit Guide</span>
                </button>
              </div>

              {/* Visible Size Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.availableSizes.map((sz) => {
                  const isSelected = sz === selectedSize;
                  const vObj = product.variants.find(
                    (v) => v.color.toLowerCase() === selectedColorName.toLowerCase() && v.size === sz
                  );
                  const isSoldOut = vObj ? vObj.stock <= 0 : false;

                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => handleSizeClick(sz, isSoldOut)}
                      className={`size-pill ${isSelected ? 'selected' : ''} ${isSoldOut ? 'disabled-cross' : ''}`}
                      aria-label={`Size ${sz} ${isSoldOut ? '(Sold Out)' : ''}`}
                      style={{ minWidth: '58px', height: '44px' }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              {/* Out-of-Stock Contextual Note & Alternatives (Test C) */}
              {outOfStockNote && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#FEF2F2',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #FECACA',
                    color: '#991B1B',
                    fontSize: '0.8125rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: '2px' }}>Size Unavailable in this Colour</div>
                    <div>{outOfStockNote}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Estimate Box */}
            <div
              style={{
                padding: '14px 18px',
                backgroundColor: '#F8FAFC',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--store-border)',
                marginBottom: '28px',
                fontSize: '0.8125rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--store-text-primary)' }}>
                <Truck size={16} style={{ color: 'var(--store-accent-primary)' }} />
                <span>
                  <strong>Free Standard Delivery:</strong> Estimated arrival by{' '}
                  <span style={{ textDecoration: 'underline' }}>Thursday, Oct 16</span>.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--store-text-muted)' }}>
                <RotateCcw size={16} style={{ color: 'var(--store-accent-primary)' }} />
                <span>Complimentary 30-day UK returns. Return label in package.</span>
              </div>
            </div>

            {/* CTAs: Add to Bag & Ask AI */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isCurrentOutOfStock}
                className="btn btn-primary"
                style={{
                  height: '52px',
                  fontSize: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isCurrentOutOfStock ? '#A1A1AA' : 'var(--store-accent-primary)',
                  borderColor: isCurrentOutOfStock ? '#A1A1AA' : 'var(--store-accent-primary)',
                  cursor: isCurrentOutOfStock ? 'not-allowed' : 'pointer'
                }}
              >
                <ShoppingBag size={18} />
                <span>
                  {isCurrentOutOfStock ? 'Sold Out in Selected Size' : `Add to Bag — £${product.price.toFixed(2)}`}
                </span>
              </button>

              <button
                type="button"
                onClick={handleAskAIAboutProduct}
                className="btn btn-secondary"
                style={{ height: '48px', fontSize: '0.9375rem', borderRadius: 'var(--radius-md)' }}
              >
                <Sparkles size={16} style={{ color: 'var(--store-accent-primary)' }} />
                <span>Ask AI Stylist about this fit & material</span>
              </button>
            </div>

            {/* Expandable Secondary Details Accordions */}
            <div style={{ borderTop: '1px solid var(--store-border)' }}>
              {/* Accordion 1: Description & Fabric */}
              <div style={{ borderBottom: '1px solid var(--store-border)' }}>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'fabric' ? null : 'fabric')}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: 'var(--store-text-primary)'
                  }}
                >
                  <span>Fabric & Composition</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openAccordion === 'fabric' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 200ms ease'
                    }}
                  />
                </button>
                {openAccordion === 'fabric' && (
                  <div style={{ paddingBottom: '16px', fontSize: '0.875rem', color: 'var(--store-text-secondary)', lineHeight: 1.6 }}>
                    <p style={{ marginBottom: '8px' }}>{product.description}</p>
                    <p><strong>Composition:</strong> {product.fabric}</p>
                    <p><strong>Care:</strong> {product.care}</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fit & Model Measurements */}
              <div style={{ borderBottom: '1px solid var(--store-border)' }}>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'fit' ? null : 'fit')}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: 'var(--store-text-primary)'
                  }}
                >
                  <span>Fit & Model Sizing</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openAccordion === 'fit' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 200ms ease'
                    }}
                  />
                </button>
                {openAccordion === 'fit' && (
                  <div style={{ paddingBottom: '16px', fontSize: '0.875rem', color: 'var(--store-text-secondary)', lineHeight: 1.6 }}>
                    <p style={{ marginBottom: '8px' }}><strong>Advice:</strong> {product.fitAdvice}</p>
                    <p><strong>Model:</strong> {product.modelMeasurements}</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Delivery & Returns Details */}
              <div style={{ borderBottom: '1px solid var(--store-border)' }}>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: 'var(--store-text-primary)'
                  }}
                >
                  <span>Delivery & Returns Policy</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openAccordion === 'shipping' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 200ms ease'
                    }}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div style={{ paddingBottom: '16px', fontSize: '0.875rem', color: 'var(--store-text-secondary)', lineHeight: 1.6 }}>
                    <p style={{ marginBottom: '8px' }}>• Free UK standard shipping on orders over £50 (2-3 business days).</p>
                    <p style={{ marginBottom: '8px' }}>• Express next-day priority courier available at checkout for £4.99.</p>
                    <p>• 30-day complimentary returns on all unworn items with security tags attached.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
