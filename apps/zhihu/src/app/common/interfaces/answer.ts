import { User } from './user';

// eslint-disable-next-line no-shadow
export enum AnswerStatus {
  approve = 'approve',
  oppose = 'oppose',
  none = 'none',
}

export interface Answer {

  id: number;
  question: number;
  covers?: string[];
  user: User;
  content: string;
  count: {
    approve: number;
    oppose: number;
    comment: number;
  };
  date: Date;
  status: AnswerStatus;

}

export type AnswerID = Answer['id'];
