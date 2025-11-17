/**
 * Offers Store - Zustand state management for offer management module
 */

import { create } from 'zustand';
import { Offer, OfferFilters, OfferVerificationStatus, PartnerType } from '../models/Offer';

interface OffersState {
  // State
  offers: Offer[];
  selectedOffer: Offer | null;
  filters: OfferFilters;
  isLoading: boolean;
  error: string | null;

  // Actions
  setOffers: (offers: Offer[]) => void;
  addOffer: (offer: Offer) => void;
  updateOffer: (offer: Offer) => void;
  deleteOffer: (offerId: string) => void;
  setSelectedOffer: (offer: Offer | null) => void;

  // Filtering
  setFilters: (filters: OfferFilters) => void;
  clearFilters: () => void;
  getFilteredOffers: () => Offer[];

  // Status updates
  updateVerificationStatus: (offerId: string, status: OfferVerificationStatus, notes?: string) => void;
  togglePublishStatus: (offerId: string) => void;

  // Loading and error handling
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // Computed values
  getActiveOffers: () => Offer[];
  getExpiredOffers: () => Offer[];
  getOffersByPartnerType: (partnerType: PartnerType) => Offer[];
  getOfferById: (offerId: string) => Offer | undefined;
}

export const useOffersStore = create<OffersState>((set, get) => ({
  // Initial state
  offers: [],
  selectedOffer: null,
  filters: {},
  isLoading: false,
  error: null,

  // Actions
  setOffers: (offers) => set({ offers }),

  addOffer: (offer) =>
    set((state) => ({
      offers: [offer, ...state.offers],
    })),

  updateOffer: (updatedOffer) =>
    set((state) => ({
      offers: state.offers.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      ),
      selectedOffer:
        state.selectedOffer?.id === updatedOffer.id
          ? updatedOffer
          : state.selectedOffer,
    })),

  deleteOffer: (offerId) =>
    set((state) => ({
      offers: state.offers.filter((offer) => offer.id !== offerId),
      selectedOffer:
        state.selectedOffer?.id === offerId ? null : state.selectedOffer,
    })),

  setSelectedOffer: (offer) => set({ selectedOffer: offer }),

  // Filtering
  setFilters: (filters) => set({ filters }),

  clearFilters: () => set({ filters: {} }),

  getFilteredOffers: () => {
    const { offers, filters } = get();
    let filtered = [...offers];

    // Filter by verification status
    if (filters.verificationStatus) {
      filtered = filtered.filter(
        (offer) => offer.verificationStatus === filters.verificationStatus
      );
    }

    // Filter by active status
    if (filters.isActive !== undefined) {
      const now = new Date();
      filtered = filtered.filter((offer) => {
        const isActive = offer.isActive && new Date(offer.expiryDate) > now;
        return isActive === filters.isActive;
      });
    }

    // Filter by published status
    if (filters.isPublished !== undefined) {
      filtered = filtered.filter(
        (offer) => offer.isPublished === filters.isPublished
      );
    }

    // Filter by partner type
    if (filters.partnerType) {
      filtered = filtered.filter((offer) =>
        offer.partners.some((partner) => partner.type === filters.partnerType)
      );
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((offer) => offer.category === filters.category);
    }

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (offer) =>
          offer.title.toLowerCase().includes(query) ||
          offer.shortDescription.toLowerCase().includes(query) ||
          offer.partners.some((partner) =>
            partner.name.toLowerCase().includes(query)
          ) ||
          offer.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort by creation date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  // Status updates
  updateVerificationStatus: (offerId, status, notes) =>
    set((state) => ({
      offers: state.offers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              verificationStatus: status,
              verificationNotes: notes,
              verifiedAt: new Date(),
              updatedAt: new Date(),
            }
          : offer
      ),
    })),

  togglePublishStatus: (offerId) =>
    set((state) => ({
      offers: state.offers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              isPublished: !offer.isPublished,
              publishedAt: !offer.isPublished ? new Date() : offer.publishedAt,
              updatedAt: new Date(),
            }
          : offer
      ),
    })),

  // Loading and error handling
  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  // Computed values
  getActiveOffers: () => {
    const { offers } = get();
    const now = new Date();
    return offers.filter(
      (offer) => offer.isActive && new Date(offer.expiryDate) > now
    );
  },

  getExpiredOffers: () => {
    const { offers } = get();
    const now = new Date();
    return offers.filter(
      (offer) => !offer.isActive || new Date(offer.expiryDate) <= now
    );
  },

  getOffersByPartnerType: (partnerType) => {
    const { offers } = get();
    return offers.filter((offer) =>
      offer.partners.some((partner) => partner.type === partnerType)
    );
  },

  getOfferById: (offerId) => {
    const { offers } = get();
    return offers.find((offer) => offer.id === offerId);
  },
}));
