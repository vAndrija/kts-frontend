import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() totalPages: number = 0;
  @Input() pageSize: number = 0;
  @Output() pageSelected: EventEmitter<number>;
  pages: number[] = [];
  activePage: number;

  constructor() {
    this.pageSelected = new EventEmitter();
    this.activePage = 1;
  }

  ngOnInit() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  ngOnChanges(changes: any): void {
    this.totalPages = changes.totalPages.currentValue;
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  selected(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.activePage = newPage;
      this.pageSelected.emit(this.activePage);
    }
  }

}
