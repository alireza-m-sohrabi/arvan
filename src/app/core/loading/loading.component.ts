import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'arvan-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  busy$: Observable<boolean>;

  constructor(loadingService: LoadingService) {
    this.busy$ = loadingService.busy$;
  }

  ngOnInit(): void {}
}
