"use client";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useTaskStore } from "@/store/task";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const { tasks } = useTaskStore();

  const startOfMonth = currentMonth.startOf("month");
  const startDate = startOfMonth.startOf("week"); // Start from Sunday
  const today = dayjs();

  const days: Dayjs[] = [];
  for (let i = 0; i < 42; i++) {
    days.push(startDate.add(i, "day"));
  }

  const tasksByDate: Record<string, number> = {};
  tasks.forEach((task) => {
    const dateStr = dayjs(task.dueDate).format("YYYY-MM-DD");
    tasksByDate[dateStr] = (tasksByDate[dateStr] || 0) + 1;
  });

  return (
    <div className="max-h-[500px] overflow-y-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        >
          ←
        </button>
        <h2 className="text-lg font-semibold text-gray-700">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}>
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm text-center text-gray-600 font-medium mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm text-center">
        {days.map((day, idx) => {
          const dateStr = day.format("YYYY-MM-DD");
          const isToday = day.isSame(today, "day");
          const isCurrentMonth = day.month() === currentMonth.month();
          const taskCount = tasksByDate[dateStr] || 0;

          return (
            <div
              key={idx}
              className={`rounded-lg p-2 cursor-pointer transition-all
                ${
                  isCurrentMonth ? "bg-[#f2f2f2]" : "bg-[#f9f9f9] text-gray-400"
                }
                ${isToday ? "border-2 border-[#ec7b7b] font-bold" : ""}
              `}
            >
              <div>{day.date()}</div>
              {taskCount > 0 && (
                <div className="mt-1 text-[11px] rounded-full bg-[#5ca882] text-white inline-block px-2">
                  {taskCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
