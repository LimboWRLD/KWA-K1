import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges{

  color: string = 'red';

  @Input()
  appHighlight!: boolean;

  constructor(private el: ElementRef) { } 


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['appHighlight']){
      if(this.appHighlight===true){
        this.el.nativeElement.style.backgroundColor = this.color;
      }
      ;
    }
  }
}
