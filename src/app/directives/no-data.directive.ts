import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNoData]',
  standalone: true
})
export class NoDataDirective {

  @Input()
  appNoDataTemplate : TemplateRef<any> | undefined;

  @Input()
  set appNoData(value: any) {
    console.log("Promena se desila");
    
    if(value != undefined && (value.length != undefined && value.length > 0)) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
      console.log("Nema podataka za ucitavanje");
      console.log(this.appNoDataTemplate);
      
      if(this.appNoDataTemplate != undefined) {
      console.log("Nema podataka za ucitavanje i definisan je template");

        this.viewContainer.createEmbeddedView(this.appNoDataTemplate);
      }
    }
  }

  constructor(private templateRef : TemplateRef<any>, private viewContainer : ViewContainerRef) {  }

}
