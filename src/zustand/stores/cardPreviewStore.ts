import { create } from 'zustand';
import { CardPreviewStore } from '@/types';

export const cardPreviewStore = create<CardPreviewStore>((set) => ({
  tempCards: [],
  addCard: (card): void =>
    set((state) => ({
      tempCards: [...state.tempCards, card],
    })),
  updateCard: (id, updated): void =>
    set((state) => ({
      tempCards: state.tempCards.map((card) =>
        card.paymentMethodId === id ? { ...card, ...updated } : card
      ),
    })),
  deleteCard: (id): void =>
    set((state) => ({
      tempCards: state.tempCards.filter((card) => card.paymentMethodId !== id),
    })),
  clearAll: (): void => set({ tempCards: [] }),
}));
