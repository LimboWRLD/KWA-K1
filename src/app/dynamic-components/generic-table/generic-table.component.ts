import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';
import { NoDataDirective } from '../../directives/no-data.directive';

@Component({
  selector: 'app-generic-table',
  imports: [HighlightDirective, NoDataDirective],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css',
  standalone:true
})
export class GenericTableComponent implements OnChanges {
  
  @Input()
  data: any[] = [];
  
  columns : string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data && this.data.length > 0) {      
      this.columns = Object.keys(this.data[0]).filter(key => key !== "id");
    } else {
      console.warn("Podaci još nisu učitani ili su prazni.");
    }
  }

  getValue(row: any, column: string): any {
    const value = row[column];

    if (value && typeof value === 'object') {
      return value.naziv || '';
    }

    return value; 
  }

  @Output()
  removeEvent = new EventEmitter<number>();

  @Output()
  editEvent = new EventEmitter<any>();

  remove(id : number): void{
    console.log(id);
    this.removeEvent.emit(id);
  }

  update(data: any): void{
    this.editEvent.emit(data);
  }

  sortDirections: { [key: string]: 'asc' | 'desc' } = {};

  sort(columnKey: string) {
    this.sortDirections[columnKey] = this.sortDirections[columnKey] === 'asc' ? 'desc' : 'asc';

    this.data = [...this.data].sort((a, b) => {
      const valueA = a[columnKey];
      const valueB = b[columnKey];

      const direction = this.sortDirections[columnKey] === 'asc' ? 1 : -1;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction * valueA.localeCompare(valueB);
      } else {
        return direction * (valueA - valueB);
      }
    });
  }

  
}
