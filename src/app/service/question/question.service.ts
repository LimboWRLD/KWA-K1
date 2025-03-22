import {Injectable} from '@angular/core';
import {DropdownQuestion} from '../../models/questions/question-dropdown';
import {QuestionBase} from '../../models/questions/question-base';
import {TextboxQuestion} from '../../models/questions/question-textbox';
import {of} from 'rxjs';
import { DynamicService } from '../dynamic-service/dynamic.service';
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
      }),
      new TextboxQuestion({
        key: 'rodjenje',
        type: 'date',
        min: '2025-03-21',
        max: '2025-03-22',
        label: "Goranov rodjendan",
        order:4
      }),
      new TextboxQuestion({
        key: 'Golubovi',
        type: 'number',
        min: '10',
        max: '15',
        label: "Broj goluba u posedu Pidzike",
        order:5
      })
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}