import { create } from 'zustand';
import { Deal, DealCategory } from '@models';
import { sampleDeals } from '../utils/sampleData';

interface DealsState {
  deals: Deal[];
  filteredDeals: Deal[];
  activeFilter: DealCategory;
  setDeals: (deals: Deal[]) => void;
  setFilter: (filter: DealCategory) => void;
  toggleSave: (dealId: string) => void;
  toggleTrack: (dealId: string) => void;
  toggleWatch: (dealId: string) => void;
}

export const useDealsStore = create<DealsState>((set, get) => ({
  deals: sampleDeals,
  filteredDeals: sampleDeals,
  activeFilter: DealCategory.ALL,

  setDeals: deals => set({ deals, filteredDeals: deals }),

  setFilter: filter =>
    set(state => {
      const filteredDeals =
        filter === DealCategory.ALL
          ? state.deals
          : state.deals.filter(deal => deal.category === filter);
      return { activeFilter: filter, filteredDeals };
    }),

  toggleSave: dealId =>
    set(state => ({
      deals: state.deals.map(deal =>
        deal.id === dealId ? { ...deal, isSaved: !deal.isSaved } : deal
      ),
    })),

  toggleTrack: dealId =>
    set(state => ({
      deals: state.deals.map(deal =>
        deal.id === dealId ? { ...deal, isTracked: !deal.isTracked } : deal
      ),
    })),

  toggleWatch: dealId =>
    set(state => ({
      deals: state.deals.map(deal =>
        deal.id === dealId ? { ...deal, isWatching: !deal.isWatching } : deal
      ),
    })),
}));
