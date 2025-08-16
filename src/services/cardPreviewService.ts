import { CardData } from '@/types';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { stripeService } from './stripeService';

export const cardPreviewService = {
  // ---------- Локальні методи (UI-зміни) ----------
  addLocal(card: CardData): void {
    const { addCard } = cardPreviewStore.getState();
    addCard(card);
  },

  updateLocal(id: string, updated: Partial<CardData>): void {
    const { updateCard } = cardPreviewStore.getState();
    updateCard(id, updated);
  },

  deleteLocal(id: string): void {
    const { deleteCard } = cardPreviewStore.getState();
    deleteCard(id);
  },

  clearAll(): void {
    const { clearAll } = cardPreviewStore.getState();
    clearAll();
  },

  setTempPaymentMethodId(id: string): void {
    const { setTempPaymentMethodId } = cardPreviewStore.getState();
    setTempPaymentMethodId(id);
  },

  clearTempPaymentMethodId(): void {
    const { clearTempPaymentMethodId } = cardPreviewStore.getState();
    clearTempPaymentMethodId();
  },

  // ---------- Асинхронні методи (взаємодія з API) ----------
  async updateRemote(
    id: string,
    updatedData: Partial<CardData>,
    isStripeCard: boolean
  ): Promise<void> {
    if (isStripeCard) {
      await stripeService.updatePaymentMethod(id, {
        name: updatedData.fullName,
        address: { city: updatedData.city, country: updatedData.country },
      });
    }
    // Після успішного оновлення на сервері, оновлюємо локально
    this.updateLocal(id, updatedData);
  },

  async deleteRemote(id: string, isStripeCard: boolean): Promise<void> {
    if (isStripeCard) {
      await stripeService.detachPaymentMethod(id);
    }
    // Після успішного видалення на сервері, видаляємо локально
    this.deleteLocal(id);
  },

  async cleanupUnattachedCard(): Promise<void> {
    const { tempPaymentMethodId } = cardPreviewStore.getState();
    if (tempPaymentMethodId) {
      try {
        await stripeService.detachPaymentMethod(tempPaymentMethodId);
        console.log(
          `🧹 Detached unused payment method: ${tempPaymentMethodId}`
        );
      } catch (err) {
        console.error('Cleanup failed:', err);
      }
      this.clearTempPaymentMethodId();
    }
  },
};
