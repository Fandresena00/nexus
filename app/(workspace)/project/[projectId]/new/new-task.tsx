"use client";
import React from "react";

import { useState } from "react";
import { createTask } from "@/app/actions/task-actions";
import { useParams, useRouter } from "next/navigation";

export default function NewTask({ userId }: { userId: string }) {
  const router = useRouter();
  const params = useParams();
  const projectId = (params?.projectId as string) || "";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tag, setTag] = useState<string>("");
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
      await createTask({
        projectId,
        userId,
        title,
        description,
        deadline: new Date(deadline),
        tag: tag
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
      });
      router.push(`/project/${projectId}/kanban`);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la création de la tâche."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded shadow p-6 flex flex-col w-96 gap-4"
    >
      <h2 className="text-xl font-semibold mb-3">Nouvelle tâche</h2>
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
        Tags (séparés par des virgules)
        <input
          className="border px-2 py-1 rounded"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          disabled={loading}
        />
      </label>
      <button
        type="submit"
        className="bg-blue-700 text-white py-2 rounded font-semibold mt-2 disabled:opacity-50"
        disabled={loading}
      >
        Créer
      </button>
    </form>
  );
}
