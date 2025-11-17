import { create } from 'zustand';
import { Card } from '@models';
import { sampleCards } from '../utils/sampleData';

interface CardsState {
  cards: Card[];
  selectedCard: Card | null;
  setCards: (cards: Card[]) => void;
  selectCard: (cardId: string) => void;
  addCard: (card: Card) => void;
  removeCard: (cardId: string) => void;
  toggleWatch: (cardId: string) => void;
}

export const useCardsStore = create<CardsState>((set, get) => ({
  cards: sampleCards,
  selectedCard: null,

  setCards: cards => set({ cards }),

  selectCard: cardId =>
    set(state => ({
      selectedCard: state.cards.find(card => card.id === cardId) || null,
    })),

  addCard: card =>
    set(state => ({
      cards: [...state.cards, card],
    })),

  removeCard: cardId =>
    set(state => ({
      cards: state.cards.filter(card => card.id !== cardId),
    })),

  toggleWatch: cardId =>
    set(state => ({
      cards: state.cards.map(card =>
        card.id === cardId ? { ...deal, isWatching: !card.isWatching } : card
      ),
    })),
}));
