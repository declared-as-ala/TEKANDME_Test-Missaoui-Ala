"use client";

import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { getTasks } from "@/services/taskService";
import { Task } from "@/app/types";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [tasksByDate, setTasksByDate] = useState<Record<string, number>>({});
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [currentMonth]);

  const fetchData = async () => {
    try {
      const allTasks: Task[] = await getTasks();
      // Group tasks by date
      const grouped: Record<string, number> = {};
      allTasks.forEach((t) => {
        const dateStr = dayjs(t.dueDate).format("YYYY-MM-DD");
        grouped[dateStr] = (grouped[dateStr] || 0) + 1;
      });
      setTasksByDate(grouped);
    } catch (error) {
      console.error(error);
    }
  };

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf("month").day(); // Sunday=0 ... Saturday=6

  // Create a 42-item array (6 weeks). Fill leading nulls:
  const calendarDays: Array<number | null> = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  // Then fill the real days:
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const handleClickDay = (day: number | null) => {
    if (!day) return;
    const dateStr = currentMonth.date(day).format("YYYY-MM-DD");
    // Possibly navigate to tasks with a date param
    router.push(`/tasks?date=${dateStr}`);
  };

  return (
    <div className="container mt-4">
      <h2>Calendar {currentMonth.format("MMMM YYYY")}</h2>
      <div className="d-flex justify-content-between mb-2">
        <button
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        >
          Prev
        </button>
        <button onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}>
          Next
        </button>
      </div>
      <div className="row row-cols-7 g-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dow) => (
          <div key={dow} className="col fw-bold">
            {dow}
          </div>
        ))}
        {calendarDays.map((day, idx) => {
          if (!day) {
            return <div key={idx} className="col border p-2 bg-light" />;
          }
          const dateStr = currentMonth.date(day).format("YYYY-MM-DD");
          const count = tasksByDate[dateStr] || 0;

          return (
            <div
              key={idx}
              className="col border p-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleClickDay(day)}
            >
              <div>{day}</div>
              {count > 0 && (
                <small className="badge bg-success">{count} tasks</small>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
