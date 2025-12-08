export type Category = {
  title: string;
  description: string | Example[];
  examples?: Example[];
  moreInfo?: string;
  components?: ComponentsProps[];
  contacts?: Example[];
};

export type Example = {
  type: string;
  description: string;
};

export type CookiesListProps = {
  onOpenStateChange: (isOpen: boolean) => void;
};

export type ComponentsProps = {
  type: string;
  content: string;
  content2?: string;
  content3?: string;
  content4?: string;
  items?: Example[];
  moreInfo?: string;
};
