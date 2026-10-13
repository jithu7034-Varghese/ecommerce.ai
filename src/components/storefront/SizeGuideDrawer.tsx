'use client';

import React, { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';

interface SizeGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideDrawer({ isOpen, onClose }: SizeGuideDrawerProps) {
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  if (!isOpen) return null;

  const sizeTable = [
    { size: 'UK 8', eu: '36', us: '4', bustCm: '82-85', waistCm: '64-67', hipsCm: '89-92', bustIn: '32-33.5', waistIn: '25-26.5', hipsIn: '35-36' },
    { size: 'UK 10', eu: '38', us: '6', bustCm: '86-89', waistCm: '68-71', hipsCm: '93-96', bustIn: '34-35', waistIn: '27-28', hipsIn: '36.5-38' },
    { size: 'UK 12', eu: '40', us: '8', bustCm: '90-94', waistCm: '72-76', hipsCm: '97-101', bustIn: '35.5-37', waistIn: '28.5-30', hipsIn: '38.5-40' },
    { size: 'UK 14', eu: '42', us: '10', bustCm: '95-99', waistCm: '77-81', hipsCm: '102-106', bustIn: '37.5-39', waistIn: '30.5-32', hipsIn: '40.5-42' },
    { size: 'UK 16', eu: '44', us: '12', bustCm: '100-105', waistCm: '82-87', hipsCm: '107-112', bustIn: '39.5-41.5', waistIn: '32.5-34.5', hipsIn: '42.5-44' }
  ];

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
      <div
        className="drawer-panel"
        style={{ maxWidth: '540px', padding: '32px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Ruler size={20} style={{ color: 'var(--store-accent-primary)' }} />
            <h2 id="size-guide-title" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              Atelier Size & Fit Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--store-text-muted)' }}
            aria-label="Close Size Guide"
          >
            <X size={20} />
          </button>
        </div>

        {/* Unit Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--store-text-secondary)' }}>
            Garment Measurements:
          </span>
          <div style={{ display: 'inline-flex', backgroundColor: '#F4F4F5', padding: '3px', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setUnit('cm')}
              style={{
                border: 'none',
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: unit === 'cm' ? '#FFFFFF' : 'transparent',
                boxShadow: unit === 'cm' ? 'var(--shadow-sm)' : 'none',
                color: unit === 'cm' ? 'var(--store-text-primary)' : 'var(--store-text-muted)'
              }}
            >
              Centimetres (cm)
            </button>
            <button
              onClick={() => setUnit('inches')}
              style={{
                border: 'none',
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: unit === 'inches' ? '#FFFFFF' : 'transparent',
                boxShadow: unit === 'inches' ? 'var(--shadow-sm)' : 'none',
                color: unit === 'inches' ? 'var(--store-text-primary)' : 'var(--store-text-muted)'
              }}
            >
              Inches (&quot;)
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid var(--store-border)' }}>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>UK Size</th>
                <th style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--store-text-muted)' }}>EU / US</th>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Bust</th>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Waist</th>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Hips</th>
              </tr>
            </thead>
            <tbody>
              {sizeTable.map((row) => (
                <tr key={row.size} style={{ borderBottom: '1px solid var(--store-border)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--store-accent-primary)' }}>{row.size}</td>
                  <td style={{ padding: '12px', color: 'var(--store-text-muted)' }}>{row.eu} / {row.us}</td>
                  <td style={{ padding: '12px' }}>{unit === 'cm' ? row.bustCm : row.bustIn}</td>
                  <td style={{ padding: '12px' }}>{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                  <td style={{ padding: '12px' }}>{unit === 'cm' ? row.hipsCm : row.hipsIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Advice */}
        <div style={{ backgroundColor: '#FAFAF8', borderRadius: 'var(--radius-md)', padding: '16px', border: '1px solid var(--store-border)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.875rem', marginBottom: '6px' }}>
            <HelpCircle size={15} style={{ color: 'var(--store-accent-primary)' }} />
            <span>How to Measure</span>
          </div>
          <ul style={{ fontSize: '0.8125rem', color: 'var(--store-text-secondary)', paddingLeft: '20px', lineHeight: 1.6 }}>
            <li><strong>Bust:</strong> Measure around the fullest part of your chest with relaxed posture.</li>
            <li><strong>Waist:</strong> Measure around your natural waistline, where your body creases when bending sideways.</li>
            <li><strong>Hips:</strong> Measure around the fullest part of your hips with feet together.</li>
          </ul>
        </div>

        {/* Ethical Fit Disclaimer Required by Master Amendment */}
        <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)', lineHeight: 1.5, marginTop: 'auto' }}>
          * Fit guidance provides standard anatomical references. Because garments drape differently based on fabric tension and cut, fit cannot be guaranteed. We offer free UK returns to make trying at home effortless.
        </div>
      </div>
    </div>
  );
}
