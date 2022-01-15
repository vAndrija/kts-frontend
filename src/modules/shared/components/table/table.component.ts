import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableColumns: any[] = [];
  @Input() tableDataSrc: any[] = [];
  displayedColumns: any[] = [];
  @Output() eventEmitter : EventEmitter<any> = new EventEmitter();
  @Output() eventEmitter1 : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map(col => col.key);
  }

  changeStatus(event:Event, status:string): void { 
    this.eventEmitter.emit({event:event, status:status});
  }

  viewOrder(id:number): void {
    this.eventEmitter1.emit(id);
  }

}
