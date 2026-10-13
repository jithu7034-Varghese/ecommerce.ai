'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, RotateCcw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ChatProductCard } from './ChatProductCard';
import { VoiceInputButton } from './VoiceInputButton';

export function AIAssistantModal() {
  const { isAssistantOpen, setIsAssistantOpen, messages, sendMessage, resetConversation, activeSlots } = useStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAssistantOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAssistantOpen) {
        setIsAssistantOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAssistantOpen, setIsAssistantOpen]);

  if (!isAssistantOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;
    sendMessage(text);
    setInputText('');
  };

  const handleTranscript = (transcript: string) => {
    setInputText(transcript);
  };

  return (
    <div
      className="drawer-backdrop"
      onClick={() => setIsAssistantOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-assistant-heading"
    >
      <div
        className="drawer-panel"
        style={{
          maxWidth: '580px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FAFAF8',
          boxShadow: 'var(--shadow-modal)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--store-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--store-accent-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)'
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h2 id="ai-assistant-heading" style={{ fontSize: '1rem', fontWeight: 800 }}>
                  Personal Fashion Stylist
                </h2>
                <span
                  style={{
                    backgroundColor: '#EDE9FE',
                    color: 'var(--store-accent-primary)',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  DEMO ASSISTANT
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>
                Powered by Berachtech Conversational AI Engine
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={resetConversation}
              className="btn btn-secondary"
              style={{ padding: '4px 10px', height: '32px', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}
              title="Reset conversation state"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
            <button
              onClick={() => setIsAssistantOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                color: 'var(--store-text-muted)',
                borderRadius: 'var(--radius-sm)'
              }}
              aria-label="Close Assistant"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Retained Memory Banner (Slot Indicator) */}
        {Object.keys(activeSlots).length > 0 && (
          <div
            style={{
              padding: '6px 16px',
              backgroundColor: '#EDE9FE',
              borderBottom: '1px solid var(--store-accent-border)',
              fontSize: '0.6875rem',
              color: 'var(--store-accent-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}
          >
            <strong>Active Stylist Memory:</strong>
            {activeSlots.occasion && <span>Occasion: {activeSlots.occasion}</span>}
            {activeSlots.color && <span>• Colour: {activeSlots.color}</span>}
            {activeSlots.maxPrice && <span>• Budget: under £{activeSlots.maxPrice}</span>}
            {activeSlots.size && <span>• Size: {activeSlots.size}</span>}
          </div>
        )}

        {/* Dialogue Scroll Stream */}
        <div
          aria-live="polite"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start'
                }}
              >
                {/* Speech Bubble */}
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    backgroundColor: isUser ? 'var(--store-accent-primary)' : '#FFFFFF',
                    color: isUser ? '#FFFFFF' : 'var(--store-text-primary)',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.5,
                    border: isUser ? 'none' : '1px solid var(--store-border)'
                  }}
                >
                  {msg.text}
                </div>

                {/* Render Visual Product Cards horizontally */}
                {msg.matchingProducts && msg.matchingProducts.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '12px',
                      overflowX: 'auto',
                      width: '100%',
                      padding: '12px 0 6px',
                      marginTop: '6px'
                    }}
                  >
                    {msg.matchingProducts.map((prod) => (
                      <ChatProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                )}

                {/* Render Suggested Chips if present */}
                {msg.actionChips && msg.actionChips.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap',
                      marginTop: '10px'
                    }}
                  >
                    {msg.actionChips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleSend(chip)}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid var(--store-border)',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--store-text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 120ms ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--store-accent-primary)';
                          e.currentTarget.style.color = 'var(--store-accent-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--store-border)';
                          e.currentTarget.style.color = 'var(--store-text-secondary)';
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div
          style={{
            padding: '14px 16px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--store-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {/* Quick Refinement Action Pills */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
            {['Show more like this', 'Different colour', 'Lower price', 'Change size'].map((act) => (
              <button
                key={act}
                type="button"
                onClick={() => handleSend(act)}
                style={{
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #E4E4E7',
                  backgroundColor: '#F8FAFC',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--store-text-muted)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {act}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <VoiceInputButton onTranscript={handleTranscript} />

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for an outfit, style, colour, or budget..."
              style={{
                flex: 1,
                height: '42px',
                padding: '0 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--store-border)',
                fontSize: '0.875rem',
                backgroundColor: '#FAFAF8',
                color: 'var(--store-text-primary)'
              }}
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="btn btn-primary"
              style={{
                width: '42px',
                height: '42px',
                padding: 0,
                borderRadius: 'var(--radius-md)',
                backgroundColor: inputText.trim() ? 'var(--store-accent-primary)' : '#E4E4E7',
                borderColor: inputText.trim() ? 'var(--store-accent-primary)' : '#E4E4E7',
                cursor: inputText.trim() ? 'pointer' : 'default'
              }}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
