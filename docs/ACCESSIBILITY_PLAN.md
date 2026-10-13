# Accessibility Plan & WCAG 2.2 Level AA Engineering Standards
**Project**: Berachtech E-Commerce AI OS (`BERACHTECH-ECOMMERCE-AI-OS`)  
**Phase**: UX-0 (Foundational Architecture & Accessibility Engineering)  
**Standard**: W3C Web Content Accessibility Guidelines (WCAG) 2.2 Level AA  
**Target Compliance Score**: Zero automated Axe-core violations, 100% keyboard accessibility, screen reader verified  

---

## 1. Accessibility Policy & Target Compliance

Berachtech E-Commerce AI OS adopts an **accessibility-first engineering framework**. No feature is considered complete based on visual appearance alone. Every customer interaction (from conversational AI shopping to guest checkout) and every merchant administration workflow (from inventory matrices to AI approvals) must be fully usable by individuals relying on screen readers, screen magnification, keyboard-only input, or reduced motion settings.

---

## 2. Implementation Across W3C WCAG 2.2 Principles

### Principle 1: Perceivable

#### 1.1 Text Contrast & Readability (WCAG 1.4.3 & 1.4.6)
* **Normal Text**: Minimum contrast ratio of **4.5:1** against underlying background.
  * Storefront text: `#18181B` on `#FAFAF8` achieves **14.2:1**.
  * Secondary text: `#52525B` on `#FAFAF8` achieves **6.8:1**.
  * Merchant sidebar: `#D6D0E0` on `#160B22` achieves **8.1:1**.
* **UI Controls & Graphical Objects (WCAG 1.4.11)**: Minimum **3.0:1** contrast against adjacent surfaces for button borders, size selector pills, input borders, and active status rings.

#### 1.2 Non-Color Cues & Selection States (WCAG 1.4.1)
* **Rule**: Color is never used as the sole conveyor of information, status, or selection.
* **Colour Swatches**: Circular swatches combine visual color with an active double-ring stroke (2px inner white + 2px outer purple) AND an explicit text label (e.g., *"Colour: Sapphire Blue (Selected)"*).
* **Stock & Inventory Status**: Green/Amber/Red indicators always pair with icon symbols and clear textual labels (e.g., `✓ In Stock`, `⚠ Only 2 Left`, `✕ Sold Out`).
* **Disabled Size Buttons**: Out-of-stock sizes feature a diagonal strikethrough glyph, muted opacity, and an explicit `aria-disabled="true"` attribute with tooltip explanation.

#### 1.3 Alternative Text Formula for Fashion Garments (WCAG 1.1.1)
* Every product image utilizes an informative alt text template:  
  `alt="[Garment Name] in [Selected Colour] on model [Front/Back/Detail View] — [Key Feature, e.g., pleated wrap skirt with midi hem]"`  
  *Example*: `alt="Azure Pleated Wrap Maxi Dress in Sapphire Blue on model, front view featuring pleated skirt and gentle waist drape"`
* Decorative icons (e.g. arrow chevrons, stars) use `aria-hidden="true"`.

#### 1.4 Responsive Reflow & 200% Zoom (WCAG 1.4.4 & 1.4.10)
* Layout gracefully reflows without loss of functionality when zoomed up to 200%.
* Supports viewports down to 320px width without horizontal scrollbars.

---

### Principle 2: Operable

#### 2.1 100% Keyboard Navigability (WCAG 2.1.1 & 2.1.2)
* Every interactive control is accessible via standard `Tab` and `Shift+Tab` keys.
* Action execution is triggered via `Enter` or `Space`.
* Dialogs, drawers, and popovers dismiss immediately upon pressing `Escape`.
* Zero keyboard traps: Focus never becomes locked inside third-party widgets, rich media, or AI streaming logs.

#### 2.2 Accessible Visible Focus Indicators (WCAG 2.4.11 & 2.4.13)
* Focus indicator: 2px solid vivid violet (`#7C3AED`) with a 2px offset.
* Implemented via `:focus-visible` to prevent jarring outlines for mouse users while ensuring immediate clarity for keyboard navigators.

#### 2.3 Skip Navigation Links (WCAG 2.4.1)
* Top of document includes hidden skip links that appear upon first keyboard tab:
  * `[Skip to main shopping content]` (`#main-content`)
  * `[Skip to AI shopping assistant]` (`#ai-assistant-trigger`)
  * `[Skip to shopping bag]` (`#bag-drawer-trigger`)

