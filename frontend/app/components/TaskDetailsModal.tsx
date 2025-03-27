"use client";

import { Modal, Button } from "react-bootstrap";
import { Task } from "@/app/types";
import dayjs from "dayjs";

interface Props {
  show: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function TaskDetailsModal({ show, onClose, task }: Props) {
  if (!task) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-2">{task.title}</h5>
        <p className="text-muted">
          {task.description || "No description provided."}
        </p>
        <hr />
        <p>
          <strong>Start Date:</strong>{" "}
          {dayjs(task.startDate).format("DD-MM-YYYY")}
        </p>
        <p>
          <strong>Due Date:</strong> {dayjs(task.dueDate).format("DD-MM-YYYY")}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {task.isCompleted ? (
            <span className="text-success">Completed ✅</span>
          ) : (
            <span className="text-warning">Pending ⏳</span>
          )}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
