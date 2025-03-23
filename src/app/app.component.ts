import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenericTableComponent } from './dynamic-components/generic-table/generic-table.component';
import { Observable } from 'rxjs';
import { QuestionBase } from './models/questions/question-base';
import { QuestionService } from './service/question/question.service';
import { DynamicFormComponent } from './dynamic-components/dynamic-form/dynamic-form.component';
import { AsyncPipe } from '@angular/common';
import { DynamicService } from './service/dynamic-service/dynamic.service';
import { Student } from './models/Student';
import { SearchComponent } from './ui/search/search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GenericTableComponent, DynamicFormComponent, AsyncPipe, SearchComponent],
  providers: [QuestionService, DynamicService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'primer1';
  data: Student[] = [];
  filteredListStudent : Student[] = [];
  selectedEntity:any = {} ;

  questions$: Observable<QuestionBase<any>[]>;
  constructor(service: QuestionService,private httpService:DynamicService) {
    this.questions$ = service.getStudentQuestions();
    console.log(this.questions$);
    
  }
  ngOnInit(): void {
    this.loadData(); 
  }

  loadData() {
    this.httpService.getAll<Student>("students").subscribe(data => {
      this.data = data;
      this.filteredListStudent = data;
      // this.questions1$.subscribe((questions) => {
      //   const dropdownQuestion = questions.find((q) => q.key === 'zivotinjaId') as DropdownQuestion;
      //   console.log(questions);
      //   if (dropdownQuestion) {
      //     console.log("usao");
      //     console.log(this.data, "podaci");
          
          
      //     dropdownQuestion.options = this.data.map((zivotinja) => ({
      //       id: zivotinja.id,
      //       naziv: zivotinja.ime
      //     }));
      //     console.log(dropdownQuestion.options);
          
      //   }
      // });

    });
  }

  remove(id:number): void{
    this.httpService.delete("students", id).subscribe(() => {
      this.data = this.data.filter(item => item.id !== id);
      this.filteredListStudent = this.filteredListStudent.filter(item => item.id !== id);
    });
  }

  edit(data:any){
    this.selectedEntity = {...data};
  }

  save(payload: any) {
    console.log("Payload:", payload);
    console.log("Has id:", payload.id);
    
    if (payload.id && payload.id !=='') {
      this.httpService.update<Student>("students", payload.id, payload).subscribe(() => {
        this.loadData();
        this.selectedEntity = {};
      });
    } else {
      this.httpService.create<Student>("students", {...payload, id:undefined})
      .subscribe(() => {
        this.loadData();
        this.selectedEntity = {};
      });
    }
  }


  onSearchTextChanged(searchText: string) {
    if (!searchText) {
      this.filteredListStudent = [...this.data]; 
      return;
    }
  
    const searchTerms = searchText.toLowerCase().split(" ").filter(term => term);
  
    this.filteredListStudent = this.data.filter(student => 
      searchTerms.some(term => 
        student.ime.toLowerCase().includes(term) || 
        student.smer.naziv.toLowerCase().includes(term)
      )
    );
  }
  
}
