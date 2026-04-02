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

export interface IUserLogIn {
  email: string;
  password: string;
}

export interface IReturnAuthUser {
  id: number;
  token: string;
}

export interface ISearch {
  password_hash: string;
  email: string;
  id: number;
  name: string;
}
