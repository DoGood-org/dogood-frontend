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
  addCard: (card: CardData) => void;
  updateCard: (paymentMethodId: string, updated: Partial<CardData>) => void;
  deleteCard: (paymentMethodId: string) => void;
  clearAll: () => void;
};
