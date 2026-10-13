# Application Information Architecture & System Routing
**Project**: Berachtech E-Commerce AI OS (`BERACHTECH-ECOMMERCE-AI-OS`)  
**Phase**: UX-0 (Foundational Architecture & Information Architecture Specifications)  
**Standard**: Two-Portal Architecture, Progressive Disclosure, Shared Reactive State  

---

## 1. High-Level Portal Architecture & Separation of Concerns

The platform separates the public fashion customer experience from private retail operations management. Customers are never exposed to merchant controls, database keys, or administrative menus.

```mermaid
graph TD
    subgraph Public Fashion Storefront [Customer Portal: Elegant, Consumer-Focused, High Conversion]
        Home["/ (Home Storefront)"]
        Shop["/shop (Full Catalogue)"]
        Cat["/categories/[slug] (Category Discovery)"]
        NewArr["/new-arrivals (Curated Drops)"]
        AI_Chat["/assistant (AI Stylist Modal / View)"]
        PDP["/product/[id] (Interactive Detail Page)"]
        Bag["/bag (Interactive Slide Drawer)"]
        Checkout["/checkout (3-Step Guest Checkout)"]
        Confirm["/checkout/confirmation (Order Success)"]
    end

    subgraph Merchant Operations [Merchant Portal: Deep Dark-Purple Ergonomics, High Productivity]
        M_Home["/merchant (Overview & Attention Feed)"]
        M_Orders["/merchant/orders (Fulfillment & Packing)"]
        M_Products["/merchant/products (Catalog Governance)"]
        M_Inv["/merchant/inventory (Variant Stock Matrix)"]
        M_Cust["/merchant/customers (Client Profiles)"]
        M_Mktg["/merchant/marketing (Campaign Studio)"]
        M_Intel["/merchant/intelligence (AI Hub & Governance)"]
        M_Rep["/merchant/reports (Sales & Financial KPIs)"]
        
        M_Forecast["/merchant/intelligence/forecasting (Demand)"]
        M_Agents["/merchant/intelligence/agents (Human-in-the-Loop)"]
        M_Auto["/merchant/intelligence/automation (Rules)"]
        M_Supp["/merchant/suppliers (Purchase Orders)"]
        M_Ret["/merchant/returns (Simulated RMAs)"]
        M_Set["/merchant/settings (Store Preferences)"]
    end

    SharedState[("Shared Reactive State Store\n• Catalogue & SKU Matrix\n• Real-Time Order Stream\n• Stock Holds & Inventory Deltas\n• AI Action Approvals Audit Log")]
    
    Public Fashion Storefront <-->|Customer Orders, Variant Holds| SharedState
    Merchant Operations <-->|Fulfillment, Stock Adjustments, AI Approvals| SharedState
```

---

## 2. Customer Storefront Sitemap & Route Specifications

| Route Path | Page Title | Primary User Goal | Primary Key Components |
| :--- | :--- | :--- | :--- |
| `/` | Berachtech Fashion — Home | Discover collection; start AI styling; browse new arrivals. | Hero CTA (`Shop with AI`), Featured Categories, New In carousel, Trust & Shipping badge. |
| `/shop` | All Clothing & Accessories | Filter and sort complete collection. | Faceted filter rail (Category, Size, Colour, Price), Sort dropdown, Product grid. |
| `/categories/[slug]` | Category Collections | Explore specific wardrobe segments (e.g., Evening, Workwear). | Hero banner, contextual subcategory chips, product cards. |
| `/new-arrivals` | New Arrivals Drop | Discover recent seasonal releases. | Editorial lookbook layout, badge indicators (*"New Season"*). |
| `/assistant` | AI Shopping Assistant | Conversational consultation, styling, outfit curation. | Conversation thread, suggestion chips, interactive product cards, voice input button. |
| `/product/[id]` | Product Details (PDP) | Evaluate garment, select colour/size, inspect fit. | Multi-angle image gallery, color swatches, visible size buttons, size chart drawer, delivery estimate, Add to Bag. |
| `/bag` | Shopping Bag | Review cart, adjust quantities, verify stock hold. | Slide-over drawer, variant summary, quantity stepper, hold timer (`15:00`), subtotal, Checkout CTA. |
| `/checkout` | 3-Step Guest Checkout | Complete order without registration. | Step breadcrumb (`Bag` &rarr; `Delivery` &rarr; `Review`), address fields, shipping options, simulated payment, Order summary. |
| `/checkout/confirmation` | Order Confirmation | Verify placed order and review receipt. | Order ID (`#BER-XXXXX`), fulfillment status, summary breakdown, link to Merchant view. |

---

## 3. Merchant Dashboard Sitemap & Progressive Disclosure

### Tier 1: Primary Daily Operations Rail
These 8 routes represent Marcus and Elena's high-frequency daily management needs:

1. `/merchant`: **Executive Overview & Attention Feed**  
   * Top 6 KPI summary cards (Sales, Orders, AOV, Pending Fulfillment, Low Stock, Returns).  
   * *"What Needs Your Attention?"* priority feed with one-click resolution actions.  
   * Real-time 7-day sales velocity chart.
