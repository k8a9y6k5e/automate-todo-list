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
  userIdId: number;
}
