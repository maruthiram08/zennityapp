import { create } from 'zustand';
import { TrackerItem, UpcomingAction } from '@models';
import { sampleTrackerItems, sampleUpcomingActions } from '../utils/sampleData';

interface TrackerState {
  trackerItems: TrackerItem[];
  upcomingActions: UpcomingAction[];
  setTrackerItems: (items: TrackerItem[]) => void;
  addTrackerItem: (item: TrackerItem) => void;
  removeTrackerItem: (itemId: string) => void;
  updateProgress: (itemId: string, current: number) => void;
}

export const useTrackerStore = create<TrackerState>((set, get) => ({
  trackerItems: sampleTrackerItems,
  upcomingActions: sampleUpcomingActions,

  setTrackerItems: items => set({ trackerItems: items }),

  addTrackerItem: item =>
    set(state => ({
      trackerItems: [...state.trackerItems, item],
    })),

  removeTrackerItem: itemId =>
    set(state => ({
      trackerItems: state.trackerItems.filter(item => item.id !== itemId),
    })),

  updateProgress: (itemId, current) =>
    set(state => ({
      trackerItems: state.trackerItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              progress: {
                ...item.progress,
                current,
                percentage: (current / item.progress.target) * 100,
              },
            }
          : item
      ),
    })),
}));
