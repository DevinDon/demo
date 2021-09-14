import { AnswerID, QuestionID, ResourceType } from '../interfaces';

export class Link {

  private link: URL;

  constructor(private url: string) {
    try {
      this.link = new URL(url);
    } catch (error) {
      this.link = new URL(location.origin + url);
    }
  }

  getParam(key: string): string | undefined {
    return this.link.searchParams.get(key) || undefined;
  }

  get resource(): ResourceType {
    return this.link.pathname.split('/').filter(v => v)[0] as ResourceType;
  }

  get id(): QuestionID | AnswerID | undefined {
    const id = +this.link.pathname.split('/').filter(v => v)[1];
    return Number.isInteger(id) ? id : undefined;
  }

  get params(): URLSearchParams {
    return this.link.searchParams;
  }

}
