import {
  AmericanExpress,
  Diners,
  DiscoverCard,
  Elo,
  Hipercard,
  Jcb,
  Maestro,
  Mastercard,
  Unionpay,
  Visa,
  CardGeneric,
} from '@/components/icons';

export const cardIcons: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  visa: Visa,
  mastercard: Mastercard,
  amex: AmericanExpress,
  discover: DiscoverCard,
  diners: Diners,
  jcb: Jcb,
  elo: Elo,
  hiper: Hipercard,
  maestro: Maestro,
  unionpay: Unionpay,
  default: CardGeneric,
};
