# Design Tokens & Theme Specification
**Project**: Berachtech E-Commerce AI OS (`BERACHTECH-ECOMMERCE-AI-OS`)  
**Phase**: UX-0 (Foundational Architecture & Token Specifications)  
**Standard**: WCAG 2.2 AA Contrast, 44px Minimum Touch Targets, Semantic Token Architecture  

---

## 1. Architectural Philosophy of Tokens

The Berachtech design system utilizes a **three-tier token architecture**:
1. **Primitive Tokens**: Pure mathematical values (raw hex colors, pixel values, font weights).
2. **Semantic Tokens**: Contextual functional roles (`--color-surface-primary`, `--color-text-body`, `--focus-ring`).
3. **Component Tokens**: Dedicated element bindings (`--pdp-swatch-size`, `--sidebar-bg-purple`, `--kpi-card-shadow`).

This guarantees that theme switching (e.g., between the fashion storefront and the merchant dashboard) is decoupled from structural layout markup.

---

## 2. Primitive & Semantic Color Palette

### A. Customer Storefront Tokens (Warm Ivory & Refined Charcoal)
Designed for visual serenity, high fashion luxury, and high-contrast readability.

```css
:root {
  /* Storefront Surface Primitives */
  --store-bg: #FAFAF8;               /* Warm ivory base */
  --store-surface: #FFFFFF;          /* Pure white card surface */
  --store-surface-elevated: #F4F4F0; /* Soft card highlight */
  --store-border: #E8E8E3;           /* Champagne subtle border */
  --store-border-focus: #18181B;     /* Charcoal active border */

  /* Storefront Typography & Content */
  --store-text-primary: #18181B;     /* Rich charcoal (Contrast > 12:1) */
  --store-text-secondary: #52525B;   /* Slate secondary (Contrast > 5.5:1) */
  --store-text-muted: #71717A;       /* Accessible muted (Contrast > 4.6:1) */
  
  /* Brand Accents */
  --store-accent-primary: #7C3AED;   /* Vivid Violet */
  --store-accent-hover: #6D28D9;     /* Deep Violet Hover */
  --store-accent-subtle: #F5F3FF;    /* Violet tint background */
}
```

### B. Merchant Dashboard Tokens (Deep Dark-Purple & Violet Ergonomics)
Engineered for enterprise focus, reducing visual fatigue and creating high hierarchy.

```css
:root {
  /* Merchant Sidebar Rail */
  --merchant-sidebar-bg: #160B22;          /* Deep dark-purple canvas */
  --merchant-sidebar-border: #231238;      /* Deep purple divider line */
  --merchant-sidebar-hover: #26143D;       /* Elevated dark-purple row */
  --merchant-sidebar-active-bg: #7C3AED;   /* Vivid violet pill fill */
  --merchant-sidebar-active-text: #FFFFFF; /* High-contrast white */
  --merchant-sidebar-text: #D6D0E0;        /* Muted lilac text (Contrast > 6.5:1) */
  
  /* Merchant Content Workspace */
  --merchant-workspace-bg: #F8FAFC;        /* Light clean canvas */
  --merchant-card-bg: #FFFFFF;             /* Crisp white card */
  --merchant-card-border: #E2E8F0;         /* Slate divider line */
  --merchant-card-border-hover: #CBD5E1;   /* Slate hover line */
  --merchant-card-shadow: 0 4px 20px -2px rgba(22, 11, 34, 0.05);

  /* Functional Status Indicators */
  --status-success-bg: #ECFDF5;
  --status-success-text: #065F46;          /* Emerald (Contrast > 5:1) */
  --status-warning-bg: #FFFBEB;
  --status-warning-text: #92400E;          /* Warm Amber (Contrast > 5:1) */
  --status-danger-bg: #FEF2F2;
  --status-danger-text: #991B1B;           /* Crimson Red (Contrast > 6:1) */
  --status-info-bg: #EFF6FF;
  --status-info-text: #1E40AF;             /* Royal Blue (Contrast > 6:1) */
}
```

---

## 3. Typography Scale & System

* **Display Font**: Outfit, `system-ui`, sans-serif (High-fashion impact headers).
* **Body Font**: Inter, `-apple-system`, BlinkMacSystemFont, `sans-serif` (Optimal legibility).

```css
:root {
  /* Type Scale */
  --font-size-xs: 0.75rem;    /* 12px - Footnotes, status pills */
  --font-size-sm: 0.875rem;   /* 14px - Secondary labels, table cells */
  --font-size-base: 1.000rem; /* 16px - Default body, form inputs */
  --font-size-lg: 1.125rem;   /* 18px - Subheadings, card titles */
  --font-size-xl: 1.250rem;   /* 20px - Section headings */
  --font-size-2xl: 1.500rem;  /* 24px - PDP Titles, Modal headers */
  --font-size-3xl: 1.875rem;  /* 30px - Page titles, KPI big numbers */
  --font-size-4xl: 2.250rem;  /* 36px - Storefront Hero Title */

  /* Line Heights */
  --line-height-tight: 1.15;
  --line-height-snug: 1.30;
  --line-height-normal: 1.50;
  --line-height-relaxed: 1.65;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

---

## 4. Spacing Scale & Touch Targets

Based on a strict 4px modular grid:

```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.50rem;  /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1.00rem;  /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.50rem;  /* 24px */
  --space-8: 2.00rem;  /* 32px */
  --space-10: 2.50rem; /* 40px */
  --space-12: 3.00rem; /* 48px */
  --space-16: 4.00rem; /* 64px */

  /* Touch Target Standard (WCAG 2.5.8 & 2.5.5) */
  --touch-target-min: 44px; /* Minimum width & height for mobile interactive elements */
}
```

---

## 5. Border Radii & Elevation Shadows

```css
:root {
  /* Radii */
  --radius-sm: 4px;    /* Subtle tags, status pills */
  --radius-md: 8px;    /* Form inputs, size selector buttons */
  --radius-lg: 12px;   /* Standard cards, dialog containers */
  --radius-xl: 16px;   /* Hero containers, drawer panels */
  --radius-full: 9999px; /* Circular swatches, avatar icons, chip pills */

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-modal: 0 25px 50px -12px rgba(22, 11, 34, 0.25);
}
```

---

## 6. Interaction States & Accessible Focus Rings

```css
/* High-Contrast Accessible Focus Indicator (WCAG 2.4.11 / 2.4.13) */
:root {
  --focus-ring-color: #7C3AED;
  --focus-ring-offset: 2px;
  --focus-ring-width: 2px;
}

*:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

/* Button & Card Hover Transitions */
.interactive-element {
  transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 150ms cubic-bezier(0.16, 1, 0.3, 1),
              border-color 150ms ease;
}

.interactive-element:hover {
  transform: translateY(-1px);
}

.interactive-element:active {
  transform: translateY(0);
}

/* Motion Sensitivity Safe Guard (WCAG 2.3.3) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
    transform: none !important;
  }
}
```
