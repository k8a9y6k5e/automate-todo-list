export interface IReturnTaskCreate {
  id: number;
}

export interface ITaskBody {
  name: string;
  description: string;
}

export interface IInformation {
  importance: string;
  category: string;
}

export interface ICreateTask {
  name: string;
  description: string;
  category: string;
  importance: string;
  user: number;
}

export interface ISearch {
  id: number;
  name: string;
  description: string;
  category: string;
  importance: string;
  user: number;
}

export interface IReturnSearch {
  page: number;
  take: number;
  total: number;
  data: ISearch[];
}

export interface IUpdateBody {
  name?: string;
  description?: string;
  category?: string;
  importance?: string;
  user?: number;
  completed?: boolean;
}
