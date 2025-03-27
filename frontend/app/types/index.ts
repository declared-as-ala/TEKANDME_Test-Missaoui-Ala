// types/index.ts
export interface User {
  _id: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate: string; // stored as string in JSON
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: User | string; // if you populate the user or just store the userId
}
