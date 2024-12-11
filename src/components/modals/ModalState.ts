export interface ModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  event?: Event;
}

export interface PurchaseModalState {
  isOpen: boolean;
  event?: Event;
}

export interface DeleteModalState {
  isOpen: boolean;
  event?: Event;
}

export interface CommentModalState {
  isOpen: boolean;
  event?: Event;
}