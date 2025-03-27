import API from "./api";
import { Task } from "@/app/types";

export interface TaskQueryParams {
  search?: string;
  status?: string;
  sort?: string;
  date?: string;
}

export const getTasks = async (params?: TaskQueryParams): Promise<Task[]> => {
  const res = await API.get<Task[]>("/tasks", { params });
  return res.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const res = await API.get<Task>(`/tasks/${id}`);
  return res.data;
};

export interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate: string;
}

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const res = await API.post<Task>("/tasks", payload);
  return res.data;
};

export const updateTask = async (
  id: string,
  updates: Partial<CreateTaskPayload & { isCompleted?: boolean }>
): Promise<Task> => {
  const res = await API.put<Task>(`/tasks/${id}`, updates);
  return res.data;
};

export const deleteTask = async (id: string): Promise<{ message: string }> => {
  const res = await API.delete<{ message: string }>(`/tasks/${id}`);
  return res.data;
};
