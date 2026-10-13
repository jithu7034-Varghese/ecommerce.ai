import { Product } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-azure-maxi',
    title: 'Azure Pleated Wrap Maxi Dress',
    subtitle: 'Flowing accordion pleats with an adjustable crossover waist',
    description: 'Cut from fluid recycled satin crepe, the Azure Pleated Wrap Maxi cascades effortlessly from a gentle V-neckline into razor-sharp accordion pleats. A self-tie waist belt allows bespoke contouring, making it an exquisite choice for weddings and celebratory receptions.',
    price: 95.0,
    originalPrice: 120.0,
    category: 'evening',
    occasion: ['wedding', 'evening', 'gala', 'celebration'],
    fabric: '100% Recycled Poly-Satin Crepe with silk hand-feel',
    care: 'Dry clean recommended. Cool iron on reverse with pressing cloth.',
    fitAdvice: 'True to size with gentle drape through hips. Wrap belt accommodates half-sizes.',
    modelMeasurements: "Model is 5'9\" (175cm), bust 33\", waist 25\", hips 36\" wearing UK 10.",
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    newArrival: true,
    colorways: [
      {
        name: 'Sapphire Blue',
        hex: '#1D4ED8',
        previewImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Midnight Navy',
        hex: '#1E293B',
        previewImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Forest Green',
        hex: '#065F46',
        previewImage: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    availableSizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14'],
    variants: [
      { id: 'AZU-BLU-08', productId: 'p-azure-maxi', color: 'Sapphire Blue', size: 'UK 8', stock: 4, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-BLU-8' },
      { id: 'AZU-BLU-10', productId: 'p-azure-maxi', color: 'Sapphire Blue', size: 'UK 10', stock: 0, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-BLU-10' }, // Out of stock for Test C!
      { id: 'AZU-BLU-12', productId: 'p-azure-maxi', color: 'Sapphire Blue', size: 'UK 12', stock: 3, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-BLU-12' },
      { id: 'AZU-BLU-14', productId: 'p-azure-maxi', color: 'Sapphire Blue', size: 'UK 14', stock: 5, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-BLU-14' },
      { id: 'AZU-NAV-08', productId: 'p-azure-maxi', color: 'Midnight Navy', size: 'UK 8', stock: 3, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-NAV-8' },
      { id: 'AZU-NAV-10', productId: 'p-azure-maxi', color: 'Midnight Navy', size: 'UK 10', stock: 6, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-NAV-10' },
      { id: 'AZU-NAV-12', productId: 'p-azure-maxi', color: 'Midnight Navy', size: 'UK 12', stock: 4, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-NAV-12' },
      { id: 'AZU-NAV-14', productId: 'p-azure-maxi', color: 'Midnight Navy', size: 'UK 14', stock: 2, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-NAV-14' },
      { id: 'AZU-GRN-08', productId: 'p-azure-maxi', color: 'Forest Green', size: 'UK 8', stock: 5, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-GRN-8' },
      { id: 'AZU-GRN-10', productId: 'p-azure-maxi', color: 'Forest Green', size: 'UK 10', stock: 4, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-GRN-10' },
      { id: 'AZU-GRN-12', productId: 'p-azure-maxi', color: 'Forest Green', size: 'UK 12', stock: 3, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-GRN-12' },
      { id: 'AZU-GRN-14', productId: 'p-azure-maxi', color: 'Forest Green', size: 'UK 14', stock: 4, lowStockThreshold: 3, price: 95.0, sku: 'SKU-AZU-GRN-14' }
    ]
  },
  {
    id: 'p-noir-halter',
    title: 'Noir Pleated Halter Midi Dress',
    subtitle: 'Sculpted high-neck silhouette with open crossover back',
    description: 'An enduring icon of modern cocktail elegance. The Noir Halter features knife pleating across the midi skirt and a statuesque halter neckline fastened with delicate covered buttons. Designed for evening parties, black-tie dinners, and celebrations.',
    price: 88.0,
    category: 'cocktail',
    occasion: ['evening', 'cocktail', 'party', 'dinner'],
    fabric: 'Chiffon Georgette exterior with silk-blend interior lining',
    care: 'Specialist dry clean only.',
    fitAdvice: 'Tailored through the bust and ribcage. If between bust sizes, we recommend sizing up.',
    modelMeasurements: "Model is 5'10\" (178cm) wearing UK 10.",
    rating: 4.8,
    reviewsCount: 29,
    featured: true,
    newArrival: true,
    colorways: [
      {
        name: 'Onyx Black',
        hex: '#09090B',
        previewImage: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Emerald Green',
        hex: '#047857',
        previewImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    availableSizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14'],
    variants: [
      { id: 'NOI-BLK-08', productId: 'p-noir-halter', color: 'Onyx Black', size: 'UK 8', stock: 5, lowStockThreshold: 3, price: 88.0, sku: 'SKU-NOI-BLK-8' },
      { id: 'NOI-BLK-10', productId: 'p-noir-halter', color: 'Onyx Black', size: 'UK 10', stock: 4, lowStockThreshold: 3, price: 88.0, sku: 'SKU-NOI-BLK-10' },
      { id: 'NOI-BLK-12', productId: 'p-noir-halter', color: 'Onyx Black', size: 'UK 12', stock: 6, lowStockThreshold: 3, price: 88.0, sku: 'SKU-NOI-BLK-12' },
      { id: 'NOI-BLK-14', productId: 'p-noir-halter', color: 'Onyx Black', size: 'UK 14', stock: 3, lowStockThreshold: 3, price: 88.0, sku: 'SKU-NOI-BLK-14' },
      { id: 'NOI-GRN-08', productId: 'p-noir-halter', color: 'Emerald Green', size: 'UK 8', stock: 0, lowStockThreshold: 3, price: 88.0, sku: 'SKU-NOI-GRN-8' }, // For Test B/C!
      { id: 'NOI-GRN-10', productId: 'p-noir-halter', color: 'Emerald Green', size: 'UK 10', stock: 4, lowStockThreshold: 3, price: 88.0, sku: 'SKU-NOI-GRN-10' },
      { id: 'NOI-GRN-12', productId: 'p-noir-halter', color: 'Emerald Green', size: 'UK 12', stock: 3, lowStockThreshold: 3, price: 88.0, sku: 'SKU-NOI-GRN-12' },
      { id: 'NOI-GRN-14', productId: 'p-noir-halter', color: 'Emerald Green', size: 'UK 14', stock: 4, lowStockThreshold: 3, price: 88.0, sku: 'SKU-NOI-GRN-14' } // Test B Target!
    ]
  },
  {
    id: 'p-emerald-slip',
    title: 'Emerald Velvet Cowl Slip Dress',
    subtitle: 'Rich plush velvet cut on the bias with adjustable crossover straps',
    description: 'Impeccably draped in tactile jewel-tone emerald velvet, this slip dress falls in a clean fluid column. Features a softly curved cowl neckline and low backline with delicate self-ties.',
    price: 92.0,
    category: 'cocktail',
    occasion: ['cocktail', 'evening', 'party', 'dinner'],
    fabric: '82% Viscose, 18% Silk Velvet with luminous lustre',
    care: 'Dry clean only. Steam from interior.',
    fitAdvice: 'Bias-cut drape skims the figure gently without clinging.',
    modelMeasurements: "Model is 5'9\" (175cm) wearing UK 8.",
    rating: 4.7,
    reviewsCount: 22,
    colorways: [
      {
        name: 'Emerald Green',
        hex: '#065F46',
        previewImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Midnight Black',
        hex: '#0F172A',
        previewImage: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    availableSizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14'],
    variants: [
      { id: 'EME-GRN-08', productId: 'p-emerald-slip', color: 'Emerald Green', size: 'UK 8', stock: 5, lowStockThreshold: 3, price: 92.0, sku: 'SKU-EME-GRN-8' }, // Test D Target!
      { id: 'EME-GRN-10', productId: 'p-emerald-slip', color: 'Emerald Green', size: 'UK 10', stock: 4, lowStockThreshold: 3, price: 92.0, sku: 'SKU-EME-GRN-10' },
      { id: 'EME-GRN-12', productId: 'p-emerald-slip', color: 'Emerald Green', size: 'UK 12', stock: 3, lowStockThreshold: 3, price: 92.0, sku: 'SKU-EME-GRN-12' },
      { id: 'EME-GRN-14', productId: 'p-emerald-slip', color: 'Emerald Green', size: 'UK 14', stock: 2, lowStockThreshold: 3, price: 92.0, sku: 'SKU-EME-GRN-14' }
    ]
  },
  {
    id: 'p-sapphire-midi',
    title: 'Sapphire Satin Bias Midi Dress',
    subtitle: 'Classic slip silhouette in rich heavyweight silk satin',
    description: 'A timeless staple crafted for quiet luxury. Minimalist lines, graceful movement, and an alluring midnight-sapphire sheen make this piece infinitely versatile across wedding receptions, gallery openings, and romantic evenings.',
    price: 85.0,
    category: 'evening',
    occasion: ['wedding', 'evening', 'cocktail', 'reception'],
    fabric: '100% Heavyweight Mulberry Silk Touch Poly-Satin',
    care: 'Hand wash in cold water or eco-dry clean.',
    fitAdvice: 'Bias cut skims contours naturally. Fits true to UK sizing standards.',
    modelMeasurements: "Model is 5'9\" (176cm) wearing UK 10.",
    rating: 4.9,
    reviewsCount: 45,
    featured: true,
    colorways: [
      {
        name: 'Sapphire Blue',
        hex: '#1E3A8A',
        previewImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Midnight Navy',
        hex: '#0F172A',
        previewImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    availableSizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14'],
    variants: [
      { id: 'SAP-BLU-08', productId: 'p-sapphire-midi', color: 'Sapphire Blue', size: 'UK 8', stock: 4, lowStockThreshold: 3, price: 85.0, sku: 'SKU-SAP-BLU-8' },
      { id: 'SAP-BLU-10', productId: 'p-sapphire-midi', color: 'Sapphire Blue', size: 'UK 10', stock: 2, lowStockThreshold: 3, price: 85.0, sku: 'SKU-SAP-BLU-10' }, // Urgent low stock for Test G alert!
      { id: 'SAP-BLU-12', productId: 'p-sapphire-midi', color: 'Sapphire Blue', size: 'UK 12', stock: 5, lowStockThreshold: 3, price: 85.0, sku: 'SKU-SAP-BLU-12' },
      { id: 'SAP-BLU-14', productId: 'p-sapphire-midi', color: 'Sapphire Blue', size: 'UK 14', stock: 6, lowStockThreshold: 3, price: 85.0, sku: 'SKU-SAP-BLU-14' }
    ]
  },
  {
    id: 'p-ivory-blazer',
    title: 'Tailored Ivory Crepe Tuxedo Blazer',
    subtitle: 'Sharp peaked lapels with satin-covered buttons and structured shoulders',
    description: 'Precision tailoring meets feminine elegance. Cut in crisp ivory double-crepe with tonal satin trim on peaked lapels, this blazer effortlessly elevates evening trousers or can be worn closed as an architectural mini-dress.',
    price: 125.0,
    category: 'workwear',
    occasion: ['workwear', 'evening', 'formal', 'gala'],
    fabric: 'Wool-blend double crepe with satin lapel facing',
    care: 'Dry clean only.',
    fitAdvice: 'Tailored feminine silhouette with structured shoulders.',
    modelMeasurements: "Model is 5'11\" wearing UK 10.",
    rating: 5.0,
    reviewsCount: 16,
    colorways: [
      {
        name: 'Ivory White',
        hex: '#F8FAFC',
        previewImage: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Onyx Black',
        hex: '#09090B',
        previewImage: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    availableSizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'],
    variants: [
      { id: 'IVO-WHT-08', productId: 'p-ivory-blazer', color: 'Ivory White', size: 'UK 8', stock: 3, lowStockThreshold: 2, price: 125.0, sku: 'SKU-IVO-WHT-8' },
      { id: 'IVO-WHT-10', productId: 'p-ivory-blazer', color: 'Ivory White', size: 'UK 10', stock: 4, lowStockThreshold: 2, price: 125.0, sku: 'SKU-IVO-WHT-10' },
      { id: 'IVO-WHT-12', productId: 'p-ivory-blazer', color: 'Ivory White', size: 'UK 12', stock: 5, lowStockThreshold: 2, price: 125.0, sku: 'SKU-IVO-WHT-12' },
      { id: 'IVO-WHT-14', productId: 'p-ivory-blazer', color: 'Ivory White', size: 'UK 14', stock: 2, lowStockThreshold: 2, price: 125.0, sku: 'SKU-IVO-WHT-14' },
      { id: 'IVO-WHT-16', productId: 'p-ivory-blazer', color: 'Ivory White', size: 'UK 16', stock: 3, lowStockThreshold: 2, price: 125.0, sku: 'SKU-IVO-WHT-16' }
    ]
  },
  {
    id: 'p-silk-blouse',
    title: 'Champagne Hammered Silk Blouse',
    subtitle: 'Relaxed boat-neck with elegant bishop sleeves and French cuffs',
    description: 'Crafted from pure sandwashed silk with a soft hammered sheen. The relaxed drape pairs seamlessly with tailored trousers or denim for effortless daytime or evening luxury.',
    price: 68.0,
    category: 'casual',
    occasion: ['casual', 'workwear', 'dinner'],
    fabric: '100% Sandwashed Silk Charmeuse',
    care: 'Delicate hand wash or gentle green dry clean.',
    fitAdvice: 'Fluid, relaxed silhouette. Order your usual size.',
    modelMeasurements: "Model is 5'9\" wearing UK 8.",
    rating: 4.8,
    reviewsCount: 31,
    colorways: [
      {
        name: 'Champagne Gold',
        hex: '#FDE68A',
        previewImage: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Pearl White',
        hex: '#FFFFFF',
        previewImage: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    availableSizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'],
    variants: [
      { id: 'SLK-CHP-08', productId: 'p-silk-blouse', color: 'Champagne Gold', size: 'UK 8', stock: 6, lowStockThreshold: 3, price: 68.0, sku: 'SKU-SLK-CHP-8' },
      { id: 'SLK-CHP-10', productId: 'p-silk-blouse', color: 'Champagne Gold', size: 'UK 10', stock: 5, lowStockThreshold: 3, price: 68.0, sku: 'SKU-SLK-CHP-10' },
      { id: 'SLK-CHP-12', productId: 'p-silk-blouse', color: 'Champagne Gold', size: 'UK 12', stock: 4, lowStockThreshold: 3, price: 68.0, sku: 'SKU-SLK-CHP-12' },
      { id: 'SLK-CHP-14', productId: 'p-silk-blouse', color: 'Champagne Gold', size: 'UK 14', stock: 3, lowStockThreshold: 3, price: 68.0, sku: 'SKU-SLK-CHP-14' },
      { id: 'SLK-CHP-16', productId: 'p-silk-blouse', color: 'Champagne Gold', size: 'UK 16', stock: 4, lowStockThreshold: 3, price: 68.0, sku: 'SKU-SLK-CHP-16' }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: '#BER-84218',
    customerName: 'Maya Lin',
    email: 'maya.lin@example.com',
    shippingAddress: {
      street: '14 St. Ann Square',
      city: 'Manchester',
      postcode: 'M2 7EF',
      country: 'United Kingdom'
    },
    deliveryMethod: 'standard' as const,
    deliveryFee: 0,
    items: [
      {
        id: 'c-84218-1',
        productId: 'p-noir-halter',
        variantId: 'NOI-BLK-12',
        title: 'Noir Pleated Halter Midi Dress',
        color: 'Onyx Black',
        size: 'UK 12' as const,
        price: 88.0,
        image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1000&q=80',
        quantity: 1
      }
    ],
    subtotal: 88.0,
    total: 88.0,
    status: 'dispatched' as const,
    trackingNumber: 'GB-ROYAL-84218',
    createdAt: '2026-10-13T08:15:00Z',
    paymentMethod: 'Simulated Card (Demo)' as const
  },
  {
    id: '#BER-84217',
    customerName: 'Liam Thorne',
    email: 'liam.thorne@example.com',
    shippingAddress: {
      street: '7 Brunswick Court',
      city: 'Liverpool',
      postcode: 'L3 4FP',
      country: 'United Kingdom'
    },
    deliveryMethod: 'priority' as const,
    deliveryFee: 4.99,
    items: [
      {
        id: 'c-84217-1',
        productId: 'p-emerald-slip',
        variantId: 'EME-GRN-10',
        title: 'Emerald Velvet Cowl Slip Dress',
        color: 'Emerald Green',
        size: 'UK 10' as const,
        price: 92.0,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
        quantity: 1
      }
    ],
    subtotal: 92.0,
    total: 96.99,
    status: 'packed' as const,
    createdAt: '2026-10-13T09:30:00Z',
    paymentMethod: 'Simulated Card (Demo)' as const
  }
];

export const INITIAL_AI_PROPOSALS = [
  {
    id: 'prop-sap-10',
    variantId: 'SAP-BLU-10',
    productTitle: 'Sapphire Satin Bias Midi Dress',
    color: 'Sapphire Blue',
    size: 'UK 10' as const,
    supplier: 'Atelier Silk Co.',
    proposedQuantity: 25,
    unitCost: 25.0,
    totalCost: 625.0,
    what: 'Create a simulated Purchase Order for 25 units of Sapphire Satin Bias Midi Dress (Size UK 10).',
    why: 'Current available stock is only 2 units. Recent simulated 7-day velocity is 3.8 units/day. Depletion will occur within ~12 hours. Supplier delivery lead time is 4 business days.',
    impact: 'Prevents an estimated £2,125.00 in lost revenue and maintains search conversion for this bestselling blue evening dress.',
    limitations: 'Based on simulated historical sales velocity; unexpected weather or external events may cause variance.',
    status: 'pending' as const,
    timestamp: '2026-10-13T10:30:00Z',
    urgency: 'high' as const
  }
];