2. `/merchant/orders`: **Order Management & Fulfillment**  
   * Filterable order table (`All`, `Pending`, `Packed`, `Dispatched`, `Cancelled`).  
   * Detail drawer: Customer delivery info, variant line items, simulated tracking generation.
3. `/merchant/products`: **Product & Catalogue Administration**  
   * SKU manager, category tagger, retail price and cost margin editor.
4. `/merchant/inventory`: **Variant-Level Stock Matrix**  
   * Granular stock counts across colorways and sizes (`UK 8`–`UK 16`).  
   * Inline threshold editing and safety stock indicators.
5. `/merchant/customers`: **Customer Insights**  
   * Simulated shopper profiles, purchase history, conversational interest tags.
6. `/merchant/marketing`: **Campaigns & Promotions**  
   * Promotional discount creator with automated guardrails.
7. `/merchant/intelligence`: **AI Central & Approvals Studio**  
   * Pending AI proposals queue (Price changes, reorders, campaigns) with the 5-W Explainability card.
8. `/merchant/reports`: **Financial & Operational Analytics**  
   * Revenue trends, category performance, conversion funnel benchmarks.

### Tier 2: Advanced Intelligence Drawer (Progressive Disclosure)
Accessible via deep-links or expandable sub-menus for Devon (Advanced Merchant User):
* `/merchant/intelligence/forecasting`: Predictive demand curves with confidence bands.
* `/merchant/intelligence/recommendations`: Autonomous merchandising algorithm settings.
* `/merchant/intelligence/visual-search`: Visual similarity distance thresholds.
* `/merchant/intelligence/agents`: Autonomous agent rules, guardrail triggers, and activity history.
* `/merchant/intelligence/automation`: If-This-Then-That rule builder for stock alerts and emails.
* `/merchant/suppliers`: Supplier directory, purchase order status, and lead-time tracking.
* `/merchant/returns`: Return authorization workflow and inspection records.
* `/merchant/settings`: Currency, tax rules, delivery fee thresholds, demo data resets.

---

## 4. Shared Reactive State Architecture

To enable instant cross-portal interaction without requiring an external backend database during demos, a shared reactive store coordinates both interfaces:

```typescript
interface StorefrontState {
  // Catalogue & Inventory
  products: Product[];
  variants: ProductVariant[];
  updateVariantStock: (variantId: string, delta: number) => void;
  
  // Customer Session & Cart
  cartItems: CartItem[];
  cartHoldExpiresAt: number | null;
  addToCart: (variantId: string, quantity: number) => boolean;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Orders Stream
  orders: Order[];
  createOrder: (orderInput: CreateOrderInput) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // AI Conversation Context
  conversationSlots: ConversationSlotState;
  setSlot: <K extends keyof ConversationSlotState>(key: K, value: ConversationSlotState[K]) => void;
  resetConversation: () => void;
  
  // Merchant AI Governance
  aiProposals: AIProposal[];
  approveProposal: (proposalId: string) => void;
  rejectProposal: (proposalId: string, reason?: string) => void;
  editProposal: (proposalId: string, updates: Partial<AIProposal>) => void;
  auditLog: AuditLogEntry[];
}
```

### Real-Time Interaction Invariants
1. **Instant Checkout Reflection**: When a customer confirms an order on `/checkout`, an `Order` object is created synchronously and immediately appears in the `/merchant/orders` queue with an unread badge.
2. **Stock Decrementing**: Completing a purchase immediately decrements the matching variant's stock. If stock drops below threshold (e.g. `<= 2`), a high-priority alert is generated in the merchant's *"What Needs Your Attention?"* feed.
3. **Simulated State Persistence**: State is hydrated and synced across browser tabs using `localStorage`, ensuring that switching between customer and merchant windows in separate tabs preserves data seamlessly.

---

## 5. Viewport Breakpoint & Layout Shell Specifications

| Breakpoint Range | Device Class | Storefront Navigation Pattern | Merchant Layout Pattern |
| :--- | :--- | :--- | :--- |
| `< 640px` (Mobile) | iPhone, Android Phones | Compact sticky header; bottom thumb-bar with Home, Shop, Bag (badge), and floating AI Stylist FAB. | Collapsible dark-purple hamburger drawer; stacked single-column KPI cards; horizontal table scroll. |
| `640px – 1023px` (Tablet) | iPad, Tablets | Horizontal top navigation; slide-over cart drawer; 2-column product grid. | Slim icon-only sidebar rail (64px width); 2-column KPI grid; responsive table rows. |
| `1024px – 1439px` (Desktop) | Laptops, Desktops | Full top navigation with dropdown megamenus; split PDP (50% gallery, 50% buy box); modal AI assistant. | Full dark-purple sidebar (240px width); 4-column KPI grid; full-width data tables. |
| `≥ 1440px` (Wide Desktop) | 4K / Ultrawide Monitors | Centered container (`max-width: 1400px`); 4-column product grid; rich sticky buy-box. | Full sidebar (260px width); expanded analytics charts; side-by-side order inspection drawer. |
