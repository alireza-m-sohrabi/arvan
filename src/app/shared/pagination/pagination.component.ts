import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Pagination } from 'arvan/core/models/pagination-model';

@Component({
  selector: 'arvan-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input() set page(value: Pagination | null) {
    if (value) {
      const calculatePageCount =
        (value.total - value.offset) / value.limit +
        ((value.total - value.offset) % value.limit);

      if (calculatePageCount !== this.pageCount) {
        this.setPages();
      }
    }
  }

  @Output() pageChange!: EventEmitter<Pagination>;

  pageCount: number;
  pages: number[];

  constructor() {
    this.pageChange = new EventEmitter<Pagination>();
    this.pages = [];
    this.pageCount = 0;
  }

  ngOnInit(): void {}

  goTo(pageNumber: number) {
    const offset = (pageNumber - 1) * this.page!.limit;

    this.pageChange.emit({
      ...this.page!,
      offset,
      pageNumber,
    });
  }

  onNextClick() {
    let pageNumber = this.page!.pageNumber;

    if (this.pageCount > pageNumber) {
      pageNumber++;

      const offset = (pageNumber - 1) * this.page!.limit;

      this.pageChange.emit({ ...this.page!, offset, pageNumber });
    }
  }

  onPrevClick() {
    let pageNumber = this.page!.pageNumber;

    if (pageNumber > 1) {
      pageNumber--;

      const offset = (pageNumber - 1) * this.page!.limit;

      this.pageChange.emit({ ...this.page!, offset, pageNumber });
    }
  }

  private setPages() {
    this.pages = new Array(this.pageCount);
  }
}
