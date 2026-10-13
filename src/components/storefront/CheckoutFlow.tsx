'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, ShieldCheck, ArrowRight, ArrowLeft, Truck, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function CheckoutFlow() {
  const router = useRouter();
  const { cart, cartTotal, createOrder } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(cart.length > 0 ? 1 : 1);
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'priority'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Customer Delivery Info State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    city: '',
    postcode: ''
  });

  const deliveryFee = deliveryMethod === 'priority' ? 4.99 : 0.0;
  const grandTotal = cartTotal + deliveryFee;

  const handlePrefillDemo = () => {
    setFormData({
      fullName: 'Clara Higgins',
      email: 'clara.higgins@example.co.uk',
      street: '42 Kensington Church Street',
      city: 'London',
      postcode: 'W8 4DB'
    });
    setFormErrors({});
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.street.trim()) errors.street = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postcode.trim()) errors.postcode = 'Postcode is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToStep3 = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleConfirmPurchase = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const order = createOrder({
        customerName: formData.fullName,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        postcode: formData.postcode,
        deliveryMethod
      });

      // Navigate to order confirmation
      setTimeout(() => {
        router.push(`/checkout/confirmation?orderId=${encodeURIComponent(order.id)}`);
      }, 600);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center', maxWidth: '540px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px' }}>Your Shopping Bag is Empty</h1>
        <p style={{ color: 'var(--store-text-muted)', marginBottom: '24px' }}>
          Please add a garment to your bag before proceeding to checkout.
        </p>
        <Link href="/shop" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px', backgroundColor: '#FAFAF8', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Breadcrumb Steps Header (Master Amendment Section 11) */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: step === 1 ? 800 : 600,
                color: step >= 1 ? 'var(--store-accent-primary)' : 'var(--store-text-muted)'
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: step >= 1 ? 'var(--store-accent-primary)' : '#E4E4E7',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                1
              </span>
              <span>1. Bag Review</span>
            </div>

            <span style={{ color: '#D4D4D8' }}>&rarr;</span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: step === 2 ? 800 : 600,
                color: step >= 2 ? 'var(--store-accent-primary)' : 'var(--store-text-muted)'
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: step >= 2 ? 'var(--store-accent-primary)' : '#E4E4E7',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                2
              </span>
              <span>2. Delivery Details</span>
            </div>

            <span style={{ color: '#D4D4D8' }}>&rarr;</span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: step === 3 ? 800 : 600,
                color: step === 3 ? 'var(--store-accent-primary)' : 'var(--store-text-muted)'
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: step === 3 ? 'var(--store-accent-primary)' : '#E4E4E7',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                3
              </span>
              <span>3. Review & Confirm</span>
            </div>
          </div>
        </div>

        {/* Guest Checkout Banner */}
        <div
          style={{
            backgroundColor: '#EDE9FE',
            border: '1px solid var(--store-accent-border)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 20px',
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--store-accent-primary)' }} />
            <div>
              <strong style={{ color: 'var(--store-accent-primary)', fontSize: '0.875rem' }}>
                Guest Checkout Active
              </strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--store-text-secondary)' }}>
                No account or password creation required. Simulated zero-risk demo transaction.
              </div>
            </div>
          </div>

          {step === 2 && (
            <button
              type="button"
              onClick={handlePrefillDemo}
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--store-accent-primary)',
                border: '1px solid var(--store-accent-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 14px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={13} />
              <span>Prefill Demo Customer</span>
            </button>
          )}
        </div>

        {/* Main Content Split: Form vs Order Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* STEP 1: Bag Review */}
          {step === 1 && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--store-border)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>Step 1: Review Your Items</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--store-border)' }}>
                    <img src={item.image} alt={item.title} style={{ width: '64px', height: '80px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-muted)' }}>
                        Colour: <strong>{item.color}</strong> • Size: <strong>{item.size}</strong>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', marginTop: '4px' }}>
                        Qty: {item.quantity} × £{item.price.toFixed(2)} = £{(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-primary"
                style={{ width: '100%', height: '48px', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
              >
                <span>Continue to Delivery Information</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: Delivery Details Form */}
          {step === 2 && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--store-border)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>Step 2: Delivery Address</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label htmlFor="fullName" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '4px' }}>
                    Full Recipient Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Clara Higgins"
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 12px',
                      borderRadius: 'var(--radius-md)',
                      border: formErrors.fullName ? '1.5px solid #DC2626' : '1px solid var(--store-border)',
                      fontSize: '0.875rem'
                    }}
                  />
                  {formErrors.fullName && <div style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '2px' }}>{formErrors.fullName}</div>}
                </div>

                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '4px' }}>
                    Email Address (for order receipt) *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. clara.higgins@example.co.uk"
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 12px',
                      borderRadius: 'var(--radius-md)',
                      border: formErrors.email ? '1.5px solid #DC2626' : '1px solid var(--store-border)',
                      fontSize: '0.875rem'
                    }}
                  />
                  {formErrors.email && <div style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '2px' }}>{formErrors.email}</div>}
                </div>

                <div>
                  <label htmlFor="street" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '4px' }}>
                    Street Address *
                  </label>
                  <input
                    id="street"
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="e.g. 42 Kensington Church Street"
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 12px',
                      borderRadius: 'var(--radius-md)',
                      border: formErrors.street ? '1.5px solid #DC2626' : '1px solid var(--store-border)',
                      fontSize: '0.875rem'
                    }}
                  />
                  {formErrors.street && <div style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '2px' }}>{formErrors.street}</div>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label htmlFor="city" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '4px' }}>
                      City / Town *
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. London"
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 12px',
                        borderRadius: 'var(--radius-md)',
                        border: formErrors.city ? '1.5px solid #DC2626' : '1px solid var(--store-border)',
                        fontSize: '0.875rem'
                      }}
                    />
                    {formErrors.city && <div style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '2px' }}>{formErrors.city}</div>}
                  </div>

                  <div>
                    <label htmlFor="postcode" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '4px' }}>
                      UK Postcode *
                    </label>
                    <input
                      id="postcode"
                      type="text"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      placeholder="e.g. W8 4DB"
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 12px',
                        borderRadius: 'var(--radius-md)',
                        border: formErrors.postcode ? '1.5px solid #DC2626' : '1px solid var(--store-border)',
                        fontSize: '0.875rem'
                      }}
                    />
                    {formErrors.postcode && <div style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '2px' }}>{formErrors.postcode}</div>}
                  </div>
                </div>

                {/* Shipping Method Selection */}
                <div style={{ marginTop: '8px' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, marginBottom: '8px' }}>Select Delivery Speed</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: deliveryMethod === 'standard' ? '2px solid var(--store-accent-primary)' : '1px solid var(--store-border)',
                        backgroundColor: deliveryMethod === 'standard' ? 'var(--store-accent-subtle)' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="radio"
                          name="shipping"
                          checked={deliveryMethod === 'standard'}
                          onChange={() => setDeliveryMethod('standard')}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Standard UK Delivery (2–3 days)</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>Royal Mail Tracked 48</div>
                        </div>
                      </div>
                      <span style={{ fontWeight: 700, color: '#059669', fontSize: '0.875rem' }}>FREE</span>
                    </label>

                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: deliveryMethod === 'priority' ? '2px solid var(--store-accent-primary)' : '1px solid var(--store-border)',
                        backgroundColor: deliveryMethod === 'priority' ? 'var(--store-accent-subtle)' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="radio"
                          name="shipping"
                          checked={deliveryMethod === 'priority'}
                          onChange={() => setDeliveryMethod('priority')}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Next-Day Priority Courier (Tomorrow)</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--store-text-muted)' }}>DPD Premium Express by 1:00 PM</div>
                        </div>
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>£4.99</span>
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                  style={{ flex: 1, height: '48px', borderRadius: 'var(--radius-md)' }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Bag</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextToStep3}
                  className="btn btn-primary"
                  style={{ flex: 2, height: '48px', borderRadius: 'var(--radius-md)' }}
                >
                  <span>Review & Payment</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Confirm */}
          {step === 3 && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--store-border)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>Step 3: Review & Finalize</h2>

              {/* Delivery Destination Summary */}
              <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--store-border)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '0.875rem' }}>Delivery To:</strong>
                  <button
                    onClick={() => setStep(2)}
                    style={{ background: 'none', border: 'none', color: 'var(--store-accent-primary)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--store-text-secondary)', lineHeight: 1.5 }}>
                  {formData.fullName} • {formData.email}<br />
                  {formData.street}, {formData.city}, {formData.postcode}
                </div>
              </div>

              {/* Simulated Payment Safeguard Box */}
              <div style={{ padding: '16px', backgroundColor: '#EDE9FE', borderRadius: 'var(--radius-md)', border: '1px solid var(--store-accent-border)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--store-accent-primary)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '4px' }}>
                  <CreditCard size={18} />
                  <span>Simulated Test Payment</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--store-text-secondary)', lineHeight: 1.5 }}>
                  This is a test demo. Simulated Visa ending in <strong>4242</strong> is pre-authorized. No real credit card information will ever be requested or billed.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn btn-secondary"
                  style={{ flex: 1, height: '48px', borderRadius: 'var(--radius-md)' }}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmPurchase}
                  className="btn btn-primary"
                  style={{
                    flex: 2,
                    height: '52px',
                    fontSize: '1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSubmitting ? '#A1A1AA' : 'var(--store-accent-primary)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <Check size={18} />
                      <span>Confirm Simulated Purchase — £{grandTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Persistent Order Summary Rail */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--store-border)', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '16px', borderBottom: '1px solid var(--store-border)', paddingBottom: '12px' }}>
              Order Breakdown
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{item.quantity}× {item.title}</span>
                    <div style={{ color: 'var(--store-text-muted)', fontSize: '0.75rem' }}>{item.size} • {item.color}</div>
                  </div>
                  <span style={{ fontWeight: 700 }}>£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--store-border)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--store-text-muted)' }}>Items Subtotal</span>
                <span style={{ fontWeight: 600 }}>£{cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--store-text-muted)' }}>Delivery Fee</span>
                <span style={{ fontWeight: 600, color: deliveryFee === 0 ? '#059669' : 'inherit' }}>
                  {deliveryFee === 0 ? 'FREE' : `£${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--store-border)', paddingTop: '10px', fontSize: '1.125rem', fontWeight: 800 }}>
                <span>Total to Pay</span>
                <span style={{ color: 'var(--store-accent-primary)' }}>£{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
