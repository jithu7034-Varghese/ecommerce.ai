'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductVariant, CartItem, Order, AIProposal, AuditLogEntry, ChatMessage, Size } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_AI_PROPOSALS } from '@/data/mockCatalogue';

interface ConversationSlots {
  category?: string;
  occasion?: string;
  color?: string;
  size?: Size;
  maxPrice?: number;
  style?: string;
}

interface StoreContextType {
  // Catalogue & Stock
  products: Product[];
  getVariant: (productId: string, color: string, size: Size) => ProductVariant | undefined;
  updateVariantStock: (variantId: string, newStock: number) => void;

  // Cart & Bag
  cart: CartItem[];
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  addToCart: (productId: string, color: string, size: Size, quantity?: number) => { success: boolean; error?: string };
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  holdSecondsRemaining: number;

  // Orders & Fulfillment
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    email: string;
    street: string;
    city: string;
    postcode: string;
    deliveryMethod: 'standard' | 'priority';
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], trackingNumber?: string) => void;

  // Conversational AI Assistant
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  activeSlots: ConversationSlots;
  resetConversation: () => void;

  // Merchant AI Governance & Proposals
  proposals: AIProposal[];
  activeProposal: AIProposal | null;
  setActiveProposal: (proposal: AIProposal | null) => void;
  approveProposal: (proposalId: string) => void;
  rejectProposal: (proposalId: string, reason?: string) => void;
  editProposalQuantity: (proposalId: string, newQuantity: number) => void;
  auditLogs: AuditLogEntry[];
  undoAction: (logId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  // Hydrate State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [holdSecondsRemaining, setHoldSecondsRemaining] = useState(15 * 60);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [activeSlots, setActiveSlots] = useState<ConversationSlots>({});
  const [proposals, setProposals] = useState<AIProposal[]>(INITIAL_AI_PROPOSALS);
  const [activeProposal, setActiveProposal] = useState<AIProposal | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  // Initial Assistant Message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: 'Hi! What are you shopping for today?',
      timestamp: new Date().toISOString(),
      actionChips: [
        'Find a dress',
        'Help me choose a size',
        'Shop by budget',
        'Find an outfit',
        'Show similar styles'
      ]
    }
  ]);

  // Hold timer countdown
  useEffect(() => {
    if (cart.length === 0) return;
    const interval = setInterval(() => {
      setHoldSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cart.length]);

  // Variant lookup helper
  const getVariant = (productId: string, color: string, size: Size): ProductVariant | undefined => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return undefined;
    return prod.variants.find((v) => v.color.toLowerCase() === color.toLowerCase() && v.size === size);
  };

  // Update variant stock directly (used by merchant or order flow)
  const updateVariantStock = (variantId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((prod) => ({
        ...prod,
        variants: prod.variants.map((v) => (v.id === variantId ? { ...v, stock: Math.max(0, newStock) } : v))
      }))
    );
  };

  // Add to cart with stock validation
  const addToCart = (productId: string, color: string, size: Size, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return { success: false, error: 'Product not found' };

    const variant = getVariant(productId, color, size);
    if (!variant) return { success: false, error: 'Variant not available' };

    if (variant.stock < quantity) {
      return {
        success: false,
        error: `Size ${size} in ${color} is currently sold out (${variant.stock} available).`
      };
    }

    const colorway = product.colorways.find((c) => c.name.toLowerCase() === color.toLowerCase()) || product.colorways[0];
    const image = colorway.previewImage;

    setCart((prev) => {
      const existing = prev.find((item) => item.variantId === variant.id);
      if (existing) {
        return prev.map((item) =>
          item.variantId === variant.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${variant.id}`,
          productId: product.id,
          variantId: variant.id,
          title: product.title,
          color: variant.color,
          size: variant.size,
          price: variant.price,
          image,
          quantity
        }
      ];
    });

    setIsBagOpen(true);
    setHoldSecondsRemaining(15 * 60);
    return { success: true };
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Create Order (Simulated 3-Step Checkout)
  const createOrder = ({
    customerName,
    email,
    street,
    city,
    postcode,
    deliveryMethod
  }: {
    customerName: string;
    email: string;
    street: string;
    city: string;
    postcode: string;
    deliveryMethod: 'standard' | 'priority';
  }): Order => {
    const deliveryFee = deliveryMethod === 'priority' ? 4.99 : 0.0;
    const orderId = `#BER-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderId,
      customerName,
      email,
      shippingAddress: {
        street,
        city,
        postcode,
        country: 'United Kingdom'
      },
      deliveryMethod,
      deliveryFee,
      items: [...cart],
      subtotal: cartTotal,
      total: cartTotal + deliveryFee,
      status: 'pending',
      createdAt: new Date().toISOString(),
      paymentMethod: 'Simulated Card (Demo)'
    };

    // Decrement stock in catalog
    cart.forEach((cartItem) => {
      setProducts((prev) =>
        prev.map((prod) => ({
          ...prod,
          variants: prod.variants.map((v) =>
            v.id === cartItem.variantId ? { ...v, stock: Math.max(0, v.stock - cartItem.quantity) } : v
          )
        }))
      );
    });

    // Add to orders stream
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status, trackingNumber: trackingNumber || order.trackingNumber } : order))
    );
  };

  // Conversational AI Dialogue Engine with Memory Slots
  const sendMessage = (userInput: string) => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);

    const lower = trimmed.toLowerCase();
    const newSlots = { ...activeSlots };

    // Intent slot extraction
    if (lower.includes('wedding')) newSlots.occasion = 'wedding';
    else if (lower.includes('cocktail')) newSlots.occasion = 'cocktail';
    else if (lower.includes('work') || lower.includes('office')) newSlots.occasion = 'workwear';

    if (lower.includes('blue')) newSlots.color = 'blue';
    else if (lower.includes('black') || lower.includes('noir')) newSlots.color = 'black';
    else if (lower.includes('green') || lower.includes('emerald')) newSlots.color = 'green';
    else if (lower.includes('champagne') || lower.includes('gold')) newSlots.color = 'champagne';

    if (lower.includes('under £100') || lower.includes('under 100') || lower.includes('less than 100')) {
      newSlots.maxPrice = 100;
    } else if (lower.includes('cheaper') || lower.includes('lower price')) {
      newSlots.maxPrice = (newSlots.maxPrice || 100) - 15;
    }

    if (lower.includes('uk 8') || lower.includes('size 8')) newSlots.size = 'UK 8';
    else if (lower.includes('uk 10') || lower.includes('size 10')) newSlots.size = 'UK 10';
    else if (lower.includes('uk 12') || lower.includes('size 12')) newSlots.size = 'UK 12';
    else if (lower.includes('uk 14') || lower.includes('size 14')) newSlots.size = 'UK 14';

    setActiveSlots(newSlots);

    // Filter catalogue products based on retained & updated slots
    let matches = products.filter((prod) => {
      if (newSlots.maxPrice && prod.price > newSlots.maxPrice) return false;
      if (newSlots.occasion && !prod.occasion.includes(newSlots.occasion)) return false;
      if (newSlots.color) {
        const hasColor = prod.colorways.some((c) => c.name.toLowerCase().includes(newSlots.color!));
        if (!hasColor) return false;
      }
      return true;
    });

    if (matches.length === 0) {
      // Fallback: match by occasion or category
      matches = products.slice(0, 3);
    }

    // Determine Assistant Response
    let replyText = '';
    let chips = ['Show more like this', 'Different colour', 'Lower price', 'Change size'];

    if (lower.includes('wedding') && !newSlots.color && !newSlots.maxPrice) {
      replyText = 'Of course! Do you have a preferred colour or budget?';
      chips = ['Something blue, under £100', 'Black tie elegant', 'Under £80', 'Show cocktail styles'];
      matches = [];
    } else if (newSlots.color && newSlots.maxPrice) {
      replyText = `Here are elegant ${newSlots.color} options within your £${newSlots.maxPrice} budget:`;
    } else if (lower.includes('cheaper') || lower.includes('lower price')) {
      replyText = `Here are stylish options at a lower price point (under £${newSlots.maxPrice}):`;
    } else if (lower.includes('size')) {
      replyText = 'We provide UK standard sizing (UK 8 to 16) with true-to-fit cuts. Which size can I check for you?';
      chips = ['Check UK 10', 'Check UK 12', 'Check UK 14', 'View Size Guide'];
    } else {
      replyText = 'Here are our curated bestsellers matching your request:';
    }

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toISOString(),
        matchingProducts: matches.length > 0 ? matches : undefined,
        actionChips: chips,
        intentSlots: newSlots
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 400);
  };

  const resetConversation = () => {
    setActiveSlots({});
    setMessages([
      {
        id: 'msg-init',
        sender: 'assistant',
        text: 'Hi! What are you shopping for today?',
        timestamp: new Date().toISOString(),
        actionChips: [
          'Find a dress',
          'Help me choose a size',
          'Shop by budget',
          'Find an outfit',
          'Show similar styles'
        ]
      }
    ]);
  };

  // Merchant AI Proposals Governance
  const approveProposal = (proposalId: string) => {
    const prop = proposals.find((p) => p.id === proposalId);
    if (!prop) return;

    // Apply stock delta
    const currentVariant = products
      .flatMap((p) => p.variants)
      .find((v) => v.id === prop.variantId);

    const oldStock = currentVariant ? currentVariant.stock : 0;
    const newStock = oldStock + prop.proposedQuantity;
    updateVariantStock(prop.variantId, newStock);

    setProposals((prev) => prev.map((p) => (p.id === proposalId ? { ...p, status: 'approved' } : p)));

    // Create Audit Log
    const logEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      action: 'Purchase Order Approval',
      target: `${prop.productTitle} (${prop.size}, ${prop.color})`,
      previousValue: `${oldStock} units in stock`,
      newValue: `+${prop.proposedQuantity} units reordered (Stock: ${newStock})`,
      userId: 'Marcus (Store Owner)',
      timestamp: new Date().toISOString(),
      status: 'approved'
    };
    setAuditLogs((prev) => [logEntry, ...prev]);
    setActiveProposal(null);
  };

  const rejectProposal = (proposalId: string, reason = 'Declined by merchant') => {
    setProposals((prev) => prev.map((p) => (p.id === proposalId ? { ...p, status: 'rejected' } : p)));
    const prop = proposals.find((p) => p.id === proposalId);
    if (prop) {
      setAuditLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          action: 'Proposal Rejected',
          target: `${prop.productTitle} (${prop.size})`,
          newValue: reason,
          userId: 'Marcus (Store Owner)',
          timestamp: new Date().toISOString(),
          status: 'rejected'
        },
        ...prev
      ]);
    }
    setActiveProposal(null);
  };

  const editProposalQuantity = (proposalId: string, newQuantity: number) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === proposalId
          ? {
              ...p,
              proposedQuantity: newQuantity,
              totalCost: newQuantity * p.unitCost,
              status: 'modified'
            }
          : p
      )
    );
  };

  const undoAction = (logId: string) => {
    setAuditLogs((prev) =>
      prev.map((log) => (log.id === logId ? { ...log, status: 'reverted' } : log))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        getVariant,
        updateVariantStock,
        cart,
        isBagOpen,
        setIsBagOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        holdSecondsRemaining,
        orders,
        createOrder,
        updateOrderStatus,
        isAssistantOpen,
        setIsAssistantOpen,
        messages,
        sendMessage,
        activeSlots,
        resetConversation,
        proposals,
        activeProposal,
        setActiveProposal,
        approveProposal,
        rejectProposal,
        editProposalQuantity,
        auditLogs,
        undoAction
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
