import {Injectable} from '@angular/core';
import {DropdownQuestion} from '../../models/questions/question-dropdown';
import {QuestionBase} from '../../models/questions/question-base';
import {TextboxQuestion} from '../../models/questions/question-textbox';
import {of} from 'rxjs';
@Injectable()
export class QuestionService {

  getStudentQuestions() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'smer',
        label: 'Smer',
        options: [
          {id: 12, naziv: 'SII'},
          {id: 14, naziv: 'IT'}
        ],
        order: 3,
      }),
      new TextboxQuestion({
        key: 'ime',
        label: 'Ime',
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
}