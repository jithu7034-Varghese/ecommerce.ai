# Low-Fidelity Wireframes & Structural Layout Schematics
**Project**: Berachtech E-Commerce AI OS (`BERACHTECH-ECOMMERCE-AI-OS`)  
**Phase**: UX-0 (Foundational Architecture & Wireframe Specifications)  
**Standard**: Responsive Layouts, 44px Touch Targets, WCAG 2.2 AA Focus Indicators  

---

## 1. Storefront Home Page Wireframe

### Desktop Viewport (1280px+)

```text
+-------------------------------------------------------------------------------------------------------+
|  [Simulated Data Banner] Demo Environment • Real-time Cross-Portal Simulation Enabled                |
+-------------------------------------------------------------------------------------------------------+
|  [LOGO] BERACHTECH FASHION       Home   Shop   Categories   New Arrivals       [AI Stylist]  [Bag (1)]|
+-------------------------------------------------------------------------------------------------------+
|                                                                                                       |
|                                       FIND WHAT YOU LOVE. JUST ASK.                                   |
|               Tell our shopping assistant what you're looking for, or explore the collection.         |
|                                                                                                       |
|                       [ (★) Shop with AI ]          [ Browse Collection ]                             |
|                                                                                                       |
|                    (✓ Free UK Delivery over £50)   (✓ 30-Day Hassle-Free Returns)                     |
+-------------------------------------------------------------------------------------------------------+
|  FEATURED OCCASIONS & CATEGORIES                                                                      |
|  +--------------------+  +--------------------+  +--------------------+  +--------------------+       |
|  | [Img: Evening]     |  | [Img: Workwear]    |  | [Img: Cocktail]    |  | [Img: Casual Lux]  |       |
|  | Evening Gowns      |  | Tailored Suits     |  | Cocktail Dresses   |  | Everyday Silk      |       |
|  +--------------------+  +--------------------+  +--------------------+  +--------------------+       |
+-------------------------------------------------------------------------------------------------------+
|  NEW ARRIVALS                                                                                         |
|  +-------------------+  +-------------------+  +-------------------+  +-------------------+           |
|  | [Img: Azure Wrap] |  | [Img: Noir Halter]|  | [Img: Velvet Slip]|  | [Img: Silk Blouse]|           |
|  | Azure Wrap Maxi   |  | Noir Pleated Midi |  | Emerald Slip      |  | Champagne Blouse  |           |
|  | £95.00 • UK 8-16  |  | £88.00 • UK 8-14  |  | £92.00 • UK 10-14 |  | £65.00 • UK 8-16  |           |
|  | (● ● ●) 3 Colours |  | (● ●) 2 Colours   |  | (● ●) 2 Colours   |  | (● ● ●) 3 Colours |           |
|  +-------------------+  +-------------------+  +-------------------+  +-------------------+           |
+-------------------------------------------------------------------------------------------------------+
|  [Footer: Customer Care | Delivery & Returns | Storefront / Merchant Switcher | Simulated Notice]     |
+-------------------------------------------------------------------------------------------------------+
```

### Mobile Viewport (390px — iPhone 14/15)

```text
+-----------------------------------------------+
| [Simulated Data Notice]                       |
+-----------------------------------------------+
| [=] BERACHTECH FASHION               [Bag (1)]|
+-----------------------------------------------+
|                                               |
|         FIND WHAT YOU LOVE. JUST ASK.         |
|   Tell our AI assistant or browse the store.  |
|                                               |
|             [ (★) Shop with AI ]              |
|             [ Browse Collection ]             |
|                                               |
|  ✓ Free UK Delivery   ✓ 30-Day Easy Returns   |
+-----------------------------------------------+
| CATEGORIES                                    |
| [ Evening ] [ Workwear ] [ Cocktail ] [ Casual]
+-----------------------------------------------+
| NEW ARRIVALS                                  |
| +---------------------+ +---------------------+
| | [Img: Azure Wrap]   | | [Img: Noir Midi]    |
| | Azure Wrap Maxi     | | Noir Pleated Midi   |
| | £95.00              | | £88.00              |
| | Sizes: UK 8 - 14    | | Sizes: UK 10 - 14   |
| +---------------------+ +---------------------+
|                                               |
+-----------------------------------------------+
| STICKY MOBILE BOTTOM BAR (Thumb Zone):        |
| [ (Home) ]   [ (Shop) ]   [ (★ AI Stylist) ]  |
+-----------------------------------------------+
```

