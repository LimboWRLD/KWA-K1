import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{
  @Output()
  keyInput = new EventEmitter<string>();

  onSearchInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.keyInput.emit(inputValue);
  }

}
