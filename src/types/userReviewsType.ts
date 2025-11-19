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