#### 2.4 Modal Focus Management & Trapping
* When the AI Shopping Assistant modal or Shopping Bag drawer opens:
  1. Background content receives `aria-hidden="true"`.
  2. Keyboard focus is programmatically shifted to the modal's primary heading or first input.
  3. Focus cycles strictly within the modal boundaries.
  4. Upon closing (`Escape` or close button), focus is programmatically restored to the triggering button.

#### 2.5 Generous Touch Targets (WCAG 2.5.8 & 2.5.5)
* Minimum physical target size of **44×44 CSS pixels** for all touchable components on mobile:
  * Size buttons (`UK 8`, `UK 10`, `UK 12`)
  * Colour swatches
  * Quantity steppers (`-`, `+`)
  * Mobile bottom bar icon buttons
  * Chat send & voice microphone triggers

#### 2.6 Vestibular Safety & Reduced Motion (WCAG 2.3.3)
* CSS media query `@media (prefers-reduced-motion: reduce)` disables card glide animations, parallax zooms, and pulsating voice waveform graphics.

---

### Principle 3: Understandable

#### 3.1 Plain-Language Architecture & Cognitive Ease (WCAG 3.1)
* Strictly prohibits confusing algorithmic vocabulary in both customer and merchant interfaces.
* Plain, predictable button labels (e.g., *"Add to Bag"*, *"Proceed to Guest Checkout"*, *"Approve Reorder"*, *"Edit Quantity"*).

#### 3.2 Error Prevention, Inline Validation & Recovery (WCAG 3.3.1 – 3.3.4)
* Checkout form inputs feature visible `<label>` elements linked via `htmlFor`.
* Validation triggers on blur; invalid fields highlight with a red border and display an inline error message linked via `aria-describedby="field-error-id"`.
* Reversible actions: Destructive merchant operations (such as rejecting an order or editing stock) feature a 60-second undo toast notification.

---

### Principle 4: Robust

#### 4.1 Semantic HTML5 Hierarchy
* Valid semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
* Exact heading hierarchy: Exactly one `<h1>` per page, followed by logical `<h2>` and `<h3>` tags without skipping levels.

#### 4.2 ARIA Live Regions for Dynamic Updates (WCAG 4.1.3)
* **AI Message Stream**: Container uses `aria-live="polite"` and `aria-relevant="additions"`. As the assistant generates new cards, screen readers announce the response without interrupting user input.
* **Shopping Bag Updates**: Incrementing bag count announces: *"Azure Pleated Wrap Maxi Dress added to bag. 1 item in bag."*
* **Cart Hold Timer**: Uses `aria-live="polite"` at 5-minute and 1-minute remaining thresholds.

---

## 3. Screen Reader Testing Checklist

| Test Scenario | Target Screen Reader | Action Sequence | Expected Spoken Announcement | Pass Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **A. Product Detail Page (PDP) Size Selection** | VoiceOver (macOS / Safari) | Tab to Size UK 12 button & press `Space`. | Spoken: *"Size UK 12, button, selected. Stock: 3 units remaining."* | Clear selection confirmation without ambiguity. |
| **B. Sold-Out Size State** | NVDA (Windows / Chrome) | Tab to Size UK 10 (Sold out). | Spoken: *"Size UK 10, button, unavailable, sold out. Press Enter to request restock notification."* | Explains why button cannot be added to bag. |
| **C. AI Assistant Response** | VoiceOver (iOS / Safari) | Type *"Blue dress under £100"* & tap Send. | Spoken: *"Assistant: Here are three elegant blue dresses within your £100 budget. Card 1 of 3: Sapphire Satin Midi Dress, £85.00."* | Sequential announcement of cards via `aria-live`. |
| **D. 3-Step Checkout Progression** | VoiceOver (macOS / Safari) | Complete Step 2 Delivery & press Continue. | Spoken: *"Step 3 of 3: Review and Confirm, heading level 2."* | Focus shifts automatically to Step 3 header. |
| **E. Merchant Attention Feed** | NVDA (Windows / Chrome) | Navigate to Urgent Alert card. | Spoken: *"Priority Alert: Low stock warning. Size UK 10 has 2 units remaining. Button: Review Stock and Reorder."* | Immediate comprehension of urgent task. |

---

## 4. Automated & Manual Audit Protocols for Phase UX-6

1. **Axe-core CLI**: Zero critical, serious, or moderate violations on all customer and merchant routes.
2. **Google Lighthouse**: Accessibility score of 100/100 on both mobile and desktop audits.
3. **W3C Nu HTML Validator**: Zero semantic syntax errors or duplicate element IDs.
4. **Colour Contrast Analyser (CCA)**: Manual sampling of all hover, focus, active, and disabled button states.
