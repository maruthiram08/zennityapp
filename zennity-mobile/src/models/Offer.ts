/**
 * Offer Management Data Model
 * Represents offers shared with clients including verification status and partner details
 */

export enum OfferVerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export enum PartnerType {
  BANK = 'bank',
  HOTEL = 'hotel',
  AIRLINE = 'airline',
  RETAIL = 'retail',
  RESTAURANT = 'restaurant',
  OTHER = 'other',
}

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  logo?: string;
}

export interface OfferLink {
  url: string;
  label: string;
  type: 'website' | 'terms' | 'apply' | 'details';
}

export interface Offer {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;

  // Link details
  links: OfferLink[];

  // Expiry tracking
  expiryDate: Date;
  isActive: boolean;

  // Verification
  verificationStatus: OfferVerificationStatus;
  verifiedBy?: string;
  verifiedAt?: Date;
  verificationNotes?: string;

  // Partners involved
  partners: Partner[];
  primaryPartner?: Partner; // Main partner (e.g., issuing bank)

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;

  // Client visibility
  isPublished: boolean;
  publishedAt?: Date;

  // Additional details
  tags?: string[];
  category?: string;
  imageUrl?: string;

  // Engagement metrics
  viewCount?: number;
  clickCount?: number;
  savedCount?: number;
}

export interface CreateOfferInput {
  title: string;
  shortDescription: string;
  fullDescription?: string;
  links: OfferLink[];
  expiryDate: Date;
  partners: Partner[];
  primaryPartner?: Partner;
  tags?: string[];
  category?: string;
  imageUrl?: string;
}

export interface UpdateOfferInput extends Partial<CreateOfferInput> {
  id: string;
  verificationStatus?: OfferVerificationStatus;
  verificationNotes?: string;
  isPublished?: boolean;
}

export interface OfferFilters {
  verificationStatus?: OfferVerificationStatus;
  partnerType?: PartnerType;
  isActive?: boolean;
  isPublished?: boolean;
  category?: string;
  searchQuery?: string;
}
