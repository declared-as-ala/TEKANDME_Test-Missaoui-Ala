import { create } from "zustand";
import { Task } from "@/app/types";
import { getTasks, deleteTask, updateTask } from "@/services/taskService";

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  removeTask: (id: string) => Promise<void>;
  editTask: (task: Task) => void;
  toggleStatus: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  fetchTasks: async () => {
    const data = await getTasks();
    set({ tasks: data });
  },

  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),

  removeTask: async (id: string) => {
    await deleteTask(id);
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== id),
    }));
  },

  editTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === updatedTask._id ? updatedTask : t
      ),
    })),

  toggleStatus: async (id: string) => {
    // Optimistically update local state
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, isCompleted: !task.isCompleted } : task
      ),
    }));

    const currentTask = get().tasks.find((t) => t._id === id);
    if (!currentTask) return;

    try {
      const updated = await updateTask(id, {
        isCompleted: currentTask.isCompleted,
      });

      // Sync with backend response
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === id ? updated : t)),
      }));
    } catch (err) {
      console.error("❌ Failed to update task status:", err);
    }
  },
}));
