"use client";

import { useEffect, useState, FormEvent } from "react";
import { createTask, updateTask } from "@/services/taskService";
import { useTaskStore } from "@/store/task";
import { Task } from "@/app/types";
import { Form, Row, Col, Button } from "react-bootstrap";

interface Props {
  editingTask?: Task | null;
  onFinishEdit?: () => void;
}

export default function AddTaskForm({ editingTask, onFinishEdit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const { addTask, editTask } = useTaskStore();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setStartDate(editingTask.startDate || "");
      setDueDate(editingTask.dueDate || "");
    }
  }, [editingTask]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      const updated = await updateTask(editingTask._id, {
        title,
        description,
        startDate,
        dueDate,
      });
      editTask(updated);
      onFinishEdit?.();
    } else {
      const newTask = await createTask({
        title,
        description,
        startDate,
        dueDate,
      });
      addTask(newTask);
    }

    // Reset
    setTitle("");
    setDescription("");
    setStartDate("");
    setDueDate("");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="mb-4 p-3 bg-white shadow-sm rounded"
    >
      <Row className="gy-2 gx-3 align-items-center">
        <Col lg={3} sm={6}>
          <Form.Control
            type="text"
            placeholder="Title of Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Col>
        <Col lg={3} sm={6}>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
        <Col lg={2} sm={6}>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Col>
        <Col lg={2} sm={6}>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Col>
        <Col lg={2} sm={12} className="d-grid">
          <Button variant="success" type="submit" className="w-100">
            {editingTask ? "Update" : "+"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
