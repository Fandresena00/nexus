"use client";

import { useState } from "react";
import { updateTask } from "@/app/actions/task-actions";
import { useRouter } from "next/navigation";
import { TaskStatus } from "@/generated/prisma/enums";

type Task = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  tag: string[];
  taskStatus: TaskStatus;
};

type EditTaskFormProps = {
  task: Task;
  projectId: string;
};

const statusOptions = [
  { value: TaskStatus.TODO, label: "À faire" },
  { value: TaskStatus.IN_PROGRESS, label: "En cours" },
  { value: TaskStatus.REVIEW, label: "En révision" },
  { value: TaskStatus.DONE, label: "Terminé" },
];

export default function EditTaskForm({ task, projectId }: EditTaskFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(
    new Date(task.deadline).toISOString().split("T")[0]
  );
  const [tags, setTags] = useState(task.tag.join(", "));
  const [taskStatus, setTaskStatus] = useState(task.taskStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title || !deadline) {
      setError("Le titre et la date limite sont requis.");
      setLoading(false);
      return;
    }

    try {
      await updateTask(task.id, {
        title,
        description,
        deadline: new Date(deadline),
        tag: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        taskStatus,
      });
      router.push(`/project/${projectId}/kanban`);
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la mise à jour de la tâche."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded shadow-lg p-6 flex flex-col w-full max-w-md gap-4"
    >
      <h2 className="text-xl font-semibold mb-3">Modifier la tâche</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      
      <label className="flex flex-col gap-1">
        Titre <span className="text-red-500">*</span>
        <input
          className="border px-2 py-1 rounded"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </label>

      <label className="flex flex-col gap-1">
        Description
        <textarea
          className="border px-2 py-1 rounded"
          value={description}
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </label>

      <label className="flex flex-col gap-1">
        Date limite <span className="text-red-500">*</span>
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={deadline}
          required
          onChange={(e) => setDeadline(e.target.value)}
          disabled={loading}
        />
      </label>

      <label className="flex flex-col gap-1">
        Statut
        <select
          className="border px-2 py-1 rounded"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
          disabled={loading}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        Tags (séparés par des virgules)
        <input
          className="border px-2 py-1 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          disabled={loading}
          placeholder="ex: Backend, Frontend, Features"
        />
      </label>

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </div>
    </form>
  );
}

