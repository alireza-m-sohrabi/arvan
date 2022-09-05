import { EventEmitter, Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { map, Observable } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  modalRef?: BsModalRef;

  title?: string;
  message?: string;

  private confirmationConfig!: ModalOptions;
  private isConfirmed?: boolean;

  constructor(private modalService: BsModalService) {
    this.confirmationConfig = {
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
    };
  }

  confirm(
    title: string,
    message: string,
    config?: ModalOptions
  ): Observable<any> {
    this.title = title;
    this.message = message;
    this.isConfirmed = false;

    this.modalRef = this.modalService.show(
      ConfirmationDialogComponent,
      config || this.confirmationConfig
    );

    return this.modalRef.onHide!.pipe(map(() => this.isConfirmed));
  }

  close(confirm: boolean) {
    this.isConfirmed = confirm;

    this.modalRef?.hide();
  }
}
