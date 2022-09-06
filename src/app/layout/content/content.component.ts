import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TitleService } from 'arvan/core/title/title.service';

@Component({
  selector: 'arvan-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit {
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {}
}