---

## 2. AI Shopping Assistant Wireframe

### Desktop Floating Modal & Dialogue Experience

```text
+-----------------------------------------------------------------------------------------------+
|  AI SHOPPING ASSISTANT                                                  [--]  [Full]  [X Close]
+-----------------------------------------------------------------------------------------------+
|  (Stylist Avatar)                                                                             |
|  Hi! What are you shopping for today?                                                         |
|                                                                                               |
|  Suggested: [Find a dress] [Help me choose a size] [Shop by budget] [Show similar styles]     |
|                                                                                               |
|                                                        (User Bubble)                          |
|                                                        I need something elegant for a wedding.|
|                                                                                               |
|  (Stylist Avatar)                                                                             |
|  Of course. Do you have a preferred colour or budget?                                         |
|                                                                                               |
|                                                        (User Bubble)                          |
|                                                        Something blue, under £100.            |
|                                                                                               |
|  (Stylist Avatar)                                                                             |
|  Here are 3 elegant blue dresses within your £100 budget:                                     |
|                                                                                               |
|  +---------------------------+ +---------------------------+ +------------------------------+ |
|  | [Img: Sapphire Midi]      | | [Img: Azure Pleated]      | | [Img: Navy Satin Slip]       | |
|  | Sapphire Satin Midi Dress | | Azure Pleated Wrap Maxi   | | Navy Cowl-Neck Slip Dress    | |
|  | £85.00  (In Stock)        | | £95.00  (In Stock)        | | £72.00  (In Stock)           | |
|  | Colours: [● Navy] [● Blue]| | Colours: [● Blue] [● Teal]| | Colours: [● Midnight Navy]   | |
|  | Sizes: [8] [10] [12] [14] | | Sizes: [8] [10] [12] [14] | | Sizes: [10] [12] [14] [16]   | |
|  | [View Details] [Add to Bag| | [View Details] [Add to Bag| | [View Details] [Add to Bag]  | |
|  +---------------------------+ +---------------------------+ +------------------------------+ |
|                                                                                               |
|  Refine: [Show more like this]  [Different colour]  [Lower price]  [Change size]              |
|                                                                                               |
+-----------------------------------------------------------------------------------------------+
|  [ (Mic) Tap to Speak ] [Type your request: e.g. "Show something with sleeves"...]  [ Send > ]|
+-----------------------------------------------------------------------------------------------+
```

---

## 3. Product Detail Page (PDP) Wireframe

```text
+-------------------------------------------------------------------------------------------------------+
|  [LOGO] BERACHTECH FASHION       Home   Shop   Categories   New Arrivals       [AI Stylist]  [Bag (1)]|
+-------------------------------------------------------------------------------------------------------+
|  Home / Dresses / Evening / Azure Pleated Wrap Maxi Dress                                             |
|                                                                                                       |
|  +-----------------------------------+    AZURE PLEATED WRAP MAXI DRESS                               |
|  |                                   |    £95.00                                                      |
|  |                                   |    ★★★★★ (18 verified reviews)                                 |
|  |                                   |                                                                |
|  |       [ HIGH RES IMAGE ]          |    COLOUR: Sapphire Blue (Selected)                            |
|  |       Main View (Model Front)     |    ( ● Sapphire )  ( ● Midnight Navy )  ( ● Forest Green )     |
|  |                                   |    [44x44px Swatches with accessible double-ring on active]    |
|  |                                   |                                                                |
|  |                                   |    SELECT SIZE (UK Sizing):             [ (?) View Size Guide ]|
|  +-----------------------------------+    [ UK 8 ]   [ UK 10* ]   [ UK 12 (Selected) ]   [ UK 14 ]   |
|  [Thumb 1] [Thumb 2] [Thumb 3] [Close]   (*UK 10 is crossed out: "Sold out - Notify me")             |
|                                                                                                       |
|                                           STOCK STATUS: In Stock — Only 3 left in UK 12               |
|                                           ESTIMATED DELIVERY: Free Standard Delivery (Thu, Oct 16)    |
|                                                                                                       |
|                                           +-------------------------------------------------------+   |
|                                           | [ ★ ADD TO BAG - £95.00 ]                             |   |
|                                           +-------------------------------------------------------+   |
|                                           [ (Chat) Ask AI Stylist about this fit & material ]         |
|                                                                                                       |
|                                           [+] Fabric & Composition (100% Recycled Satin Crepe)        |
|                                           [+] Fit & Sizing Advice (True to size, gentle waist drape)  |
|                                           [+] Delivery & Returns (Free 30-day returns within UK)      |
+-------------------------------------------------------------------------------------------------------+
```

