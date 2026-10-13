export type Size = 'UK 8' | 'UK 10' | 'UK 12' | 'UK 14' | 'UK 16' | 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface ProductColorway {
  name: string;
  hex: string;
  previewImage: string;
  galleryImages: string[];
}

export interface ProductVariant {
  id: string; // e.g. SKU-SAP-10
  productId: string;
  color: string;
  size: Size;
  stock: number;
  lowStockThreshold: number;
  price: number;
  sku: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'evening' | 'workwear' | 'cocktail' | 'casual';
  occasion: string[];
  fabric: string;
  care: string;
  fitAdvice: string;
  modelMeasurements: string;
  rating: number;
  reviewsCount: number;
  colorways: ProductColorway[];
  availableSizes: Size[];
  variants: ProductVariant[];
  featured?: boolean;
  newArrival?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  color: string;
  size: Size;
  price: number;
  image: string;
  quantity: number;
}

export type OrderStatus = 'pending' | 'packed' | 'dispatched' | 'delivered' | 'cancelled';

export interface Order {
  id: string; // #BER-XXXXX
  customerName: string;
  email: string;
  shippingAddress: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  deliveryMethod: 'standard' | 'priority';
  deliveryFee: number;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  createdAt: string;
  paymentMethod: 'Simulated Card (Demo)';
}

export interface AIProposal {
  id: string;
  variantId: string;
  productTitle: string;
  color: string;
  size: Size;
  supplier: string;
  proposedQuantity: number;
  unitCost: number;
  totalCost: number;
  what: string;
  why: string;
  impact: string;
  limitations: string;
  status: 'pending' | 'approved' | 'rejected' | 'modified';
  timestamp: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface AuditLogEntry {
  id: string;
  action: string;
  target: string;
  previousValue?: string;
  newValue: string;
  userId: string;
  timestamp: string;
  status: 'approved' | 'rejected' | 'reverted';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  matchingProducts?: Product[];
  actionChips?: string[];
  intentSlots?: {
    category?: string;
    occasion?: string;
    color?: string;
    size?: string;
    maxPrice?: number;
  };
}

// ==========================================
// DIVISION E: AI AGENTS MESH & WORKFLOWS TYPES
// ==========================================

export type AgentStatus = 'active' | 'idle' | 'processing' | 'pending_approval' | 'paused' | 'completed';
export type AgentDivision = 'executive' | 'customer' | 'supply' | 'marketing' | 'operations' | 'orchestration';
export type AgentApprovalMode = 'mandatory' | 'conditional' | 'autonomous_monitoring';
export type AgentHealth = 'optimal' | 'warning' | 'degraded';

export interface AgentExecutionRecord {
  id: string;
  timestamp: string;
  action: string;
  outcome: string;
  durationMs: number;
  tokensUsed: number;
}

export interface CommerceAgent {
  id: string; // e.g. AGT-EXE-01
  name: string;
  code: string;
  division: AgentDivision;
  categoryLabel: string;
  purpose: string;
  inputs: string[];
  integrations: string[];
  currentTask: string;
  status: AgentStatus;
  health: AgentHealth;
  lastActive: string;
  proposedAction: string;
  supportingEvidence: string;
  confidence: number; // 0-100
  approvalRequirement: AgentApprovalMode;
  executionHistory: AgentExecutionRecord[];
  estimatedCost: {
    costPerRunGbp: number;
    tokensUsedMonthly: number;
    modelRuntime: string;
  };
  iconName: string;
}

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  title: string;
  agentId: string;
  agentName: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'waiting_approval';
  evidenceSnippet?: string;
  actionPayload?: {
    label: string;
    value: string;
    type?: 'stat' | 'badge' | 'quote' | 'alert';
  }[];
  decisionRequired?: boolean;
}

export interface AutonomousWorkflow {
  id: string; // e.g. WF-STOCKOUT-01
  code: string;
  name: string;
  category: string;
  description: string;
  participatingAgents: string[];
  status: 'ready' | 'running' | 'waiting_approval' | 'completed';
  currentStepIndex: number;
  steps: WorkflowStep[];
  commercialImpact: string;
  confidence: number;
  approvalSummary?: {
    what: string;
    why: string;
    impact: string;
    action: string;
    limitations: string;
  };
}
