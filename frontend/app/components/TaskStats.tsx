// ✅ TaskStats.tsx
// components/TaskStats.tsx
"use client";
import { useTaskStore } from "@/store/task";

export default function TaskStats() {
  const tasks = useTaskStore((state) => state.tasks);
  const completed = tasks.filter((t) => t.isCompleted).length;
  const pending = tasks.length - completed;

  return (
    <div className="flex gap-6 flex-wrap items-center justify-center mt-6">
      <div className="bg-[#fae2b5] w-40 h-24 rounded-xl flex flex-col justify-center items-center shadow">
        <span className="text-xs text-gray-800 font-medium">
          COMPLETED TASKS
        </span>
        <span className="text-2xl font-bold text-black mt-1">
          {completed.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="bg-[#c7a69f] w-40 h-24 rounded-xl flex flex-col justify-center items-center shadow">
        <span className="text-xs text-white font-medium">PENDING TASKS</span>
        <span className="text-2xl font-bold text-white mt-1">
          {pending.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="bg-white w-64 h-24 rounded-xl flex flex-col justify-center items-center shadow">
        <span className="text-sm text-[#8da6c7] font-medium">
          TASKS CREATED
        </span>
        <span className="text-3xl font-bold text-black mt-1">
          {tasks.length.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
