export interface IUserObject {
  name: string;
  email: string;
  password: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  passwordHash: string;
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
  passwordHash: string;
  email: string;
  id: number;
  name: string;
}

export interface IGetReturn {
  name: string;
  email: string;
  tasksCreated: number;
}

export interface IUpdateBody {
  name?: string;
  email?: string;
}
