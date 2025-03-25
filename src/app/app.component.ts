import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenericTableComponent } from './dynamic-components/generic-table/generic-table.component';
import { Observable } from 'rxjs';
import { QuestionBase } from './models/questions/question-base';
import { QuestionService } from './service/question/question.service';
import { DynamicFormComponent } from './dynamic-components/dynamic-form/dynamic-form.component';
import { AsyncPipe } from '@angular/common';
import { DynamicService } from './service/dynamic-service/dynamic.service';
import { SearchComponent } from './ui/search/search.component';
import { Klijent } from './models/Klijent';
import { Racun } from './models/Racun';
import { Transakcija } from './models/Transakcija';
import { DropdownQuestion } from './models/questions/question-dropdown';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GenericTableComponent, DynamicFormComponent, AsyncPipe, SearchComponent],
  providers: [QuestionService, DynamicService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'primer1';
  //napravi se za svaki entitet ovaj skup elemenata
  klijenti: Klijent[] = [];
  filteredListKlijent : Klijent[] = [];
  selectedKlijent:any = {} ;
  questionsKlijent$: Observable<QuestionBase<any>[]>;

  racuni: Racun[] = [];
  filteredListRacun : Racun[] = [];
  selectedRacun:any = {} ;
  questionsRacun$: Observable<QuestionBase<any>[]>;

  transakcije: Transakcija[] = [];
  filteredListTransakcija : Transakcija[] = [];
  selectedTransakcija:any = {} ;
  questionsTransakcija$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService,private httpService:DynamicService) {
    //dobavlja se za svaki entitet pitanja
    this.questionsTransakcija$ = service.getTransakcijaQuestions();
    this.questionsKlijent$ = service.getKlijentQuestions();
    this.questionsRacun$ = service.getRacunQuestions();
    
  }
  ngOnInit(): void {
    this.loadData(); 
  }

  loadData() {
    //ovo je za dobavljanje racuna, a ujedno i racuna u transakciji
    this.httpService.getAll<Racun>("racuni").subscribe(data => {
      this.racuni = data;
      this.filteredListRacun = data;
      this.questionsTransakcija$.subscribe((questions) => {
        const dropdownQuestion = questions.find((q) => q.key === 'racunId') as DropdownQuestion;
        if (dropdownQuestion) {          
          
          dropdownQuestion.options = this.racuni.map((racun) => ({
            id: racun.id,
            naziv: racun.brojRacuna
          }));
          console.log(dropdownQuestion.options);
          
        }
      });

    });

    this.httpService.getAll<Klijent>("klijenti").subscribe(data => {
      this.klijenti = data;
      this.filteredListKlijent = data;
      this.questionsTransakcija$.subscribe((questions) => {
        const dropdownQuestion = questions.find((q) => q.key === 'klijentId') as DropdownQuestion;
        if (dropdownQuestion) {          
          
          dropdownQuestion.options = this.klijenti.map((klijent) => ({
            id: klijent.id,
            naziv: klijent.ime
          }));
          console.log(dropdownQuestion.options);
          
        }
      });

    });

    this.httpService.getAll<Transakcija>("transakcije").subscribe(data => {
      this.transakcije = data;
      this.filteredListTransakcija = data;
      console.log("inicijalni Data: " + JSON.stringify(data))
      // this.questionsTransakcija$.subscribe((questions) => {
      //   const dropdownQuestion = questions.find((q) => q.key === 'klijentId') as DropdownQuestion;
      //   if (dropdownQuestion) {          
          
      //     dropdownQuestion.options = this.klijenti.map((klijent) => ({
      //       id: klijent.id,
      //       naziv: klijent.ime + " " + klijent.prezime
      //     }));
      //     console.log(dropdownQuestion.options);
          
      //   }
      // });

    });
  }

  removeRacun(id:number): void{
    this.httpService.delete("racuni", id).subscribe(() => {
      this.racuni = this.racuni.filter(item => item.id !== id);
      this.filteredListRacun = this.filteredListRacun.filter(item => item.id !== id);
    });
  }

  removeKlijent(id:number): void{
    this.httpService.delete("klijenti", id).subscribe(() => {
      this.klijenti = this.klijenti.filter(item => item.id !== id);
      this.filteredListKlijent = this.filteredListKlijent.filter(item => item.id !== id);
    });
  }

  removeTransakcija(id:number): void{
    this.httpService.delete("transakcije", id).subscribe(() => {
      this.transakcije = this.transakcije.filter(item => item.id !== id);
      this.filteredListTransakcija = this.filteredListTransakcija.filter(item => item.id !== id);
    });
  }

  editRacun(data:any){
    this.selectedRacun = {...data};
  }

  editKlijent(data:any){
    this.selectedKlijent = {...data};
  }

  editTransakcija(data:any){
    this.selectedTransakcija = {...data};
    // if(data.racunId != typeof(number))
    console.log(" OVO je data" + JSON.stringify(data))
    //dodat compare u dinamicnoj formi i sad rade selekti
    // this.selectedTransakcija.racunId = this.racuni.find(r => r.id == this.selectedTransakcija.racunId)
    // this.selectedTransakcija.klijentId = this.klijenti.find(k => k.id == this.selectedTransakcija.klijentId)
  }

  saveRacun(payload: any) {  
    if (payload.id && payload.id !=='') {
      this.httpService.update<Racun>("racuni", payload.id, payload).subscribe(() => {
        this.loadData();
        this.selectedRacun = {};
      });
    } else {
      this.httpService.create<Racun>("racuni", {...payload, id:undefined})
      .subscribe(() => {
        this.loadData();
        this.selectedRacun = {};
      });
    }
  }

  saveKlijent(payload: any) {  
    if (payload.id && payload.id !=='') {
      this.httpService.update<Klijent>("klijenti", payload.id, payload).subscribe(() => {
        this.loadData();
        this.selectedKlijent = {};
      });
    } else {
      this.httpService.create<Klijent>("klijenti", {...payload, id:undefined})
      .subscribe(() => {
        this.loadData();
        this.selectedKlijent = {};
      });
    }
  }

  saveTransakcija(payload: any) { 
    console.log("OVOVOVOVOVO " + JSON.stringify(payload));
  
    // const transakcija: Transakcija = {
    //   id: payload.id ?? 0,
    //   tip: payload.tip,
    //   iznos: payload.iznos,
    //   datumTransakcije: payload.datumTranskacije,
    //   klijentId: payload.klijentId?.id ?? payload.klijentId,
    //   racunId: payload.racunId?.id ?? payload.racunId,
    // };

    // console.log("Transakcija" + JSON.stringify(transakcija))
  
    if (payload.id) {
      this.httpService.update<Transakcija>("transakcije", payload.id, payload)
        .subscribe(() => {
          this.updateRacunStanje(payload);
          this.loadData();
          this.selectedTransakcija = {};
        });
    } else {
      this.httpService.create<Transakcija>("transakcije", {...payload})
        .subscribe(() => {
          //otici u racun i izracunati novo stanje
          this.updateRacunStanje(payload);
          this.loadData();
          this.selectedTransakcija = {};
        });
    }
  }

  updateRacunStanje(payload: any) {
    const racunId = payload.racunId?.id ?? payload.racunId;

    this.httpService.getById<Racun>(`racuni`,racunId)
      .subscribe((racun) => {
        let trenutnoStanje = typeof racun.stanje === "string" ? parseInt(racun.stanje, 10) : racun.stanje;

        const iznos = typeof payload.iznos === "string" ? parseInt(payload.iznos, 10) : payload.iznos;

        let novoStanje = trenutnoStanje + iznos;

        this.httpService.update<Racun>("racuni", racunId, { ...racun, stanje: novoStanje })
          .subscribe(() => console.log("Stanje računa ažurirano"));
      });
  }

  onKlijentSearchTextChanged(searchText: string) {
    if (!searchText) {
      this.filteredListKlijent = [...this.klijenti]; 
      return;
    }
  
    const searchTerms = searchText.toLowerCase().split(" ").filter(term => term);
  
    this.filteredListKlijent = this.klijenti.filter(klijent => 
      searchTerms.some(term => 
        klijent.ime.toLowerCase().includes(term) || 
        klijent.prezime.toLowerCase().includes(term)
      )
    );
  }

  onRacunSearchTextChanged(searchText: string) {
    if (!searchText) {
      this.filteredListRacun = [...this.racuni]; 
      return;
    }
  
    const searchTerms = searchText.toLowerCase().split(" ").filter(term => term);
  
    this.filteredListRacun = this.racuni.filter(Racun => 
      searchTerms.some(term => 
        Racun.brojRacuna.toLowerCase().includes(term) || 
        Racun.stanje + '' == term
      )
    );
  }

  onTranskacijaSearchTextChanged(searchText: string) {
    if (!searchText) {
      this.filteredListTransakcija = [...this.transakcije]; 
      return;
    }
  
    const searchTerms = searchText.toLowerCase().split(" ").filter(term => term);
  
    this.filteredListTransakcija = this.transakcije.filter(transakcija => 
      searchTerms.some(term => 
        transakcija.tip.toLowerCase().includes(term) || 
        transakcija.iznos + '' == term ||
        transakcija.datumTransakcije == term
      )
    );
  }
  
}
