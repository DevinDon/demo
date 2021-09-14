/* eslint-disable no-shadow */

export enum ResourceType {
  answer = 'answer',
  answers = 'answers',
  question = 'question',
  questions = 'questions',
  images = 'images',
  votes = 'votes',
  search = 'search',
  user = 'user',
  users = 'users',
  none = '',
}

export enum LoadingType {
  init = 'init',
  loading = 'loading',
  succeed = 'succeed',
  failed = 'failed',
  cancel = 'cancel',
}

export enum ToolbarType {
  custom = 'custom',
  search = 'search',
  action = 'action',
}
