/**
 * Sample Offers Data for Testing
 */

import {
  Offer,
  OfferVerificationStatus,
  PartnerType,
  Partner,
  OfferLink,
} from '../models/Offer';

// Sample partners
const samplePartners: Partner[] = [
  {
    id: '1',
    name: 'HDFC Bank',
    type: PartnerType.BANK,
  },
  {
    id: '2',
    name: 'Taj Hotels',
    type: PartnerType.HOTEL,
  },
  {
    id: '3',
    name: 'Emirates',
    type: PartnerType.AIRLINE,
  },
  {
    id: '4',
    name: 'Amazon',
    type: PartnerType.RETAIL,
  },
  {
    id: '5',
    name: 'Swiggy',
    type: PartnerType.RESTAURANT,
  },
];

// Sample offers
export const sampleOffers: Offer[] = [
  {
    id: 'offer-1',
    title: 'HDFC Infinia Credit Card - Welcome Bonus',
    shortDescription:
      'Earn 10,000 bonus reward points on spending ₹4,00,000 in first 90 days',
    fullDescription:
      'Get 10,000 reward points as welcome bonus when you spend ₹4,00,000 within 90 days of card issuance. Plus, earn 5 reward points per ₹150 spent on all categories. Annual fee: ₹12,500 + GST.',
    links: [
      {
        url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia',
        label: 'Apply Now',
        type: 'apply',
      },
      {
        url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia/features',
        label: 'View Features',
        type: 'details',
      },
      {
        url: 'https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?path=/Common/Channel/WEB/PDF/Infinia_MITC.pdf',
        label: 'Terms & Conditions',
        type: 'terms',
      },
    ],
    expiryDate: new Date('2025-12-31'),
    isActive: true,
    verificationStatus: OfferVerificationStatus.VERIFIED,
    verifiedBy: 'admin',
    verifiedAt: new Date('2024-11-15'),
    partners: [samplePartners[0]],
    primaryPartner: samplePartners[0],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-15'),
    createdBy: 'admin',
    isPublished: true,
    publishedAt: new Date('2024-11-15'),
    tags: ['credit-card', 'welcome-bonus', 'premium'],
    category: 'Credit Cards',
    viewCount: 245,
    clickCount: 89,
    savedCount: 34,
  },
  {
    id: 'offer-2',
    title: 'Taj Hotels - Stay 3 Nights, Pay for 2',
    shortDescription:
      'Book 3 nights and get 1 night free at participating Taj properties across India',
    fullDescription:
      'Exclusive offer for cardholders: Book a 3-night stay at any participating Taj hotel and pay only for 2 nights. Includes complimentary breakfast and late checkout. Valid for bookings made through our portal.',
    links: [
      {
        url: 'https://www.tajhotels.com/en-in/offers/',
        label: 'View Offer',
        type: 'website',
      },
      {
        url: 'https://www.tajhotels.com/en-in/book-a-stay/',
        label: 'Book Now',
        type: 'apply',
      },
    ],
    expiryDate: new Date('2025-03-31'),
    isActive: true,
    verificationStatus: OfferVerificationStatus.VERIFIED,
    verifiedBy: 'admin',
    verifiedAt: new Date('2024-11-10'),
    partners: [samplePartners[1], samplePartners[0]],
    primaryPartner: samplePartners[1],
    createdAt: new Date('2024-11-05'),
    updatedAt: new Date('2024-11-10'),
    createdBy: 'admin',
    isPublished: true,
    publishedAt: new Date('2024-11-10'),
    tags: ['hotel', 'travel', 'premium'],
    category: 'Travel',
    viewCount: 178,
    clickCount: 56,
    savedCount: 28,
  },
  {
    id: 'offer-3',
    title: 'Amazon Shopping Voucher - Get 10% Extra Value',
    shortDescription:
      'Purchase Amazon gift vouchers using your card and get 10% extra value',
    fullDescription:
      'Buy Amazon shopping vouchers worth ₹10,000 or more and get an additional 10% value credited. Maximum benefit of ₹2,000 per calendar month. Vouchers valid for 1 year.',
    links: [
      {
        url: 'https://www.amazon.in/gp/product/B086KRW34T',
        label: 'Buy Vouchers',
        type: 'apply',
      },
      {
        url: 'https://www.amazon.in/gp/help/customer/display.html',
        label: 'Terms',
        type: 'terms',
      },
    ],
    expiryDate: new Date('2025-06-30'),
    isActive: true,
    verificationStatus: OfferVerificationStatus.PENDING,
    partners: [samplePartners[3], samplePartners[0]],
    primaryPartner: samplePartners[3],
    createdAt: new Date('2024-11-12'),
    updatedAt: new Date('2024-11-12'),
    createdBy: 'admin',
    isPublished: false,
    tags: ['shopping', 'gift-card', 'cashback'],
    category: 'Shopping',
    viewCount: 0,
    clickCount: 0,
    savedCount: 0,
  },
  {
    id: 'offer-4',
    title: 'Emirates - Buy Miles with 40% Bonus',
    shortDescription:
      'Purchase Emirates Skywards miles and get up to 40% bonus miles',
    fullDescription:
      'Limited time offer: Buy Emirates Skywards miles and receive up to 40% bonus miles. The more you buy, the bigger your bonus. Miles are credited instantly and never expire.',
    links: [
      {
        url: 'https://www.emirates.com/english/skywards/buy-miles/',
        label: 'Buy Miles',
        type: 'apply',
      },
      {
        url: 'https://www.emirates.com/english/skywards/',
        label: 'Learn More',
        type: 'details',
      },
    ],
    expiryDate: new Date('2025-01-31'),
    isActive: true,
    verificationStatus: OfferVerificationStatus.VERIFIED,
    verifiedBy: 'admin',
    verifiedAt: new Date('2024-11-08'),
    partners: [samplePartners[2]],
    primaryPartner: samplePartners[2],
    createdAt: new Date('2024-11-08'),
    updatedAt: new Date('2024-11-08'),
    createdBy: 'admin',
    isPublished: true,
    publishedAt: new Date('2024-11-08'),
    tags: ['airline', 'miles', 'travel'],
    category: 'Travel',
    imageUrl: 'https://example.com/emirates-bonus.jpg',
    viewCount: 312,
    clickCount: 145,
    savedCount: 67,
  },
  {
    id: 'offer-5',
    title: 'Swiggy - 50% Off on First 3 Orders',
    shortDescription:
      'New users get 50% off (up to ₹100) on first 3 orders with partner card',
    fullDescription:
      'Exclusive for our cardholders: Get 50% discount (maximum ₹100) on your first 3 Swiggy orders. Use promo code at checkout. Minimum order value ₹299.',
    links: [
      {
        url: 'https://www.swiggy.com/',
        label: 'Order Now',
        type: 'apply',
      },
    ],
    expiryDate: new Date('2024-11-20'),
    isActive: true,
    verificationStatus: OfferVerificationStatus.VERIFIED,
    verifiedBy: 'admin',
    verifiedAt: new Date('2024-10-25'),
    partners: [samplePartners[4], samplePartners[0]],
    primaryPartner: samplePartners[4],
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-10-25'),
    createdBy: 'admin',
    isPublished: true,
    publishedAt: new Date('2024-10-25'),
    tags: ['food', 'cashback', 'new-user'],
    category: 'Food & Dining',
    viewCount: 432,
    clickCount: 234,
    savedCount: 89,
  },
  {
    id: 'offer-6',
    title: 'Multi-Partner Lifestyle Package',
    shortDescription:
      'Exclusive bundle: Hotel stays, dining, and shopping benefits from 5 partners',
    fullDescription:
      'Our most comprehensive offer: Get 20% off at Taj Hotels, 15% cashback on Amazon, complimentary airport lounge access, buy-1-get-1 at partner restaurants, and bonus airline miles on Emirates bookings.',
    links: [
      {
        url: 'https://example.com/lifestyle-package',
        label: 'View Package',
        type: 'details',
      },
      {
        url: 'https://example.com/enroll',
        label: 'Enroll Now',
        type: 'apply',
      },
    ],
    expiryDate: new Date('2025-08-31'),
    isActive: true,
    verificationStatus: OfferVerificationStatus.PENDING,
    partners: samplePartners,
    primaryPartner: samplePartners[0],
    createdAt: new Date('2024-11-14'),
    updatedAt: new Date('2024-11-14'),
    createdBy: 'admin',
    isPublished: false,
    tags: ['bundle', 'lifestyle', 'premium', 'multi-partner'],
    category: 'Lifestyle',
    verificationNotes: 'Pending final approval from legal team',
    viewCount: 0,
    clickCount: 0,
    savedCount: 0,
  },
];

/**
 * Helper function to get offers by status
 */
export const getOffersByStatus = (
  status: OfferVerificationStatus
): Offer[] => {
  return sampleOffers.filter((offer) => offer.verificationStatus === status);
};

/**
 * Helper function to get offers by partner type
 */
export const getOffersByPartnerType = (partnerType: PartnerType): Offer[] => {
  return sampleOffers.filter((offer) =>
    offer.partners.some((partner) => partner.type === partnerType)
  );
};

/**
 * Helper function to get active offers
 */
export const getActiveOffers = (): Offer[] => {
  const now = new Date();
  return sampleOffers.filter(
    (offer) => offer.isActive && new Date(offer.expiryDate) > now
  );
};

/**
 * Helper function to get published offers
 */
export const getPublishedOffers = (): Offer[] => {
  return getActiveOffers().filter((offer) => offer.isPublished);
};
