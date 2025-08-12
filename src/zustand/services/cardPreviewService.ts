import { CardData } from '@/types';
import { cardPreviewStore } from '../stores/cardPreviewStore';
import { detachPaymentMethod, updatePaymentMethod } from '@/lib/api/stripeApi';

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

  async edit(
    id: string,
    updatedData: Partial<CardData>,
    isStripeCard: boolean
  ): Promise<void> {
    if (isStripeCard) {
      await updatePaymentMethod(id, {
        name: updatedData.fullName,
        address: { city: updatedData.city, country: updatedData.country },
      });
    }

    const { updateCard } = cardPreviewStore.getState();
    updateCard(id, updatedData);
  },

  /**
   * Видаляє картку за paymentMethodId
   */
  async delete(id: string, isStripeCard: boolean): Promise<void> {
    if (isStripeCard) {
      await detachPaymentMethod(id);
    }
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

  async cleanupUnattachedCard(): Promise<void> {
    const { tempPaymentMethodId, clearTempPaymentMethodId } =
      cardPreviewStore.getState();
    if (tempPaymentMethodId) {
      try {
        await detachPaymentMethod(tempPaymentMethodId);
        console.log(
          `🧹 Detached unused payment method: ${tempPaymentMethodId}`
        );
      } catch (err) {
        console.error('Cleanup failed:', err);
      }
      clearTempPaymentMethodId();
    }
  },
};