---

## 4. Slide-Over Shopping Bag Drawer Wireframe

```text
+-----------------------------------------------------------------------------------+
| BACKDROP (Blur & Dim)                                | YOUR SHOPPING BAG  [X Close]
|                                                      +----------------------------+
|                                                      | (⏱) Items reserved: 14:48  |
|                                                      +----------------------------+
|                                                      | [Img] Azure Pleated Maxi   |
|                                                      | Colour: Sapphire Blue      |
|                                                      | Size: UK 12                |
|                                                      | £95.00                     |
|                                                      | Qty: [-] [ 1 ] [+]  [Remove]
|                                                      +----------------------------+
|                                                      | Subtotal:           £95.00 |
|                                                      | Standard Delivery:    FREE |
|                                                      | Total:              £95.00 |
|                                                      | (Taxes included)           |
|                                                      +----------------------------+
|                                                      | [ PROCEED TO GUEST CHECKOUT]
|                                                      |                            |
|                                                      | [ Continue Shopping ]      |
+-----------------------------------------------------------------------------------+
```

---

## 5. 3-Stage Guest Checkout Wireframe

```text
+-------------------------------------------------------------------------------------------------------+
|  [LOGO] BERACHTECH FASHION                                             [🔒 Secure Simulated Checkout] |
+-------------------------------------------------------------------------------------------------------+
|                                                                                                       |
|    (✓) Step 1: Bag Review  ====>  (2) Step 2: Delivery Details  ====>  (3) Step 3: Review & Confirm   |
|                                                                                                       |
|  +-------------------------------------------------+  +---------------------------------------------+ |
|  | DELIVERY INFORMATION                            |  | ORDER SUMMARY                               | |
|  | [ Guest Checkout — No Password Required ]       |  | 1 Item in Bag                               | |
|  |                                                 |  |                                             | |
|  | Full Name:                                      |  | [Img] Azure Pleated Wrap Maxi Dress         | |
|  | [ Clara Higgins                               ] |  | Size: UK 12 • Colour: Sapphire Blue         | |
|  |                                                 |  | Price: £95.00                               | |
|  | Email (for order confirmation):                 |  |                                             | |
|  | [ clara.higgins@example.com                   ] |  | Delivery: Free Standard                     | |
|  |                                                 |  | Total to Pay: £95.00                        | |
|  | Street Address:                                 |  +---------------------------------------------+ |
|  | [ 42 Kensington Church Street                 ] |                                                 |
|  |                                                 |  [ SIMULATED TEST PAYMENT ]                    |
|  | City / Town:           Postcode:                |  • Card Type: Simulated Visa                   |
|  | [ London            ]  [ W8 4DB               ] |  • Number: **** **** **** 4242                 |
|  |                                                 |  (No real payment details required)            |
|  | DELIVERY METHOD:                                |                                                 |
|  | (•) Standard Delivery (2-3 days) — FREE         |  +---------------------------------------------+ |
|  | ( ) Next-Day Priority (Tomorrow) — £4.99        |  | [ CONFIRM SIMULATED ORDER - £95.00 ]        | |
|  |                                                 |  +---------------------------------------------+ |
|  +-------------------------------------------------+  | (✓ Single-click submission • Idempotent)    | |
+-------------------------------------------------------------------------------------------------------+
```

---

## 6. Merchant Dashboard: Overview & "What Needs Your Attention?" Wireframe

