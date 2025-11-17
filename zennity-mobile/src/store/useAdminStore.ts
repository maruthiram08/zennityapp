import { create } from 'zustand'
import {
  Content,
  ContentType,
  ContentFilter,
  ContentStats,
  SpendOffer,
  LTFCard,
  PremiumCampaign,
  StackingHack,
  TransferBonus,
  StatusOffer,
} from '@models/Content'

interface AdminState {
  // Content management
  contents: Content[]
  selectedContent: Content | null
  filter: ContentFilter
  isLoading: boolean
  error: string | null

  // Actions
  setContents: (contents: Content[]) => void
  addContent: (content: Content) => void
  updateContent: (id: string, updates: Partial<Content>) => void
  deleteContent: (id: string) => void
  selectContent: (content: Content | null) => void
  setFilter: (filter: Partial<ContentFilter>) => void
  resetFilter: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void

  // Computed properties
  getFilteredContents: () => Content[]
  getContentById: (id: string) => Content | undefined
  getContentsByType: (type: ContentType) => Content[]
  getStats: () => ContentStats
}

const defaultFilter: ContentFilter = {
  sortBy: 'createdAt',
  sortOrder: 'desc',
}

export const useAdminStore = create<AdminState>((set, get) => ({
  // Initial state
  contents: [],
  selectedContent: null,
  filter: defaultFilter,
  isLoading: false,
  error: null,

  // Actions
  setContents: (contents) => set({ contents, error: null }),

  addContent: (content) =>
    set((state) => ({
      contents: [...state.contents, content],
      error: null,
    })),

  updateContent: (id, updates) =>
    set((state) => ({
      contents: state.contents.map((content) =>
        content.id === id
          ? { ...content, ...updates, updatedAt: new Date() }
          : content
      ),
      selectedContent:
        state.selectedContent?.id === id
          ? { ...state.selectedContent, ...updates, updatedAt: new Date() }
          : state.selectedContent,
      error: null,
    })),

  deleteContent: (id) =>
    set((state) => ({
      contents: state.contents.filter((content) => content.id !== id),
      selectedContent:
        state.selectedContent?.id === id ? null : state.selectedContent,
      error: null,
    })),

  selectContent: (content) => set({ selectedContent: content }),

  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),

  resetFilter: () => set({ filter: defaultFilter }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  // Computed properties
  getFilteredContents: () => {
    const { contents, filter } = get()
    let filtered = [...contents]

    // Filter by type
    if (filter.type) {
      filtered = filtered.filter((content) => content.type === filter.type)
    }

    // Filter by active status
    if (filter.isActive !== undefined) {
      filtered = filtered.filter((content) => content.isActive === filter.isActive)
    }

    // Filter by search query
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase()
      filtered = filtered.filter((content) => {
        // Search in common fields based on content type
        switch (content.type) {
          case ContentType.SPEND_OFFER:
            return (
              content.cardName.toLowerCase().includes(query) ||
              content.bankName.toLowerCase().includes(query) ||
              content.reward.description.toLowerCase().includes(query)
            )
          case ContentType.LTF_CARD:
            return (
              content.cardName.toLowerCase().includes(query) ||
              content.bankName.toLowerCase().includes(query) ||
              content.mainBenefit.toLowerCase().includes(query)
            )
          case ContentType.PREMIUM_CAMPAIGN:
            return (
              content.cardName.toLowerCase().includes(query) ||
              content.bankName.toLowerCase().includes(query) ||
              content.mainOffer.toLowerCase().includes(query)
            )
          case ContentType.STACKING_HACK:
            return (
              content.stackName.toLowerCase().includes(query) ||
              (content.category?.toLowerCase().includes(query) ?? false)
            )
          case ContentType.TRANSFER_BONUS:
            return (
              content.fromProgram.toLowerCase().includes(query) ||
              content.toProgram.toLowerCase().includes(query) ||
              content.transferRoute.toLowerCase().includes(query)
            )
          case ContentType.STATUS_OFFER:
            return (
              content.statusName.toLowerCase().includes(query) ||
              content.programName.toLowerCase().includes(query) ||
              content.cardRequired.toLowerCase().includes(query)
            )
          default:
            return false
        }
      })
    }

    // Sort
    if (filter.sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[filter.sortBy!]
        const bValue = b[filter.sortBy!]

        if (aValue instanceof Date && bValue instanceof Date) {
          return filter.sortOrder === 'asc'
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime()
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return filter.sortOrder === 'asc' ? aValue - bValue : bValue - aValue
        }

        return 0
      })
    }

    return filtered
  },

  getContentById: (id) => {
    const { contents } = get()
    return contents.find((content) => content.id === id)
  },

  getContentsByType: (type) => {
    const { contents } = get()
    return contents.filter((content) => content.type === type)
  },

  getStats: () => {
    const { contents } = get()

    const stats: ContentStats = {
      total: contents.length,
      byType: {
        [ContentType.SPEND_OFFER]: 0,
        [ContentType.LTF_CARD]: 0,
        [ContentType.PREMIUM_CAMPAIGN]: 0,
        [ContentType.STACKING_HACK]: 0,
        [ContentType.TRANSFER_BONUS]: 0,
        [ContentType.STATUS_OFFER]: 0,
      },
      active: 0,
      inactive: 0,
    }

    contents.forEach((content) => {
      stats.byType[content.type]++
      if (content.isActive) {
        stats.active++
      } else {
        stats.inactive++
      }
    })

    return stats
  },
}))
