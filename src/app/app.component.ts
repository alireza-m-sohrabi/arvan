import { Component, OnInit } from '@angular/core';
import { TitleService } from './core/title/title.service';

@Component({
  selector: 'arvan-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'arvan';

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.boot();
  }
}
