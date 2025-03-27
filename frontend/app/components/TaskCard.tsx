"use client";

import { useState } from "react";
import { Task } from "@/app/types";
import TaskDetailsModal from "./TaskDetailsModal";
import { FaTrash, FaCheckCircle, FaEdit } from "react-icons/fa";
import clsx from "clsx";

interface Props {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
}

export default function TaskCard({
  task,
  onDelete,
  onEdit,
  onToggleStatus,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="bg-[#f9dba3] p-3 rounded shadow position-relative hover:shadow-lg transition cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <h5
          className={clsx(
            "fw-bold mb-1",
            task.isCompleted && "text-decoration-line-through text-muted"
          )}
        >
          {task.title}
        </h5>
        <small className="text-muted">Click to view details</small>

        <div
          className="d-flex gap-3 mt-3 justify-content-end"
          onClick={(e) => e.stopPropagation()}
        >
          <FaCheckCircle
            title="Toggle Complete"
            className={clsx(
              "cursor-pointer",
              task.isCompleted ? "text-success" : "text-secondary"
            )}
            onClick={onToggleStatus}
          />
          <FaEdit
            title="Edit"
            className="text-primary cursor-pointer"
            onClick={onEdit}
          />
          <FaTrash
            title="Delete"
            className="text-danger cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>

      <TaskDetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        task={task}
      />
    </>
  );
}