```text
+-------------------------------------------------------------------------------------------------------+
| [BERACHTECH AI OS]   | Top Search...                         [Simulated Notice]  (Marcus: Store Owner)|
+----------------------+--------------------------------------------------------------------------------+
| (Deep Purple Sidebar)| MERCHANT OVERVIEW                                                              |
|                      |                                                                                |
| [★] Overview (Active)| +----------------------------------------------------------------------------+ |
| [ ] Orders (5 new)   | | ⚡ WHAT NEEDS YOUR ATTENTION? (Priority Operational Feed)                   | |
| [ ] Products         | |                                                                            | |
| [ ] Inventory        | | [!] Low Stock Alert: Sapphire Satin Midi Dress (UK 10) has only 2 left.    | |
| [ ] Customers        | |     Action: [ Review Stock & Reorder ]                                     | |
| [ ] Marketing        | |                                                                            | |
| [ ] AI Intelligence  | | [📦] 5 Orders Waiting to be Packed for Dispatch before 2:00 PM.             | |
| [ ] Reports          | |     Action: [ Open Fulfillment Queue ]                                     | |
| -------------------- | |                                                                            | |
| Advanced:            | | [📈] Simulated demand surge detected for wedding dresses next week.        | |
| [ ] Forecasting      | |     Action: [ View Predictive Analysis ]                                   | |
| [ ] AI Agents        | +----------------------------------------------------------------------------+ |
| [ ] Automation       |                                                                                |
| [ ] Suppliers        | KEY PERFORMANCE INDICATORS (Today)                                            |
| [ ] Settings         | +--------------+ +--------------+ +--------------+ +--------------+            |
|                      | | SALES TODAY  | | ORDERS TODAY | | AVG ORDER VAL| | PENDING SHIP |            |
|                      | | £1,842.50    | | 24 Orders    | | £76.77       | | 5 Orders     |            |
|                      | | +12.4% vs lw | | 18 Fulfilled | | +£4.20 vs lw | | Action req.  |            |
|                      | +--------------+ +--------------+ +--------------+ +--------------+            |
|                      |                                                                                |
|                      | RECENT ORDERS (Real-time Stream)                                               |
|                      | +-----------+-------------------+-------------+---------+-----------+--------+ |
|                      | | Order ID  | Customer          | Items       | Total   | Status    | Action | |
|                      | +-----------+-------------------+-------------+---------+-----------+--------+ |
|                      | | #BER-84219| Clara Higgins     | Azure Maxi  | £95.00  | Pending   | [Pack] | |
|                      | | #BER-84218| Maya Lin          | Noir Midi   | £88.00  | Dispatched| [View] | |
|                      | | #BER-84217| Liam Thorne       | Velvet Slip | £92.00  | Packed    | [Ship] | |
|                      | +-----------+-------------------+-------------+---------+-----------+--------+ |
+----------------------+--------------------------------------------------------------------------------+
```

---

## 7. Merchant 5-W Explainability & Human Approval Modal Wireframe

```text
+-----------------------------------------------------------------------------------------------+
|  AI INVENTORY REPLENISHMENT PROPOSAL                                                [X Close] |
+-----------------------------------------------------------------------------------------------+
|                                                                                               |
|  [1. WHAT] (Proposed Action):                                                                 |
|  Create a simulated Purchase Order for 25 units of Sapphire Satin Midi Dress (Size UK 10).    |
|  Supplier: Atelier Silk Co. • Unit Cost: £25.00 • Total Proposal: £625.00                     |
|                                                                                               |
|  [2. WHY] (Empirical Evidence):                                                               |
|  • Current remaining stock: 2 units.                                                          |
|  • Recent 7-day sales velocity: 3.8 units/day.                                                |
|  • At current run-rate, stockout occurs in approximately 12 hours.                            |
|  • Supplier fulfillment lead-time is 4 business days.                                         |
|                                                                                               |
|  [3. IMPACT] (Projected Business Benefit):                                                    |
|  • Eliminates estimated £2,125.00 in lost revenue over next 10 days.                          |
|  • Preserves customer search conversion on bestselling colorway.                              |
|                                                                                               |
|  [4. LIMITATIONS] (Uncertainty Disclosure):                                                   |
|  • Based on simulated historical baseline; does not predict unseasonal weather anomalies.    |
|                                                                                               |
|  [5. ACTION & HUMAN CONTROL]:                                                                 |
|  +------------------------------------+  +----------------------+  +------------------------+ |
|  | [ ✓ APPROVE PURCHASE - £625.00 ]   |  | [ ✎ EDIT QUANTITY ]  |  | [ ✗ DECLINE PROPOSAL ] | |
|  +------------------------------------+  +----------------------+  +------------------------+ |
|  (Audit trail entry will be recorded with timestamp and active merchant identity)             |
|                                                                                               |
+-----------------------------------------------------------------------------------------------+
```
