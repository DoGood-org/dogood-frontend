export interface AccordionItemData {
  title: string;
  id: string;
  question: string;
  answer: string;
}

export interface MenuCategoryData {
  title: string;
  items: AccordionItemData[];
}

export type MenuCategoryKey =
  | 'general'
  | 'volunteer'
  | 'donor'
  | 'personInNeed'
  | 'business'
  | 'charitableOrg';

export interface IMenuCategoriesProps {
  menuCategories: MenuCategoryKey[];
  activeCategory: MenuCategoryKey;
  setActiveCategory: (category: MenuCategoryKey) => void;
  setOpenItem: (itemId: string | null) => void;
  t: (key: string) => string;
}

export interface IAccordionDataProps {
  activeCategory: MenuCategoryKey;
  categoryData: MenuCategoryData;
  openItem: string | null;
  toggleItem: (itemId: string) => void;
}
export interface ICustomAccordionProps {
  menuCategories: MenuCategoryKey[];
  activeCategory: MenuCategoryKey;
  setActiveCategory: (category: MenuCategoryKey) => void;
  categoryData: MenuCategoryData; // For normal mode
  filteredCategories?: MenuCategoryData[]; // For filter mode
  isFiltering: boolean;
  openItem: string | null;
  setOpenItem: (itemId: string | null) => void;
  toggleItem: (itemId: string) => void;
  t: any;
}
export interface IFilterProps {
  handleFilterChange: (filter: string) => void;
  t: (key: string) => string;
}
