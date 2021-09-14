export interface User {

  id: number;
  name: string;
  head: string;
  motto: string;

}

export type UserID = User['id'];
