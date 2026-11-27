import { IReviewsItem } from './admin';

export type IUser = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
};

export type ModalControls = {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
};

export type IUserItemProps = {
  user: IUser;
};

export type IReviewsSuccessContent = Pick<ModalControls, 'setIsOpen'>;

export type IReviewsFormModal = ModalControls & {
  user: IUser;
};

export type IReviewsProps = Pick<ModalControls, 'setIsOpen'> & {
  user: IUser;
};
export type DeleteModalControls = {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  orgId?: string;
  revId?: string;
  taskId?: string;
  userId?: string;
};
export type TaskModalControls = DeleteModalControls & { taskId: string };
export type AddModalControls = {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
};
export type EditModalControls = {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  review: IReviewsItem;
};
