import {Injectable} from '@angular/core';
import {DropdownQuestion} from '../../models/questions/question-dropdown';
import {QuestionBase} from '../../models/questions/question-base';
import {TextboxQuestion} from '../../models/questions/question-textbox';
import {of} from 'rxjs';
@Injectable()
export class QuestionService {

  // getStudentQuestions() {
  //   const questions: QuestionBase<string>[] = [
  //     new DropdownQuestion({
  //       key: 'smer',
  //       label: 'Smer',
  //       options: [
  //         {id: 12, naziv: 'SII'},
  //         {id: 14, naziv: 'IT'}
  //       ],
  //       order: 3,
  //     }),
  //     new TextboxQuestion({
  //       key: 'ime',
  //       label: 'Ime',
  //       value: '',
  //       required: true,
  //       order: 2,
  //     }),
  //     new TextboxQuestion({
  //       key: 'id',
  //       type: "hidden",
  //       order: 1,
  //     })
  //   ];
  //   return of(questions.sort((a, b) => a.order - b.order));
  // }

  //za svaki entitet se kreiraju pitanja, kad imamo polje za dropdown koristimo dropdown
  //question, ima se i type, kao i min i max vrednosti za date
  getRacunQuestions(){
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'brojRacuna',
        label: 'brojRacuna',
        value: '',
        required: true,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'stanje',
        label: 'stanje',
        value: '',
        required: true,
        order: 2,
        type: "number"
      }),
      new TextboxQuestion({
        key: 'id',
        type: "hidden",
        order: 1,
      })
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }

  getKlijentQuestions(){
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'ime',
        label: 'ime',
        value: '',
        required: true,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'prezime',
        label: 'prezime',
        value: '',
        required: true,
        order: 2,
      }),
      new TextboxQuestion({
        key: 'id',
        type: "hidden",
        order: 1,
      })
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }

  getTransakcijaQuestions(){
    const questions: QuestionBase<string>[] = [
        new DropdownQuestion({
        key: 'klijentId',
        label: 'klijentId',
        options: [
        ],
        order: 6,
      }),
        new DropdownQuestion({
        key: 'racunId',
        label: 'racunId',
        options: [
        ],
        order: 5,
      }),
      new TextboxQuestion({
        key: 'tip',
        label: 'tip',
        value: '',
        required: true,
        order: 4,
      }),
      new TextboxQuestion({
        key: 'iznos',
        label: 'iznos',
        value: '',
        required: true,
        order: 3,
        type:"number"
      }),
      new TextboxQuestion({
        key: 'datumTransakcije',
        label: 'datumTransakcije',
        value: '',
        required: true,
        order: 2,
        type: "date",
        min:new Date().toISOString().split('T')[0]
      }),
      new TextboxQuestion({
        key: 'id',
        type: "hidden",
        order: 1,
      })
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}