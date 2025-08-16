import { create } from 'zustand';
import { CardPreviewStore } from '@/types';

export const cardPreviewStore = create<CardPreviewStore>((set) => ({
  tempCards: [],
  tempPaymentMethodId: null, // 🆕 для збереження ID новоствореної карти
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
  setTempPaymentMethodId: (id): void => set({ tempPaymentMethodId: id }), // 🆕 сеттер
  clearTempPaymentMethodId: (): void => set({ tempPaymentMethodId: null }), // 🆕 очистка
  clearAll: (): void => set({ tempCards: [], tempPaymentMethodId: null }),
  // clearAll: (): void => set({ tempCards: [] }),
}));
