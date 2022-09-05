import { ModalOptions } from 'ngx-bootstrap/modal';

export interface ConfirmationProps {
  title: string;
  message: string;
  config?: ModalOptions;
}
