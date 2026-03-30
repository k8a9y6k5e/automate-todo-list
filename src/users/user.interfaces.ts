export interface IUserObject {
  name: string;
  email: string;
  password_hash: string;
}

export interface IReturnCreateUser {
  work: boolean;
  data: any;
}
