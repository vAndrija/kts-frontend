import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableColumns: any[] = [];
  @Input() tableData: any[] = [];
  @Input() totalPages: number = 0;
  @Input() pageSize: number = 0;
  displayedColumns: any[] = [];
  @Output() statusChanged: EventEmitter<any> = new EventEmitter();
  @Output() orderClicked: EventEmitter<any> = new EventEmitter();
  @Output() pageChanged: EventEmitter<any> = new EventEmitter();
  role: string = "";

  constructor() {
    const role = localStorage.getItem('role');
    if (role) {
      this.role = role;
    }
  }


  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map(col => col.key);
  }

  changeStatus(event: Event, status: string): void {
    this.statusChanged.emit({ event: event, status: status });
  }

  viewOrder(id: number): void {
    this.orderClicked.emit(id);
  }

  changePage(newPage: number): void {
    this.pageChanged.emit(newPage);
  }

}
