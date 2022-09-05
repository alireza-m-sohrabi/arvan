import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Optional,
} from '@angular/core';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@Component({
  selector: 'arvan-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(public confirmationService: ConfirmationDialogService) {}

  ngOnInit(): void {}
}
