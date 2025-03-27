"use client";

import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import AddTaskForm from "./components/AddTaskForm";
import FilterBar from "./components/FilterBar";
import TaskStats from "./components/TaskStats";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import { useTaskStore } from "@/store/task";
import { Task } from "@/app/types";
import ProtectedRoute from "./components/ProtectedRoute";
export default function Home() {
  const { tasks, fetchTasks, removeTask, toggleStatus } = useTaskStore();
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f7f3eb] flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <Calendar />
            <div>
              <AddTaskForm
                editingTask={editingTask}
                onFinishEdit={() => setEditingTask(null)}
              />
              <FilterBar search={search} setSearch={setSearch} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={() => removeTask(task._id)}
                    onEdit={() => setEditingTask(task)}
                    onToggleStatus={() => toggleStatus(task._id)}
                  />
                ))}
              </div>
            </div>
          </div>
          <TaskStats />
        </main>
      </div>
    </ProtectedRoute>
  );
}
