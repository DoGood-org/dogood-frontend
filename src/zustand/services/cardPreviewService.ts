import { CardData } from '@/types';
import { cardPreviewStore } from '../stores/cardPreviewStore';

export const CardPreviewService = {
  /**
   * Додає картку до тимчасового стейту
   */
  add(card: CardData): void {
    const { addCard } = cardPreviewStore.getState();
    addCard(card);
  },

  /**
   * Оновлює дані картки за paymentMethodId
   */
  update(id: string, updated: Partial<CardData>): void {
    const { updateCard } = cardPreviewStore.getState();
    updateCard(id, updated);
  },

  /**
   * Видаляє картку за paymentMethodId
   */
  delete(id: string): void {
    const { deleteCard } = cardPreviewStore.getState();
    deleteCard(id);
  },

  /**
   * Очищує всі тимчасові картки (напр. при закритті модалки або переході зі сторінки)
   */
  clearAll(): void {
    const { clearAll } = cardPreviewStore.getState();
    clearAll();
  },
};
