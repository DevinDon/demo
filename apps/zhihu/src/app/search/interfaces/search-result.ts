import { Answer, Question } from 'src/app/common/interfaces';

export interface SearchResult {

  id: number;
  keyword: string;
  question: Question;
  answer: Answer;

}
