'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  X,
  Send,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Package,
  Users,
  Compass,
  Zap,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  metricsSnippet?: { label: string; value: string; delta?: string }[];
  actionLink?: { label: string; href: string };
}

interface AskCommerceAICopilotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AskCommerceAICopilot({ isOpen, onClose }: AskCommerceAICopilotProps) {
  const { products, orders, proposals, setActiveProposal } = useStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: "Good day, Marcus. I am your Commerce Intelligence Copilot. How can I assist with store operations, financial margins, or customer retention today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickQuestions = [
    'Which products should I restock?',
    'What are my biggest opportunities this week?',
    'Which customers are likely to stop buying?',
    'How can I improve my conversion rate?',
    'Which products have highest profit margins?'
  ];

  const handleSend = (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    const userMsg: CopilotMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    const lower = q.toLowerCase();
    let reply = '';
    let metrics: { label: string; value: string; delta?: string }[] | undefined = undefined;
    let link: { label: string; href: string } | undefined = undefined;

    if (lower.includes('restock') || lower.includes('inventory') || lower.includes('stock')) {
      reply =
        'Based on trailing 7-day sell-through, your Azure Wrap Maxi Dress in UK 10 and UK 12 requires immediate replenishment. Current stock is 4 units and 6 units respectively, representing under 4 days of inventory at 4.2 units/day velocity. Harrington Mill requires a 5-day lead time.';
      metrics = [
        { label: 'Stockout Risk', value: 'Critical (3.8 Days)', delta: 'Action Needed' },
        { label: 'Recommended PO', value: '30 Units', delta: '£2,700 Cost' },
        { label: 'Expected Gross Margin', value: '68%', delta: '£5,760 Revenue' }
      ];
      link = { label: 'Review Inventory Matrix & PO Proposal', href: '/merchant/inventory' };
    } else if (lower.includes('opportunity') || lower.includes('opportunities')) {
      reply =
        'The Commerce Opportunity Radar identifies three high-yield opportunities: 1) Emerald Velvet Slip Dress demand is surging +38% due to cocktail season, 2) Halter midi dress cart abandonment is recoverable via concierge styling, and 3) The Ivory Crepe Blazer has price elasticity room for a +£10 margin adjustment.';
      metrics = [
        { label: 'Velvet Search Surge', value: '+38%', delta: 'High Intent' },
        { label: 'Gross Margin Upside', value: '+£3,400', delta: 'Simulated' },
        { label: 'Model Confidence', value: '94%', delta: 'Calibrated' }
      ];
      link = { label: 'Open Commerce Opportunity Radar', href: '/merchant#radar' };
    } else if (lower.includes('customer') || lower.includes('churn') || lower.includes('stop buying')) {
      reply =
        'Our churn prediction model flags Maya Lin (2 lifetime orders, £176 total spend) as reaching 62% churn risk after 45 days of inactivity without a return or engagement. Customer 360 suggests an automated concierge outreach featuring the newly dropped Autumn Velvet capsule.';
      metrics = [
        { label: 'Shoppers at Risk', value: '3 VIP Customers', delta: 'High Value' },
        { label: 'Recoverable LTV', value: '£850.00', delta: 'Est. GMV' },
        { label: 'Preferred Style', value: 'Cocktail Halter Midis' }
      ];
      link = { label: 'Inspect Customer 360 Profile', href: '/merchant/customers' };
    } else if (lower.includes('conversion') || lower.includes('rate')) {
      reply =
        'Storewide conversion is currently 3.42% (+0.38% vs last month). Customers interacting with our AI Stylist convert at 14.2%—a 4.1x lift over static browsing. We recommend spotlighting the "Shop with AI" hero entry point to direct more traffic through guided recommendations.';
      metrics = [
        { label: 'Overall Conversion', value: '3.42%', delta: '+0.38%' },
        { label: 'AI Stylist Conversion', value: '14.2%', delta: '4.1x Lift' },
        { label: 'Avg Basket Size', value: '1.4 Units', delta: '+18%' }
      ];
      link = { label: 'Run Conversion Scenario in Digital Twin', href: '/merchant/digital-twin' };
    } else if (lower.includes('margin') || lower.includes('profit')) {
      reply =
        'Your highest net contribution garments are the Ivory Crepe Blazer (73.2% gross margin) and the Emerald Velvet Slip Dress (71.0% gross margin). Evening Maxi dresses generate 54.2% of total store revenue with a blended 68.4% gross margin.';
      metrics = [
        { label: 'Top Margin Garment', value: 'Ivory Crepe Blazer (73.2%)' },
        { label: 'Storewide Gross Margin', value: '68.4%', delta: '+1.2%' },
        { label: 'Net Contribution Margin', value: '31.8%', delta: '+2.4%' }
      ];
      link = { label: 'View Financial & Operational Analytics', href: '/merchant/reports' };
    } else {
      reply =
        'I have analyzed your live store catalogue and order telemetry. Sales are up 12.4% month-to-date with 10 pending orders. The primary operational priority is replenishing low-stock bestseller variants before the weekend peak.';
      metrics = [
        { label: 'Current Sales Velocity', value: '+12.4%', delta: 'Healthy' },
        { label: 'Active Orders', value: `${orders.length} Live`, delta: 'Operational' }
      ];
      link = { label: 'Open Merchant Command Centre', href: '/merchant' };
    }

    setTimeout(() => {
      const assistantMsg: CopilotMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metricsSnippet: metrics,
        actionLink: link
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 350);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ask Commerce AI Copilot"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '85vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-modal)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--merchant-card-border)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            backgroundColor: '#160B22',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #2D1445'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--store-accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={16} style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
                Ask Commerce AI — Executive Copilot
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#D6D0E0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Simulated Store Telemetry</span>
                <span>•</span>
                <span style={{ color: '#A7F3D0' }}>Live RAG Intelligence</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9CA3AF',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close Copilot"
          >
            <X size={20} />
          </button>
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                transition: 'all 120ms ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--store-accent-primary)';
                e.currentTarget.style.color = 'var(--store-accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.color = '#334155';
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            minHeight: '300px'
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '82%',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  backgroundColor: msg.sender === 'user' ? 'var(--store-accent-primary)' : '#F1F5F9',
                  color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                  borderBottomRightRadius: msg.sender === 'user' ? '2px' : 'var(--radius-lg)',
                  borderBottomLeftRadius: msg.sender === 'assistant' ? '2px' : 'var(--radius-lg)'
                }}
              >
                {msg.text}
              </div>

              {/* Metrics Pill Grid if returned */}
              {msg.metricsSnippet && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${msg.metricsSnippet.length}, 1fr)`,
                    gap: '10px',
                    marginTop: '10px',
                    width: '82%'
                  }}
                >
                  {msg.metricsSnippet.map((met, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 12px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <div style={{ fontSize: '0.6875rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>
                        {met.label}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0F172A', marginTop: '2px' }}>
                        {met.value}
                      </div>
                      {met.delta && (
                        <div style={{ fontSize: '0.6875rem', color: 'var(--store-accent-primary)', fontWeight: 700 }}>
                          {met.delta}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Link Button if returned */}
              {msg.actionLink && (
                <div style={{ marginTop: '10px' }}>
                  <Link
                    href={msg.actionLink.href}
                    onClick={onClose}
                    className="btn btn-primary"
                    style={{ height: '34px', fontSize: '0.75rem', padding: '0 14px' }}
                  >
                    <span>{msg.actionLink.label}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              )}

              <span style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '4px' }}>
                {msg.timestamp}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--merchant-card-border)',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about sales, margin, inventory, or retention..."
            style={{
              flex: 1,
              height: '44px',
              padding: '0 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--merchant-card-border)',
              backgroundColor: '#F8FAFC',
              fontSize: '0.875rem'
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ height: '44px', width: '48px', padding: 0 }}
            aria-label="Send query"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
