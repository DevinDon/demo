import { HttpRequest } from '@angular/common/http';
import { mock, Random } from 'mockjs';
import { SearchResult } from 'src/app/search/interfaces';
import { Answer, AnswerID, AnswerStatus, Question, QuestionID, QuestionStatus, User, UserID } from '../interfaces';

export const mockTag: () => string = () => Random.cword(2, 5);

export const mockTags: () => string = () => mock({
  'array|1-5': [mockTag],
}).array;

export const mockVote: (request: HttpRequest<any>) => any = request => {
  const answerID = request.params.get('answer');
  const questionID = request.params.get('question');
  const action = request.params.get('action') as AnswerStatus;
  return answerID ? mockAnswer(+answerID) : mockQuestion(+(questionID || 0));
};

const questionStatusList = [
  QuestionStatus.like,
  QuestionStatus.none,
];

export const mockQuestion: (id?: QuestionID) => Question = id => ({
  id: id ?? Random.increment(),
  title: Random.ctitle(8, 15) + '？',
  user: mockUser(),
  cover: Math.random() > 0.5 ? Random.image() : undefined,
  content: Random.cparagraph(0, 30),
  count: {
    answer: Random.integer(0, 15000),
    visit: Random.integer(0, 999999),
    like: Random.integer(0, 50000),
  },
  tags: mock({
    'array|1-4': [() => Random.cword(2, 5)],
  }).array,
  date: new Date(Random.datetime()),
  status: questionStatusList[Math.random() * questionStatusList.length << 0],
});

const answerStatusList = [
  AnswerStatus.approve,
  AnswerStatus.oppose,
  AnswerStatus.none,
];

export const mockAnswer: (id?: AnswerID, question?: QuestionID) => Answer = (id, question) => ({
  id: Random.increment(),
  question: +(question || Random.integer()),
  user: mockUser(),
  covers: mock({
    'array|0-10': [Random.image()],
  }).array,
  content: Random.cparagraph(0, 1000),
  count: {
    approve: Random.integer(0, 999999),
    oppose: Random.integer(0, 9999),
    comment: Random.integer(0, 99999),
  },
  date: new Date(Random.datetime()),
  status: answerStatusList[Math.random() * answerStatusList.length << 0],
});

export const mockUser: (id?: UserID) => User = id => ({
  id: id ?? Random.increment(),
  name: Random.cname(),
  head: Random.image('128x128'),
  motto: Random.csentence(),
});

export const mockSearch: () => SearchResult = () => ({
  id: Random.increment(),
  keyword: '',
  question: mockQuestion(),
  answer: mockAnswer(),
});
