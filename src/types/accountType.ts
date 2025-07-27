export interface ContentProps {
  view: string;
  people?: string;
  id: string;
}

export type MarkerCategoryType = 'medicine' | 'nature' | 'animal' | 'food';

export interface TaskProps {
  id: number;
  title: string;
  description: string;
  avatar: string;
  category: MarkerCategoryType;
}

export interface TaskItemProps {
  task: TaskProps;
}
