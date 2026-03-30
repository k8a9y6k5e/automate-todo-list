export interface IUserObject {
  name: string;
  email: string;
  password: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  password_hash: string;
}

export interface IReturnCreateUser {
  id: number;
  token: string;
}
