import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Pagination } from 'arvan/core/models/pagination-model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'arvan-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  private _page: Pagination;

  @Input() set page(value: Pagination | null) {
    if (value) {
      const calculatePageCount =
        parseInt((value.total / value.limit).toString()) +
        (value.total % value.limit > 0 ? 1 : 0);

      if (calculatePageCount !== this.pageCount) {
        this.pageCount = calculatePageCount;

        this.setPages();
      }

      this._page = value!;
    }
  }

  get page() {
    return this._page;
  }

  @Output() pageChange: EventEmitter<Pagination>;

  pageCount: number;
  pageNumber: number;
  pages: number[];

  constructor(private cd: ChangeDetectorRef) {
    this._page = {
      limit: 0,
      offset: 0,
      pageNumber: 0,
      total: 0,
    };

    this.pageChange = new EventEmitter<Pagination>();
    this.pages = [];
    this.pageCount = 0;
    this.pageNumber = 1;
  }

  ngOnInit(): void {}

  goTo(pageNumber: number) {
    this.pageNumber = pageNumber;

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

      this.pageNumber = pageNumber;

      const offset = (pageNumber - 1) * this.page!.limit;

      this.pageChange.emit({ ...this.page!, offset, pageNumber });
    }
  }

  onPrevClick() {
    let pageNumber = this.page!.pageNumber;

    if (pageNumber > 1) {
      pageNumber--;

      this.pageNumber = pageNumber;

      const offset = (pageNumber - 1) * this.page!.limit;

      this.pageChange.emit({ ...this.page!, offset, pageNumber });
    }
  }

  private setPages() {
    this.pages = new Array(this.pageCount);
  }
}
