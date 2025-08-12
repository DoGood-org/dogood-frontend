export type CardData = {
  paymentMethodId: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  fullName: string;
  city: string;
  country: string;
};

export type CardFormProps = {
  onSuccess: (card: CardData) => void;
  initialValues?: Partial<CardData>;
  setIsSubmitting: (v: boolean) => void;
};

export type CardPreviewStore = {
  tempCards: CardData[];
  tempPaymentMethodId: string | null;
  addCard: (card: CardData) => void;
  updateCard: (paymentMethodId: string, updated: Partial<CardData>) => void;
  deleteCard: (paymentMethodId: string) => void;
  setTempPaymentMethodId: (id: string) => void;
  clearTempPaymentMethodId: () => void;
  clearAll: () => void;
};
